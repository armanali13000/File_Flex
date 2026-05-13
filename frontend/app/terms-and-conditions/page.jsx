export const metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and conditions for using FileFlex Tools.'
};

export default function TermsPage() {
  return (
    <section className="px-4 py-16">
      <article className="mx-auto max-w-4xl rounded-[32px] border border-slate-100 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-4xl font-black">Terms & Conditions</h1>
        <div className="mt-6 grid gap-4 leading-8 text-slate-600 dark:text-slate-300">
          <p>Use FileFlex Tools only for files you own, created, or have permission to convert.</p>
          <p>Do not upload malware, illegal content, private third-party documents, or files you are not authorized to process.</p>
          <p>Conversions are provided as-is. Availability and supported formats may vary by server configuration.</p>
          <p>Future premium features, accounts, or payments may have additional terms.</p>
        </div>
      </article>
    </section>
  );
}
