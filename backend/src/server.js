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
const port = process.env.PORT || 5000;

ensureTempDir();
scheduleTempCleanup();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000' }));
app.use(express.json({ limit: '50kb' }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 80, standardHeaders: true, legacyHeaders: false }));

app.get('/health', (req, res) => {
  res.json({ ok: true, service: 'FileFlex Tools API' });
});

app.use('/api', converterRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`FileFlex Tools API running on port ${port}`);
});
