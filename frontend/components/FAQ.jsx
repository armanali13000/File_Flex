export default function FAQ({ items }) {
  return (
    <section className="mt-12">
      <h2 className="text-3xl font-black">Frequently asked questions</h2>
      <div className="mt-6 grid gap-4">
        {items.map(([question, answer]) => (
          <details key={question} className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <summary className="cursor-pointer text-lg font-black">{question}</summary>
            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
