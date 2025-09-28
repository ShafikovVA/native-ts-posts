import type { EmojiListEventEmitter, IEmojiListProps } from "./EmojiList";

interface IEmojiListDomManagerProps extends IEmojiListProps{
    emitter: EmojiListEventEmitter;
}

export class EmojiListDomManager {
    private emojiListEl: HTMLElement;
    private emojisEl: NodeListOf<HTMLButtonElement>;
    private addButtonEl: HTMLButtonElement;

    private emitter: EmojiListEventEmitter;
    
    constructor({element, emitter}: IEmojiListDomManagerProps) {
        this.emitter = emitter;

        if (element) {
            this.emojiListEl = element;
            
        } else {
            this.emojiListEl = this.create();
        }

        this.addButtonEl = this.emojiListEl.querySelector('button.addButton') as HTMLButtonElement;
        this.emojisEl = this.emojiListEl.querySelectorAll('button.emojiButton');

        this.listen();
        
        return this;
    }

    private listen () {
        this.emitter.on('emojiList:destroy', this.destroy.bind(this));
        this.emitter.on('emojiList:add', this.add.bind(this));
        this.emitter.on('emojiList:remove', this.remove.bind(this));
    }
    
    private create() {
        const reactionsDomElement = document.createElement('div');
        reactionsDomElement.classList.add('reactions');
        
        const reactionsAddButtonDomElement = document.createElement('button');
        reactionsAddButtonDomElement.classList.add('addButton');

        reactionsDomElement.append(reactionsAddButtonDomElement);
 
        return reactionsDomElement;
    }

    private add(element: HTMLElement) {
        this.emojiListEl.append(element);
    }

    private remove(element: HTMLElement) {
        this.emojiListEl.removeChild(element);
    }

    private destroy() {
        this.emitter.emit('emojiList:destroy');
        this.emojiListEl.remove();
    }

    public get() {
        return {
            emojiListEl: this.emojiListEl,
            addButtonEl: this.addButtonEl,
            emojisEl: this.emojisEl,
        };
    }
}