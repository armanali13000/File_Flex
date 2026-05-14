# FileFlex Tools

FileFlex Tools is a premium, SEO-friendly file converter website with a Next.js frontend and Express backend. It is built without login, signup, or payments for now, while keeping the structure ready for future accounts, premium limits, and billing.

## Apps

- `frontend`: Next.js + React + Tailwind CSS
- `backend`: Node.js + Express conversion API

## Local Setup

```bash
npm.cmd run install:all
copy frontend\.env.example frontend\.env.local
copy backend\.env.example backend\.env
npm.cmd run dev
```

Frontend: `http://localhost:3000`

Backend: `http://localhost:5000`

## Conversion Notes

The backend includes real converter routes with secure upload handling, temporary storage, validation, rate limiting, and auto-cleanup.

- Image/JPG/PNG to PDF: `sharp` + `pdf-lib`
- Merge/Split/Edit/Compress PDF: `pdf-lib`
- PDF text extraction: `pdf-parse`
- PDF to Excel: `pdf-parse` + `exceljs`
- PDF to Word: extracted text document generation
- Word/Excel to PDF: LibreOffice command line when installed on the server

For production Word/Excel conversion, install LibreOffice on Render/Railway and set `LIBREOFFICE_PATH` if needed.

## Deployment

### Frontend on Vercel

Root directory: `frontend`

Build command:

```bash
npm run build
```

Environment:

```bash
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Backend on Render/Railway

For Word/Excel to PDF in production, deploy the backend to a host that can run LibreOffice. Vercel serverless functions do not include the `soffice` command.

Root directory: `backend`

Runtime: Docker

Start command:

```bash
npm start
```

Environment:

```bash
PORT=5000
CLIENT_ORIGIN=https://your-domain.com
MAX_FILE_SIZE_MB=25
TEMP_FILE_TTL_MINUTES=30
LIBREOFFICE_PATH=soffice
```

After the backend is deployed, update the Vercel frontend environment:

```bash
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
NEXT_PUBLIC_SITE_URL=https://fileflexone.vercel.app
```

## Future Roadmap

- User accounts and conversion history
- Premium conversion limits
- Payment provider integration
- Queue workers for heavy conversions
- Virus scanning integration
- Cloud storage export
