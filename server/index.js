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

// Initialize API app
const app = express();
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cors());

// Endpoint for uploading the Candy Machine config
app.post("/cm/:project", (req, res) => {
  const projectName = req.params.project;
  const projectPath = path.join(ASSETS_PATH, projectName);
  console.log(req.body);
  console.log("Candy Machine config project path: ", projectPath);

  // Validate the candy machine configuration
  //const config = validate(req.body);

  // Create the project directory if it does not exist
  createProjectDir(projectPath);

  // Repeat projects will return a 400 error
  if (fs.exsitsSync(path.join(projectPath, `${projectName}_cm_config.json`))) {
    res
      .status(400)
      .send({ message: "Project Candy Machine config already uploaded" });
    //return;
  }

  try {
    // Write the config file to the correct project path
    fsPromises.writeFile(
      path.join(projectPath, `${projectName}_cm_config.json`),
      req.body.cm
    );

    // Successfully uploaded the candy machine config
    res.send({ message: "Candy Machine config successfully uploaded" });
  } catch (err) {
    // Error writing file
    console.log(`Error writing ${projectName}_cm_config.json}`);
    res.status(500).send({ message: `Error writing config file` });
  }
});

// Endpoint to upload files for a candy machine
app.post("/files/:project/:fileName/:id", (req, res) => {
  const projectName = req.params.project;
  const projectPath = path.join(ASSETS_PATH + projectName);
  const fileName = `${req.params.id}_${req.params.fileName}`;
  console.log("Files: ", req.body);
  console.log("Files Project path: ", projectPath);

  // Create the project directory if it does not exist
  createProjectDir(projectPath);

  try {
    // Write the current chuck to the project folder
    fsPromises.writeFile(path.join(projectPath, fileName), req.body);

    // Return a success message if no errors occur
    res.send({ message: `Successfully wrote file: ${fileName}` });
  } catch (err) {
    // Return a 500 error if the writing error fails
    console.log(`Error writing file ${fileName}`);
    res.status(500).send({ message: `Error writing asset file ${fileName}` });
  }
});

// Endpoint for signaling that the file upload has finished
app.post("/complete/:project", (req, res) => {
  console.log("Complete: ", req.body);

  // Execute the candy machine to be created
  // Send back a candy machine ID if the execution has started correctly
});

// Get candy machine status of all currently creating candy machines
//app.get("/cm", (req, res) => {
//
// })

// Helper functions

const createProjectDir = (projectPath) => {
  // Create the project directory if it does not exist
  if (!fs.existsSync(projectPath)) {
    fsPromises.mkdir(projectPath);
  }
};

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
