import { useMemo } from 'react'
import * as THREE from 'three'

export default function useBookTexture(data) {
  return useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 2048
    canvas.height = 2048
    const ctx = canvas.getContext('2d')

    // 1. Fond et Pages
    ctx.fillStyle = '#f5f5dc' // Couleur du livre
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    ctx.fillStyle = '#ffffff' // Pages blanches
    ctx.fillRect(512, 512, 512, 1024)   
    ctx.fillRect(1024, 512, 512, 1024)  

    // 2. Style du texte
    ctx.fillStyle = '#000'
    ctx.font = 'bold 15px Arial' 
    ctx.textAlign = 'center'

    // Paramètres de positionnement
    const startY = 1080
    const lineHeight = 45 

    // 3. Adaptation au JSON (Extraction des noms)
    // On vérifie si data.people existe, sinon on prend un tableau vide
    const listePersonnes = data?.people || []

    // Distribution des 20 noms
    listePersonnes.forEach((personne, i) => {
      // Les 10 premiers (index 0 à 9) vont à gauche
      if (i < 10) {
        ctx.fillText(personne.nom_complet, 900, startY + i * lineHeight)
      } 
      // Les 10 suivants (index 10 à 19) vont à droite
      else if (i < 20) {
        ctx.fillText(personne.nom_complet, 1150, startY + (i - 10) * lineHeight)
      }
    })

    const texture = new THREE.CanvasTexture(canvas)
    texture.flipY = true 
    texture.needsUpdate = true // Force la mise à jour de la texture
    return texture
  }, [data]) // Re-génère la texture si data change
}