// Inside your History component file (History.js)

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CustomNavbar from '../components/CustomNavbar';
import axios from 'axios';
import cardioIcon from '../images/cardio.png';
import resistanceIcon from '../images/resistance.png';
import aerobicIcon from '../images/aerobic.png';
import ExerciseChart from './ExerciseChart';
import Footer from './Footer';


export default function History() {
  const [exerciseData, setExerciseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayedItems, setDisplayedItems] = useState(10);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/userId`)
      .then((response) => {
        const userData = response.data.data;
        if (userData.length > 0) {
          const fetchedUserId = userData[0]._id;
          // console.log('Fetched userId:', fetchedUserId);

          // Fetch aerobic exercise data
          axios
            .get(`http://localhost:5000/aerobic/getAerobic/${fetchedUserId}`)
            .then((exerciseResponseAerobic) => {
              // console.log('Aerobic Exercise Data:', exerciseResponseAerobic.data);

              // Fetch cardio exercise data
              axios
                .get(`http://localhost:5000/cardio/getCardio/${fetchedUserId}`)
                .then((exerciseResponseCardio) => {
                  // console.log('Cardio Exercise Data:', exerciseResponseCardio.data);

                  // Fetch resistance exercise data
                  axios
                    .get(`http://localhost:5000/resistance/getResistance/${fetchedUserId}`)
                    .then((exerciseResponseResistance) => {
                      // console.log('Resistance Exercise Data:', exerciseResponseResistance.data);

                      // Extract data and ensure it's an array or an empty array if no data
                      const aerobicData = Array.isArray(exerciseResponseAerobic.data)
                        ? exerciseResponseAerobic.data
                        : [];
                      const cardioData = Array.isArray(exerciseResponseCardio.data)
                        ? exerciseResponseCardio.data
                        : [];
                      const resistanceData = Array.isArray(exerciseResponseResistance.data)
                        ? exerciseResponseResistance.data
                        : [];

                      // Combine all exercise data
                      const combinedExerciseData = [...aerobicData, ...cardioData, ...resistanceData];

                      setExerciseData(combinedExerciseData);
                      setIsLoading(false);
                    })
                    .catch((error) => {
                      // console.error('Error fetching resistance data:', error);
                      setError(error);
                      setIsLoading(false);
                    });
                })
                .catch((error) => {
                  // console.error('Error fetching cardio data:', error);
                  setError(error);
                  setIsLoading(false);
                });
            })
            .catch((error) => {
              // console.error('Error fetching aerobic data:', error);
              setError(error);
              setIsLoading(false);
            });
        } else {
          // console.error('No user data found.');
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  function showMoreItems() {
    setDisplayedItems(displayedItems + 3);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="history">
      <CustomNavbar />
      <div className="d-flex flex-column align-items-center">
        <h2 className="title">History</h2>

        <ExerciseChart exerciseData={exerciseData} />

        <div className="history-data">
          {exerciseData.length > 0 ? (
            <>
              {exerciseData.slice(0, displayedItems).map((exercise) => {
                let dateToDisplay = exercise.date;
                return (
                  <div className="history-div d-flex" key={exercise._id}>
                    <div className="date d-flex align-items-center">{dateToDisplay}</div>
                    <Link className="text-decoration-none" to={`/history/${exercise.type}/${exercise._id}`}>
                      {exercise.type === 'aerobic' ? (
                        <div className="history-card aerobic-title d-flex">
                          <div className="d-flex align-items-center">
                            <img alt="aerobic" src={aerobicIcon} className="history-icon" />
                          </div>
                          <div>
                            <p className="history-name">{exercise.name}</p>
                            <p className="history-index">{exercise.caloriesBurned} calories</p>
                          </div>
                        </div>
                      ) : exercise.type === 'cardio' ? (
                        <div className="history-card cardio-title d-flex">
                          <div className="d-flex align-items-center">
                            <img alt="cardio" src={cardioIcon} className="history-icon" />
                          </div>
                          <div>
                            <p className="history-name">{exercise.name}</p>
                            <p className="history-index">{exercise.distance} miles</p>
                          </div>
                        </div>
                      ) : exercise.type === 'resistance' ? (
                        <div className="history-card resistance-title d-flex">
                          <div className="d-flex align-items-center">
                            <img alt="resistance" src={resistanceIcon} className="history-icon" />
                          </div>
                          <div>
                            <p className="history-name">{exercise.name}</p>
                            <p className="history-index">{exercise.weight} lbs</p>
                          </div>
                        </div>
                      ) : null}
                    </Link>
                  </div>
                );
              })}
              {exerciseData.length > displayedItems && (
                <div className="d-flex justify-content-center">
                  <button className="show-btn" onClick={showMoreItems}>
                    Show More
                  </button>
                </div>
              )}
            </>
          ) : (
            <div>
              <h3 className="history-text">No exercise data yet...</h3>
              <Link to="/allexcercisepage">
                <button className="home-btn">Add Exercise</button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
