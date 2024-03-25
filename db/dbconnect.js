import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbconnect = async () => {
  try {
    // eslint-disable-next-line no-undef
    mongoose.connect(process.env.DB_URL);
    console.log("Connected to database");
  } catch (err) {
    console.log(err);
  }
};
export default dbconnect;

