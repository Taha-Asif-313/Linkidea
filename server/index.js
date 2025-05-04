import "dotenv/config";
import express from "express";
import connectDB from "./DBconfig.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

// Get __filename
const __filename = fileURLToPath(import.meta.url);

// Get __dirname
const __dirname = path.dirname(__filename);

// Importing routes
import userRoute from "./routes/usersRoutes.js";
import postRoute from "./routes/postsRoutes.js";

// Initialize the app
const app = express();
const port = 5000 || process.env.PORT;

// Middleware to parse JSON
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware for URL-encoded data (if needed)
app.use(express.urlencoded({ extended: true }));

// CORS configuration options
const corsOptions = {
  origin: ["http://localhost:3001", "https://linkidea.netlify.app"],
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



// Export the server as a module
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
