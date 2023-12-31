import React, { useState } from "react";
import ApiHandler from "./ApiHandler";
import "../App.css";

export default function Weather(props) {
  const now = new Date();

  function getWeekDay() {
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ][now.getDay()];

    return weekday;
  }

  const [country, setCountry] = useState("");
  const [time, setTime] = useState("");
  const [atmosphere, setAtmosphere] = useState("");

  const handleData = (data) => {
    setCountry(data.location.country);
    setAtmosphere(
      data.current.condition.text.charAt(0).toUpperCase() +
        data.current.condition.text.slice(1)
    );

    const apiTimeInMilliseconds = data.location.localtime_epoch * 1000;
    const apiTime = new Date(apiTimeInMilliseconds);
    const hour = apiTime.getHours().toString().padStart(2, "0");
    const minutes = apiTime.getMinutes().toString().padStart(2, "0");

    setTime(`${hour}:${minutes}`);
  };

  return (
    <div className="Weather">
      <ApiHandler
        apiUrl={`https://api.weatherapi.com/v1/current.json?key=a8854d0ab8f546e4bd5185259231510&q=${props.city}&units=celsius`}
        onDataFetched={handleData}
      />
      <div className="col">
        <div className="row row-cols-md-1 text-start">
          <div className="col">
            <p className="city">
              {props.city.charAt(0).toUpperCase() + props.city.slice(1)},
            </p>
          </div>
          <div className="col">
            <p className="country">{country}</p>
          </div>
          <div className="col">
            <div className="row row-cols-md-2 fs-3">
              <div className="col">
                <p className="day">{getWeekDay()}</p>
              </div>
              <div className="col">
                <p className="time">{time}</p>
              </div>
            </div>
          </div>
          <div className="col fs-4">
            <p id="atmosphere">{atmosphere}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
