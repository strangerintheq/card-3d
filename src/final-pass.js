import {
    ShaderMaterial,
} from 'https://unpkg.com/three@0.121.1/build/three.module.js';

import { EffectComposer } from 'https://unpkg.com/three@0.121.1/examples/jsm/postprocessing/EffectComposer.js';
import { ShaderPass } from 'https://unpkg.com/three@0.121.1/examples/jsm/postprocessing/ShaderPass.js';


export function finalPass(src, bloomTexture, renderer){
    const finalPassMaterial = new ShaderMaterial( {
        uniforms: {
            baseTexture: {
                value: null
            },
            bloomTexture: {
                value: bloomTexture
            }
        },
        vertexShader: `

                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
                }

        `,
        fragmentShader: `

                uniform sampler2D baseTexture;
                uniform sampler2D bloomTexture;

                varying vec2 vUv;

                void main() {
                    gl_FragColor = 
                    texture2D( baseTexture, vUv ) 
                    + 
                    texture2D( bloomTexture, vUv ) 
                    ;
                }

        `
    } );

    const finalShaderPass = new ShaderPass(finalPassMaterial, "baseTexture");
    finalShaderPass.needsSwap = true;

    const finalComposer = new EffectComposer( renderer );
    finalComposer.addPass( src );
    finalComposer.addPass( finalShaderPass );

    return finalComposer;
}