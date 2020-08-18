export class Controller {
    private _keys: { [key: string]: boolean } = {};
    private _mouse: { [key: string]: number } = { x: 0, y: 0 };
    constructor(element: HTMLElement) {
        document.addEventListener("keydown", (e: KeyboardEvent) => {
            this._keys[e.code] = true;
        });
        document.addEventListener("keyup", (e: KeyboardEvent) => {
            delete this._keys[e.code];
        });
        element.addEventListener("mousemove", (e) => {
            this._mouse.x = e.clientX;
            this._mouse.y = e.clientY;
        });
    }
    get keys(): { [key: string]: boolean } {
        return this._keys;
    }

    get mouse(): { [key: string]: number } {
        return this._mouse;
    }
}

module.exports = {
    Controller: Controller,
};
