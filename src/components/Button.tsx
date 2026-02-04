import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
}

export function Button({
    children,
    variant = 'primary',
    className = '',
    ...props
}: ButtonProps) {
    const base =
        'min-h-[44px] px-4 py-2.5 sm:py-2 rounded-lg font-medium border border-transparent cursor-pointer transition-colors touch-manipulation';
    const variants = {
        primary: 'bg-[var(--color-primary-bg)] text-white hover:opacity-90',
        secondary: 'bg-[var(--color-grey)] text-white hover:opacity-90',
    };
    return (
        <button
            type="button"
            className={`${base} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
