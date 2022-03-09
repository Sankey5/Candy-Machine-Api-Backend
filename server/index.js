const express = require("express");
const bp = require("body-parser");
const cors = require("cors");
const validate = require("./validate");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cors());

app.post("/cm", (req, res) => {
  console.log(req.body);
  // Validate the candy machine configuration
  const config = validate(req.body);

  // Execute the candy machine to be created
  // Send back a candy machine ID if the execution has started correctly
  res.send(req.body);
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

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
