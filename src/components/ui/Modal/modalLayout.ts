import { domElementCreator } from "../../../utils/domElementCreator";

export const modalLayout = <b extends HTMLElement, t extends HTMLElement>(body: b, title?: t) => {
    const modal = domElementCreator('div', ['modal']);
    const container = domElementCreator('div', ['container']);
    const modalWrapper = domElementCreator('div', ['modal__wrapper']);
    const modalContent = domElementCreator('div', ['modal__content']);
    const modalCloseButton = domElementCreator<HTMLButtonElement>('button', ['modal__close']);

    if (title) {
        const modalTitle = domElementCreator('div', ['modal__title']);
        modalTitle.append(title);
        modalContent.append(modalTitle);
    }

    const modalbody = domElementCreator('div', ['modal__body']);
    modalbody.append(body);
    modalContent.append(modalbody);
    modalContent.append(modalCloseButton);

    modalWrapper.append(modalContent);
    container.append(modalWrapper);
    modal.append(container);
    
    return {
        modalEl: modal,
        closeButtonEl: modalCloseButton,
    };
}