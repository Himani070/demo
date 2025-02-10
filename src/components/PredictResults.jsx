import React, { useState } from "react";
import axios from "axios";

function PredictResults() {
  const [vehicleId, setVehicleId] = useState("");
  const [predictionDate, setPredictionDate] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Save filter values to localStorage
    localStorage.setItem("vehicleId", vehicleId);
    localStorage.setItem("predictionDate", predictionDate);

    // Notify the table to re-fetch data (can use event dispatch or state management)
    window.dispatchEvent(new Event("storage"));

    alert("Filtering data...");
  };

  return (
    <div className="form-section">
      <h3>Filter Predictions</h3>
      <form onSubmit={handleSubmit} className="form-row">
        <label>Vehicle ID</label>
        <input
          type="text"
          className="vehicle-input"
          placeholder="Enter Vehicle ID"
          value={vehicleId}
          onChange={(e) => setVehicleId(e.target.value)}
          required
        />

        <label>Prediction Date</label>
        <input
          type="date"
          className="date-input"
          value={predictionDate}
          onChange={(e) => setPredictionDate(e.target.value)}
          required
        />

        <button type="submit" className="submit-button">Filter</button>
      </form>
    </div>
  );
}

export default PredictResults;
