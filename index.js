import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

// Set the view engine to EJS
app.set("view engine", "ejs");

// Serve static files from the 'public' folder
app.use(express.static("public"));

// Define the route for the root path
app.get("/", async (req, res) => {
  try {
    // Call OpenWeather API using axios
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather?lat=28.68&lon=77.22&appid=25dc2d547a950285787e98647f03d7d8&units=metric"
    );
    
    // Extract the required data from the response
    const result = response.data;
    res.render("index", {
      location: result.name,
      weather: result.weather[0].main, // Correctly accessing weather description
      temp: result.main.temp,          // Correctly accessing temperature
      error: null                      // No error in this case
    });
  } catch (error) {
    console.error("Failed to fetch data:", error.message);
    res.render("index", {
      error: "Unable to fetch weather data",  // Pass the error message
      location: null,
      weather: null,
      temp: null
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log("Server running on port " + port);
});
