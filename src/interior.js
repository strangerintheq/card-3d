
import {
    Scene,

    WebGLRenderTarget,
} from 'https://unpkg.com/three@0.121.1/build/three.module.js';

import {randomBoxes, torusKnot} from "./meshes.js";


export function interior() {

    const rt = new WebGLRenderTarget(2048, 2048);
    const scene = new Scene();
    // scene.background = new Color('#346')

    randomBoxes(scene, 200);

    const mesh = torusKnot(scene);



    return {
        animate: function (t) {
            mesh.rotation.z = t/10000;


            scene.traverse(o => {

                if(o.i === undefined)
                    return

                const t1 = (t/1000 + Math.sin(o.i))%1
                const nextPos = t1 < (o.prevT || 0);

                o.prevT = t1

                o.scale.setScalar(0.3 + Math.sin(t/300+o.i*471)*0.2)

                if (nextPos)
                    o.nextPos = [Math.random()*4-2, Math.random()*4-2, Math.random()*4-2]


                if (!o.nextPos)
                    return;

                o.position.x += o.nextPos[0]/10;
                o.nextPos[0] -= o.nextPos[0]/10
                o.position.y += o.nextPos[1]/10;
                o.nextPos[1] -= o.nextPos[1]/10
                o.position.z += o.nextPos[2]/10;
                o.nextPos[2] -= o.nextPos[2]/10

            });
        },

        rt,

        render(camera, renderer) {
            renderer.setRenderTarget(rt);
            renderer.render(scene, camera);
            renderer.setRenderTarget(null);
        }
    }
}