import {
    Scene,
    Mesh,
    BoxGeometry,
    MeshStandardMaterial
} from 'https://unpkg.com/three@0.121.1/build/three.module.js';


import {PortalMaterial} from "./portal-material.js";
import {envMap} from "./env-map.js";
import {lights} from "./lights.js";

export function mainScene(ctx, renderer){

    const scene = new Scene();

    const m1 = new PortalMaterial(ctx)

    const m2 = new MeshStandardMaterial({
        metalness: 0.5,
        roughness: 1
    });

    envMap('https://picsum.photos/1000/1000', renderer, (texture) => {
        m2.roughnessMap = m1.roughnessMap =
            m1.envMap = m2.envMap = texture
    })




    scene.add(new Mesh(
        new BoxGeometry(0.01, 1.5, 1),
        [m1, m2, m2, m2, m2, m2]
    ));

    // lights(scene)

    return scene
}