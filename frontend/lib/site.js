export const siteConfig = {
  name: 'FileFlex Tools',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://fileflexone.vercel.app',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || '/_/backend'
};

export const tools = [
  {
    slug: 'pdf-to-word',
    title: 'PDF to Word Converter',
    shortTitle: 'PDF to Word',
    description: 'Convert PDF files into editable Word-style documents with extracted text.',
    accept: '.pdf',
    endpoint: '/api/pdf-to-word',
    category: 'PDF',
    output: 'DOCX',
    input: 'PDF'
  },
  {
    slug: 'pdf-to-excel',
    title: 'PDF to Excel Converter',
    shortTitle: 'PDF to Excel',
    description: 'Extract readable PDF text into a clean Excel workbook.',
    accept: '.pdf',
    endpoint: '/api/pdf-to-excel',
    category: 'PDF',
    output: 'XLSX',
    input: 'PDF'
  },
  {
    slug: 'word-to-pdf',
    title: 'Word to PDF Converter',
    shortTitle: 'Word to PDF',
    description: 'Turn Word documents into polished PDF files using server-side document conversion.',
    accept: '.doc,.docx',
    endpoint: '/api/word-to-pdf',
    category: 'Documents',
    output: 'PDF',
    input: 'DOC/DOCX'
  },
  {
    slug: 'excel-to-pdf',
    title: 'Excel to PDF Converter',
    shortTitle: 'Excel to PDF',
    description: 'Convert Excel spreadsheets into PDF files for sharing and archiving.',
    accept: '.xls,.xlsx',
    endpoint: '/api/excel-to-pdf',
    category: 'Spreadsheets',
    output: 'PDF',
    input: 'XLS/XLSX'
  },
  {
    slug: 'image-to-pdf',
    title: 'Image to PDF Converter',
    shortTitle: 'Image to PDF',
    description: 'Combine images into a clean PDF with automatic page fitting.',
    accept: 'image/*',
    endpoint: '/api/image-to-pdf',
    category: 'Images',
    output: 'PDF',
    input: 'Images',
    multiple: true
  },
  {
    slug: 'jpg-to-pdf',
    title: 'JPG to PDF Converter',
    shortTitle: 'JPG to PDF',
    description: 'Convert JPG photos into a compact PDF document.',
    accept: '.jpg,.jpeg',
    endpoint: '/api/jpg-to-pdf',
    category: 'Images',
    output: 'PDF',
    input: 'JPG',
    multiple: true
  },
  {
    slug: 'png-to-pdf',
    title: 'PNG to PDF Converter',
    shortTitle: 'PNG to PDF',
    description: 'Convert PNG images into a high-quality PDF file.',
    accept: '.png',
    endpoint: '/api/png-to-pdf',
    category: 'Images',
    output: 'PDF',
    input: 'PNG',
    multiple: true
  },
  {
    slug: 'edit-pdf',
    title: 'Edit PDF Online',
    shortTitle: 'Edit PDF',
    description: 'Add a simple page note to an uploaded PDF and download the edited result.',
    accept: '.pdf',
    endpoint: '/api/edit-pdf',
    category: 'PDF',
    output: 'PDF',
    input: 'PDF'
  },
  {
    slug: 'merge-pdf',
    title: 'Merge PDF Online',
    shortTitle: 'Merge PDF',
    description: 'Merge multiple PDF files into one organized document.',
    accept: '.pdf',
    endpoint: '/api/merge-pdf',
    category: 'PDF',
    output: 'PDF',
    input: 'PDF',
    multiple: true
  },
  {
    slug: 'split-pdf',
    title: 'Split PDF Online',
    shortTitle: 'Split PDF',
    description: 'Split a PDF into individual page files packaged for download.',
    accept: '.pdf',
    endpoint: '/api/split-pdf',
    category: 'PDF',
    output: 'ZIP',
    input: 'PDF'
  },
  {
    slug: 'compress-pdf',
    title: 'Compress PDF Online',
    shortTitle: 'Compress PDF',
    description: 'Optimize and rewrite PDF files for easier sharing.',
    accept: '.pdf',
    endpoint: '/api/compress-pdf',
    category: 'PDF',
    output: 'PDF',
    input: 'PDF'
  }
];

export function getTool(slug) {
  return tools.find((tool) => tool.slug === slug);
}
