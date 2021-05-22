import {
    Vector2,
} from 'https://unpkg.com/three@0.121.1/build/three.module.js';

export class Context {

    constructor(rt) {

        this.emissivePass = {value: 0}
        this.resolution = {value: new Vector2()}
        this.time = {value: 0}
        this.rtTexture = { type: "t", value: rt.texture }
    }
}