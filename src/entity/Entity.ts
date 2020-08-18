import * as PIXI from "pixi.js";
import { Engine } from "../engine/engine";

export class Entity {
    private _object!: PIXI.Sprite;
    private _x = 0;
    private _y = 0;
    private _z = 0;
    private _rotation = 0;
    protected _updatable = true;
    private _sortable = true;
    protected _radius = 40;
    protected hasCollider = false;
    protected isSolid = false;
    public _colArt!: PIXI.Graphics;
    protected doCenter = true;

    constructor(texture: PIXI.Texture, x: number, y: number, z = 0, c: boolean) {
        this._x = x;
        this._y = y;
        this._z = z;
        this.doCenter = c;
        this._object = new PIXI.Sprite(texture);

        this._colArt = new PIXI.Graphics();
        this._colArt.beginFill(0x4287f5);
        this._colArt.drawCircle(x, y, this._radius);
        this._colArt.endFill();
        this.init();
    }

    collision(entity: Entity): boolean {
        return (
            Math.sqrt(Math.pow(this.x - entity.x, 2) + Math.pow(this.y - entity.y, 2)) <= this.radius + entity.radius
        );
    }

    setPosition(x: number, y: number): void {
        if (!x || !y) {
            //console.warn("Invalid x or y pased");
            //return;
        }
        this._x = x;
        this._y = y;
    }

    get colArt(): PIXI.Graphics {
        return this._colArt;
    }

    get hasCol(): boolean {
        return this.hasCollider;
    }

    get hasSolid(): boolean {
        return this.isSolid;
    }

    get radius(): number {
        return this._radius;
    }

    public translateX(x: number): void {
        this._x += x;
    }

    public translateY(y: number): void {
        this._y += y;
    }

    public dispose(): void {
        this.object.destroy();
    }

    set setRotation(r: number) {
        this._rotation = r;
    }

    private init(): void {
        if (this.doCenter) {
            this._object.anchor.set(0.5);
        }
        this._object.position.set(this.x, this.y);
        this._object.zIndex = this._z;
    }

    public update(delta: number): void {
        this.object.rotation = this._rotation - Math.PI / 2;
        this.object.position.set(
            ((this.x - this.object.x) / 1) * delta + this.object.x,
            ((this.y - this.object.y) / 1) * delta + this.object.y
        );
        this.colArt.position.set(this.x, this.y);
    }

    createGraphics(): void {
        const art = new PIXI.Graphics();
        art.beginFill(0x000000);
        art.drawRect(0, 0, 100, 100);
        art.endFill();
    }

    get updatable(): boolean {
        return this._updatable;
    }

    get sortable(): boolean {
        return this._sortable;
    }

    get x(): number {
        return this._x;
    }

    get object(): PIXI.Sprite {
        return this._object;
    }

    get y(): number {
        return this._y;
    }
}

export class Player extends Entity {
    protected hasCollider = true;
    constructor(texture: PIXI.Texture, x: number, y: number, z = 0, c: boolean) {
        super(texture, x, y, z, c);
        console.log(this);
        this.object.anchor.set(0.5);
        this.object.scale.set(0.5);
    }

    createGraphics(): PIXI.Graphics {
        const art = new PIXI.Graphics();
        art.beginFill(0x000000);
        art.drawRect(0, 0, 100, 100);
        art.endFill();
        return art;
    }
}

export class Chunk extends Entity {
    protected _updatable = false;
    constructor(texture: PIXI.Texture, x: number, y: number, z = 0, c: boolean) {
        super(texture, x, y, z, c);
    }
}

export class Tree extends Entity {
    protected _updatable = false;
    protected isSolid = true;
    constructor(texture: PIXI.Texture, x: number, y: number, z = 0, c: boolean) {
        super(texture, x, y, z, c);
        this._radius = 80;
        this.object.scale.set(0.5);
        this.object.rotation = (Math.PI / 4) * Math.random();
    }
}

export class Debris extends Entity {
    protected _updatable = false;
    protected isSolid = true;
    constructor(texture: PIXI.Texture, x: number, y: number, z = 0, c: boolean) {
        super(texture, x, y, z, c);
        this._radius = 100;
        this.object.rotation = (Math.PI / 4) * Math.random();
    }
}
export class Bush extends Entity {
    protected _updatable = false;
    protected isSolid = true;
    constructor(texture: PIXI.Texture, x: number, y: number, z = 0, c: boolean) {
        super(texture, x, y, z, c);
        this._radius = 40;
        this.object.scale.set(0.8);
    }
}

export class Fern extends Bush {
    protected _updatable = false;
    protected isSolid = true;
    constructor(texture: PIXI.Texture, x: number, y: number, z = 0, c: boolean) {
        super(texture, x, y, z, c);
        this._radius = 60;
        this.object.rotation = 2 * Math.PI * Math.random();
    }
}

export class Cactus extends Bush {
    protected _updatable = false;
    protected isSolid = true;
    constructor(texture: PIXI.Texture, x: number, y: number, z = 0, c: boolean) {
        super(texture, x, y, z, c);
        this._radius = 60;
        this.object.rotation = 2 * Math.PI * Math.random();
    }
}

export class GrassPatch extends Entity {
    protected _updatable = false;
    constructor(texture: PIXI.Texture, x: number, y: number, z = 0, c: boolean) {
        super(texture, x, y, z, c);
        this.object.scale.set(1.5);
        this.object.tint = 0x41cc54 * Math.random();
    }
}

