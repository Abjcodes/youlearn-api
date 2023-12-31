import express from "express";
import * as dotenv from "dotenv";
import noteRoutes from "./routes/noteRoutes";
import userRoutes from "./routes/userRoutes";
import connectDB from "./config/db";
dotenv.config();

const port: number = parseInt(process.env.PORT) || 5000;
connectDB();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/notes", noteRoutes);
app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
