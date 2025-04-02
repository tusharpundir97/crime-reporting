import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import crimeRoutes from "./routes/crimeRoutes.js";
import emailRoutes from "./routes/emailRoutes.js"
dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/crimes",crimeRoutes);
app.use("/api/email",emailRoutes);

app.get("/", (req, res) => {
  res.send("Crime Reporting API is running...")
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));