import { ArrowRight, FileCheck2, LockKeyhole, Sparkles } from 'lucide-react';
import Link from 'next/link';
import ToolCard from '../components/ToolCard';
import { tools } from '../lib/site';

export default function HomePage() {
  return (
    <>
      <section className="px-4 py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-bold text-brand shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <Sparkles className="h-4 w-4" />
              Free file converters, built for speed
            </div>
            <h1 className="mt-7 max-w-4xl text-5xl font-black tracking-tight sm:text-7xl">
              Convert files with premium tools, no account needed.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              FileFlex Tools helps you convert PDFs, Word documents, Excel sheets, and images with clean workflows and secure temporary processing.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/image-to-pdf" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand px-6 py-4 font-black text-white shadow-glow">
                Start converting <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="#tools" className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-4 font-black text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
                Browse tools
              </Link>
            </div>
          </div>

          <div className="glass rounded-[36px] p-5 shadow-soft">
            <div className="rounded-[28px] bg-gradient-to-br from-brand via-aqua to-violet p-8 text-white">
              <div className="grid gap-4">
                {[
                  ['Secure temporary files', LockKeyhole],
                  ['Separate SEO pages', FileCheck2],
                  ['Future premium-ready', Sparkles]
                ].map(([label, Icon]) => (
                  <div key={label} className="flex items-center gap-4 rounded-3xl bg-white/15 p-5 backdrop-blur">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-brand">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="text-lg font-black">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="tools" className="px-4 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-brand">All Tools</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight">Choose a converter</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
              Every converter has its own focused page, SEO metadata, upload workflow, and related-tool links.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}
          </div>
        </div>
      </section>
    </>
  );
}
