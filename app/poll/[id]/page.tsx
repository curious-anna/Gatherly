import { notFound } from 'next/navigation';
import { getPoll, getPollResults } from '@/lib/polls';
import { PollVotingClient } from '@/app/poll/[id]/PollVotingClient';

type PollPageProps = {
  params: {
    id: string;
  };
};

export const dynamic = 'force-dynamic';

export default async function PollPage({ params }: PollPageProps) {
  const poll = await getPoll(params.id);

  if (!poll) {
    notFound();
  }

  const results = await getPollResults(poll.poll_options);

  return (
    <PollVotingClient
      poll={poll}
      initialResults={results.rows}
      initialTotalVotes={results.totalVotes}
    />
  );
}
