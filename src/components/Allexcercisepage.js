import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomNavbar from './CustomNavbar';
import Footer from '../Pages/Footer';
import cardioIcon from '../images/cardio.png';
import resistanceIcon from '../images/resistance.png';
import aerobicIcon from '../images/aerobic.png';

function Allexcercisepage() {
  const navigate = useNavigate();

  return (
    <div>
      <CustomNavbar />

      <div className="exercise d-flex flex-column align-items-center">
        <h2 className='title'>Add Exercise</h2>
        <div className="d-flex justify-content-center"> {/* Use flexbox for horizontal alignment */}
        <div className="mx-3">
            <button className='aerobic-btn d-flex flex-column align-items-center justify-content-center' onClick={() => navigate("/exercise/aerobic")}>
              <img alt="aerobic" src={aerobicIcon} className="exercise-icon" />
              Aerobic
            </button>
          </div>
          <div className="mx-3">
            <button className='cardio-btn d-flex flex-column align-items-center justify-content-center' onClick={() => navigate("/exercise/cardio")}>
              <img alt="cardio" src={cardioIcon} className="exercise-icon" />
              Cardio
            </button>
          </div>
          <div className="mx-3">
            <button className='resistance-btn d-flex flex-column align-items-center justify-content-center' onClick={() => navigate("/exercise/resistance")}>
              <img alt="resistance" src={resistanceIcon} className="exercise-icon" />
              Resistance
            </button>
          </div>
          {/* Add more buttons/icons as needed */}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Allexcercisepage;
