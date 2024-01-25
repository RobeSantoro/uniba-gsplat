import { useRef, useEffect } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { Mesh, Object3D } from 'three';
import { GLTFLoader } from 'three-stdlib';
import { LumaSplatsThree } from "@lumaai/luma-web";
import { EnvironmentProbes } from "./utils/EnvironmentProbes"; // Make sure this path is correct

const DemoLighting = () => {
  const { scene, gl, camera } = useThree();

  // Reference to the UFO mesh
  const ufoMeshRef = useRef<Object3D | null>(null);

  // Loading the luma splats
  useEffect(() => {
    const splats = new LumaSplatsThree({
      source: 'https://lumalabs.ai/capture/09e9f5a0-b9d3-492b-b35d-48bc026449e9',
      loadingAnimationEnabled: false,
    });

    splats.onLoad = () => {
      splats.captureCubemap(gl).then(capturedTexture => {
        scene.environment = capturedTexture;
        scene.background = capturedTexture;
        scene.backgroundBlurriness = 0.5;
      });
    };

    scene.add(splats);

    splats.onInitialCameraTransform = transform => {
      camera.matrix.copy(transform);
      camera.matrix.decompose(camera.position, camera.quaternion, camera.scale);
      camera.position.y = 0.25;
    };

    // Clean up on component unmount
    return () => {
      splats.dispose();
      scene.remove(splats);
    };
  }, [scene, camera, gl]);

  // GLTF model loading
  const gltf = useLoader(GLTFLoader, '/assets/models/ufo_b11_d_model.glb');

  useEffect(() => {
    const ufo = gltf.scene;
    ufo.scale.setScalar((1/100) * 0.2);
    ufo.scale.y *= 0.75;
    ufo.position.set(-0.8, 0.5, 0);
    scene.add(ufo);

    // make shiny metal
    ufo.traverse((child) => {
      if (child instanceof Mesh) {
        child.material.metalness = 1.0;
        child.material.roughness = 0.0;
      }
    });

    // Reference for animation
    ufoMeshRef.current = ufo;

    // Clean up on component unmount
    return () => {
      scene.remove(ufo);
    };
  }, [gltf, scene]);

  // Probe creation
  useEffect(() => {
    const probes = new EnvironmentProbes();
    probes.position.x = 2.5;
    scene.add(probes);
    return () => {
      scene.remove(probes);
    };
  }, [scene]);

  // UFO animation
  useFrame(() => {
    if (ufoMeshRef.current) {
      const t_s = performance.now() / 1000;
      ufoMeshRef.current.position.y = Math.sin(t_s * 0.25) * 0.05 + 0.5;
    }
  });

  return null; // as this component does not render anything itself
};

export default DemoLighting;