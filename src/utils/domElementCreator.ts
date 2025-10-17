export const domElementCreator = <T extends HTMLElement>(
    element: string, 
    classList?: string[], 
    atttributes?: {[key: string]: string}
) => {
    const el = document.createElement(element);
    if(classList) {
        el.classList.add(...classList);
    }
    if (atttributes) {
        Object.keys(atttributes).forEach((key) => {
            el.setAttribute(key, atttributes[key]);
        })
    }
    return el as T;
}