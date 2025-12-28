import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Accueil from './pages/Accueil';
import Temoignage from './pages/temoignage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Accueil/>} />
        <Route path='/témoignage'  element={<Temoignage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;