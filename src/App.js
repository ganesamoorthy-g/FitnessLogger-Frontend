
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import './App.css';

import LoginSignupPage from './components/LoginSignupPage';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Home from './components/Home';
import Allexcercisepage from './components/Allexcercisepage';
import Cardio from './Pages/Cardio';
import Aerobic from './Pages/Aerobic';
import Resistance from './Pages/Resistance';
import History from './Pages/History';
import SingleExercise from "./Pages/SingleExercise";
import ErrorPage from './Pages/ErrorPage';


function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login/*" element={<LoginSignupPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/allexcercisepage" element={<Allexcercisepage />} />
          <Route path="/exercise/aerobic" element={<Aerobic />} />
          <Route path="/exercise/cardio" element={<Cardio />} />
          <Route path="/exercise/resistance" element={<Resistance />} />
          <Route path="/history" element={<History />} />
          <Route path="/history/:type/:id" element={<SingleExercise />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<Navigate to="/error" />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
