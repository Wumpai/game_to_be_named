import { Entity } from "../entity/Entity";
import { Engine } from "./engine";

function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log(getRandomInt(0, 1));

export class Chunk {
    private _x!: number;
    private _ChunkWidth!: number;
    private _ChunkHeight!: number;
    private _TileHeight!: number;
    private _TileWidth!: number;
    private _y!: number;
    private biomeType = 0;
    private _objects: Entity[] = [];
    constructor(x: number, y: number, cw: number, ch: number, tw: number, th: number) {
        this.biomeType = getRandomInt(0, 4);

        this._x = x;
        this._y = y;
        this._ChunkWidth = cw;
        this._ChunkHeight = ch;
        this._TileHeight = th;
        this._TileWidth = tw;
    }

    remove(): void {
        this._objects = [];
    }

    spawnSnow(engine: Engine): void {
        const background = engine.entityFactory.createBackGround(
            this._x,
            this._y,
            -1,
            this._ChunkWidth * this._TileWidth,
            this._ChunkHeight * this._TileHeight,
            0xf7f7f7
        );

        engine.instantiate(background);
        this._objects.push(background);

        for (let i = 0; i < this._ChunkWidth; i++) {
            for (let y = 0; y < this._ChunkHeight; y++) {
                if (Math.random() < 0.2) {
                    const tile = engine.entityFactory.createTree(
                        this._x + i * this._TileWidth,
                        this._y + y * this._TileHeight,
                        5
                    );
                    tile.object.x = tile.object.x;
                    engine.instantiate(tile);
                    this._objects.push(tile);
                }
            }
        }
    }

    spawnCave(engine: Engine): void {
        const background = engine.entityFactory.createBackGround(
            this._x,
            this._y,
            -1,
            this._ChunkWidth * this._TileWidth,
            this._ChunkHeight * this._TileHeight,
            0x474747
        );

        engine.instantiate(background);
        this._objects.push(background);

        for (let i = 0; i < this._ChunkWidth; i++) {
            for (let y = 0; y < this._ChunkHeight; y++) {
                if (Math.random() < 0.05) {
                    const tile = engine.entityFactory.createDebris(
                        this._x + i * this._TileWidth,
                        this._y + y * this._TileHeight,
                        3
                    );
                    engine.instantiate(tile);
                    this._objects.push(tile);
                }
            }
        }
    }

    spawnForrest(engine: Engine): void {
        const background = engine.entityFactory.createBackGround(
            this._x,
            this._y,
            -1,
            this._ChunkWidth * this._TileWidth,
            this._ChunkHeight * this._TileHeight,
            0x20f599
        );

        engine.instantiate(background);
        this._objects.push(background);

        for (let i = 0; i < this._ChunkWidth; i++) {
            for (let y = 0; y < this._ChunkHeight; y++) {
                if (Math.random() < 0.05) {
                    const tile = engine.entityFactory.createDebris(
                        this._x + i * this._TileWidth,
                        this._y + y * this._TileHeight,
                        3
                    );
                    engine.instantiate(tile);
                    this._objects.push(tile);
                } else if (Math.random() < 0.15) {
                    const tile = engine.entityFactory.createLeaf(
                        this._x + i * this._TileWidth,
                        this._y + y * this._TileHeight,
                        1
                    );
                    engine.instantiate(tile);
                    this._objects.push(tile);
                } else if (Math.random() < 0.02) {
                    const tile = engine.entityFactory.createBush(
                        this._x + i * this._TileWidth,
                        this._y + y * this._TileHeight,
                        4
                    );
                    engine.instantiate(tile);
                    this._objects.push(tile);
                } else if (Math.random() < 0.01) {
                    const tile = engine.entityFactory.createGrassPatch(
                        this._x + i * this._TileWidth,
                        this._y + y * this._TileHeight,
                        0
                    );
                    tile.object.x = tile.object.x;
                    engine.instantiate(tile);
                    this._objects.push(tile);
                } else if (Math.random() < 0.2) {
                    const tile = engine.entityFactory.createTree(
                        this._x + i * this._TileWidth,
                        this._y + y * this._TileHeight,
                        5
                    );
                    tile.object.x = tile.object.x;
                    engine.instantiate(tile);
                    this._objects.push(tile);
                }
            }
        }
    }

