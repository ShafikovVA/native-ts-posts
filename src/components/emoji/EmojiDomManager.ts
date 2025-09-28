import type { EventEmitter } from "../../utils/EventEmitter";
import type { EmojiEventEmitter, IEmojiProps } from "./Emoji";

interface IEmojiDomManagerProps extends Omit<IEmojiProps, 'onClick'>{
    emitter: EmojiEventEmitter;
}

export class EmojiDomManager {
    private emojiEl: HTMLElement;
    private emitter: EmojiEventEmitter;
    private titleEl: HTMLSpanElement;
    private counterEl: HTMLSpanElement;
    
    constructor({element, title, emitter}: IEmojiDomManagerProps) {
        this.emitter = emitter;

        if (element) {
            this.emojiEl = element;
            
        } else {
            if(title) {
                this.emojiEl = this.create(title, 1);
            }
            else {
                throw new Error('Invalid emoji properties');
            }
        }

        this.titleEl = this.emojiEl.querySelector('span.emojiButton__text') as HTMLParagraphElement;
        this.counterEl = this.emojiEl.querySelector('span.emojiButton__counter') as HTMLParagraphElement;

        this.listen();
        
        return this;
    }

    private listen () {
        this.emitter.on('emoji:set-title', this.setTitle.bind(this));
        this.emitter.on('emoji:set-count', this.setCount.bind(this));
        this.emitter.on('emoji:set-current', this.setCurrent.bind(this));
    }
    
    private setTitle(title:string) {
        this.titleEl.innerText = title;
    }

    private setCount(count: number) {
        this.counterEl.innerText = count.toString(); 
    }
    
    private setCurrent(current: boolean) {
        if(current) {
            this.emojiEl.classList.add('current'); 
        } else {
            this.emojiEl.classList.remove('current'); 
        }
 
    }

    private create(title: string, counter: number) {
       const emojiDomElement = document.createElement('button');
       emojiDomElement.classList.add('emojiButton', 'current');
       
       const emojiTitle = document.createElement('span');
       emojiTitle.classList.add('emojiButton__text');
       emojiTitle.innerText = title;

       const emojiCounter = document.createElement('span');
       emojiCounter.classList.add('emojiButton__counter');
       emojiCounter.innerText = counter.toString();

       emojiDomElement.appendChild(emojiTitle);
       emojiDomElement.appendChild(emojiCounter);

       return emojiDomElement;
    }

    public get() {
       return {
            emojiEl: this.emojiEl,
            countEl: this.counterEl,
            titleEl: this.titleEl,
            current: this.emojiEl.classList.contains('current'),
        };
    }
}