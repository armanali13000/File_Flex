import archiver from 'archiver';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import ExcelJS from 'exceljs';
import fs from 'node:fs';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import sharp from 'sharp';
import { tempDir } from '../utils/files.js';

const execFileAsync = promisify(execFile);

function outputPath(name) {
  return path.join(tempDir, `${Date.now()}-${crypto.randomUUID()}-${name}`);
}

export async function imagesToPdf(files, name = 'images.pdf') {
  const pdf = await PDFDocument.create();

  for (const file of files) {
    const normalized = await sharp(file.path).rotate().toFormat('jpeg', { quality: 90 }).toBuffer();
    const image = await pdf.embedJpg(normalized);
    const width = 595.28;
    const height = 841.89;
    const page = pdf.addPage([width, height]);
    const ratio = Math.min(width / image.width, height / image.height);
    const drawWidth = image.width * ratio;
    const drawHeight = image.height * ratio;
    page.drawImage(image, {
      x: (width - drawWidth) / 2,
      y: (height - drawHeight) / 2,
      width: drawWidth,
      height: drawHeight
    });
  }

  const out = outputPath(name);
  await fs.promises.writeFile(out, await pdf.save());
  return out;
}

export async function mergePdf(files) {
  const merged = await PDFDocument.create();
  for (const file of files) {
    const source = await PDFDocument.load(await fs.promises.readFile(file.path));
    const pages = await merged.copyPages(source, source.getPageIndices());
    pages.forEach((page) => merged.addPage(page));
  }
  const out = outputPath('merged.pdf');
  await fs.promises.writeFile(out, await merged.save());
  return out;
}

export async function splitPdf(file) {
  const source = await PDFDocument.load(await fs.promises.readFile(file.path));
  const out = outputPath('split-pages.zip');
  const stream = fs.createWriteStream(out);
  const archive = archiver('zip', { zlib: { level: 9 } });
  archive.pipe(stream);

  for (const index of source.getPageIndices()) {
    const pdf = await PDFDocument.create();
    const [page] = await pdf.copyPages(source, [index]);
    pdf.addPage(page);
    archive.append(Buffer.from(await pdf.save()), { name: `page-${index + 1}.pdf` });
  }

  await archive.finalize();
  await new Promise((resolve, reject) => {
    stream.on('close', resolve);
    stream.on('error', reject);
  });
  return out;
}

export async function compressPdf(file) {
  const pdf = await PDFDocument.load(await fs.promises.readFile(file.path), { ignoreEncryption: true });
  const out = outputPath('compressed.pdf');
  await fs.promises.writeFile(out, await pdf.save({ useObjectStreams: true }));
  return out;
}

export async function editPdf(file) {
  const pdf = await PDFDocument.load(await fs.promises.readFile(file.path), { ignoreEncryption: true });
  const font = await pdf.embedFont(StandardFonts.HelveticaBold);
  const pages = pdf.getPages();
  pages.forEach((page, index) => {
    page.drawText('Edited with FileFlex Tools', {
      x: 36,
      y: 24,
      size: 10,
      font,
      color: rgb(0.15, 0.32, 0.78)
    });
    page.drawText(`Page ${index + 1}`, {
      x: page.getWidth() - 70,
      y: 24,
      size: 10,
      font,
      color: rgb(0.4, 0.45, 0.55)
    });
  });
  const out = outputPath('edited.pdf');
  await fs.promises.writeFile(out, await pdf.save());
  return out;
}

export async function pdfToExcel(file) {
  const data = await extractPdfText(file.path);
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Extracted text');
  sheet.columns = [{ header: 'Line', key: 'line', width: 100 }];
  data.text.split(/\r?\n/).filter(Boolean).forEach((line) => sheet.addRow({ line }));
  const out = outputPath('converted.xlsx');
  await workbook.xlsx.writeFile(out);
  return out;
}

export async function pdfToWord(file) {
  const data = await extractPdfText(file.path);
  const doc = new Document({
    sections: [{
      children: data.text.split(/\r?\n/).filter(Boolean).map((line) => new Paragraph({ children: [new TextRun(line)] }))
    }]
  });
  const out = outputPath('converted.docx');
  await fs.promises.writeFile(out, await Packer.toBuffer(doc));
  return out;
}

async function extractPdfText(filePath) {
  ensurePdfParseGeometryGlobals();
  const { PDFParse } = await import('pdf-parse');
  const parser = new PDFParse({ data: await fs.promises.readFile(filePath) });
  try {
    return parser.getText();
  } finally {
    await parser.destroy();
  }
}

function ensurePdfParseGeometryGlobals() {
  if (!globalThis.DOMMatrix) {
    globalThis.DOMMatrix = class DOMMatrix {
      constructor(init) {
        const values = Array.isArray(init) ? init : [];
        this.a = values[0] ?? 1;
        this.b = values[1] ?? 0;
        this.c = values[2] ?? 0;
        this.d = values[3] ?? 1;
        this.e = values[4] ?? 0;
        this.f = values[5] ?? 0;
      }

      multiplySelf() {
        return this;
      }

      preMultiplySelf() {
        return this;
      }

      translateSelf() {
        return this;
      }

      scaleSelf() {
        return this;
      }

      rotateSelf() {
        return this;
      }
    };
  }

  if (!globalThis.DOMPoint) {
    globalThis.DOMPoint = class DOMPoint {
      constructor(x = 0, y = 0, z = 0, w = 1) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
      }

      matrixTransform() {
        return this;
      }
    };
  }

  if (!globalThis.DOMRect) {
    globalThis.DOMRect = class DOMRect {
      constructor(x = 0, y = 0, width = 0, height = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.top = y;
        this.right = x + width;
        this.bottom = y + height;
        this.left = x;
      }
    };
  }
}

export async function libreOfficeToPdf(file) {
  const command = process.env.LIBREOFFICE_PATH || 'soffice';
  const outDir = tempDir;
  try {
    await execFileAsync(command, ['--headless', '--convert-to', 'pdf', '--outdir', outDir, file.path], { timeout: 60000 });
  } catch {
    throw new Error('LibreOffice conversion failed. Install LibreOffice on the backend server and set LIBREOFFICE_PATH if needed.');
  }

  const baseName = path.basename(file.path, path.extname(file.path));
  const generated = path.join(outDir, `${baseName}.pdf`);
  const out = outputPath('converted.pdf');
  await fs.promises.rename(generated, out);
  return out;
}
