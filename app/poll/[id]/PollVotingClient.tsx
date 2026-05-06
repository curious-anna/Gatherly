'use client';

import { useEffect, useMemo, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Button, LinkButton } from '@/components/Button';
import { CopyLinkButton } from '@/components/CopyLinkButton';
import { Results } from '@/components/Results';
import { getPollResults, voteOnPoll } from '@/lib/polls';
import type { PollWithOptions, ResultRow } from '@/lib/types';

type PollVotingClientProps = {
  poll: PollWithOptions;
  initialResults: ResultRow[];
  initialTotalVotes: number;
};

export function PollVotingClient({ poll, initialResults, initialTotalVotes }: PollVotingClientProps) {
  const storageKey = useMemo(() => `poll-voted-${poll.id}`, [poll.id]);
  const [selectedOptionId, setSelectedOptionId] = useState('');
  const [hasVoted, setHasVoted] = useState(false);
  const [results, setResults] = useState(initialResults);
  const [totalVotes, setTotalVotes] = useState(initialTotalVotes);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRefreshingResults, setIsRefreshingResults] = useState(false);

  useEffect(() => {
    setHasVoted(window.localStorage.getItem(storageKey) === 'true');
  }, [storageKey]);

  useEffect(() => {
    void refreshResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poll.id]);

  async function refreshResults() {
    setIsRefreshingResults(true);

    try {
      const nextResults = await getPollResults(poll.poll_options);
      setResults(nextResults.rows);
      setTotalVotes(nextResults.totalVotes);
    } finally {
      setIsRefreshingResults(false);
    }
  }

  async function submitVote() {
    setError('');

    if (!selectedOptionId) {
      setError('Please choose one option before voting.');
      return;
    }

    if (hasVoted) {
      setError('This browser has already voted on this poll.');
      return;
    }

    setIsSubmitting(true);

    try {
      await voteOnPoll(poll.id, selectedOptionId);
      window.localStorage.setItem(storageKey, 'true');
      setHasVoted(true);
      await refreshResults();
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Could not save your vote.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto min-h-screen w-full max-w-4xl px-5 py-8 sm:px-8">
      <div className="mb-8 flex items-center justify-between gap-3">
        <LinkButton href="/" variant="ghost">Gatherly</LinkButton>
        <CopyLinkButton />
      </div>

      <section className="mb-6 rounded-[2rem] border border-stone-200 bg-white p-5 shadow-soft sm:p-7">
        <p className="mb-3 text-sm font-medium text-stone-500">Shared poll</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{poll.title}</h1>
        {poll.description ? (
          <p className="mt-4 whitespace-pre-line leading-7 text-stone-600">{poll.description}</p>
        ) : null}
      </section>

      <section className="mb-6 space-y-3">
        {poll.poll_options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          return (
            <label
              key={option.id}
              className={`block cursor-pointer rounded-[1.75rem] border bg-white p-5 shadow-sm transition hover:border-stone-300 ${
                isSelected ? 'border-stone-800 ring-4 ring-stone-200' : 'border-stone-200'
              } ${hasVoted ? 'cursor-default opacity-80' : ''}`}
            >
              <div className="flex items-start gap-4">
                <input
                  type="radio"
                  name="poll-option"
                  value={option.id}
                  checked={isSelected}
                  disabled={hasVoted}
                  onChange={() => setSelectedOptionId(option.id)}
                  className="mt-1 h-4 w-4 accent-stone-900"
                />
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg font-semibold">{option.title}</h2>
                  {option.description ? (
                    <p className="mt-1 text-sm leading-6 text-stone-500">{option.description}</p>
                  ) : null}
                  {option.url ? (
                    <a
                      href={option.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-stone-700 underline decoration-stone-300 underline-offset-4 hover:text-black"
                      onClick={(event) => event.stopPropagation()}
                    >
                      Open link <ExternalLink size={14} />
                    </a>
                  ) : null}
                </div>
              </div>
            </label>
          );
        })}
      </section>

      {error ? (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-stone-500">
          {hasVoted
            ? 'This browser already voted. Current results are shown below.'
            : 'Choose one option, then submit your vote.'}
        </p>
        <Button type="button" disabled={hasVoted || isSubmitting} onClick={submitVote}>
          {hasVoted ? 'Already voted' : isSubmitting ? 'Saving...' : 'Vote'}
        </Button>
      </div>

      <div className="space-y-3">
        {isRefreshingResults ? <p className="text-sm text-stone-500">Refreshing results...</p> : null}
        <Results rows={results} totalVotes={totalVotes} />
      </div>
    </div>
  );
}
