const express = require("express");
const bp = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const fsPromises = require("fs").promises;
const validate = require("./validate");
require("dotenv").config();

// Constants
const PORT = process.env.PORT || 3001;
const ASSETS_PATH = "/root/api-assets/";

// Helper functions

const app = express();
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cors());

app.post("/cm", (req, res) => {
  console.log(req.body);
  const projectPath = path.join(ASSETS_PATH, req.params.project.name);
  console.log("Candy Machine config project path: ", projectPath);
  // Validate the candy machine configuration
  //const config = validate(req.body);

  // Create the project directory if it does not exist
  if (!fs.existsSync(projectPath)) {
    fsPromises.mkdir(projectPath);
  }

  // Repeat projects
  if (
    fs.exsitsSync(
      path.join(projectPath, `${req.params.project.name}_cm_config.json`)
    )
  ) {
    res.status(400).send("Project Candy Machine creation already started");
    //return;
  }

  // Write the config file to the correct project path
  fsPromises.writeFile(
    path.join(projectPath, `${req.params.project.name}_cm_config.json`),
    req.body.cm
  );

  // Successfully uploaded the candy machine config
  res.send({ message: "Candy Machine config successfully updated" });
});

app.post("/files", (req, res) => {
  console.log("Files: ", req.body);
  const projectPath = ASSETS_PATH + req.params.project.name;
  console.log("Files Project path: ", projectPath);

  // Create the project directory if it does not exist
  if (!fs.existsSync(projectPath)) {
    fsPromises.mkdir(projectPath);
  }
  try {
    // Write the current chuck to the project folder
    fsPromises.writeFile(
      path.join(projectPath, req.params.id + "_" + req.params.fileName),
      req.body
    );

    // Return a success message if no errors occur
    res.send(
      `Successfully wrote file: ${req.params.id + "_" + req.params.fileName}`
    );
  } catch (err) {
    console.log(
      `Error writing file ${req.params.id + "_" + req.params.fileName}`
    );
    res
      .status(500)
      .send(
        `Error writing asset file ${req.params.id + "_" + req.params.fileName}`,
        error
      );
  }
});

app.post("/complete", (req, res) => {
  console.log("Complete: ", req.body);

  // Execute the candy machine to be created
  // Send back a candy machine ID if the execution has started correctly
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
