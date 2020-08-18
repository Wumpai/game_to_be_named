import { Engine } from "../engine/engine";
import { Entity } from "../entity/Entity";

export class Client {
    private engine!: Engine;
    private _player!: Entity;
    constructor(engine: Engine) {
        this.engine = engine;
        this._player = engine.entityFactory.createPlayer(0, 0, 2);
        console.log(this._player);
    }

    private calcAngle(a: { [key: string]: number }, b: { [key: string]: number }): number {
        return Math.atan2(b.y - a.y, b.x - a.x);
    }

    resolveCollision(c1: Entity, c2: Entity): void {
        const distanceX = c1.x - c2.x;
        const distanceY = c1.y - c2.y;
        const radii_sum = c1.radius + c2.radius;
        const length = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        const unitX = distanceX / (length || 1);
        const unitY = distanceY / (length || 1);
        c1.setPosition(c2.x + (radii_sum + 1) * unitX, c2.y + (radii_sum + 1) * unitY);
    }
    public update(delta: number): void {
        const downKeys = this.engine.keys;
        const mousePOS = this.engine.mouse;

        this.player.setRotation = this.calcAngle({ x: this.player.x, y: this.player.y }, mousePOS);

        const change = { x: 0, y: 0 };
        if (downKeys["KeyW"]) {
            this.player.translateY(-5 * delta);
            change.y += -5 * delta;
        }

        if (downKeys["KeyD"]) {
            this.player.translateX(5 * delta);
            change.x += 5 * delta;
        }

        if (downKeys["KeyS"]) {
            this.player.translateY(5 * delta);
            change.y += 5 * delta;
        }

        if (downKeys["KeyA"]) {
            this.player.translateX(-5 * delta);
            change.x += -5 * delta;
        }

        for (let i = 0; i < this.engine.u_entities.length; i++) {
            const entity = this.engine.u_entities[i];
            if (entity instanceof Entity && entity.hasSolid && entity !== this.player) {
                if (this.player.collision(entity)) {
                    this.resolveCollision(this.player, entity);
                    //this.player.translateX(-1 * change.x);
                    //this.player.translateY(-1 * change.y);
                }
            }
        }
    }
    get player(): Entity {
        return this._player;
    }
}
module.exports = {
    Client: Client,
};
