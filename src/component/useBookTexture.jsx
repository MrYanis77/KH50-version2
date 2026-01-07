import { useMemo } from 'react'
import * as THREE from 'three'

export default function useBookTexture(leftNames,rightNames) {
  return useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 2048
    canvas.height = 2048
    const ctx = canvas.getContext('2d')

    // 1. Fond beige
    ctx.fillStyle = '#f5f5dc'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // 2. Zone des pages (légèrement ajustée pour la marge)
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(512, 512, 512, 1024)   
    ctx.fillRect(1024, 512, 512, 1024)  

    // 3. Style du texte
    ctx.fillStyle = '#000'
    // On réduit la taille à 28px pour être sûr que les noms longs rentrent
    ctx.font = 'bold 15px Arial' 
    ctx.textAlign = 'center'

    // 4. Positionnement Vertical (On descend le texte)
    // startY était à 600, on le descend à 800 pour qu'il soit bien au milieu du livre
    const startY = 1080 
    const lineHeight = 45 

    // 5. Positionnement Horizontal (On serre vers l'intérieur)
    // Page Gauche : on vise le milieu du rectangle 512-1024 (soit 768)
    // On ajoute un petit décalage pour s'éloigner du bord gauche coupé
    leftNames.forEach((name, i) => {
      ctx.fillText(name, 900, startY + i * lineHeight)
    })

    // Page Droite : on vise le milieu du rectangle 1024-1536 (soit 1280)
    // On réduit un peu pour s'éloigner du bord droit coupé
    rightNames.forEach((name, i) => {
      ctx.fillText(name, 1150, startY + i * lineHeight)
    })

    const texture = new THREE.CanvasTexture(canvas)
    texture.flipY = true 
    return texture
  }, [])
}