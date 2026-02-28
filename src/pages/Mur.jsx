import { Canvas } from "@react-three/fiber"
import { Suspense, useState } from "react"
import { OrbitControls } from "@react-three/drei"
import Livre from "../component/Livre.jsx"

export default function Mur() {
  const [play, setPlay] = useState(false)
  
  // Gestion du recul pour le responsive
  const width = window.innerWidth
  const distanceZ = width < 768 ? 15 : 10 // Plus loin sur mobile

  return (
    <div className="mur-container" style={{ position: 'relative'}}>
      
      {!play && (
        <button 
          onClick={() => setPlay(true)}
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 100,
            padding: '12px 24px',
            cursor: 'pointer',
            borderRadius: '8px',
            border: 'none',
            background: 'white',
            fontWeight: 'bold'
          }}
        >
          Lancer l'animation
        </button>
      )}

      <Canvas camera={{ position: [0, 8, distanceZ], fov: 35 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 10, 5]} intensity={2} />
        
        <Suspense fallback={null}>
          {/* On réduit le scale à 1 pour éviter que le livre ne sorte de l'écran */}
          <group scale={1}>
            <Livre play={play} />
          </group>
        </Suspense>

        <OrbitControls makeDefault />
      </Canvas>
    </div>
  )
}