const express = require("express");
const bp = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const validate = require("./validate");
require("dotenv").config();

// Constants
const PORT = process.env.PORT || 3001;

// Helper functions

const app = express();
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cors());

app.post("/cm", (req, res) => {
  console.log(req.body);
  // Validate the candy machine configuration
  //const config = validate(req.body);
  if (!fs.existsSync()) {
  }

  // Execute the candy machine to be created
  // Send back a candy machine ID if the execution has started correctly
  res.send(req.body);
});

app.post("/files", (req, res) => {
  console.log("Files: ", req.body);

  fs.write();
});

app.post("/complete", (req, res) => {
  console.log("Complete: ", req.body);
});

// Get candy machine status of all currently creating candy machines
//app.get("/cm", (req, res) => {
//
// })

const loading = () => {
  // Loop
  // Read file
  // Check steps
  //if 1
  // 2
  // 3
  // ...
};

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on ${PORT}`);
});
