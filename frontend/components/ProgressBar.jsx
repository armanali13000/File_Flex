export default function ProgressBar({ active }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
      <div className={`h-full rounded-full bg-gradient-to-r from-brand via-aqua to-violet ${active ? 'w-full animate-pulse' : 'w-0'} transition-all duration-700`} />
    </div>
  );
}
