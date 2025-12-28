import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Accueil from './pages/Accueil';
import Temoignage from './pages/temoignage';

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/temoignage" element={<Temoignage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;