# Gatherly Polls

A clean, simple web app for creating and sharing polls. Users can create a poll, add multiple options with optional links/descriptions, share the generated poll URL, vote once from a browser, and view results.

## Tech stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase
- Vercel-ready deployment

## Features

- Home page with clear product positioning and use cases
- Create poll form with dynamic add/remove options
- Supabase-backed polls, options, and votes
- Unique poll URL using the poll UUID
- One vote per browser using `localStorage`
- Results with vote counts, percentages, progress bars, and total votes
- Copy poll link button
- Loading, validation, empty, and error states
- No authentication required for the first version

## Supabase setup

1. Create a Supabase project.
2. Open the SQL editor.
3. Run the SQL in `supabase/schema.sql`.
4. Copy your project URL and anon key.
5. Create a `.env.local` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

The schema enables row-level security and adds public insert/select policies so the no-auth prototype works.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deploy to Vercel

1. Import the repository into Vercel.
2. Add the same environment variables from `.env.example`.
3. Deploy.

## Future extension ideas

- User accounts and creator dashboards
- Private or unlisted polls
- Multiple-choice voting
- Comments or discussion threads
- Poll expiration dates
- More advanced duplicate vote protection
