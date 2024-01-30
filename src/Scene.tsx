import { Object3DNode, extend, useThree } from '@react-three/fiber';
import { LumaSplatsThree } from "@lumaai/luma-web";
import React, { Suspense, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { MeshStandardMaterial, Mesh } from 'three';

// Make LumaSplatsThree available to R3F
extend({ LumaSplats: LumaSplatsThree });

// For typeScript support:
declare module '@react-three/fiber' {
    interface ThreeElements {
        lumaSplats: Object3DNode<LumaSplatsThree, typeof LumaSplatsThree>
    }
}

function Scene() {

    const { scene: ufo } = useGLTF('/assets/models/ufo_b11_d_model.glb', false)

    useMemo(() => {
        ufo.traverse((obj) => {
          if ((obj as any).isMesh) {
            const mesh = obj as Mesh;
            if (Array.isArray(mesh.material)) {
              // If it's an array of materials, iterate through it
              mesh.material.forEach((material) => {
                if (material instanceof MeshStandardMaterial) {
                  material.metalness = 1.0;
                  material.roughness = 0.0;
                  material.envMapIntensity = 1.0;
                }
              });
            } else if (mesh.material instanceof MeshStandardMaterial) {
              // If it's a single material and it's MeshStandardMaterial, change its properties
              mesh.material.metalness = 1.0;
              mesh.material.roughness = 0.0;
              mesh.material.envMapIntensity = 1.0;
            }
          }
        });
      }, [ufo]);

    const splats = React.useRef<LumaSplatsThree>(null);
    const { scene, camera, gl } = useThree();  

    return (
        <>
            <Suspense fallback={null}>

                <lumaSplats
                    ref={splats}
                    source='https://lumalabs.ai/capture/09e9f5a0-b9d3-492b-b35d-48bc026449e9'
                    loadingAnimationEnabled={false}
                    particleRevealEnabled={true}
                    position={[-2, 5.7, -0.5]}
                    rotation={[-0.05, 0.21, 0.1]}
                    scale={3}
                    onLoad={(splats) => {
                        splats.captureCubemap(gl).then(capturedTexture => {
                            scene.environment = capturedTexture;
                            scene.background = capturedTexture;
                            scene.backgroundBlurriness = 0.5;
                        });
                    }}
                    onInitialCameraTransform={transform => {
                        camera.matrix.copy(transform);
                        camera.matrix.decompose(camera.position, camera.quaternion, camera.scale);
                        camera.position.y = 0.25;
                    }}
                />

                <primitive object={ufo} scale={0.01} position={[-1, 2, 2]} dispose={null} />
            </Suspense>
        </>
    );
}

export default Scene