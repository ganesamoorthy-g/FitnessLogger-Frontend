import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import cardioIcon from '../images/cardio.png';
import axios from 'axios';
import CustomNavbar from '../components/CustomNavbar';

const Cardio = () => {
  const [cardioForm, setCardioForm] = useState({
    name: '',
    distance: '',
    duration: '',
    date: new Date(),
  });
  const [message, setMessage] = useState('');

  const handleCardioChange = (event) => {
    const { name, value } = event.target;
    setCardioForm({ ...cardioForm, [name]: value });
  };

  const handleDateChange = (date) => {
    setCardioForm({ ...cardioForm, date });
  };

  const validateForm = (form) => {
    return form.name && form.distance && form.duration && form.date;
  };

  const handleCardioSubmit = async (event) => {
    event.preventDefault();

    // Replace 'userId' with the actual authenticated user's ID
    const userId = '64fe0a11da47448417790b1c';

    const dataToSend = {
      ...cardioForm,
      userId: userId,
    };

    if (validateForm(cardioForm)) {
      try {
        const response = await axios.post('https://fitnesslogger-backend.onrender.com/cardio/createCardio', dataToSend);
        if (response.status === 200) {
          setMessage('Cardio successfully added');
          setTimeout(() => {
            setMessage('');
          }, 3000);
        } else {
          // console.error('Something went wrong');
          setMessage('Something else went wrong');
        }
      } catch (err) {
        // console.error(err);
        setMessage('Something catch went wrong');
      }
    }
//what are the title of data will create in form 
    setCardioForm({
      name: '',
      distance: '',
      duration: '',
      date: new Date(),
    });
  };

  return (
    <div className="cardio">
     <CustomNavbar />
      <div className="d-flex flex-column align-items-center">
        <h2 className="title text-center">Add Cardio Exercise</h2>
        <form className="cardio-form d-flex flex-column" onSubmit={handleCardioSubmit}>
          <div className="d-flex justify-content-center">
            <img alt="cardio" src={cardioIcon} className="exercise-form-icon" />
          </div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Running"
            value={cardioForm.name}
            onChange={handleCardioChange}
          />
          <label>Distance (miles):</label>
          <input
            type="number"
            name="distance"
            id="distance"
            placeholder="0"
            value={cardioForm.distance}
            onChange={handleCardioChange}
          />
          <label>Duration (minutes):</label>
          <input
            type="number"
            name="duration"
            id="duration"
            placeholder="0"
            value={cardioForm.duration}
            onChange={handleCardioChange}
          />
          <label>Date:</label>
          <DatePicker
            selected={cardioForm.date}
            onChange={handleDateChange}
            placeholderText="mm/dd/yyyy"
          />
          <button
            className="submit-btn cardio-submit-btn"
            type="submit"
            disabled={!validateForm(cardioForm)}
          >
            Add
          </button>
        </form>
        <p className="message">{message}</p>
      </div>
    </div>
  );
};

export default Cardio;
