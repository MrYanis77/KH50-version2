import { useState } from "react";

export default function Temoignage() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    temoignage: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8055/items/temoignage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer TON_TOKEN"
      },
      body: JSON.stringify(formData),
    });

      if (!response.ok) {
        throw new Error("Erreur lors de l’envoi");
      }

      alert("Témoignage envoyé avec succès !");
      setFormData({
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        temoignage: "",
      });
    } catch (error) {
      console.error(error);
      alert("Erreur serveur");
    }
  };

  return (
    <form className="temoignage-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nom">Nom :</label>
        <input
          type="text"
          id="nom"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="prenom">Prénom :</label>
        <input
          type="text"
          id="prenom"
          name="prenom"
          value={formData.prenom}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="email">Adresse e-mail :</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="telephone">Numéro de téléphone :</label>
        <input
          type="tel"
          id="telephone"
          name="telephone"
          value={formData.telephone}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="temoignage">Témoignage :</label>
        <textarea
          id="temoignage"
          name="temoignage"
          rows="4"
          value={formData.temoignage}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Envoyer</button>
    </form>
  );
}