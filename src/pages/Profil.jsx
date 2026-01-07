import { useParams, useNavigate } from 'react-router-dom';
import jsonData from "../data/bookData.json";

export default function Profil() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // On cherche la personne dans les données JSON
  const personne = jsonData.people.find(p => p.id === parseInt(id));

  if (!personne) return <div style={{ color: 'white', padding: '50px' }}>Personne non trouvée</div>;

  return (
    <div style={{ padding: '50px', color: 'white', background: '#1a1a1a', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Barre d'actions */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <button 
          onClick={() => navigate(-1)}
          style={{ padding: '10px 20px', cursor: 'pointer', borderRadius: '5px', border: 'none', background: '#444', color: 'white' }}
        >
          ← Retour au mur
        </button>

        <button 
          onClick={() => navigate(`/Modifier/${id}`)}
          style={{ padding: '10px 20px', cursor: 'pointer', borderRadius: '5px', border: 'none', background: '#007bff', color: 'white', fontWeight: 'bold' }}
        >
          ✎ Éditer la fiche
        </button>
      </div>

      <h1 style={{ color: '#e0e0e0', borderBottom: '1px solid #444', paddingBottom: '10px' }}>
        {personne.prenom} {personne.nom_de_famille}
      </h1>

      <section>
        <h2>État Civil :</h2>
        <div style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
          <p><strong>Prénom :</strong> {personne.prenom}</p>
          <p><strong>Nom de famille :</strong> {personne.nom_de_famille}</p>
          <p><strong>Âge :</strong> {personne.age} ans</p>
          <p><strong>Né le :</strong> {personne.date_de_naissance} à {personne.lieu_de_naissance}</p>
          <p><strong>Décédé à :</strong> {personne.lieu_de_deces}</p>
        </div>
      </section>

      <hr style={{ margin: '40px 0', borderColor: '#333' }} />

      <section>
        <h2>Biographie</h2>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: '#ccc', fontStyle: 'italic' }}>
          {personne.histoire}
        </p>
      </section>

      <hr style={{ margin: '40px 0', borderColor: '#333' }} />

      <section>
        <h2>Média</h2>
        <div style={{ display: 'flex', gap: '50px' }}>
          <div>
            <h3>Vidéo</h3>
            <p style={{ color: '#888' }}>En cours...</p>
          </div>
          <div>
            <h3>Documents</h3>
            <p style={{ color: '#888' }}>En cours...</p>
          </div>
        </div>
      </section>
    </div>
  );
}