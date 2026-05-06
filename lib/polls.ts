import { supabase } from '@/lib/supabase';
import type { Poll, PollOption, PollWithOptions, ResultRow, Vote } from '@/lib/types';

export type CreatePollInput = {
  title: string;
  description?: string;
  options: Array<{
    title: string;
    url?: string;
    description?: string;
  }>;
};

export async function createPoll(input: CreatePollInput): Promise<Poll> {
  const title = input.title.trim();
  const description = input.description?.trim() || null;
  const options = input.options
    .map((option) => ({
      title: option.title.trim(),
      url: option.url?.trim() || null,
      description: option.description?.trim() || null,
    }))
    .filter((option) => option.title.length > 0);

  if (!title) {
    throw new Error('Please add a poll title.');
  }

  if (options.length < 2) {
    throw new Error('Please add at least two options.');
  }

  const { data: poll, error: pollError } = await supabase
    .from('polls')
    .insert({ title, description })
    .select('*')
    .single<Poll>();

  if (pollError || !poll) {
    throw new Error(pollError?.message || 'Could not create the poll.');
  }

  const { error: optionsError } = await supabase.from('poll_options').insert(
    options.map((option) => ({
      poll_id: poll.id,
      title: option.title,
      url: option.url,
      description: option.description,
    })),
  );

  if (optionsError) {
    throw new Error(optionsError.message);
  }

  return poll;
}

export async function getPoll(id: string): Promise<PollWithOptions | null> {
  const { data, error } = await supabase
    .from('polls')
    .select('*, poll_options(*)')
    .eq('id', id)
    .single<PollWithOptions>();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw new Error(error.message);
  }

  return {
    ...data,
    poll_options: [...data.poll_options].sort((a, b) =>
      a.created_at.localeCompare(b.created_at),
    ),
  };
}

export async function voteOnPoll(pollId: string, optionId: string): Promise<void> {
  const { error } = await supabase.from('votes').insert({
    poll_id: pollId,
    option_id: optionId,
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function getPollResults(options: PollOption[]): Promise<{
  rows: ResultRow[];
  totalVotes: number;
}> {
  if (options.length === 0) {
    return { rows: [], totalVotes: 0 };
  }

  const pollId = options[0].poll_id;
  const { data, error } = await supabase
    .from('votes')
    .select('*')
    .eq('poll_id', pollId)
    .returns<Vote[]>();

  if (error) {
    throw new Error(error.message);
  }

  const counts = new Map<string, number>();
  for (const vote of data ?? []) {
    counts.set(vote.option_id, (counts.get(vote.option_id) ?? 0) + 1);
  }

  const totalVotes = data?.length ?? 0;
  const rows = options.map((option) => {
    const voteCount = counts.get(option.id) ?? 0;
    return {
      ...option,
      voteCount,
      percentage: totalVotes === 0 ? 0 : Math.round((voteCount / totalVotes) * 100),
    };
  });

  return { rows, totalVotes };
}
