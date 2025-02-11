const sqlite3 = require("sqlite3").verbose();

// Connect to SQLite database
const db = new sqlite3.Database("./database.sqlite", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error("❌ Error opening database:", err.message);
  } else {
    console.log("✅ Connected to SQLite Database");
  }
});

// Create table if it doesn't exist
const createTableQuery = `
CREATE TABLE IF NOT EXISTS predictions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    vehicle_id INTEGER NOT NULL,
    prediction_date TEXT NOT NULL,
    load_function_completed_on TEXT NOT NULL,  -- Changed from REAL to TEXT
    load_status TEXT NOT NULL
);
`;

db.run(createTableQuery, (err) => {
  if (err) {
    console.error("❌ Error creating table:", err.message);
  } else {
    console.log("✅ Table Created or Already Exists");

    // Insert sample data using transactions
    db.serialize(() => {
      const insertQuery = `
        INSERT INTO predictions (vehicle_id, prediction_date, load_function_completed_on, load_status)
        VALUES (?, ?, ?, ?)
      `;

      const sampleData = [
        [1, "28/10/2024, 09:08:14", "28/10/2024, 17:38:14", "No Load"],
        [2, "29/10/2024, 10:09:30", "20/11/2024, 10:39:30", "Full Load"],
        [3, "31/10/2024, 08:09:25", "10/11/2024, 11:05:20", "No Load"],
        [4, "09/11/2024, 09:10:20", "17/12/2024, 12:30:07", "Part Load"],
        [5, "09/11/2024, 08:30:15", "18/12/2024, 13:45:09", "Part Load"],
        [6, "12/11/2024, 12:05:10", "30/11/2024, 15:38:29", "No Load"],
        [7, "21/11/2024, 08:40:04", "01/12/2024, 15:54:26", "No Load"],
        [8, "22/11/2024, 09:30:13", "08/12/2024, 08:20:36", "Part Load"],
        [9, "23/11/2024, 10:00:49", "20/12/2024, 09:15:45", "Full Load"],
        [10, "26/11/2024, 11:11:02", "25/12/2024, 08:38:28", "Full Load"],
        [11, "27/11/2024, 14:21:34", "24/12/2024, 09:45:56", "Part Load"],
        [12, "28/11/2024, 15:25:05", "26/12/2024, 14:08:49", "No Load"],
        [13, "01/12/2025, 07:30:28", "29/12/2024, 16:38:27", "Full Load"],
        [14, "03/12/2024, 09:45:30", "31/12/2024, 11:40:38", "Part Load"],
        [15, "05/12/2024, 13:20:30", "03/01/2025, 10:37:54", "Part Load"]
      ];

      const stmt = db.prepare(insertQuery);

      sampleData.forEach(row => {
        stmt.run(row, (err) => {
          if (err) console.error("❌ Insert Error:", err.message);
        });
      });

      stmt.finalize();
      console.log("✅ Sample data inserted successfully");
    });

    db.close();
  }
});

module.exports = db;
