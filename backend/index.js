const express = require("express");
const cors = require("cors");
const xlsx = require("xlsx");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const workbook = xlsx.readFile("data.xlsx");
const sheetName = workbook.SheetNames[0];  
const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

app.get("/api/predictions", (req, res) => {
  let { vehicleId, predictionDate } = req.query;
  let filteredData = data;

  if (vehicleId) {
    filteredData = filteredData.filter(entry => entry["Vehicle ID"] == vehicleId);
  }

  if (predictionDate) {
    filteredData = filteredData.filter(entry => {
      const entryDate = new Date(entry["Prediction Date"]).toISOString().split("T")[0];
      return entryDate === predictionDate;
    });
  }

  res.json(filteredData);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