export class Leaf extends Entity {
    protected _updatable = false;
    constructor(texture: PIXI.Texture, x: number, y: number, z = 0, c: boolean) {
        super(texture, x, y, z, c);
        this.object.rotation = (Math.PI / 4) * Math.random();
        this.object.scale.set(0.5);
        this.object.rotation = 2 * Math.PI * Math.random();
    }
}

export class ChunkBackground extends Entity {
    protected _updatable = false;
    protected doCenter = false;
    constructor(texture: PIXI.Texture, x: number, y: number, z: number, w: number, h: number, t: number, c: boolean) {
        super(texture, x, y, z, c);
        this.object.tint = t;
        this.object.width = w;
    }
}

export class EntityFactory {
    private engine!: Engine;
    private playerArt!: PIXI.Texture;
    private chunkArt!: PIXI.Texture;
    private treeArt!: PIXI.Texture;
    private debrisArt!: PIXI.Texture;
    private bushArt!: PIXI.Texture;
    private fernArt!: PIXI.Texture;
    private grassPatchArt!: PIXI.Texture;
    private leafArts!: PIXI.Texture[];
    private backGroundArt!: PIXI.Texture;
    private cactusArt!: PIXI.Texture;

    constructor(engine: Engine) {
        this.engine = engine;
        this.playerArt = this.createGraphics();
        this.chunkArt = this.createChunkGraphics();
        this.treeArt = this.createChunkGraphics();
        this.debrisArt = this.createDebrisArt();
        this.bushArt = this.createDebrisArt();
        this.fernArt = this.createDebrisArt();
        this.grassPatchArt = this.createDebrisArt();
        this.cactusArt = this.createDebrisArt();
        this.leafArts = [this.createDebrisArt()];
        this.backGroundArt = this.createBackGroundArt();
        const sheet = PIXI.Loader.shared.resources["./assets/spritesheet.json"];
        console.log(PIXI.Loader.shared.resources);
        if (sheet.textures) {
            this.treeArt = sheet.textures["common_tree.svg"];
            this.playerArt = sheet.textures["player.svg"];
            this.debrisArt = sheet.textures["common_rock.svg"];
            this.bushArt = sheet.textures["common_bush.svg"];
            this.fernArt = sheet.textures["common_fern.svg"];
            this.grassPatchArt = sheet.textures["common_grass.svg"];
            this.cactusArt = sheet.textures["common_cactus.svg"];
            this.leafArts = [
                sheet.textures["common_leaf1.png"],
                sheet.textures["common_leaf2.png"],
                sheet.textures["common_leaf3.png"],
            ];
        }
    }

    createDebrisArt(): PIXI.Texture {
        const art = new PIXI.Graphics();
        art.beginFill(0x000000);
        art.drawRect(0, 0, 100, 100);
        art.endFill();
        art.beginFill(0xfcba03);
        art.drawRect(25, 25, 50, 50);
        art.endFill();
        return this.engine.renderer.generateTexture(art, 0, 1);
    }

    createBackGroundArt(): PIXI.Texture {
        const art = new PIXI.Graphics();
        art.beginFill(0xffffff);
        art.drawRect(0, 0, 7 * 128, 7 * 128);
        art.endFill();
        return this.engine.renderer.generateTexture(art, 0, 1);
    }

    createGraphics(): PIXI.RenderTexture {
        const art = new PIXI.Graphics();
        art.beginFill(0x000000);
        art.drawRect(0, 0, 100, 100);
        art.endFill();
        art.beginFill(0xfcba03);
        art.drawRect(25, 25, 50, 50);
        art.endFill();
        return this.engine.renderer.generateTexture(art, 0, 1);
    }

    createChunkGraphics(): PIXI.RenderTexture {
        const art = new PIXI.Graphics();
        art.beginFill(0x8dd13f * Math.random());
        art.drawRect(0, 0, 100, 100);
        art.endFill();
        return this.engine.renderer.generateTexture(art, 0, 1);
    }

    createChunk(x: number, y: number, z: number): Chunk {
        return new Chunk(this.chunkArt, x, y, z, true);
    }

    createPlayer(x: number, y: number, z: number): Player {
        return new Player(this.playerArt, x, y, z, true);
    }

    createTree(x: number, y: number, z: number): Tree {
        return new Tree(this.treeArt, x, y, z, true);
    }

    createDebris(x: number, y: number, z: number): Debris {
        return new Debris(this.debrisArt, x, y, z, true);
    }

    createCactus(x: number, y: number, z: number): Cactus {
        return new Cactus(this.cactusArt, x, y, z, true);
    }

    createLeaf(x: number, y: number, z: number): Leaf {
        return new Leaf(
            this.leafArts[Math.floor(Math.random() * (this.leafArts.length - 1 - 0 + 1)) + 0],
            x,
            y,
            z,
            true
        );
    }

    createBush(x: number, y: number, z: number): Bush {
        return new Bush(this.bushArt, x, y, z, true);
    }

    createFern(x: number, y: number, z: number): Fern {
        return new Fern(this.fernArt, x, y, z, true);
    }

    createGrassPatch(x: number, y: number, z: number): GrassPatch {
        return new GrassPatch(this.grassPatchArt, x, y, z, true);
    }

    createBackGround(x: number, y: number, z: number, w: number, h: number, t: number): ChunkBackground {
        return new ChunkBackground(this.backGroundArt, x, y, z, w, h, t, false);
    }
}

module.exports = {
    Entity: Entity,
    EntityFactory: EntityFactory,
    Player: Player,
    Tree: Tree,
};
