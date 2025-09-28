import type { EventEmitter } from "../../utils/EventEmitter";
import type { IPostProps, PostEventEmitter } from "./Post";

interface IPostDomManagerProps extends IPostProps{
    emitter: PostEventEmitter;
    title: string;
    text: string;
}

export class PostDomManager {
    private postEl: HTMLElement;
    private titleEl: HTMLParagraphElement;
    private textEl: HTMLParagraphElement;
    private reactions: HTMLDivElement;
    private emitter: PostEventEmitter;
    
    constructor({element, title, text, emitter}: IPostDomManagerProps) {
        this.emitter = emitter;

        if (element) {
            this.postEl = element;
            
        } else {
            this.postEl = this.create(title, text);
        }

        this.titleEl = this.postEl.querySelector('p.post__title') as HTMLParagraphElement;
        this.textEl = this.postEl.querySelector('p.post__text') as HTMLParagraphElement;
        this.reactions = this.postEl.querySelector('div.reactions') as HTMLParagraphElement;
        
        this.listen();
        
        return this;
    }

    private listen () {
        this.emitter.on('post:set-title', this.setTitle);
        this.emitter.on('post:set-text', this.setText);
        this.emitter.on('post:destroy', this.destroy);
    }
    
    private setTitle(title:string) {
        this.titleEl.innerText = title;
    }

    private setText(text: string) {
        this.textEl.innerText = text; 
    }

    private create(title: string, text: string) {
       const postDomElement = document.createElement('div');
       postDomElement.classList.add('post');
       
       const postTitle = document.createElement('p');
       postTitle.classList.add('post__title');
       postTitle.innerText = title;

       const postText = document.createElement('p');
       postText.classList.add('post__text');
       postText.innerText = text;

       const reactions = document.createElement('div');

       postDomElement.appendChild(postTitle);
       postDomElement.appendChild(postText);
       postDomElement.appendChild(reactions);

       return postDomElement;
    }

    private destroy() {
        this.postEl.remove();
    }

    public get() {
        return {
            postEl: this.postEl,
            textEl: this.textEl,
            titleEl: this.titleEl,
            reactionsEl: this.reactions,
        };
    }
}