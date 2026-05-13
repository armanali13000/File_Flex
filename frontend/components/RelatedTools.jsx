import ToolCard from './ToolCard';
import { tools } from '../lib/site';

export default function RelatedTools({ currentSlug }) {
  const related = tools.filter((tool) => tool.slug !== currentSlug).slice(0, 3);
  return (
    <section className="mt-12">
      <h2 className="text-3xl font-black">Related tools</h2>
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {related.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}
      </div>
    </section>
  );
}
