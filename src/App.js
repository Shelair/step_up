import HomePage from './Pages/Home_page';
import './App.css';
import { Routes, Route } from "react-router-dom";
import GermanPage from './Pages/GermanPage';
import KoreanPage from './Pages/KoreanPage';
import About from './Pages/about';
import Contacts from './Pages/contacts';
import Help from './Pages/help';
import Privacy from './Pages/privacy';
import Terms from './Pages/terms';
import Account_page from './Pages/Account_page';
import AuthPage from './Pages/AuthPage';
import ConstructorPage from './Pages/ConstructorPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/courses/немецкий" element={<GermanPage />} />
      <Route path="/courses/корейский" element={<KoreanPage />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/help" element={<Help />} />
      <Route path="/about" element={<About />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/account" element={<Account_page/>} />
      <Route path="/constructor" element={<ConstructorPage />} /> 
    </Routes>
  );
}

export default App;
