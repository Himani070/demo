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
  const { vehicleId, date } = req.query;
  let filteredData = data;

  if (vehicleId) {
     filteredData = filteredData.filter(entry => entry["Vehicle ID"] == vehicleId);
  }
  if (date) {
    filteredData = filteredData.filter(entry => entry["Prediction Date"] == date);
  }

  res.json(filteredData);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
