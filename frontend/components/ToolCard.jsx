import { ArrowRight, FileText } from 'lucide-react';
import Link from 'next/link';

export default function ToolCard({ tool }) {
  return (
    <Link href={`/${tool.slug}`} className="group rounded-[28px] border border-slate-100 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-glow dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-4">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-brand dark:bg-blue-950/60">
          <FileText className="h-6 w-6" />
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600 dark:bg-slate-800 dark:text-slate-300">{tool.category}</span>
      </div>
      <h3 className="mt-6 text-xl font-black">{tool.shortTitle}</h3>
      <p className="mt-3 min-h-20 leading-7 text-slate-600 dark:text-slate-300">{tool.description}</p>
      <div className="mt-5 flex items-center gap-2 text-sm font-black text-brand">
        Open tool <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
