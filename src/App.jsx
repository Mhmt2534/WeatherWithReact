import { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/forecast.json?key=${
            import.meta.env.VITE_WEATHER_API
          }&q=${location}&days=4&aqi=yes&alerts=yes`
        );
        setWeatherData(response.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    if (location) {
      fetchData();
    }
  }, [location]);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  return (
    <>
      <div className="app-conainer">
        <h1 className="app-title">Weather app</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter City"
            className="location-input"
            value={location}
            onChange={handleLocationChange}
          />
        </div>
      </div>

      {weatherData && (
        <div className="weather-container">
          {weatherData.forecast.forecastday.map((day) => (
            <div className="day-container" key={day.date}>
              <h2 className="date">{day.date}</h2>
              <img
                src={day.day.condition.icon}
                alt={day.day.condition.text}
                className="weather-icon"
              />
              <p className="temperature">{day.day.avgtemp_c}C</p>
              <p className="temperature">{day.day.condition.text}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
