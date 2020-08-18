import { Entity } from "../entity/Entity";
import { Engine } from "./engine";
import { Chunk } from "./tile";

export class ChunkManager {
    private _boundEntity!: Entity;
    private _engine!: Engine;
    private _cache: Chunk[] = [];
    private _ChunkWidth = 7;
    private _ChunkHeight = 7;
    private _TileHeight = 128;
    private _TileWidth = 128;
    private _lastPosition: { [key: string]: number } = { x: Infinity, y: Infinity };
    private removeQ: Chunk[] = [];
    constructor(engine: Engine) {
        this._engine = engine;
        console.log("Created chunk manager");
    }

    pos2chunk(x: number, y: number): { [key: string]: number } {
        return {
            x: Math.floor(x / (this._ChunkWidth * this._TileWidth)),
            y: Math.floor(y / (this._ChunkHeight * this._TileHeight)),
        };
    }

    removeChunk(chunk: Chunk): void {
        for (let i = 0; i < chunk.objects.length; i++) {
            this._engine.destroyEntity(chunk.objects[i]);
        }
        chunk.remove();
        for (let i = 0; i < this.cache.length; i++) {
            if (this.cache[i] === chunk) {
                this.cache.splice(i, 1);
                return;
            }
        }
    }

    doesChunkExist(x: number, y: number): boolean {
        for (let i = 0; i < this.cache.length; i++) {
            const chunk = this.cache[i];
            if (chunk.x === x && chunk.y === y) {
                return true;
            }
        }
        return false;
    }

    update(): void {
        const chunkPos = this.pos2chunk(this.boundEntity.x, this.boundEntity.y);
        if (chunkPos.x === this._lastPosition.x && chunkPos.y === this._lastPosition.y) {
            for (let i = 0; i < this.removeQ.length; i++) {
                this.removeChunk(this.removeQ[i]);
            }
            this.removeQ = [];
            return;
        }

        for (let i = 0; i < this.cache.length; i++) {
            const chunk = this.cache[i];
            const dist_x = Math.abs(chunkPos.x - chunk.x);
            const dist_y = Math.abs(chunkPos.y - chunk.y);
            if (dist_x > 1 || dist_y > 1) {
                this.removeQ.push(chunk);
            }
        }

        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                if (!this.doesChunkExist(chunkPos.x + x, chunkPos.y + y)) {
                    const chunk = new Chunk(
                        (chunkPos.x + x) * (this._ChunkWidth * this._TileHeight),
                        (chunkPos.y + y) * (this._ChunkWidth * this._TileHeight),
                        this._ChunkWidth,
                        this._ChunkHeight,
                        this._TileWidth,
                        this._TileHeight
                    );
                    chunk.init(this._engine);
                    this.cache.push(chunk);
                }
            }
        }
        this._lastPosition.x = chunkPos.x;
        this._lastPosition.y = chunkPos.y;
    }

    get cache(): Chunk[] {
        return this._cache;
    }
    get boundEntity(): Entity {
        return this._boundEntity;
    }

    bind(entity: Entity): void {
        this._boundEntity = entity;
    }
}

module.exports = {
    ChunkManager: ChunkManager,
};
