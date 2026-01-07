import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Accueil from './pages/Accueil';
import Temoignage from './pages/temoignage';
import Mur from './pages/Mur';
import Profil from './pages/Profil';

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/temoignage" element={<Temoignage />} />
        <Route path="/Mur" element={<Mur />} />
        <Route path="/profil/:id" element={<Profil />} />
      </Routes>
    </HashRouter>
  );
}

export default App;