import "dotenv/config";
import express from "express";
import connectDB from "./DBconfig.js";
import cors from "cors";
import cookieParser from "cookie-parser";

// Importing routes
import userRoute from "./routes/usersRoutes.js";
import postRoute from "./routes/postsRoutes.js";

// Initialize the app
const app = express();
const port = 5000 || process.env.PORT;

// Middleware to parse JSON
app.use(express.json());

// Middleware for URL-encoded data (if needed)
app.use(express.urlencoded({ extended: true }));

// CORS configuration options
const corsOptions = {
  origin: ["http://localhost:3000", "https://linkidea.netlify.app"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

// Middlewares
app.use(cookieParser());
app.use(cors(corsOptions));

// Database connection
connectDB();

// Using routes
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Export the server as a module
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
