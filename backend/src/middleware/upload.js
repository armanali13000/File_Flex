import multer from 'multer';
import crypto from 'node:crypto';
import path from 'node:path';
import { tempDir } from '../utils/files.js';

const maxSizeMb = Number(process.env.MAX_FILE_SIZE_MB || 25);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, tempDir),
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '-');
    cb(null, `${Date.now()}-${crypto.randomUUID()}-${safeName}`);
  }
});

export const upload = multer({
  storage,
  limits: {
    fileSize: maxSizeMb * 1024 * 1024,
    files: 20
  }
});

export function requireFiles(req, res, next) {
  if (!req.files?.length) {
    res.status(400);
    return next(new Error('Please upload at least one file.'));
  }
  next();
}

export function validateExtensions(extensions) {
  return (req, res, next) => {
    const invalid = req.files.find((file) => !extensions.includes(path.extname(file.originalname).toLowerCase()));
    if (invalid) {
      res.status(400);
      return next(new Error(`Unsupported file type: ${invalid.originalname}`));
    }
    next();
  };
}
