import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function fetchFromDirectus() {
    try {
        const response = await fetch("http://127.0.0.1:8055/items/victime");
        const result = await response.json();
        
        if (!result.data) throw new Error("Aucune donnée trouvée dans Directus");

        const bookData = {
            people: result.data.map((v) => ({
                id: v.id,
                nom_complet: `${v.prenom} ${v.nom}`,
                prenom: v.prenom,
                nom_de_famille: v.nom,
                age: v.age,
                date_de_naissance: v.date_naissance,
                lieu_de_naissance: v.lieu_naissance,
                lieu_de_deces: v.lieu_deces,
                histoire: v.histoire
            }))
        };

        const targetPath = path.resolve(__dirname, '../src/data/bookData.json');
        
        // Vérifie si le dossier src/data existe, sinon le crée
        if (!fs.existsSync(path.dirname(targetPath))) {
            fs.mkdirSync(path.dirname(targetPath), { recursive: true });
        }

        fs.writeFileSync(targetPath, JSON.stringify(bookData, null, 2));
        console.log("✅ bookData.json a été mis à jour avec les données de Directus !");
    } catch (error) {
        console.error("❌ Erreur lors de la synchronisation :", error.message);
    }
}

fetchFromDirectus();