import HomePage from './Pages/Home_page';
import './App.css';
import { Routes, Route } from "react-router-dom";
import GermanPage from './Pages/GermanPage';
import KoreanPage from './Pages/KoreanPage';
import About from './Pages/About';
import Contacts from './Pages/Contacts';
import Help from './Pages/Help';
import Privacy from './Pages/Privacy';
import Terms from './Pages/Terms';
import Account_page from './Pages/Account_page';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/courses/немецкий" element={<GermanPage />} />
      <Route path="/courses/корейский" element={<KoreanPage />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/help" element={<Help />} />
      <Route path="/about" element={<About />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/account" element={<Account_page/>} />
    </Routes>
  );
}

export default App;
