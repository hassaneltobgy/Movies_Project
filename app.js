require("dotenv").config();
const fs = require('fs');
const express = require("express");
const mongoose = require('mongoose');
const todoRouter = require('./routes/Movies'); // Assuming you have a Movies router in "./routes/Movies"
const PORT = process.env.PORT || 3001;

console.log(process.env.CONNECTION_STRING);

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// Custom middleware to log incoming requests to log.txt
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const logData = `[${timestamp}] ${req.method} ${req.url}\n`;

  // Append the request to the log.txt file
  fs.appendFile('log.txt', logData, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });

  next(); // Continue processing the request
});

mongoose.connect(process.env.CONNECTION_STRING, {}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.log(err);
});

app.use("/Movies", todoRouter); // Corrected the router usage

app.get("/", (req, res) => {
  // Handle GET request logic here
  res.send("GET request received");
});

app.post("/", (req, res) => {
  // Handle POST request logic here
  res.send("POST request received");
});

app.listen(PORT, () => {
  console.log(`🚀Server is up and running on port ${PORT} 🚀`);
});
