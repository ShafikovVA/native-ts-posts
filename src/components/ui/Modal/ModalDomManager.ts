import { modalLayout } from "./modalLayout";
import { domElementCreator } from "../../../utils/domElementCreator";
import type { ModalEventEmitter } from "./Modal";
interface IModalDomManagerProps<b extends HTMLElement, t extends HTMLElement> {
    titleEl?: t;
    bodyEl: b;
    emitter: ModalEventEmitter;
}

export class ModalDomManager<b extends HTMLElement, t extends HTMLElement> {
    private modalEl: HTMLElement;
    private emitter: ModalEventEmitter;
    private closeButtonEl: HTMLButtonElement;

    constructor({titleEl, bodyEl, emitter}: IModalDomManagerProps<b, t>) {
        const { modalEl, closeButtonEl } = modalLayout(bodyEl, titleEl);
        this.modalEl = modalEl;
        this.closeButtonEl = closeButtonEl;
        this.emitter = emitter;
        this.listen();
    }

    private listen () {
        this.emitter.on('modal:open', this.open.bind(this));
        this.emitter.on('modal:close', this.close.bind(this));
    }
    
    private open() {
        let modalsEl = document.body.querySelector('.modals') as HTMLElement;
        if(!modalsEl) {
            modalsEl = domElementCreator('div', ['modals']);
            document.body.append(modalsEl);
        }
        modalsEl.append(this.modalEl);
    }

    private close() {
        this.modalEl.remove();

        this.emitter.off('modal:open');
        this.emitter.off('modal:close');
    }

    public getElement() {
        return this.modalEl;
    }

    public getCloseButtonElement() {
        return this.closeButtonEl;
    }

 }