    spawnDesert(engine: Engine): void {
        const background = engine.entityFactory.createBackGround(
            this._x,
            this._y,
            -1,
            this._ChunkWidth * this._TileWidth,
            this._ChunkHeight * this._TileHeight,
            0xfcfc26
        );

        engine.instantiate(background);
        this._objects.push(background);

        for (let i = 0; i < this._ChunkWidth; i++) {
            for (let y = 0; y < this._ChunkHeight; y++) {
                if (Math.random() < 0.05) {
                    const tile = engine.entityFactory.createDebris(
                        this._x + i * this._TileWidth,
                        this._y + y * this._TileHeight,
                        3
                    );
                    engine.instantiate(tile);
                    this._objects.push(tile);
                } else if (Math.random() < 0.02) {
                    const tile = engine.entityFactory.createFern(
                        this._x + i * this._TileWidth,
                        this._y + y * this._TileHeight,
                        2
                    );
                    tile.object.x = tile.object.x;
                    engine.instantiate(tile);
                    this._objects.push(tile);
                } else if (Math.random() < 0.07) {
                    const tile = engine.entityFactory.createCactus(
                        this._x + i * this._TileWidth,
                        this._y + y * this._TileHeight,
                        2
                    );
                    tile.object.x = tile.object.x;
                    engine.instantiate(tile);
                    this._objects.push(tile);
                }
            }
        }
    }

    spawnJungle(engine: Engine): void {
        const background = engine.entityFactory.createBackGround(
            this._x,
            this._y,
            -1,
            this._ChunkWidth * this._TileWidth,
            this._ChunkHeight * this._TileHeight,
            0x34b02e
        );

        engine.instantiate(background);
        this._objects.push(background);

        for (let i = 0; i < this._ChunkWidth; i++) {
            for (let y = 0; y < this._ChunkHeight; y++) {
                if (Math.random() < 0.05) {
                    const tile = engine.entityFactory.createDebris(
                        this._x + i * this._TileWidth,
                        this._y + y * this._TileHeight,
                        3
                    );
                    engine.instantiate(tile);
                    this._objects.push(tile);
                } else if (Math.random() < 0.15) {
                    const tile = engine.entityFactory.createLeaf(
                        this._x + i * this._TileWidth,
                        this._y + y * this._TileHeight,
                        1
                    );
                    engine.instantiate(tile);
                    this._objects.push(tile);
                } else if (Math.random() < 0.05) {
                    const tile = engine.entityFactory.createBush(
                        this._x + i * this._TileWidth,
                        this._y + y * this._TileHeight,
                        4
                    );
                    engine.instantiate(tile);
                    this._objects.push(tile);
                } else if (Math.random() < 0.05) {
                    const tile = engine.entityFactory.createFern(
                        this._x + i * this._TileWidth,
                        this._y + y * this._TileHeight,
                        2
                    );
                    tile.object.x = tile.object.x;
                    engine.instantiate(tile);
                    this._objects.push(tile);
                } else if (Math.random() < 0.01) {
                    const tile = engine.entityFactory.createGrassPatch(
                        this._x + i * this._TileWidth,
                        this._y + y * this._TileHeight,
                        0
                    );
                    tile.object.x = tile.object.x;
                    engine.instantiate(tile);
                    this._objects.push(tile);
                } else if (Math.random() < 0.2) {
                    const tile = engine.entityFactory.createTree(
                        this._x + i * this._TileWidth,
                        this._y + y * this._TileHeight,
                        5
                    );
                    tile.object.x = tile.object.x;
                    engine.instantiate(tile);
                    this._objects.push(tile);
                }
            }
        }
    }

    init(engine: Engine): void {
        switch (this.biomeType) {
            case 0:
                this.spawnDesert(engine);
                break;
            case 1:
                this.spawnJungle(engine);
                break;
            case 2:
                this.spawnForrest(engine);
                break;
            case 3:
                this.spawnSnow(engine);
                break;
            case 4:
                this.spawnCave(engine);
                break;
        }
    }

    update(): void {
        this._x = this._x;
    }

    get x(): number {
        return this._x / (this._ChunkWidth * this._TileWidth);
    }

    get y(): number {
        return this._y / (this._ChunkHeight * this._TileHeight);
    }

    get objects(): Entity[] {
        return this._objects;
    }
}

module.exports = {
    Chunk: Chunk,
};
