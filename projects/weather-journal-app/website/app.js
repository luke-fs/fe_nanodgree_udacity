/* Global Variables */
const apiKey = '4c02de3bf0466d62d119ff8521499caa&units=imperial';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'/'+ d.getDate()+'/'+ d.getFullYear();

// Async function to fetchWeatherData
async function fetchWeatherData(zip) {
  try {
    const apiUrlSpecific = `${apiUrl}?zip=${zip},DE&appid=${apiKey}` //hardcoded DE because I am German and I use the app
    const response = await fetch(apiUrlSpecific); // Führe die GET-Anfrage durch
    if (!response.ok) {
      throw new Error(`HTTP-Fehler! Status: ${response.status}`);
    }

    const weatherData = await response.json(); // Parset die JSON-Antwort
    return weatherData.main.temp; //return temperature only
  } catch (error) {
    console.error('Fehler beim Abrufen der Wetterdaten:', error);
  }
}

// Funktion, die eine GET-Fetch-Anfrage auf den Server-Endpunkt "/project-data" durchführt und die Daten zurückgibt
async function fetchDataFromServer() {
  try {
    const response = await fetch('/project-data');
    if (!response.ok) {
      throw new Error(`HTTP-Fehler! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fehler beim Abrufen der Daten:', error);
    throw error; // Wirf den Fehler, damit er in der aufrufenden Funktion behandelt werden kann
  }
}

async function postUserData(dataToSend) {
  try {
    // Definiere die URL, an die der POST-Request gesendet werden soll
    const url = '/project-data'; // Passe dies entsprechend deiner Serverkonfiguration an

    // Sende einen POST-Request an die Serverseite
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Setze den Content-Type auf JSON
      },
      body: JSON.stringify(dataToSend), // Konvertiere das Datenobjekt in JSON
    });

    // Überprüfe, ob die Anfrage erfolgreich war
    if (!response.ok) {
      throw new Error(`HTTP-Fehler! Status: ${response.status}`);
    }

    // Parset die JSON-Antwort, wenn eine Antwort vorhanden ist
    const responseData = await response.json();

    // Gib die Antwortdaten zurück
    return responseData;
  } catch (error) {
    console.error('Fehler beim Senden der Benutzerdaten:', error);
    throw error; // Wirf den Fehler, damit er in der aufrufenden Funktion behandelt werden kann
  }
}

function updateUIData(data) {
  // Wähle die DOM-Elemente aus, die du aktualisieren möchtest
  const temperatureElement = document.getElementById('temp');
  const dateElement = document.getElementById('date');
  const userInputElement = document.getElementById('content');

  // Aktualisiere die Werte der ausgewählten DOM-Elemente
  temperatureElement.textContent = `Temperature: ${data.temperature} degrees`;
  dateElement.textContent = `Date: ${data.date}`;
  userInputElement.textContent = `User Input: ${data.userResponse}`;
}

// Finde das Element mit der ID "generate"
const generateButton = document.getElementById('generate');

async function generateButtonClicked() {
  try {
    console.log("Button wurde geklickt")
    // Rufe die Funktion fetchWeatherData auf, um Wetterdaten abzurufen
    const zip = document.getElementById('zip').value;
    const weatherData = await fetchWeatherData(zip);
    console.log('weatherData:', weatherData);
    
    const feelingsUser = document.getElementById('feelings').value;
    console.log(`feelingsUser: ${feelingsUser}`);
    console.log(`newDate: ${newDate}`);

    const dataToSend = {
      temperature: weatherData,
      userResponse: feelingsUser,
      date: newDate
    };
    
    // TBD: weatherData-Temperatur muss aus weatherData extrahiert werden
    const postDataResponse = await postUserData(dataToSend);
    console.log('Post Request wurde durchgeführt und die Antwort lautet: ', postDataResponse);
    
    const dataFromServer = await fetchDataFromServer();
    updateUIData(dataFromServer);
  } catch (error) {
    console.error('Fehler:', error);
    // Hier kannst du Fehlerbehandlung durchführen, falls etwas schief geht
  }
}

// Füge den Event-Listener zum Element hinzu und weise ihm die Callback-Funktion zu
generateButton.addEventListener('click', generateButtonClicked);
