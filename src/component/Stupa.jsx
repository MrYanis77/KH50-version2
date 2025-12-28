import { useGLTF } from '@react-three/drei'
import { useEffect } from 'react'
import * as THREE from 'three'

export default function Stupa() {
  const { scene } = useGLTF('public\models\stupa.glb')

  useEffect(() => {
    // Centre le modèle
    const box = new THREE.Box3().setFromObject(scene)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())

    scene.position.sub(center)

    // Échelle automatique
    const maxAxis = Math.max(size.x, size.y, size.z)
    scene.scale.setScalar(2 / maxAxis)
  }, [scene])

  return <primitive object={scene} />
}

useGLTF.preload('/stupa.glb')
