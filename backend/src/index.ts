import todoRoutes from "./routes/TodoRoutes";
import { initializeDatabase } from "./database/Database";
import dotenv from "dotenv";

const express = require("express");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081;
const HOST = process.env.HOST || '0.0.0.0';

app.use(
  cors({
    origin: "http://host.docker.internal:3000", // Replace with your frontend's URL
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Allow specific methods
    credentials: true, // Allow cookies if necessary
  }),
);
// Middleware
app.use(express.json());

// Routes
app.use("/api", todoRoutes);

async function startServer(): Promise<void> {
  try {
    await initializeDatabase();
    console.log("Database ready!");

    app.listen(PORT, HOST, () => {
      console.log(`Server is running on http://${HOST}:${PORT}`);
    });
  } catch (error) {
    console.error("Database connection error:", error);
  }
}

startServer();
