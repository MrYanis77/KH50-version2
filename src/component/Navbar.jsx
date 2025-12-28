import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="navbar-container">
      <div className="navbar-wrapper">
        <button onClick={() => setOpen(!open)} className="navbar-button">
          ☰
        </button>
        {open && (
          <div className="navbar-menu">
            <a href="#">Accueil</a>
            <a href="#">Bibliothèque de ressource</a>
            <a href="/témoignage">Témoignage</a>
          </div>
        )}
      </div>
    </div>
  );
}