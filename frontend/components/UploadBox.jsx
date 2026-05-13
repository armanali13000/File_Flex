'use client';

import { Download, FileUp, Loader2, ShieldCheck, UploadCloud, X } from 'lucide-react';
import { useState } from 'react';
import { siteConfig } from '../lib/site';
import ProgressBar from './ProgressBar';

export default function UploadBox({ tool }) {
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [download, setDownload] = useState(null);

  function selectFiles(fileList) {
    setFiles(Array.from(fileList));
    setError('');
    setDownload(null);
  }

  async function convert() {
    if (!files.length) {
      setError('Please choose at least one file.');
      return;
    }

    setStatus('loading');
    setError('');
    setDownload(null);

    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));

    try {
      const response = await fetch(`${siteConfig.apiUrl}${tool.endpoint}`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.message || 'Conversion failed.');
      }

      const blob = await response.blob();
      const contentDisposition = response.headers.get('content-disposition') || '';
      const match = contentDisposition.match(/filename="?([^"]+)"?/i);
      const fileName = match?.[1] || `${tool.slug}-file.${tool.output.toLowerCase()}`;
      setDownload({ url: URL.createObjectURL(blob), fileName });
      setStatus('done');
    } catch (conversionError) {
      setError(conversionError.message);
      setStatus('error');
    }
  }

  return (
    <div className="rounded-[32px] border border-slate-100 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <label
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          selectFiles(event.dataTransfer.files);
        }}
        className="grid min-h-[280px] cursor-pointer place-items-center rounded-[26px] border-2 border-dashed border-blue-100 bg-blue-50/60 p-8 text-center transition hover:border-brand dark:border-slate-700 dark:bg-slate-950"
      >
        <input type="file" className="hidden" accept={tool.accept} multiple={Boolean(tool.multiple)} onChange={(event) => selectFiles(event.target.files)} />
        <div>
          <span className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-brand text-white shadow-glow">
            <UploadCloud className="h-10 w-10" />
          </span>
          <p className="mt-6 text-2xl font-black">Drop files here</p>
          <p className="mt-2 text-sm font-semibold text-slate-500">Supported: {tool.input}. Max file size depends on server settings.</p>
        </div>
      </label>

      {files.length > 0 && (
        <div className="mt-5 rounded-3xl bg-slate-50 p-4 dark:bg-slate-950">
          <p className="font-black">File preview</p>
          <div className="mt-3 grid gap-2">
            {files.map((file) => (
              <div key={`${file.name}-${file.size}`} className="flex items-center justify-between gap-3 rounded-2xl bg-white p-3 dark:bg-slate-900">
                <span className="flex min-w-0 items-center gap-2 text-sm font-semibold">
                  <FileUp className="h-4 w-4 shrink-0 text-brand" />
                  <span className="truncate">{file.name}</span>
                </span>
                <button onClick={() => setFiles((current) => current.filter((item) => item !== file))} aria-label="Remove file">
                  <X className="h-4 w-4 text-slate-400" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-5">
        <ProgressBar active={status === 'loading'} />
      </div>

      {error && <p className="mt-4 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-700 dark:bg-red-950/40 dark:text-red-200">{error}</p>}

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <button onClick={convert} disabled={status === 'loading'} className="focus-ring flex items-center justify-center gap-2 rounded-2xl bg-brand px-5 py-4 font-black text-white shadow-glow transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
          {status === 'loading' ? <Loader2 className="h-5 w-5 animate-spin" /> : <FileUp className="h-5 w-5" />}
          Convert
        </button>
        <a href={download?.url || '#'} download={download?.fileName} className={`flex items-center justify-center gap-2 rounded-2xl px-5 py-4 font-black transition ${download ? 'bg-emerald-500 text-white shadow-soft' : 'pointer-events-none bg-slate-100 text-slate-400 dark:bg-slate-800'}`}>
          <Download className="h-5 w-5" />
          Download
        </a>
      </div>

      <p className="mt-5 flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400">
        <ShieldCheck className="h-4 w-4 text-emerald-500" />
        Your files are processed securely and deleted automatically.
      </p>
    </div>
  );
}
