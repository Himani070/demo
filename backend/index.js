const express = require("express");
const cors = require("cors");
const xlsx = require("xlsx");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Load Excel file (Replace 'data.xlsx' with your actual file path)
const workbook = xlsx.readFile("data.xlsx");
const sheetName = workbook.SheetNames[0]; // Get the first sheet
const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

// API to get all predictions
app.get("/", (req, res) => {
    res.json(data);
});

// API to filter by Vehicle ID and Prediction Date
app.get("/", (req, res) => {
    const { vehicleId, date } = req.query;
    let filteredData = data;

    if (vehicleId) {
        filteredData = filteredData.filter(entry => entry.VehicleID == vehicleId);
    }
    if (date) {
        filteredData = filteredData.filter(entry => entry.PredictionDate == date);
    }

    res.json(filteredData);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
