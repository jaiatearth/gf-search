// src/App.js
import React from "react";
import FlightSearch from "./components/FlightSearch";
import './App.scss';

function App() {
  return (
    <div className="App">
      <h1>Spotter Flight Search</h1>
      <FlightSearch />
    </div>
  );
}

export default App;
