import { Object3DNode, extend } from '@react-three/fiber';
import { LumaSplatsThree, LumaSplatsSemantics } from "@lumaai/luma-web";

// Make LumaSplatsThree available to R3F
extend( { LumaSplats: LumaSplatsThree } );

// For typeScript support:
declare module '@react-three/fiber' {
  interface ThreeElements {
    lumaSplats: Object3DNode<LumaSplatsThree, typeof LumaSplatsThree>
  }
}

function Scene() {
	return <lumaSplats
		// semanticsMask={LumaSplatsSemantics.FOREGROUND}
		source='https://lumalabs.ai/capture/09e9f5a0-b9d3-492b-b35d-48bc026449e9'
		position={[-1, 0, 0]}
        rotation={[-0.5, 0, 0]}
		scale={3}
	/>
}

export default Scene