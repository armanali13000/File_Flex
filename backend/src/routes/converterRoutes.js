import express from 'express';
import { requireFiles, upload, validateExtensions } from '../middleware/upload.js';
import { cleanupFiles, sendAndCleanup } from '../utils/files.js';

const router = express.Router();
const many = upload.array('files', 20);

function conversionRoute(extensions, getHandler, downloadName) {
  return [
    many,
    requireFiles,
    validateExtensions(extensions),
    async (req, res, next) => {
      try {
        const handler = await getHandler();
        const out = await handler(req.files);
        sendAndCleanup(res, out, downloadName, req.files);
      } catch (error) {
        cleanupFiles(req.files);
        next(error);
      }
    }
  ];
}

const converters = () => import('../services/converters.js');

router.post('/image-to-pdf', conversionRoute(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.tiff'], async () => {
  const { imagesToPdf } = await converters();
  return (files) => imagesToPdf(files, 'images.pdf');
}, 'images.pdf'));

router.post('/jpg-to-pdf', conversionRoute(['.jpg', '.jpeg'], async () => {
  const { imagesToPdf } = await converters();
  return (files) => imagesToPdf(files, 'jpg-to-pdf.pdf');
}, 'jpg-to-pdf.pdf'));

router.post('/png-to-pdf', conversionRoute(['.png'], async () => {
  const { imagesToPdf } = await converters();
  return (files) => imagesToPdf(files, 'png-to-pdf.pdf');
}, 'png-to-pdf.pdf'));

router.post('/merge-pdf', conversionRoute(['.pdf'], async () => {
  const { mergePdf } = await converters();
  return mergePdf;
}, 'merged.pdf'));

router.post('/split-pdf', conversionRoute(['.pdf'], async () => {
  const { splitPdf } = await converters();
  return ([file]) => splitPdf(file);
}, 'split-pages.zip'));

router.post('/compress-pdf', conversionRoute(['.pdf'], async () => {
  const { compressPdf } = await converters();
  return ([file]) => compressPdf(file);
}, 'compressed.pdf'));

router.post('/edit-pdf', conversionRoute(['.pdf'], async () => {
  const { editPdf } = await converters();
  return ([file]) => editPdf(file);
}, 'edited.pdf'));

router.post('/pdf-to-excel', conversionRoute(['.pdf'], async () => {
  const { pdfToExcel } = await converters();
  return ([file]) => pdfToExcel(file);
}, 'converted.xlsx'));

router.post('/pdf-to-word', conversionRoute(['.pdf'], async () => {
  const { pdfToWord } = await converters();
  return ([file]) => pdfToWord(file);
}, 'converted.docx'));

router.post('/word-to-pdf', conversionRoute(['.doc', '.docx'], async () => {
  const { libreOfficeToPdf } = await converters();
  return ([file]) => libreOfficeToPdf(file);
}, 'converted.pdf'));

router.post('/excel-to-pdf', conversionRoute(['.xls', '.xlsx'], async () => {
  const { libreOfficeToPdf } = await converters();
  return ([file]) => libreOfficeToPdf(file);
}, 'converted.pdf'));

export default router;
