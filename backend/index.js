const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./database.sqlite", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("✅ Connected to SQLite Database");
  }
});

app.get("/api/predictions", (req, res) => {
  const { vehicleId, predictionDate } = req.query;
  let sql = "SELECT * FROM predictions";
  let params = [];

  if (vehicleId || predictionDate) {
    sql += " WHERE 1=1";
    if (vehicleId) {
      sql += " AND vehicle_id = ?";
      params.push(vehicleId);
    }
    if (predictionDate) {
      sql += " AND prediction_date = ?";
      params.push(predictionDate);
    }
  }

  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows); // Send full dataset (pagination is now in frontend)
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
