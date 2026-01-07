import { Canvas } from "@react-three/fiber" // ✅ AJOUTÉ
import { Suspense } from "react"
import Livre from "../component/Livre.jsx"
import { bookData } from "../data/bookData"

export default function Mur() {
  return (
    <div className="mur-container">
      <Canvas camera={{ position: [0, 3, 0], fov: 45 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} />

        <Suspense fallback={null}>
          <Livre 
            leftNames={bookData.leftPage} 
            rightNames={bookData.rightPage} 
          />
        </Suspense>
      </Canvas>
    </div>
  )
}