import * as PIXI from "pixi.js";
import { Entity, EntityFactory } from "../entity/Entity";
import { Camera } from "./camera";
import { Client } from "../client/client";
import { Controller } from "../controls/controller";
import { ChunkManager } from "./chunk";
import { Chunk } from "./tile";

export class Engine {
    public version = 1;
    private app!: PIXI.Application;
    private static readonly GAME_WIDTH = screen.width;
    private static readonly GAME_HEIGHT = screen.height;
    private Camera!: Camera;
    private entities: Entity[] = [];
    private updatable_entities: (Entity | Client | ChunkManager | Chunk)[] = [];
    private controller!: Controller;
    public entityFactory!: EntityFactory;

    constructor(callback: (n: Engine) => void) {
        //window.onload = (): void => {
        this.startLoadingAssets(callback);
        console.log("Decleared");
        //};
    }

    get u_entities(): (Entity | Client)[] {
        return this.entities;
    }

    private startLoadingAssets(callback: (n: Engine) => void): void {
        const loader = PIXI.Loader.shared;
        loader.add("./assets/spritesheet.json");

        loader.onProgress.add((e) => {
            console.log("Progress", e);
        });
        loader.onComplete.once(() => {
            this.createRenderer();
            callback(this);
        });

        loader.load();
    }

    get keys(): { [key: string]: boolean } {
        return this.controller.keys;
    }

    get mouse(): { [key: string]: number } {
        const mousePOS = this.controller.mouse;
        const screen2game = {
            x:
                (mousePOS.x / this.app.renderer.screen.width) * window.innerWidth -
                this.app.renderer.screen.width / 2 +
                this.Camera.object.pivot.x,
            y:
                (mousePOS.y / this.app.renderer.height) * window.innerHeight -
                this.app.renderer.screen.height / 2 +
                this.Camera.object.pivot.y,
        };
        return screen2game;
    }

    get camera(): Camera {
        return this.Camera;
    }
    get renderer(): PIXI.Renderer {
        return this.app.renderer;
    }

    get view(): HTMLElement {
        return this.app.view;
    }

    get stage(): PIXI.Container {
        return this.app.stage;
    }

    public instantiate(enity: Entity): void {
        this.addEntity(enity);
    }

    private addEntity(entity: Entity | Client | ChunkManager | Chunk): void {
        if (entity instanceof Entity) {
            if (entity.updatable) {
                this.updatable_entities.push(entity);
                this.Camera.addChild(entity.object);
            } else {
                this.entities.push(entity);
                this.Camera.addChild(entity.object);
            }
        } else {
            this.updatable_entities.push(entity);
        }
    }

    public instantiateOther(object: Client | ChunkManager | Chunk): void {
        this.addEntity(object);
    }

    public instantiateCol(object: PIXI.Graphics): void {
        return;
        this.Camera.layer1.addChild(object);
    }

    private destroyObject(sprite: PIXI.Sprite): void {
        this.Camera.removeChild(sprite);
    }

    public destroyEntity(entity: Entity): void {
        if (entity.updatable) {
            for (let i = 0; i < this.updatable_entities.length; i++) {
                if (this.updatable_entities[i] === entity) {
                    this.destroyObject(entity.object);
                    entity.dispose();
                    this.updatable_entities.splice(i, 1);
                }
            }
        } else {
            for (let i = 0; i < this.entities.length; i++) {
                if (this.entities[i] === entity) {
                    this.destroyObject(entity.object);
                    entity.dispose();
                    this.entities.splice(i, 1);
                }
            }
        }
    }

    private inScreen(entity: Entity): boolean {
        if (
            entity.x < this.camera.object.pivot.x - this.app.renderer.screen.width / 2 ||
            entity.x > this.camera.object.pivot.x + this.app.renderer.screen.width / 2 ||
            entity.y < this.camera.object.pivot.y - this.app.renderer.screen.height / 2 ||
            entity.y > this.camera.object.pivot.y + this.app.renderer.screen.height / 2
        ) {
            return false;
        }
        return true;
    }

    clamp(number: number, min: number, max: number): number {
        return Math.max(min, Math.min(number, max));
    }

    private updateLoop(delta: number): void {
        delta = this.clamp(delta, 0, 1);
        for (let i = 0; i < this.updatable_entities.length; i++) {
            this.updatable_entities[i].update(delta);
        }
        this.Camera.update(delta);
    }

    private createRenderer(): void {
        this.app = new PIXI.Application({
            backgroundColor: 0x69a832,
            width: Engine.GAME_WIDTH,
            height: Engine.GAME_HEIGHT,
        });

        this.controller = new Controller(this.app.view);

        this.entityFactory = new EntityFactory(this);

        this.app.ticker.add(this.updateLoop.bind(this));

        this.Camera = new Camera();

        this.app.stage.addChild(this.Camera.object);
        this.Camera.object.addChild(this.Camera.layer1);
        this.Camera.object.addChild(this.Camera.layer2);

        document.body.appendChild(this.app.view);

        this.app.renderer.resize(window.innerWidth, window.innerHeight);
        this.Camera.position.set(this.app.renderer.screen.width / 2, this.app.renderer.screen.height / 2);
        //this.app.stage.scale.x = window.innerWidth / Engine.GAME_WIDTH;
        //this.app.stage.scale.y = window.innerHeight / Engine.GAME_HEIGHT;

        window.addEventListener("resize", this.onResize.bind(this));
    }

    private onResize(): void {
        if (!this.app) {
            return;
        }
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
        this.Camera.position.set(this.app.renderer.screen.width / 2, this.app.renderer.screen.height / 2);
        //this.app.stage.scale.x = Engine.GAME_WIDTH / window.innerWidth / Engine.GAME_WIDTH;
        //this.app.stage.scale.y = window.innerHeight / Engine.GAME_HEIGHT;
    }
}
module.exports = {
    Engine: Engine,
};
