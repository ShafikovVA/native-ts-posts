import { EventEmitter } from "../../utils/EventEmitter";
import { EventListenerManager } from "../../utils/EventListenerManager";
import { EmojiDomManager } from "./EmojiDomManager";

export interface IEmojiProps {
    element?: HTMLButtonElement,
    current?: boolean;
    title?: string;
    onClick?: EventListener,
    onRemove?: (e: Emoji) => void,
}

export type EmojiEventEmitter = EventEmitter<{
    'emoji:set-text': string,
    'emoji:set-title': string,
    'emoji:set-count': number,
    'emoji:set-current': boolean,
}>

export class Emoji {
    private title = '';
    private count: number;
    private element;
    private onRemove?: (e: Emoji) => void;
    private emitter: EmojiEventEmitter;
    private eventsManager = new EventListenerManager<HTMLElement, string, EventListener>;
    public isCurrent = false;
    
    constructor ({title, element, onRemove, onClick}: IEmojiProps) {
        this.emitter = new EventEmitter;
        const {emojiEl, countEl, titleEl, current} = new EmojiDomManager({ 
            emitter: this.emitter,
            element,
            title,
        }).get();

        this.isCurrent = current;
        this.element = emojiEl;
        this.onRemove = onRemove;
        this.count = Number(countEl.textContent);
        this.title = titleEl.textContent
        
        this.eventsManager.add(this.element, 'click', (e) => {
            if(onClick) {
                onClick(e);
            }
            if(this.isCurrent) {
                this.setCurrent(false);
                this.setCount((count) => count - 1);
            } else {
                this.setCurrent(true);
                this.setCount((count) => count + 1);
            }
         
        });
    } 

    public setText (text: string) {
        this.emitter.emit('emoji:set-text', text);
    }
    
    public setCount (callback: (count: number) => number) {
        const count = callback(this.count); 
        this.count = count;

        if(count <= 0) {
            this.destroy();
            return;
        }
        this.emitter.emit('emoji:set-count', this.count);
    }

    public getCurrent() {
        return this.isCurrent;
    }
    public setCurrent(current: boolean) {
        this.isCurrent = current;
        this.emitter.emit('emoji:set-current', this.isCurrent);
    }

    public destroy () {
        this.eventsManager.removeAll();
        if(this.onRemove) {
            this.onRemove(this);
        }
    }

    public get () {
        return this.element;
    }
  

}