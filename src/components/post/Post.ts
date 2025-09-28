import { EventEmitter } from "../../utils/EventEmitter";
import { EmojiList } from "../emoji-list/EmojiList";
import { PostDomManager } from "./PostDomManager";

export interface IPostProps {
    element: HTMLElement;
}

export type PostEventEmitter = EventEmitter<{
    'post:set-title': string,
    'post:set-text': string,
    'post:destroy': undefined,
}>

export class Post {
    public id: number;
    private emitter: PostEventEmitter;
    public title: string = '';
    public text: string = '';
    private element: HTMLElement;
    private emojiList: EmojiList;

    constructor({element}: IPostProps) {
        this.id = Number(element.dataset.id);
        this.emitter = new EventEmitter;
        const { postEl, textEl, titleEl, reactionsEl } = new PostDomManager({
            element,
            emitter: this.emitter,
            text: this.text,
            title: this.title
        }).get();
        
        this.element = postEl,
        this.text = textEl.textContent;
        this.title = titleEl.textContent;
        this.emojiList = new EmojiList({element: reactionsEl});
        
        return this;
    }
    
    public setTitle(title: string) {
        this.title = title;
        this.emitter.emit('post:set-title', title);
        return this;
    }

    public setText(text: string) {
        this.emitter.emit('post:set-text', text);
        return this;
    }

    public destroy() {
        this.emitter.emit('post:destroy');
        this.emojiList.destroy();
    }

    public get() {
        this.element;
    }
}