import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
const mongoString = process.env.DATABASE_URL;
import cors from "cors";
import cookieSession from "cookie-session";

import routes from "./routes/routes.js";

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
    console.log(error);
});

database.once("connected", () => {
    console.log("Database Connected");
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cookieSession({
        name: "login-session",
        secret: process.env.JWT_SECRET,
        httpOnly: true
    })
);
app.use("/api", routes);

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`);
});
