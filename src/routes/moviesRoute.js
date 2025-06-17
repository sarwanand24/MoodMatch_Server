// server/src/routes/moviesRoute.js
import express from "express";
import Movie from "../models/Movie.js";

const router = express.Router();

// Get all movies
router.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    console.log('Movies Data:::::', movies)
    res.json({ success: true, data: movies });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});
// router.get("/movies", async (req, res) => {
//   try {
//     const movies = await Movie.find({ userPrediction: { $exists: true } }).sort({ createdAt: -1 });
//     console.log("Filtered Predictions Only:", movies);
//     res.json({ success: true, data: movies });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// });


// Save user prediction
router.post("/movies", async (req, res) => {
  try {
    console.log('Movie data user:', req.body)
    const newMovie = new Movie(req.body);
    await newMovie.save();
    res.status(201).json({ success: true, data: newMovie });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

export default router;
