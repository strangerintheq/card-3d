import {
    Mesh,
    BoxGeometry,
    MeshNormalMaterial,
    TorusKnotGeometry,
} from 'https://unpkg.com/three@0.121.1/build/three.module.js';

const box = new BoxGeometry(1, 1, 1);
const nm = new MeshNormalMaterial()

export function randomBoxes(target, count) {
    for (var i = 0; i < count; i++) {
        const mesh = new Mesh( box, nm );
        mesh.position.set(
            Math.random()*10-15,
            Math.random()*20-10,
            Math.random()*20-10
        );
        mesh.scale.set(
            Math.random(),
            Math.random(),
            Math.random()
        );
        mesh.rotation.set(
            Math.random()*7,
            Math.random()*7,
            Math.random()*7
        );
        target.add( mesh );
        mesh.i = i;
    }
}

export function torusKnot(target){
    const mesh = new Mesh( new TorusKnotGeometry(), nm );
    mesh.position.x = -0.2;
    mesh.rotation.y = -Math.PI/2;
    mesh.scale.setScalar(0.2)
    target.add( mesh );
    return mesh;
}