import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind, faTint, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSun, faCloud, faCloudShowersHeavy, faSnowflake, faBolt, faSmog } from '@fortawesome/free-solid-svg-icons';
import "./weatherapp.css";

// Add the weather icons to the Font Awesome library
library.add(faSun, faCloud, faCloudShowersHeavy, faSnowflake, faBolt, faSmog);

const WeatherApp = () => {
  const [temperature, setTemperature] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [humidity, setHumidity] = useState("");
  const [weatherDescription, setWeatherDescription] = useState("");
  const [location, setLocation] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const API_KEY = "c743e897ce5b7dc65494d5d4083e4190";
          const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

          fetch(API_URL)
            .then((response) => response.json())
            .then((data) => {
              setTemperature(data.main.temp + "°C"); // Assuming the temperature data is in Celsius
              setWindSpeed(data.wind.speed);
              setHumidity(data.main.humidity);
              setWeatherDescription(data.weather[0].description);
              setLocation(data.name);

              // Set the weather icon based on the weather condition
              const weatherCondition = data.weather[0].main.toLowerCase();
              switch (weatherCondition) {
                case 'clear':
                  setWeatherIcon(faSun);
                  break;
                case 'clouds':
                  setWeatherIcon(faCloud);
                  break;
                case 'rain':
                  setWeatherIcon(faCloudShowersHeavy);
                  break;
                case 'snow':
                  setWeatherIcon(faSnowflake);
                  break;
                case 'thunderstorm':
                  setWeatherIcon(faBolt);
                  break;
                case 'mist':
                case 'smoke':
                case 'haze':
                case 'dust':
                case 'fog':
                  setWeatherIcon(faSmog);
                  break;
                default:
                  setWeatherIcon(null);
                  break;
              }
            })
            .catch((error) => {
              console.log("Error fetching weather data:", error);
            });
        },
        (error) => {
          console.log("Error getting location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div className="maindiv">
      <header>Weather</header>
      <br />
      <div className="hr">
        <hr />
      </div>
      <div className="grid-container">
        <div className="big-div">
          {weatherIcon && <FontAwesomeIcon icon={weatherIcon} size="3x" />}
          <p>{temperature}</p>
        </div>
        <div className="inner-div">
          <p>
            <FontAwesomeIcon icon={faTint} /> Humidity: {humidity}%
          </p>
        </div>
        <div className="inner-div">
          <p>Description: {weatherDescription}</p>
        </div>
        <div className="inner-div">
          <p>
            <FontAwesomeIcon icon={faWind} /> Wind Speed: {windSpeed} km/h
          </p>
        </div>
        <div className="inner-div">
          <p>
            <FontAwesomeIcon icon={faMapMarkerAlt} /> Location: {location}
          </p>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;
