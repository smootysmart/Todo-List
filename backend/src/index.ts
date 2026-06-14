import express from "express";
import todoRoutes from "./routes/TodoRoutes";
import { initializeDatabase } from "./database/Database";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend's URL
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

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Database connection error:", error);
  }
}

startServer();
