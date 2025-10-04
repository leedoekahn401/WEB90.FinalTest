import mongoose from "mongoose";
import handleAsync from "../utils/handle-async.util.js";
import { DB_URI } from "../configs/env.config.js";


const connectDB = handleAsync(async () => {
    await mongoose.connect(DB_URI);
    console.log("Connected to MongoDB");
});

export default connectDB;