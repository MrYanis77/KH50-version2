import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import Livre from "../component/Livre.jsx"
import jsonData from "../data/bookData.json" // Import direct du JSON

export default function Mur() {
  return (
    <div className="mur-container" style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 3, 0], fov: 45 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} />

        <Suspense fallback={null}>
          {/* On passe l'objet JSON complet au composant Livre */}
          <Livre data={jsonData} />
        </Suspense>
      </Canvas>
    </div>
  )
}