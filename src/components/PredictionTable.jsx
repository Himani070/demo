import React, { useState, useEffect } from "react";
import axios from "axios";

const PredictionTable = () => {
  const [predictions, setPredictions] = useState([]); // Stores all data
  const [currentPage, setCurrentPage] = useState(1); // Stores current page number
  const [rowsPerPage, setRowsPerPage] = useState(5); // Default rows per page

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/..")
      .then((response) => {
        setPredictions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Pagination logic
  const totalRecords = predictions.length;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = predictions.slice(startIndex, endIndex);

  // Handlers for pagination
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
          {currentData.map((item, index) => (
            <tr key={index}>
              <td>{item.VehicleID}</td>
              <td>{item.PredictionDate}</td>
              <td>{item.LoadFunctionCompletedOn}</td>
              <td>{item.LoadStatus}</td>
            </tr>
          ))}
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
              setCurrentPage(1); // Reset to first page when changing rows per page
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <span>
            Total: <span id="totalRecords">{totalRecords}</span> records
          </span>
        </div>
        <div className="pagination">
          <button className="prev" onClick={goToPreviousPage} disabled={currentPage === 1}>
            &#10094;
          </button>
          <span>{currentPage}</span>
          <button className="next" onClick={goToNextPage} disabled={currentPage === totalPages}>
            &#10095;
          </button>
        </div>
      </div>
    </div>
  );
};

export default PredictionTable;
