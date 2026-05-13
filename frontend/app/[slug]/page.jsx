import { notFound } from 'next/navigation';
import FAQ from '../../components/FAQ';
import RelatedTools from '../../components/RelatedTools';
import UploadBox from '../../components/UploadBox';
import { getTool, siteConfig, tools } from '../../lib/site';

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};
  const url = `${siteConfig.url}/${tool.slug}`;
  return {
    title: tool.title,
    description: tool.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${tool.title} - Free Online Tool`,
      description: tool.description,
      url,
      type: 'website'
    }
  };
}

export default async function ToolPage({ params }) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();

  const faq = [
    [`Is ${tool.shortTitle} free?`, `Yes. ${tool.title} is free to use without login, signup, or payment.`],
    ['Are my files stored permanently?', 'No. Your files are processed securely and deleted automatically after conversion.'],
    ['What file types are supported?', `This tool accepts ${tool.input} files and creates ${tool.output} output.`]
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.title,
    applicationCategory: 'FileConverter',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    url: `${siteConfig.url}/${tool.slug}`
  };

  return (
    <div className="px-4 py-12 sm:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-brand">{tool.category} converter</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">{tool.title}</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">{tool.description}</p>
          <div className="mt-6 rounded-3xl border border-blue-100 bg-white p-5 text-sm font-bold text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
            Supported input: {tool.input}. Output format: {tool.output}. Your files are processed securely and deleted automatically.
          </div>
        </section>
        <UploadBox tool={tool} />
      </div>

      <div className="mx-auto mt-14 max-w-7xl">
        <section className="grid gap-6 lg:grid-cols-2">
          <InfoBlock title="How to use this tool" items={[
            `Upload your ${tool.input} file${tool.multiple ? 's' : ''}.`,
            'Wait for the secure conversion process to finish.',
            `Download your ${tool.output} result file.`
          ]} />
          <InfoBlock title="Why use this tool" items={[
            'No login, signup, or payment required.',
            'Clean interface with progress and error handling.',
            'Temporary processing with automatic file deletion.'
          ]} />
        </section>
        <FAQ items={faq} />
        <RelatedTools currentSlug={tool.slug} />
      </div>
    </div>
  );
}

function InfoBlock({ title, items }) {
  return (
    <section className="rounded-[32px] border border-slate-100 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-2xl font-black">{title}</h2>
      <ol className="mt-5 grid gap-3">
        {items.map((item, index) => (
          <li key={item} className="flex gap-3 leading-7 text-slate-600 dark:text-slate-300">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue-50 text-sm font-black text-brand dark:bg-blue-950">{index + 1}</span>
            {item}
          </li>
        ))}
      </ol>
    </section>
  );
}
