import { useState } from "react";

export default function Temoignage() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    victimeNom: "",
    victimePrenom: "",
    victimeAge: "",
    victimeDateNaissance: "",
    victimeLieuNaissance: "",
    victimeLieuDeces: "",
    histoire: "",
  });

  // États conservés pour l'interface visuelle
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Gestion visuelle conservée
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      if (file.type.startsWith("image/")) {
        setPreviewUrl(URL.createObjectURL(file));
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      // 1. Envoi du témoignage (Le Témoin)
      const resTemoignage = await fetch("http://localhost:8055/items/temoignage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: formData.nom,
          prenom: formData.prenom,
          email: formData.email,
          telephone: formData.telephone,
          temoignage: `Récit de ${formData.victimePrenom} ${formData.victimeNom}`,
        }),
      });

      if (!resTemoignage.ok) throw new Error("Erreur lors de la création du témoin");
      const result = await resTemoignage.json();
      const temoignageId = result.data.id;

      // 2. Envoi de la victime liée (Sans implémentation média en DB)
      const resVictime = await fetch("http://localhost:8055/items/victime", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: formData.victimeNom,
          prenom: formData.victimePrenom,
          age: formData.victimeAge ? parseInt(formData.victimeAge) : null,
          date_naissance: formData.victimeDateNaissance || null,
          lieu_naissance: formData.victimeLieuNaissance,
          lieu_deces: formData.victimeLieuDeces,
          histoire: formData.histoire,
          temoignage_id: temoignageId, // L'ID récupéré du premier fetch
        }),
      })

      if (!resVictime.ok) throw new Error("Erreur lors de la création de la fiche victime");

      alert("Témoignage envoyé avec succès !");
      
      // Reset
      setFormData({
        nom: "", prenom: "", email: "", telephone: "",
        victimeNom: "", victimePrenom: "", victimeAge: "",
        victimeDateNaissance: "", victimeLieuNaissance: "",
        victimeLieuDeces: "", histoire: ""
      });
      setSelectedFile(null);
      setPreviewUrl(null);

    } catch (error) {
      alert("Erreur : " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="form-page-wrapper">
      <form className="double-form-container" onSubmit={handleSubmit}>
        <div className="form-columns">
          {/* TÉMOIN */}
          <div className="form-section">
            <h3>Vos Informations (Témoin)</h3>
            <div className="input-group">
              <label>Nom</label>
              <input type="text" name="nom" value={formData.nom} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>Prénom</label>
              <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>Téléphone</label>
              <input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} />
            </div>
          </div>

          {/* VICTIME */}
          <div className="form-section">
            <h3>Informations sur la Victime</h3>
            <div className="row">
              <div className="input-group">
                <label>Nom</label>
                <input type="text" name="victimeNom" value={formData.victimeNom} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>Prénom</label>
                <input type="text" name="victimePrenom" value={formData.victimePrenom} onChange={handleChange} required />
              </div>
            </div>
            <div className="row">
              <div className="input-group">
                <label>Âge</label>
                <input type="number" name="victimeAge" value={formData.victimeAge} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Date de naissance</label>
                <input type="date" name="victimeDateNaissance" value={formData.victimeDateNaissance} onChange={handleChange} />
              </div>
            </div>
            <div className="input-group">
              <label>Lieu de naissance</label>
              <input type="text" name="victimeLieuNaissance" value={formData.victimeLieuNaissance} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Lieu du décès</label>
              <input type="text" name="victimeLieuDeces" value={formData.victimeLieuDeces} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Son Histoire</label>
              <textarea name="histoire" rows="4" value={formData.histoire} onChange={handleChange} required />
            </div>
            
            {/* LA DIV EST CONSERVÉE MAIS SANS ENVOI DB */}
            <div className="media-upload-zone">
              <label>Preuve ou Document (Photo, Vidéo, PDF)</label>
              <input type="file" onChange={handleFileChange} accept="image/*,video/*,.pdf" style={{marginTop: '10px'}} />
              {previewUrl && (
                <div className="media-preview" style={{marginTop: '10px'}}>
                  <img src={previewUrl} alt="Aperçu" style={{ maxWidth: '100px', borderRadius: '4px', border: '1px solid #ddd' }} />
                </div>
              )}
            </div>
          </div>
        </div>

        <button type="submit" className="submit-btn" disabled={isUploading}>
          {isUploading ? "Envoi en cours..." : "Envoyer le témoignage"}
        </button>
      </form>
    </div>
  );
}