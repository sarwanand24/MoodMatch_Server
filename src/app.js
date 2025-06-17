import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();  // Initialize the Express app

app.use(cors({
    origin: "*",
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(cookieParser())

import predictMovieRoute from "./routes/predictMovieRoute.js";
import movieRoute from "./routes/moviesRoute.js"

app.use("/api", predictMovieRoute);
app.use("/api", movieRoute);

export {
    app
    }