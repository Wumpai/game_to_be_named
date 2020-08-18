import { Engine } from "./engine/engine";
import { Client } from "./client/client";
import { ChunkManager } from "./engine/chunk";

import "./style.css";

function callback(engine: Engine): void {
    console.log("LOADER IS LOADED");
    const chunkManager = new ChunkManager(engine);

    const client = new Client(engine);

    engine.instantiateOther(client);
    engine.instantiate(client.player);
    chunkManager.bind(client.player);
    engine.instantiateOther(chunkManager);
    engine.camera.follow(client.player);
}

(function () {
    const engine = new Engine(callback);
    console.log(engine.version);
})();
