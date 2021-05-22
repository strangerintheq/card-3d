import {
    AmbientLight,
    DirectionalLight,
    DirectionalLightHelper
} from 'https://unpkg.com/three@0.121.1/build/three.module.js';

export function lights(target){
    const dl = new DirectionalLight('white', 0.8);
    dl.position.set(-1,0,0.5).normalize();
    target.add(dl);
    //scene.add(new DirectionalLightHelper(dl))
    const al = new AmbientLight('white', 0.3);
    target.add(al);
}
