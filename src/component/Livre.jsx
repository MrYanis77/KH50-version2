import { useGLTF } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
import useBookTexture from './useBookTexture'

// ... (imports identiques)

export default function Livre({ leftNames, rightNames }) {
  const { nodes } = useGLTF(`${import.meta.env.BASE_URL}models/livre.glb`)
  const textureAvecTexte = useBookTexture(leftNames, rightNames)

  const scale = useMemo(() => {
    if (!nodes.pCubeShape1_0) return 1
    const mesh = nodes.pCubeShape1_0
    mesh.geometry.computeBoundingBox()
    const size = new THREE.Vector3()
    mesh.geometry.boundingBox.getSize(size)
    const maxAxis = Math.max(size.x, size.y, size.z)
    return 2 / maxAxis
  }, [nodes])

  if (!nodes.pCubeShape1_0) return null

  return (
    <group dispose={null}>
      <mesh
        geometry={nodes.pCubeShape1_0.geometry}
        scale={scale}
        rotation={[0, 0, 0]} // ◀️ Changé : on enlève Math.PI
      >
        <meshStandardMaterial
          map={textureAvecTexte}
          side={THREE.DoubleSide}
          roughness={0.8}
        />
      </mesh>
    </group>
  )
}

useGLTF.preload(`${import.meta.env.BASE_URL}models/livre.glb`)
