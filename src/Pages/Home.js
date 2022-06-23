import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_WEATHER_QUERY } from "../graphql/Queries";

function Home() {
  const [citySearched, setCitySearched] = useState("");
  const [getWeather, { data, error }] = useLazyQuery(GET_WEATHER_QUERY, {
    variables: { name: citySearched },
  });

  if (error) return <h1>Error Found!</h1>;
  if (data) {
    console.log(data);
  }
  return (
    <div className="html">
      <h1>Search For Weather</h1>
      <input
        type="text"
        placeholder="City Name..."
        onChange={(e) => setCitySearched(e.target.value)}
      />
      <button onClick={() => getWeather()}>Search</button>
      <div className="weather">
        {data && (
          <>
            <h1>City Name</h1>
            <p>{data.getCityByName.name}</p>
            <h1>Temperature</h1>
            <p>{data.getCityByName.weather.temperature.actual}</p>
            <h1>Description</h1>
            <p>{data.getCityByName.weather.summary.description}</p>
            <h1>Wind</h1>
            <p>{data.getCityByName.weather.wind.speed}MPH</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
