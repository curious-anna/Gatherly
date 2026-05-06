import { ArrowRight } from 'lucide-react';
import { LinkButton } from '@/components/Button';

export default function HomePage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-8 sm:px-8">
      <header className="flex items-center justify-between">
        <div className="text-lg font-semibold tracking-tight">Gatherly</div>
        <LinkButton href="/create" variant="secondary" className="hidden sm:inline-flex">
          Create a Poll
        </LinkButton>
      </header>

      <section className="grid flex-1 items-center gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="max-w-2xl">
          <p className="mb-4 inline-flex rounded-full border border-stone-200 bg-white px-4 py-2 text-sm text-stone-600 shadow-sm">
            Lightweight polls for everyday decisions
          </p>
          <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            Make group choices feel simple.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600">
            Create a clean poll, add links or notes, share one URL, and let everyone vote for their favorite option.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="/create" className="gap-2">
              Create a Poll <ArrowRight size={18} />
            </LinkButton>
          </div>
        </div>

        <div className="rounded-[2.5rem] border border-stone-200 bg-white p-5 shadow-soft">
          <div className="rounded-[2rem] bg-stone-50 p-5">
            <div className="mb-5">
              <p className="text-sm text-stone-500">Tonight’s dinner?</p>
              <h2 className="mt-1 text-2xl font-semibold">Pick a restaurant</h2>
            </div>
            <div className="space-y-3">
              {['Sushi place near the park', 'Cozy Italian spot', 'Thai noodles downtown'].map((option, index) => (
                <div key={option} className="rounded-2xl border border-stone-200 bg-white p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-medium">{option}</span>
                    <span className="rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-500">
                      {index === 0 ? '42%' : index === 1 ? '33%' : '25%'}
                    </span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-stone-100">
                    <div
                      className="h-2 rounded-full bg-stone-800"
                      style={{ width: index === 0 ? '42%' : index === 1 ? '33%' : '25%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
