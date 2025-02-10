import React, { useState } from "react";
import "../styles/global.css";
import axios from "axios";

function PredictResults() {
  const [vehicleId, setVehicleId] = useState("");
  const [timestamp, setTimestamp] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestData = { vehicleId, timestamp };

    try {
      const response = await axios.post("http://localhost:5000/predict", requestData);
      console.log("Prediction submitted:", response.data);
      alert("Prediction request submitted successfully!");
      setVehicleId("");
      setTimestamp("");
    } catch (error) {
      console.error("Error submitting prediction:", error);
      alert("Failed to submit prediction.");
    }
  };

  return (
    <div className="form-section">
      <h3>Predict Results</h3>
      <form onSubmit={handleSubmit} className="form-row">
        <label>Vehicle ID</label>
        <input
          type="text"
          className="vehicle-input"
          placeholder="Enter Vehicle ID"
          value={vehicleId}
          onChange={(e) => setVehicleId(e.target.value)}
          required
        />&nbsp;

        <label>Timestamp</label>
        <input
          type="text"
          className="timestamp-input"
          placeholder="DD/MM/YYYY, HH:MM:SS"
          value={timestamp}
          onChange={(e) => setTimestamp(e.target.value)}
          required
        />

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default PredictResults;
