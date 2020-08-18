import * as PIXI from "pixi.js";
import { Entity } from "../entity/Entity";

PIXI.settings.SORTABLE_CHILDREN = true;

export class Camera {
    private _container!: PIXI.Container;
    private _layer2!: PIXI.Container;
    private _layer1!: PIXI.Container;
    private target!: Entity;
    private _smoothness = 5;
    private maxSize = 3000;
    constructor() {
        /*this._layer2 = new PIXI.ParticleContainer(this.maxSize, {
            vertices: true,
            rotation: true,
            position: true,
            uvs: false,
            tint: false,
        });*/
        this._layer2 = new PIXI.Container();
        this._container = new PIXI.Container();
        this._layer1 = new PIXI.Container();
    }

    public follow(entity: Entity): void {
        this.target = entity;
    }

    public update(delta: number): void {
        if (this.target) {
            const dt = 1 - Math.exp(-delta / this._smoothness);
            const x = (this.target.x - this.object.pivot.x) * dt + this.object.pivot.x;
            const y = (this.target.y - this.object.pivot.y) * dt + this.object.pivot.y;
            this.object.pivot.x = typeof x === "number" ? x : 0;
            this.object.pivot.y = typeof y === "number" ? y : 0;
        }
    }

    public addChild(object: PIXI.Sprite): void {
        if (this.layer2.children.length >= this.maxSize) {
            console.warn("Memory error");
            return;
        }

        this.layer2.addChild(object);
        this.layer2.sortChildren();
    }

    position = {
        set: (x: number, y: number): void => {
            this.object.position.set(x, y);
        },
    };

    removeChild(sprite: PIXI.Sprite): void {
        this.object.removeChild(sprite);
    }

    get layer2(): PIXI.Container {
        return this._layer2;
    }

    get layer1(): PIXI.Container {
        return this._layer1;
    }

    get object(): PIXI.Container {
        return this._container;
    }
}

module.exports = {
    Camera: Camera,
};
