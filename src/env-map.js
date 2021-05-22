import {
    PMREMGenerator,
    TextureLoader
} from 'https://unpkg.com/three@0.121.1/build/three.module.js';

const textureLoader = new TextureLoader();

export function envMap(url, renderer, callback) {

    const pmremGenerator = new PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    textureLoader.load('https://picsum.photos/1000/1000', (texture) => {
        callback( pmremGenerator.fromEquirectangular( texture ).texture);
    })

}
