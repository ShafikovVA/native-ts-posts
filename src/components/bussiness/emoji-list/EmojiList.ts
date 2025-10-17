import { EventEmitter } from "../../../utils/EventEmitter";
import { EventListenerManager } from "../../../utils/EventListenerManager";
import { Emoji } from "../emoji/Emoji";
import { EmojiListDomManager } from "./EmojiListDomManager";

export interface IEmojiListProps {
    element?: HTMLElement;
}

export type EmojiListEventEmitter = EventEmitter<{
    'emojiList:add': HTMLElement,
    'emojiList:remove': HTMLElement,
    'emojiList:destroy': undefined,
}>

export class EmojiList {
    private emitter: EmojiListEventEmitter;
    private element: HTMLElement;
    private eventListeners: EventListenerManager<HTMLElement, string, EventListener>;
    private emojiList: Emoji[] = [];
    private button: HTMLButtonElement;

    constructor({element}: IEmojiListProps) {
        this.emitter = new EventEmitter;
        const { emojiListEl, addButtonEl, emojisEl } = new EmojiListDomManager({
            element,
            emitter: this.emitter,
        }).get();

        if(emojisEl.length > 0) {
            emojisEl.forEach((el, emojiIndex) => {
                const emoji = new Emoji({ 
                    element: el,
                    onRemove: () => {
                        this.remove(emoji.get());
                        this.emojiList.splice(emojiIndex, 1);
                    },
                    onClick: () => {
                        this.resetCurrentAll();
                    },
                });

                this.emojiList.push(emoji);
            })
        }

        this.element = emojiListEl;
        this.button = addButtonEl;

        this.eventListeners = this.setEventListeners();
        
        return this;
    }

    private setEventListeners () {
        return new EventListenerManager([{
            element: this.button, eventType: 'click', callback: this.add.bind(this)
        }]);
    }

    public add () {
        const name = prompt('type reaction name', '');
        console.log(name);
        const emojiIndex = this.emojiList.length;

        const emoji = new Emoji({ 
            title: name || '', 
            onRemove: () => {
                this.remove(emoji.get());
                this.emojiList.splice(emojiIndex, 1);
            },
            onClick: () => {
                this.resetCurrentAll();
            },
        });

        this.resetCurrentAll();
       
        this.emojiList.push(emoji);

        this.emitter.emit('emojiList:add', emoji.get());
    }
    
    private resetCurrentAll () {
        this.emojiList.forEach((el) => {
            if (el.getCurrent()) {
                el.setCurrent(false);
                el.setCount((e) => e - 1);
            }
        })
    }

    public remove (element: HTMLElement) {
        this.emitter.emit('emojiList:remove', element);
    }

    public destroy() {
        this.eventListeners.removeAll();
        this.emitter.emit('emojiList:destroy');
    }

    public get() {
        this.element;
    }
}