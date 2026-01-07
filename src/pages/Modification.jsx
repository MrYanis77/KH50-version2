import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import jsonData from "../data/bookData.json";

export default function Modification() {
  const { id } = useParams();
  const navigate = useNavigate();
  const victimeActuelle = jsonData.people.find(p => String(p.id) === String(id));

  const [formData, setFormData] = useState({
    prenom: "", nom_de_famille: "", age: "",
    date_de_naissance: "", lieu_de_naissance: "",
    lieu_de_deces: "", histoire: ""
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (victimeActuelle) {
      setFormData({
        prenom: victimeActuelle.prenom || "",
        nom_de_famille: victimeActuelle.nom_de_famille || "",
        age: victimeActuelle.age || "",
        date_de_naissance: victimeActuelle.date_de_naissance || "",
        lieu_de_naissance: victimeActuelle.lieu_de_naissance || "",
        lieu_de_deces: victimeActuelle.lieu_de_deces || "",
        histoire: victimeActuelle.histoire || ""
      });
    }
  }, [victimeActuelle]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      if (file.type.startsWith('image/')) {
        setPreviewUrl(URL.createObjectURL(file));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      let uploadedFileId = null;
      if (selectedFile) {
        const filePayload = new FormData();
        filePayload.append('file', selectedFile);
        const fileRes = await fetch("http://127.0.0.1:8055/files", { method: "POST", body: filePayload });
        const fileResult = await fileRes.json();
        uploadedFileId = fileResult.data.id;
      }

      await fetch("http://127.0.0.1:8055/items/propositions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          victime_id: id,
          donnees_proposees: { ...formData, media_id: uploadedFileId },
          statut: "en_attente"
        }),
      });

      alert("Proposition envoyée !");
      navigate(`/profil/${id}`);
    } catch (error) {
      alert("Erreur : " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  if (!victimeActuelle) return <div className="modifier-container">Chargement...</div>;

  return (
    <div className="modifier-container">
      <button className="btn-cancel-light" onClick={() => navigate(-1)}>
        ← Annuler
      </button>

      <form className="modifier-form" onSubmit={handleSubmit}>
        <h2>Modifier la fiche de {victimeActuelle.prenom}</h2>
        
        <div className="form-group">
          <label>Prénom</label>
          <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Nom de famille</label>
          <input type="text" name="nom_de_famille" value={formData.nom_de_famille} onChange={handleChange} />
        </div>

        <div className="row">
          <div className="form-group">
            <label>Âge</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Date de naissance</label>
            <input type="date" name="date_de_naissance" value={formData.date_de_naissance} onChange={handleChange} />
          </div>
        </div>

        <div className="form-group">
          <label>Lieu de naissance</label>
          <input type="text" name="lieu_de_naissance" value={formData.lieu_de_naissance} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Lieu du décès</label>
          <input type="text" name="lieu_de_deces" value={formData.lieu_de_deces} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Histoire / Biographie</label>
          <textarea name="histoire" rows="6" value={formData.histoire} onChange={handleChange} />
        </div>

        <div className="media-upload-zone">
          <label>Ajouter une Photo, Vidéo ou Document</label>
          <input type="file" onChange={handleFileChange} accept="image/*,video/*,.pdf" />
          {previewUrl && (
            <div className="media-preview">
              <img src={previewUrl} alt="Aperçu" style={{ maxWidth: '100px' }} />
            </div>
          )}
        </div>

        <button type="submit" className="btn-save" disabled={isUploading}>
          {isUploading ? "Envoi..." : "Soumettre la proposition"}
        </button>
      </form>
    </div>
  );
}