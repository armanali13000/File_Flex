export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for FileFlex Tools file converter website.'
};

export default function PrivacyPolicyPage() {
  return <LegalPage title="Privacy Policy" />;
}

function LegalPage({ title }) {
  return (
    <section className="px-4 py-16">
      <article className="mx-auto max-w-4xl rounded-[32px] border border-slate-100 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-4xl font-black">{title}</h1>
        <div className="mt-6 grid gap-4 leading-8 text-slate-600 dark:text-slate-300">
          <p>FileFlex Tools is designed for temporary file conversion. Users should upload only files they own or have permission to process.</p>
          <p>Uploaded files are used only to complete the requested conversion and are deleted automatically from temporary storage.</p>
          <p>We do not require login, signup, or payment details in this version of the product.</p>
          <p>Basic technical logs may be used for security, abuse prevention, and service reliability.</p>
        </div>
      </article>
    </section>
  );
}
