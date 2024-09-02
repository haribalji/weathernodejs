import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
const app = express();
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const port = 5000;
app.use(bodyParser.urlencoded({ extended: true }));

// app.set('view engine', 'ejs');
// app.set('views', './views'); // Relative path to the views directory


app.use(express.json());
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", async (req, res) => {
  try {
    var ci=req.body.city;
    console.log(req.body);
 
    const response = await axios.get('https://weatherapi-com.p.rapidapi.com/forecast.json',{
      params: {
        
           q:`london`,
           days: '3'
      },
    headers:{
      'x-rapidapi-key': '1a49b74c09msh288b9dd982fa390p134f96jsnc0e36cb6ee94', // Replace with your actual API key
      'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
    }});
    const data = response.data;
    // console.log(data.location.city);

    res.render(__dirname +"views/index.ejs",{
      result:data,
      

    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render(__dirname +"views/index.ejs", {
      error: error.message,  
    });
  }
  });


//   app.post('/location', (req, res) => {
//     const { latitude, longitude } = req.body;
//     console.log(`Received location: Latitude ${latitude}, Longitude ${longitude}`);

//     // Process the location data (e.g., fetch weather data, store in database, etc.)
//     res.json({ status: 'success', latitude, longitude });
// });



  app.post("/submit", async (req, res) => {
    // res.sendStatus(201);
    // if(req.body.city!=''){
    try {
      var ci=req.body.city;
      console.log(req.body);
   
      const response = await axios.get('https://weatherapi-com.p.rapidapi.com/forecast.json',{
        params: {
          
             q:`${ci}`,
             days: '3'
        },
      headers:{
        'x-rapidapi-key': '1a49b74c09msh288b9dd982fa390p134f96jsnc0e36cb6ee94', // Replace with your actual API key
        'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
      }});
      const data = response.data;
      // console.log(data.location.city);
  
      res.render(__dirname +"views/index.ejs",{
        result:data,
        

      });
    } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render(__dirname +"views/index.ejs", {
        error: error.message,  
      });
    }

  
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  
