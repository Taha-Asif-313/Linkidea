import  multer  from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get __filename
const __filename = fileURLToPath(import.meta.url);

// Get __dirname
const __dirname = path.dirname(__filename);

// Define the upload directory
const uploadDir = path.join(__dirname, '../uploads');

// Create the directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Save files in the 'my-uploads' directory
  },
  filename: function (req, file, cb) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    cb(null, `${file.originalname}`); // Add a timestamp to the filename
  },
});

const upload = multer({ storage });

export default upload;