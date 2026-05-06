import type { ResultRow } from '@/lib/types';

type ResultsProps = {
  rows: ResultRow[];
  totalVotes: number;
};

export function Results({ rows, totalVotes }: ResultsProps) {
  return (
    <section className="rounded-[2rem] border border-stone-200 bg-white p-5 shadow-soft sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Results</h2>
          <p className="text-sm text-stone-500">
            {totalVotes === 1 ? '1 vote' : `${totalVotes} votes`} so far
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {rows.map((row) => (
          <div key={row.id} className="space-y-2">
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="font-medium text-stone-800">{row.title}</span>
              <span className="shrink-0 text-stone-500">
                {row.voteCount} · {row.percentage}%
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-stone-100">
              <div
                className="h-full rounded-full bg-stone-800 transition-all"
                style={{ width: `${row.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
