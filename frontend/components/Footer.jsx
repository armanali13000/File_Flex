import Link from 'next/link';
import { tools } from '../lib/site';

export default function Footer() {
  return (
    <footer className="border-t border-white/70 bg-white/80 px-4 py-12 dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <p className="text-xl font-black">FileFlex Tools</p>
          <p className="mt-3 max-w-xl leading-7 text-slate-600 dark:text-slate-300">
            Free, secure file converter tools. Your files are processed securely and deleted automatically.
          </p>
        </div>
        <div>
          <p className="font-black">Popular tools</p>
          <div className="mt-3 grid gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
            {tools.slice(0, 5).map((tool) => <Link key={tool.slug} href={`/${tool.slug}`}>{tool.shortTitle}</Link>)}
          </div>
        </div>
        <div>
          <p className="font-black">Company</p>
          <div className="mt-3 grid gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-and-conditions">Terms & Conditions</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
