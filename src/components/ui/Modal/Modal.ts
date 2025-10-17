import { EventEmitter } from "../../../utils/EventEmitter";
import { EventListenerManager } from "../../../utils/EventListenerManager";
import { ModalDomManager } from "./ModalDomManager";

interface IModalProps<b extends HTMLElement, t extends HTMLElement> {
    titleEl?: t;
    bodyEl: b;
}

export type ModalEventEmitter = EventEmitter<{
    'modal:destroy': void;
    'modal:open': void;
    'modal:close': void;
}>

export class Modal<b extends HTMLElement, t extends HTMLElement> {
    private emitter: ModalEventEmitter;
    public readonly modalEl: HTMLElement;
    public readonly closeButton: HTMLButtonElement;
    private eventManager = new EventListenerManager<HTMLButtonElement, string, EventListener>();

    constructor ({titleEl, bodyEl}: IModalProps<b, t>) {
        this.emitter = new EventEmitter();
        const modalDomManager = new ModalDomManager({
            emitter: this.emitter,
            titleEl,
            bodyEl,
        });

        this.modalEl = modalDomManager.getElement();
        this.closeButton = modalDomManager.getCloseButtonElement();
    }

    public open() {
        this.eventManager.add(this.closeButton, 'click', this.close.bind(this));
        this.emitter.emit('modal:open');
    }

    public close() {
        this.eventManager.removeAll();
        this.emitter.emit('modal:close');
    }
}