import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

const ALLOWED_FILE_TYPE = {
    'image/jpeg': '.jpg',
    'image/jpg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif'
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const uploadsDir = 'uploads/tasks';
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname).toLowerCase();
    const fileName = `${uuidv4()}${fileExt}`;
    cb(null, fileName);
  }
});

const fileFilter = (req,file,cb) => {
    if(!ALLOWED_FILE_TYPE[file.mimetype]) {
        const error =  new Error('Invalid File Type');
         error.code = "INVALID FILE TYPE";
        cb(null, false)
    } 
    cb(null, true);
}

const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter
}).single('image');

export default upload;