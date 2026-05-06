import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { clsx } from 'clsx';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
};

type LinkButtonProps = {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
};

const variants = {
  primary: 'bg-ink text-white hover:bg-black',
  secondary: 'border border-stone-300 bg-white text-ink hover:border-stone-400 hover:bg-stone-50',
  ghost: 'text-stone-600 hover:text-ink',
};

const baseClass =
  'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60';

export function Button({ children, variant = 'primary', className, ...props }: ButtonProps) {
  return (
    <button className={clsx(baseClass, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}

export function LinkButton({ href, children, variant = 'primary', className }: LinkButtonProps) {
  return (
    <Link className={clsx(baseClass, variants[variant], className)} href={href}>
      {children}
    </Link>
  );
}
