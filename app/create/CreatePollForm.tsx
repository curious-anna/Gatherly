'use client';

import { FormEvent, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2 } from 'lucide-react';
import { Button, LinkButton } from '@/components/Button';
import { Field, TextArea, TextInput } from '@/components/Field';
import { createPoll } from '@/lib/polls';

type DraftOption = {
  title: string;
  url: string;
  description: string;
};

const emptyOption = (): DraftOption => ({ title: '', url: '', description: '' });

export function CreatePollForm() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState<DraftOption[]>([emptyOption(), emptyOption()]);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validOptionCount = useMemo(
    () => options.filter((option) => option.title.trim().length > 0).length,
    [options],
  );

  function updateOption(index: number, key: keyof DraftOption, value: string) {
    setOptions((current) =>
      current.map((option, optionIndex) =>
        optionIndex === index ? { ...option, [key]: value } : option,
      ),
    );
  }

  function addOption() {
    setOptions((current) => [...current, emptyOption()]);
  }

  function removeOption(index: number) {
    setOptions((current) => current.filter((_, optionIndex) => optionIndex !== index));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Please add a poll title.');
      return;
    }

    if (validOptionCount < 2) {
      setError('Please add at least two options with titles.');
      return;
    }

    setIsSubmitting(true);

    try {
      const poll = await createPoll({ title, description, options });
      router.push(`/poll/${poll.id}`);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Something went wrong.');
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section className="rounded-[2rem] border border-stone-200 bg-white p-5 shadow-soft sm:p-7">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold tracking-tight">Create a poll</h1>
          <p className="mt-2 text-stone-500">Add a few choices, then share one simple link.</p>
        </div>

        <div className="space-y-5">
          <Field label="Poll title">
            <TextInput
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Where should we eat tonight?"
              required
            />
          </Field>

          <Field label="Description" hint="Optional">
            <TextArea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Add context, timing, budget, or anything voters should know."
            />
          </Field>
        </div>
      </section>

      <section className="rounded-[2rem] border border-stone-200 bg-white p-5 shadow-soft sm:p-7">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Options</h2>
            <p className="mt-1 text-sm text-stone-500">At least two option titles are required.</p>
          </div>
          <Button type="button" variant="secondary" onClick={addOption} className="gap-2">
            <Plus size={16} /> Add
          </Button>
        </div>

        <div className="space-y-4">
          {options.map((option, index) => (
            <div key={index} className="rounded-3xl border border-stone-200 bg-stone-50/70 p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-stone-600">Option {index + 1}</p>
                {options.length > 2 ? (
                  <button
                    type="button"
                    onClick={() => removeOption(index)}
                    className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium text-stone-500 transition hover:bg-white hover:text-red-600"
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                ) : null}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Option title">
                  <TextInput
                    value={option.title}
                    onChange={(event) => updateOption(index, 'title', event.target.value)}
                    placeholder="Cozy Italian spot"
                  />
                </Field>
                <Field label="URL" hint="Optional">
                  <TextInput
                    value={option.url}
                    onChange={(event) => updateOption(index, 'url', event.target.value)}
                    placeholder="https://example.com"
                    type="url"
                  />
                </Field>
              </div>

              <div className="mt-4">
                <Field label="Short description" hint="Optional">
                  <TextInput
                    value={option.description}
                    onChange={(event) => updateOption(index, 'description', event.target.value)}
                    placeholder="Good for groups, has vegetarian options"
                  />
                </Field>
              </div>
            </div>
          ))}
        </div>
      </section>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <LinkButton href="/" variant="ghost">Back home</LinkButton>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create poll'}
        </Button>
      </div>
    </form>
  );
}
