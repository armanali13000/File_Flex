'use client';

import { ChevronDown, FileText, Menu, Moon, Sun, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { tools } from '../lib/site';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/80 px-4 py-3 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/75">
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand text-white shadow-glow">
            <FileText className="h-6 w-6" />
          </span>
          <span className="text-lg font-black tracking-tight">FileFlex Tools</span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <Link className="rounded-full px-4 py-2 text-sm font-bold text-slate-700 hover:bg-blue-50 hover:text-brand dark:text-slate-200 dark:hover:bg-slate-800" href="/">Home</Link>
          <Link className="rounded-full px-4 py-2 text-sm font-bold text-slate-700 hover:bg-blue-50 hover:text-brand dark:text-slate-200 dark:hover:bg-slate-800" href="/about">About</Link>
          <div className="relative">
            <button onClick={() => setToolsOpen((value) => !value)} className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-bold text-slate-700 hover:bg-blue-50 hover:text-brand dark:text-slate-200 dark:hover:bg-slate-800">
              Tools <ChevronDown className="h-4 w-4" />
            </button>
            {toolsOpen && (
              <div className="absolute right-0 mt-3 grid w-[520px] grid-cols-2 gap-2 rounded-3xl border border-slate-100 bg-white p-3 shadow-soft dark:border-slate-800 dark:bg-slate-900">
                {tools.map((tool) => (
                  <Link key={tool.slug} href={`/${tool.slug}`} onClick={() => setToolsOpen(false)} className="rounded-2xl p-3 hover:bg-blue-50 dark:hover:bg-slate-800">
                    <span className="block text-sm font-black">{tool.shortTitle}</span>
                    <span className="mt-1 block text-xs font-semibold text-slate-500">{tool.input} to {tool.output}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link className="rounded-full px-4 py-2 text-sm font-bold text-slate-700 hover:bg-blue-50 hover:text-brand dark:text-slate-200 dark:hover:bg-slate-800" href="/contact">Contact</Link>
          <ThemeToggle />
        </div>

        <button className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 md:hidden dark:border-slate-700" onClick={() => setOpen((value) => !value)} aria-label="Open menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="mx-auto mt-3 grid max-w-7xl gap-2 rounded-3xl border border-slate-100 bg-white p-3 shadow-soft md:hidden dark:border-slate-800 dark:bg-slate-900">
          <Link onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 font-bold" href="/">Home</Link>
          <Link onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 font-bold" href="/about">About</Link>
          {tools.map((tool) => (
            <Link key={tool.slug} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 font-bold hover:bg-blue-50 dark:hover:bg-slate-800" href={`/${tool.slug}`}>
              {tool.shortTitle}
            </Link>
          ))}
          <Link onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 font-bold" href="/contact">Contact</Link>
        </div>
      )}
    </header>
  );
}
