import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitTemoignage, resetStatus } from "../data/temoignageSlice";

export default function Temoignage() {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.temoignage);

  const [formData, setFormData] = useState({
    nom: "", prenom: "", email: "", telephone: "",
    victimeNom: "", victimePrenom: "", victimeDateNaissance: "",
    victimeLieuNaissance: "", victimeLieuVie: "", histoire: "",
  });

  // État pour gérer plusieurs fichiers : [{ file: File, preview: string }]
  const [mediaList, setMediaList] = useState([]);

  useEffect(() => {
    if (success) {
      alert("Dossier complet enregistré !");
      setFormData({
        nom: "", prenom: "", email: "", telephone: "",
        victimeNom: "", victimePrenom: "", victimeDateNaissance: "",
        victimeLieuNaissance: "", victimeLieuVie: "", histoire: ""
      });
      setMediaList([]);
      dispatch(resetStatus());
    }
    if (error) {
      alert("Erreur : " + error);
      dispatch(resetStatus());
    }
  }, [success, error, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Ajouter un nouveau média
  const handleAddMedia = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newMedia = {
        file: file,
        preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null
      };
      setMediaList([...mediaList, newMedia]);
      e.target.value = null; // Reset l'input pour pouvoir reprendre le même fichier si besoin
    }
  };

  // Supprimer un média par index
  const handleRemoveMedia = (index) => {
    const newList = [...mediaList];
    // Libérer la mémoire de l'URL d'aperçu
    if (newList[index].preview) URL.revokeObjectURL(newList[index].preview);
    newList.splice(index, 1);
    setMediaList(newList);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // On extrait uniquement les fichiers bruts pour l'envoi
    const filesToSend = mediaList.map(m => m.file);
    dispatch(submitTemoignage({ formData, selectedFiles: filesToSend }));
  };

  return (
    <div className="form-page-wrapper">
      <form className="double-form-container" onSubmit={handleSubmit}>
        <div className="form-columns">
          
          <div className="form-section">
            <h3>Vos Informations (Témoin)</h3>
            <input type="text" name="nom" placeholder="Nom" value={formData.nom} onChange={handleChange} required />
            <input type="text" name="prenom" placeholder="Prénom" value={formData.prenom} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input type="tel" name="telephone" placeholder="Téléphone" value={formData.telephone} onChange={handleChange} />
          </div>

          <div className="form-section">
            <h3>Informations sur la Victime</h3>
            <input type="text" name="victimeNom" placeholder="Nom" value={formData.victimeNom} onChange={handleChange} required />
            <input type="text" name="victimePrenom" placeholder="Prénom" value={formData.victimePrenom} onChange={handleChange} required />
            
            <label>Date de naissance</label>
            <input type="date" name="victimeDateNaissance" value={formData.victimeDateNaissance} onChange={handleChange} />
            
            <input type="text" name="victimeLieuNaissance" placeholder="Lieu de naissance" value={formData.victimeLieuNaissance} onChange={handleChange} />
            <input type="text" name="victimeLieuVie" placeholder="Lieu de vie" value={formData.victimeLieuVie} onChange={handleChange} />
            
            <textarea name="histoire" placeholder="Son histoire..." rows="4" value={formData.histoire} onChange={handleChange} required />
            
            <div className="media-upload-section">
              <label>Documents et Médias</label>
              
              {/* Liste des médias ajoutés */}
              <div className="media-grid">
                {mediaList.map((media, index) => (
                  <div key={index} className="media-item">
                    {media.preview ? (
                      <img src={media.preview} alt="Aperçu" />
                    ) : (
                      <div className="file-icon">📄</div>
                    )}
                    <button type="button" className="remove-btn" onClick={() => handleRemoveMedia(index)}>−</button>
                  </div>
                ))}
                
                {/* Bouton Plus (+) */}
                <label className="add-media-btn">
                  +
                  <input type="file" onChange={handleAddMedia} accept="image/*,video/*,.pdf" hidden />
                </label>
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Enregistrement en cours..." : "Envoyer le dossier"}
        </button>
      </form>
    </div>
  );
}