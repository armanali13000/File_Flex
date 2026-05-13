export const metadata = {
  title: 'Contact',
  description: 'Contact FileFlex Tools for support and product feedback.'
};

export default function ContactPage() {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-brand">Contact</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">Talk to FileFlex Tools</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">Send support questions, conversion feedback, or partnership requests.</p>
      </div>
      <form className="mx-auto mt-10 grid max-w-2xl gap-4 rounded-[32px] border border-slate-100 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 outline-none focus:border-brand dark:border-slate-700 dark:bg-slate-950" placeholder="Name" />
        <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 outline-none focus:border-brand dark:border-slate-700 dark:bg-slate-950" placeholder="Email" type="email" />
        <textarea className="min-h-36 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 outline-none focus:border-brand dark:border-slate-700 dark:bg-slate-950" placeholder="Message" />
        <button className="rounded-2xl bg-brand px-5 py-4 font-black text-white shadow-glow">Send Message</button>
      </form>
    </section>
  );
}
