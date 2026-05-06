import { LinkButton } from '@/components/Button';

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-5 text-center">
      <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-soft">
        <p className="text-sm font-medium text-stone-500">404</p>
        <h1 className="mt-2 text-3xl font-semibold">Poll not found</h1>
        <p className="mt-3 text-stone-500">
          This poll may have been deleted, or the link may be incorrect.
        </p>
        <div className="mt-6">
          <LinkButton href="/">Go home</LinkButton>
        </div>
      </div>
    </div>
  );
}
