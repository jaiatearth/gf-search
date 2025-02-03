import React, { useState } from "react";
import FlightResults from "./FlightResults";
import { searchFlights } from "../utils/api";
import "./FlightSearch.scss";

const FlightSearch = () => {
  const [originSkyId, setOriginSkyId] = useState("");
  const [destinationSkyId, setDestinationSkyId] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState("economy");
  const [currency, setCurrency] = useState("USD");
  const [departureDate, setDepartureDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [flights, setFlights] = useState([]);
  const [searchComplete, setSearchComplete] = useState(false);

  const handleSearch = async () => {
    // Validate inputs
    if (
      !originSkyId ||
      !destinationSkyId ||
      passengers <= 0 ||
      !departureDate
    ) {
      setError("Please fill in all required fields correctly.");
      return;
    }

    const isValidDate = (date) => /^\d{4}-\d{2}-\d{2}$/.test(date); // YYYY-MM-DD format

    if (!isValidDate(departureDate)) {
      setError("Invalid departure date.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const result = await searchFlights(
        originSkyId,
        destinationSkyId,
        passengers,
        cabinClass,
        currency,
        departureDate
      );

      const flightsData = result?.itineraries || [];

      setFlights(Array.isArray(flightsData) ? flightsData : []);
      setSearchComplete(true);
    } catch (err) {
      setError("Failed to fetch flights. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flight-search">
      <div className="search-form">
        {/* Source input */}
        <div className="input-group">
          <label htmlFor="origin">Origin</label>
          <input
            type="text"
            id="origin"
            value={originSkyId}
            onChange={(e) => setOriginSkyId(e.target.value)}
            placeholder="Where from? (e.g., LOND)"
          />
        </div>

        {/* Destination input */}
        <div className="input-group">
          <label htmlFor="destination">Destination</label>
          <input
            type="text"
            id="destination"
            value={destinationSkyId}
            onChange={(e) => setDestinationSkyId(e.target.value)}
            placeholder="Where to? (e.g., NYCA)"
          />
        </div>

        {/* Passengers input */}
        <div className="input-group">
          <label htmlFor="passengers">Passengers</label>
          <input
            type="number"
            id="passengers"
            value={passengers}
            min="1"
            onChange={(e) => setPassengers(e.target.value)}
          />
        </div>

        {/* Class input */}
        <div className="input-group">
          <label htmlFor="cabinClass">Cabin Class</label>
          <select
            id="cabinClass"
            value={cabinClass}
            onChange={(e) => setCabinClass(e.target.value)}
          >
            <option value="economy">Economy</option>
            <option value="business">Business</option>
            <option value="first">First</option>
          </select>
        </div>

        {/* Currency input */}
        <div className="input-group">
          <label htmlFor="currency">Currency</label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>

        {/* Departure Date input */}
        <div className="input-group">
          <label htmlFor="departureDate">Departure Date</label>
          <input
            type="date"
            id="departureDate"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
        </div>

        <button onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search Flights"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {/* Pass flights array to FlightResults */}
      {searchComplete && <FlightResults flights={flights} />}
    </div>
  );
};

export default FlightSearch;
