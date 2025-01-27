import  multer  from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Get __filename
const __filename = fileURLToPath(import.meta.url);

// Get __dirname
const __dirname = path.dirname(__filename);

// Define the upload directory
const uploadDir = path.join(__dirname, '../uploads');

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