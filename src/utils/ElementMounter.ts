export class MountManager {
    private mountContainer: HTMLElement;
    private element: HTMLElement;

    constructor (mountCountainer: HTMLElement, element: HTMLElement) {
        this.mountContainer = mountCountainer;
        this.element = element;
    }
    
    public mount () {
        if(this.element.parentElement !== this.mountContainer) {
            this.mountContainer.append(this.element);
        }

    }

    public unmount () {
        if(this.element.parentElement === this.mountContainer) {
            this.mountContainer.removeChild(this.element);
        }

    }
}