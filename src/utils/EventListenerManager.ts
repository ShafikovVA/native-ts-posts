type EventListenerItem<ElType, EventType, CallBackType> = {
    element: ElType,
    eventType: EventType,
    callback: CallBackType,
}

export class EventListenerManager<ElType extends HTMLElement = HTMLElement, EventType = string, CallBackType = () => void> {
    private eventListeners: EventListenerItem<ElType, EventType, CallBackType>[]

    constructor (eventListeners: EventListenerItem<ElType, EventType, CallBackType>[] = []) {
        this.eventListeners = eventListeners;
        this.listen();
    }

    public add (element: ElType, eventType: EventType, callback: CallBackType) {
        const eventListener = {element, eventType, callback};
        this.eventListeners.push(eventListener);
        this.attach(element, eventType, callback);
    }

    public remove (element: ElType, eventType: EventType, callback: CallBackType) {
        const eventListener = {element, eventType, callback};
        this.eventListeners = this.eventListeners.filter(e => e !== eventListener);
        element.removeEventListener(eventType as string, callback as EventListenerOrEventListenerObject);
    }

    public removeAll () {
        this.eventListeners.forEach(({element, eventType, callback}) => {
            element.removeEventListener(eventType as string, callback as EventListenerOrEventListenerObject);
        });
        this.eventListeners = [];
    }

    private attach (el: ElType, eventName: EventType, callback: CallBackType) {
        el.addEventListener(eventName as string, callback as EventListenerOrEventListenerObject);
    }

    private listen () {
        this.eventListeners.forEach(({element, eventType, callback}) => {
            if(element) {
                this.attach(element, eventType, callback);
            }
        })
    }
}