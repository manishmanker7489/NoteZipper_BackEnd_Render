import express from "express";
import { config } from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { ConnectDB } from "./dbConnection.js";
import UserRouter from "./routes/userRoute.js";
import NoteRouter from "./routes/notesRoutes.js";
import { errorHandler, notFound } from "./middlewars/errorMiddlewars.js";

// Load environment variables from .env file
config();

// Connect to the database
ConnectDB();

// Initialize express app
const app = express();

// Middleware for security headers
app.use(helmet());

// Middleware for cross-origin resource sharing
app.use(cors());

// Middleware for logging HTTP requests and errors
app.use(morgan("combined"));

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use("/user", UserRouter);
app.use("/notes", NoteRouter);

// Handle 404 errors (route not found)
app.use(notFound);

// Custom error handler
app.use(errorHandler);

// Start the server
const port = process.env.PORT || 5000;
app
  .listen(port, () => {
    console.log(`Server started at port ${port}`);
  })
  .on("error", (err) => {
    console.error("Server failed to start:", err.message);
  });
