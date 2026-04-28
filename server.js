// server.js
import express from "express";
import axios from "axios";

const app = express();

app.get("/movies", async (req, res) => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/movie/popular",
    {
      params: {
        api_key: "YOUR_API_KEY",
        language: "en-US",
        page: 1
      }
    }
  );
  res.json(response.data);
});

app.listen(5000, () => console.log("Server running"));