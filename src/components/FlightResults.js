import React from "react";
import "./FlightResults.scss";

const FlightResults = ({ flights }) => {

  if (flights.length === 0) {
    return (
      <p className="no-results">
        No flights available for the selected search criteria.
      </p>
    );
  }

  return (
    <div className="flight-results">
      {flights.map((flight, index) => (
        <div key={index} className="flight-card">
          <div className="price">${flight.price.raw}</div>

          <div className="flight-details">
            <div className="departure-arrival">
              <div className="departure">
                <div className="time">{flight.legs[0].departureTime}</div>
                <div className="location">
                  {flight.legs[0].departureAirport}
                </div>
              </div>
              <div className="arrival">
                <div className="time">{flight.legs[0].arrivalTime}</div>
                <div className="location">{flight.legs[0].arrivalAirport}</div>
              </div>
            </div>

            <div className="airline">
              <img
                src={flight.legs[0].carriers.marketing[0].logoUrl}
                alt="Airline logo"
                width="30"
                height="30"
              />
              {flight.legs[0].carriers.marketing[0].name}
            </div>

            <div className="duration">
              {Math.ceil(flight.legs[0].durationInMinutes / 60)} hours
            </div>

            <div className="actions">
              <button>Book Now</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlightResults;
