import multer from 'multer';
import path from 'path';

// Define absolute path for storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Resolve the absolute path
    cb(null, path.resolve(__dirname, './images')); // Adjust the path based on your folder structure
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Unique filename with timestamp
  },
});

const upload = multer({ storage });

export default upload;

