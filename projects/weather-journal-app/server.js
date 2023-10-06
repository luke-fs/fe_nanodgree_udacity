// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Dependencies */

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors()); //this will allow CORS for all domains

// Initialize the main project folder to be publicly available
app.use(express.static('website'));


//Luke: Routes
app.get("/project-data", (req, res) => {
    res.json(projectData);
})

app.post("/project-data", (req, res) => {
    projectData.temperature = req.body.temperature
    projectData.date = req.body.date
    projectData.userResponse = req.body.userResponse
    res.status(201).json({ message: 'Daten erfolgreich hinzugefügt' });
})

// Setup Server
app.listen(3000, () => {
    console.log('Der Server läuft auf Port 3000');
  });
  