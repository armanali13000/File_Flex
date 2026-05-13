import fs from 'node:fs';
import path from 'node:path';

export const tempDir = path.resolve(process.cwd(), 'uploads');

export function ensureTempDir() {
  fs.mkdirSync(tempDir, { recursive: true });
}

export function safeUnlink(filePath) {
  if (!filePath) return;
  fs.promises.unlink(filePath).catch(() => {});
}

export function cleanupFiles(files = []) {
  files.forEach((file) => safeUnlink(file.path || file));
}

export function sendAndCleanup(res, outputPath, downloadName, inputFiles = []) {
  res.download(outputPath, downloadName, (error) => {
    cleanupFiles(inputFiles);
    safeUnlink(outputPath);
    if (error && !res.headersSent) {
      res.status(500).json({ message: 'Download failed.' });
    }
  });
}

export function scheduleTempCleanup() {
  const ttlMs = Number(process.env.TEMP_FILE_TTL_MINUTES || 30) * 60 * 1000;
  setInterval(async () => {
    const entries = await fs.promises.readdir(tempDir).catch(() => []);
    const now = Date.now();
    await Promise.all(entries.map(async (entry) => {
      const filePath = path.join(tempDir, entry);
      const stat = await fs.promises.stat(filePath).catch(() => null);
      if (stat && now - stat.mtimeMs > ttlMs) await safeUnlink(filePath);
    }));
  }, Math.min(ttlMs, 10 * 60 * 1000)).unref();
}
