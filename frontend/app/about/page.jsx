import { ShieldCheck, Sparkles, TimerReset } from 'lucide-react';

export const metadata = {
  title: 'About',
  description: 'Learn about FileFlex Tools and its free online file conversion tools.'
};

const values = [
  {
    title: 'Simple by design',
    description: 'Choose a tool, upload your file, and download the converted result without creating an account.',
    icon: Sparkles
  },
  {
    title: 'Privacy aware',
    description: 'Files are processed only for the requested conversion and cleaned from temporary storage automatically.',
    icon: ShieldCheck
  },
  {
    title: 'Built for useful work',
    description: 'The toolset focuses on everyday PDF, Word, Excel, and image conversions people need often.',
    icon: TimerReset
  }
];

export default function AboutPage() {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-brand">About</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">Free file tools that stay out of your way</h1>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
          FileFlex Tools helps you convert, merge, split, compress, and prepare common file formats directly from your browser.
          It is made for fast, everyday document tasks without login walls or complicated setup.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-3">
        {values.map((value) => {
          const Icon = value.icon;

          return (
            <article key={value.title} className="rounded-[28px] border border-slate-100 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-brand dark:bg-slate-800">
                <Icon className="h-6 w-6" />
              </span>
              <h2 className="mt-5 text-xl font-black">{value.title}</h2>
              <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{value.description}</p>
            </article>
          );
        })}
      </div>

      <article className="mx-auto mt-8 max-w-4xl rounded-[32px] border border-slate-100 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-2xl font-black">Why FileFlex Tools exists</h2>
        <div className="mt-5 grid gap-4 leading-8 text-slate-600 dark:text-slate-300">
          <p>
            File conversion should feel quick and dependable. This website brings the most common document and image workflows
            into one focused place, with clear upload limits and secure temporary processing.
          </p>
          <p>
            The current version is free to use and does not require accounts, payments, or subscriptions. Future upgrades may add
            optional premium features while keeping the core experience straightforward.
          </p>
        </div>
      </article>
    </section>
  );
}
