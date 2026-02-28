import { useState } from 'react';
import { Link } from 'react-router-dom';
// Import du logo
import logoPath from '../assets/Logo_Fragments_Monument.png';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-4 md:p-6">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        
        {/* Logo à gauche */}
        <Link to="/" className="flex items-center transition-transform hover:scale-105">
          <img 
            src={logoPath} 
            alt="Logo Fragments Monument" 
            className="h-12 md:h-16 w-auto drop-shadow-md"
          />
        </Link>

        {/* Bloc Menu à droite */}
        <div className="relative flex flex-col items-end">
          <button 
            onClick={() => setOpen(!open)} 
            className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg border border-white/20 transition-all hover:bg-black active:scale-90"
            aria-label="Menu"
          >
            {open ? (
              <span className="text-xl font-bold">✕</span>
            ) : (
              <span className="text-2xl">☰</span>
            )}
          </button>

          {/* Menu déroulant */}
          {open && (
            <div className="absolute top-16 right-0 w-64 overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-5 duration-200">
              <div className="flex flex-col p-2">
                <Link 
                  to="/" 
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-indigo-600 transition-colors"
                >
                  📚 Bibliothèque de ressources
                </Link>
                <Link 
                  to="/temoignage" 
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-indigo-600 transition-colors"
                >
                  💬 Témoignages
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}