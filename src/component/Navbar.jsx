import { useState } from 'react';
import { Link } from 'react-router-dom';

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
            <Link to="/" onClick={() => setOpen(false)}>Accueil</Link>
            <Link to="/" onClick={() => setOpen(false)}>Bibliothèque de ressource</Link>
            <Link to="/temoignage" onClick={() => setOpen(false)}>Témoignage</Link>
          </div>
        )}
      </div>
    </div>
  );
}
