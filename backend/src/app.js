import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import converterRoutes from './routes/converterRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import { ensureTempDir, scheduleTempCleanup } from './utils/files.js';

dotenv.config();

const app = express();

ensureTempDir();
if (!process.env.VERCEL) {
  scheduleTempCleanup();
}

app.set('trust proxy', 1);
app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    const configuredOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:3000')
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);

    if (!origin || configuredOrigins.includes(origin) || /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`CORS blocked origin: ${origin}`));
  }
}));
app.use(express.json({ limit: '50kb' }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 80, standardHeaders: true, legacyHeaders: false }));

app.get('/health', (req, res) => {
  res.json({ ok: true, service: 'FileFlex Tools API' });
});

app.get('/api/status', (req, res) => {
  res.json({
    ok: true,
    service: 'FileFlex Tools API',
    version: 'fileflex-backend-2026-05-14',
    routes: [
      'POST /api/pdf-to-word',
      'POST /api/word-to-pdf',
      'POST /api/excel-to-pdf'
    ]
  });
});

app.use('/api', converterRoutes);
app.use(notFound);
app.use(errorHandler);

export default app;
