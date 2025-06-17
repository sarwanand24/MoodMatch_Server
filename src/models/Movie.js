import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  Movie_Name: String,
  Release_Period: String,
  Whether_Remake: String,
  Whether_Franchise: String,
  Genre: String,
  New_Actor: String,
  New_Director: String,
  New_Music_Director: String,
  Number_of_Screens: Number,
  Budget_INR: Number,
  Revenue_INR: Number,
  userPrediction: Number
}, { timestamps: true });

export default mongoose.model("Movie", movieSchema);
