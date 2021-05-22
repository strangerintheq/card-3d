import {WebGLRenderer, PerspectiveCamera} from 'https://unpkg.com/three@0.121.1/build/three.module.js';
import { RenderPass } from 'https://unpkg.com/three@0.121.1/examples/jsm/postprocessing/RenderPass.js';
import {OrbitControls} from 'https://unpkg.com/three@0.121.1/examples/jsm/controls/OrbitControls.js';

import {Context} from "./context.js";
import {bloom} from "./bloom.js";
import {finalPass} from "./final-pass.js";
import {interior} from "./interior.js";
import {mainScene} from "./main-scene.js";

const interiorScene = interior()

const ctx = new Context(interiorScene.rt);

const renderer = new WebGLRenderer({
    antialias: true
});
document.body.appendChild(renderer.domElement);

const camera = new PerspectiveCamera();
camera.position.set(2,1,0.5);

new OrbitControls(camera, renderer.domElement)

const scene = mainScene(ctx, renderer)

// post processing

const renderScene = new RenderPass( scene, camera );

const bloomComposer = bloom(renderScene, renderer);

const finalComposer = finalPass(renderScene, bloomComposer.renderTarget2.texture, renderer);

function tryResize(){
    if (renderer.width !== innerWidth || renderer.height !== innerHeight){
        renderer.setSize(innerWidth, innerHeight);
        camera.aspect = innerWidth/innerHeight;
        camera.updateProjectionMatrix();
        ctx.resolution.value.set(innerWidth, innerHeight)
        bloomComposer.setSize( innerWidth, innerHeight );
        finalComposer.setSize( innerWidth, innerHeight );
    }
}

requestAnimationFrame(function render(t) {

    tryResize()

    ctx.time.value = t/1000;

    interiorScene.animate(t)
    interiorScene.render(camera, renderer)

    ctx.emissivePass.value = 1;
    bloomComposer.render();
    ctx.emissivePass.value = 0;
    finalComposer.render();

    requestAnimationFrame(render);
});


