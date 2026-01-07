import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import Stupa from '../component/Stupa';

export default function Accueil() {
  const navigate = useNavigate();

  return (
    <div className="accueil-container">
      <Canvas camera={{ position: [0, 2, 20], fov: 45 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} />
        <Suspense fallback={null}>
          <Stupa />
        </Suspense>
      </Canvas>

      <button
        className="center-button"
        onClick={() => navigate('/mur')}
      >
        Accédez au mur
      </button>
    </div>
  );
}