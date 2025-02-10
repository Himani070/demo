import React, { useState, useEffect } from "react";
import axios from "axios";

const PredictionTable = () => {
  const [predictions, setPredictions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchData = async () => {
    const vehicleId = localStorage.getItem("vehicleId") || "";
    const predictionDate = localStorage.getItem("predictionDate") || "";

    try {
      const response = await axios.get("http://localhost:5000/api/predictions", {
        params: { vehicleId, predictionDate }
      });
      setPredictions(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchData(); // Fetch on page load

    // Listen for filter changes from PredictResults
    const handleStorageChange = () => fetchData();
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const getLoadStatusClass = (status) => {
    if (status === "No Load") return "tload-status no-load";
    if (status === "Part Load") return "tload-status part-load";
    if (status === "Full Load") return "tload-status full-load";
    return "tload-status"; // Default class
  };

  // Pagination logic
  const totalRecords = predictions.length;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = predictions.slice(startIndex, endIndex);
  

  return (
    <div className="form-section">
      <h3>Prediction Table</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Vehicle ID</th>
            <th>Prediction Date</th>
            <th>Load Function Completed On</th>
            <th>Load Status</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((item, index) => (
              <tr key={index}>
                <td>{item["Vehicle ID"]}</td>
                <td>{item["Prediction Date"]}</td>
                <td>{item["Load Function Completed On"]}</td>
                <td className={getLoadStatusClass(item["Load Status"])}>{item["Load Status"]}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>No records found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="table-info">
        <div className="records-info">
          Rows per page:{" "}
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span>Total: {totalRecords} records</span>
        </div>
        <div className="pagination">
          <button className="prev" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
            &#10094;
          </button>
          <span>{currentPage}</span>
          <button className="next" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
            &#10095;
          </button>
        </div>
      </div>
    </div>
  );
};

export default PredictionTable;
