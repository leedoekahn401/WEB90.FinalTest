import express from "express";
import router from "./src/routes/root.js"
import connectDB from "./src/common/configs/db.config.js";
import cors from "cors";


const app = express();

app.use(express.json());

app.use(cors());

app.use("/", router);   

connectDB();


app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
