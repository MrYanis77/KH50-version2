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

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (success) {
      alert("Dossier complet enregistré !");
      setFormData({
        nom: "", prenom: "", email: "", telephone: "",
        victimeNom: "", victimePrenom: "", victimeDateNaissance: "",
        victimeLieuNaissance: "", victimeLieuVie: "", histoire: ""
      });
      setSelectedFile(null);
      setPreviewUrl(null);
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file); // On garde le fichier brut
      if (file.type.startsWith("image/")) {
        setPreviewUrl(URL.createObjectURL(file));
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Fichier prêt à être envoyé :", selectedFile); // Doit afficher un objet 'File'
    dispatch(submitTemoignage({ formData, selectedFile }));
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
            
            <div className="media-upload-zone">
              <label>Document justificatif</label>
              <input type="file" onChange={handleFileChange} accept="image/*,video/*,.pdf" />
              {previewUrl && <img src={previewUrl} alt="Aperçu" style={{ width: '80px', marginTop: '10px', borderRadius: '4px' }} />}
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