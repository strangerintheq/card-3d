import {Vector2,} from 'https://unpkg.com/three@0.121.1/build/three.module.js';
import { EffectComposer } from 'https://unpkg.com/three@0.121.1/examples/jsm/postprocessing/EffectComposer.js';
import { UnrealBloomPass } from 'https://unpkg.com/three@0.121.1/examples/jsm/postprocessing/UnrealBloomPass.js';

export function bloom(src, renderer){
    const bloomPass = new UnrealBloomPass(
        new Vector2( innerWidth, innerHeight ),
        1.5, 0.4, 0.85
    );
    bloomPass.threshold = 0.3;
    bloomPass.strength = 1.0;
    bloomPass.radius = 0.1;

    const bloomComposer = new EffectComposer( renderer );
    bloomComposer.renderToScreen = false;
    bloomComposer.addPass( src );
    bloomComposer.addPass( bloomPass );

    return bloomComposer
}