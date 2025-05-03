import HomePage from './Pages/Home_page';
import './App.css';
import { Routes, Route } from "react-router-dom";
import About from './Pages/about';
import Contacts from './Pages/contacts';
import Help from './Pages/help';
import Privacy from './Pages/privacy';
import Terms from './Pages/terms';
import AccountPage from './Pages/Account_page'; // исправили название
import AuthPage from './Pages/AuthPage';
import ConstructorPage from './Pages/ConstructorPage';
import CoursePage from './Pages/CoursePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/help" element={<Help />} />
      <Route path="/about" element={<About />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/constructor" element={<ConstructorPage />} /> 
      <Route path="/courses/:courseId" element={<CoursePage />} />
    </Routes>
  );
}

export default App;
