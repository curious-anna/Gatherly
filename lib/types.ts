export type Poll = {
  id: string;
  title: string;
  description: string | null;
  created_at: string;
};

export type PollOption = {
  id: string;
  poll_id: string;
  title: string;
  url: string | null;
  description: string | null;
  created_at: string;
};

export type Vote = {
  id: string;
  poll_id: string;
  option_id: string;
  created_at: string;
};

export type PollWithOptions = Poll & {
  poll_options: PollOption[];
};

export type ResultRow = PollOption & {
  voteCount: number;
  percentage: number;
};
