import { useParams, useNavigate } from 'react-router-dom';
import jsonData from "../data/bookData.json";

export default function Profil() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const personne = jsonData.people.find(p => p.id === parseInt(id));

  if (!personne) {
    return <div className="error-message">Personne non trouvée</div>;
  }

  return (
    <div className="profil-container">
      
      {/* Barre d'actions */}
      <div className="action-bar">
        <button className="btn-back" onClick={() => navigate(-1)}>
          ← Retour au mur
        </button>
      </div>

      <h1 className="profil-title">
        {personne.prenom} {personne.nom_de_famille}
      </h1>

      <section>
        <h2>État Civil :</h2>
        <div className="civil-info">
          <p><strong>Prénom :</strong> {personne.prenom}</p>
          <p><strong>Nom de famille :</strong> {personne.nom_de_famille}</p>
          <p><strong>Âge :</strong> {personne.age} ans</p>
          <p><strong>Né le :</strong> {personne.date_de_naissance} à {personne.lieu_de_naissance}</p>
          <p><strong>Décédé à :</strong> {personne.lieu_de_deces}</p>
        </div>
      </section>

      <hr className="separator" />

      <section>
        <h2>Biographie</h2>
        <p className="bio-text">
          {personne.histoire}
        </p>
      </section>

      <hr className="separator" />

      <section>
        <h2>Média</h2>
        <div className="media-grid">
          <div>
            <h3>Vidéo</h3>
            <p className="placeholder-text">En cours...</p>
          </div>
          <div>
            <h3>Documents</h3>
            <p className="placeholder-text">En cours...</p>
          </div>
        </div>
      </section>
    </div>
  );
}