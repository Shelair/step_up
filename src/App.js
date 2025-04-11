import HomePage from './Pages/Home_page';
import './App.css';
import { Routes, Route } from "react-router-dom";
import GermanPage from './Pages/GermanPage';
import KoreanPage from './Pages/KoreanPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/courses/немецкий" element={<GermanPage />} />
      <Route path="/courses/корейский" element={<KoreanPage />} />
    </Routes>
  );
}

export default App;
