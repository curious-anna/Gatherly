'use client';

import { useState } from 'react';
import { Button } from '@/components/Button';

type CopyLinkButtonProps = {
  url?: string;
};

export function CopyLinkButton({ url }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    const link = url ?? window.location.href;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <Button type="button" variant="secondary" onClick={copyLink}>
      {copied ? 'Copied!' : 'Copy poll link'}
    </Button>
  );
}
