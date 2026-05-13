import express from 'express';
import { requireFiles, upload, validateExtensions } from '../middleware/upload.js';
import {
  compressPdf,
  editPdf,
  imagesToPdf,
  libreOfficeToPdf,
  mergePdf,
  pdfToExcel,
  pdfToWord,
  splitPdf
} from '../services/converters.js';
import { cleanupFiles, sendAndCleanup } from '../utils/files.js';

const router = express.Router();
const many = upload.array('files', 20);

function conversionRoute(extensions, handler, downloadName) {
  return [
    many,
    requireFiles,
    validateExtensions(extensions),
    async (req, res, next) => {
      try {
        const out = await handler(req.files);
        sendAndCleanup(res, out, downloadName, req.files);
      } catch (error) {
        cleanupFiles(req.files);
        next(error);
      }
    }
  ];
}

router.post('/image-to-pdf', conversionRoute(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.tiff'], (files) => imagesToPdf(files, 'images.pdf'), 'images.pdf'));
router.post('/jpg-to-pdf', conversionRoute(['.jpg', '.jpeg'], (files) => imagesToPdf(files, 'jpg-to-pdf.pdf'), 'jpg-to-pdf.pdf'));
router.post('/png-to-pdf', conversionRoute(['.png'], (files) => imagesToPdf(files, 'png-to-pdf.pdf'), 'png-to-pdf.pdf'));
router.post('/merge-pdf', conversionRoute(['.pdf'], mergePdf, 'merged.pdf'));
router.post('/split-pdf', conversionRoute(['.pdf'], ([file]) => splitPdf(file), 'split-pages.zip'));
router.post('/compress-pdf', conversionRoute(['.pdf'], ([file]) => compressPdf(file), 'compressed.pdf'));
router.post('/edit-pdf', conversionRoute(['.pdf'], ([file]) => editPdf(file), 'edited.pdf'));
router.post('/pdf-to-excel', conversionRoute(['.pdf'], ([file]) => pdfToExcel(file), 'converted.xlsx'));
router.post('/pdf-to-word', conversionRoute(['.pdf'], ([file]) => pdfToWord(file), 'converted.docx'));
router.post('/word-to-pdf', conversionRoute(['.doc', '.docx'], ([file]) => libreOfficeToPdf(file), 'converted.pdf'));
router.post('/excel-to-pdf', conversionRoute(['.xls', '.xlsx'], ([file]) => libreOfficeToPdf(file), 'converted.pdf'));

export default router;
