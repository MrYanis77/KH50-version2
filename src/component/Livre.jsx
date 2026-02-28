import { useGLTF, useAnimations, Center } from '@react-three/drei'
import { useEffect, useLayoutEffect } from 'react'
import * as THREE from 'three'

export default function Livre({ play }) {
  const { scene, animations } = useGLTF(`${import.meta.env.BASE_URL}models/livre.glb`)
  const { actions, names } = useAnimations(animations, scene)

  // Correction des faces : on rend le matériau visible des deux côtés
  useLayoutEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.material.side = THREE.DoubleSide // <--- C'est cette ligne qui corrige le noir
      }
    })
  }, [scene])

  useEffect(() => {
    if (play && actions && animations.length > 0) {
      const action = actions[names[0]]
      if (action) {
        action.reset().setLoop(THREE.LoopOnce).play()
        action.clampWhenFinished = true
      }
    }
  }, [play, actions, names, animations])

  return (
    <Center>
      <primitive object={scene} />
    </Center>
  )
}