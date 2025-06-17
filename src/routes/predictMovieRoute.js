// /backend/routes/predictMovieRoute.js
import express from "express";
import { spawn } from "child_process";

const router = express.Router();

router.post("/predict-movie", (req, res) => {
  const inputData = JSON.stringify(req.body);
  console.log('InputData:', inputData)

  const process = spawn("python", ["./src/ml/predict_movie.py", inputData]);

  let result = "";

  process.stdout.on("data", (data) => {
    result += data.toString();
  });

  process.stderr.on("data", (data) => {
    console.error(`❌ Python Error: ${data}`);
  });

  process.on("close", (code) => {
    const response = JSON.parse(result);
    console.log('Response:', response)
    res.json({ success: true, revenue: response.predicted_revenue });
  });
});

export default router;
