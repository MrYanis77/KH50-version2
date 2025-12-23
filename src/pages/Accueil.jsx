import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Stupa from '../component/Stupa';

export default function Accueil() {
  return (
    <div className="accueil-container">
      <Canvas camera={{ position:  [0, 2, 20], fov: 45 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} />
        <Suspense fallback={null}>
          <Stupa />
        </Suspense>
      </Canvas>

      <button className="center-button">Accédez au mur</button>

    </div>
  );
}
