import { useGLTF } from '@react-three/drei'
import { useMemo, useState } from 'react'
import * as THREE from 'three'
import { useNavigate } from 'react-router-dom'
import useBookTexture from './useBookTexture'

export default function Livre({ data }) {
  const navigate = useNavigate()
  const { nodes } = useGLTF(`${import.meta.env.BASE_URL}models/livre.glb`)
  
  // Génération de la texture via le hook personnalisé
  const textureAvecTexte = useBookTexture(data)

  // Calcul du scale automatique pour que le livre rentre dans la scène
  const scale = useMemo(() => {
    if (!nodes.pCubeShape1_0) return 1
    const mesh = nodes.pCubeShape1_0
    mesh.geometry.computeBoundingBox()
    const size = new THREE.Vector3()
    mesh.geometry.boundingBox.getSize(size)
    const maxAxis = Math.max(size.x, size.y, size.z)
    return 2 / maxAxis
  }, [nodes])

  // Fonction de gestion du clic
  const handlePointerDown = (e) => {
    // Empêche le clic de traverser l'objet vers le fond
    e.stopPropagation()

    // Récupération des coordonnées UV du clic (entre 0 et 1)
    const uv = e.uv
    if (!uv) return

    // Conversion des UV en pixels sur le canvas (2048x2048)
    // Note : texture.flipY est true, donc on doit souvent inverser l'axe Y (1 - uv.y)
    const x = uv.x * 2048
    const y = (1 - uv.y) * 2048 

    // Paramètres identiques à ceux de useBookTexture pour la détection
    const startY = 1080
    const lineHeight = 45
    const listePersonnes = data?.people || []

    listePersonnes.forEach((personne, i) => {
      // Déterminer la position théorique du nom cliqué
      let targetX = i < 10 ? 900 : 1150
      let targetY = startY + (i % 10) * lineHeight

      // Vérification de la zone de clic (Hitbox)
      // On autorise une marge de 150px en largeur et 20px en hauteur
      if (
        Math.abs(x - targetX) < 150 && 
        Math.abs(y - targetY) < 22
      ) {
        console.log("Clic sur :", personne.nom_complet)
        navigate(`/profil/${personne.id}`)
      }
    })
  }

  if (!nodes.pCubeShape1_0) return null

  return (
    <group dispose={null}>
      <mesh
        geometry={nodes.pCubeShape1_0.geometry}
        scale={[scale, scale, scale]}
        rotation={[0, 0, 0]}
        onClick={handlePointerDown}
        // Change le curseur en "main" au survol
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'default')}
      >
        <meshStandardMaterial
          map={textureAvecTexte}
          side={THREE.DoubleSide}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
    </group>
  )
}

// Préchargement du modèle pour éviter les saccades
useGLTF.preload(`${import.meta.env.BASE_URL}models/livre.glb`)