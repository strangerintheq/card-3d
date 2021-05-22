import {
    MeshStandardMaterial
} from 'https://unpkg.com/three@0.121.1/build/three.module.js';

export class PortalMaterial extends MeshStandardMaterial {


    constructor(ctx) {
        super({
            metalness: 0.5,
            roughness: 1
        })


        this.onBeforeCompile = (m) => {

            m.uniforms.resolution = ctx.resolution;
            m.uniforms.time = ctx.time;
            m.uniforms.emissivePass = ctx.emissivePass;
            m.uniforms.texture1 =  ctx.rtTexture


            const USE_UV = '#define USE_UV\n';
            m.vertexShader = USE_UV + m.vertexShader

            //console.log(m.vertexShader)

            m.fragmentShader = USE_UV + m.fragmentShader
                .split('#include <common>')
                .join( `
                    uniform float time;
                    uniform float emissivePass;
                    uniform sampler2D texture1;
                    uniform vec2 resolution;
                    
                    //varying vec2 vUv;
                    #include <common>
                `)
                .split('gl_FragColor = vec4( outgoingLight, diffuseColor.a );')
                .join(`
              
              
                float r = 4.9;
                
                float flow = 0.5+sin(time+vUv.y*33.)*0.01;
                float c = pow(abs(vUv.x-flow), r) + pow(abs(vUv.y-0.5), r);

                gl_FragColor = mix(
                    texture(texture1, gl_FragCoord.xy/resolution)*(1.-emissivePass),
                    vec4( outgoingLight, diffuseColor.a ),
                    smoothstep(0.022, 0.023, c) 
                );
              
            `)


            //console.log(m.fragmentShader)
        };


    }

}