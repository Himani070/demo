import React, { useState, useEffect } from "react";

function PredictResults() {
  const [vehicleId, setVehicleId] = useState("");
  const [predictionDate, setPredictionDate] = useState("");

  useEffect(() => {
    // Reset filter on page refresh
    localStorage.removeItem("vehicleId");
    localStorage.removeItem("predictionDate");
    window.dispatchEvent(new Event("storage")); // Notify table to reset
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Save filter values to localStorage
    localStorage.setItem("vehicleId", vehicleId);
    localStorage.setItem("predictionDate", predictionDate);
    
    // Notify the table to fetch filtered data
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
          type="text"
          className="date-input"
          placeholder="DD/MM/YYYY, HH:MM:SS"
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
