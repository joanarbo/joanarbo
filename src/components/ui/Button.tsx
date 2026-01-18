'use client';

import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

type ButtonProps = {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    href?: string;
    target?: string;
    children: React.ReactNode;
    fullWidth?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Button component with multiple variants and sizes.
 * 
 * @example
 * <Button variant="primary">Click me</Button>
 * <Button variant="secondary" size="sm" href="/about">Learn more</Button>
 */
export function Button({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    className,
    href,
    children,
    ...props
}: ButtonProps) {
    const classes = clsx(
        'btn',
        `btn-${variant}`,
        size !== 'md' && `btn-${size}`,
        fullWidth && 'btn-full-width',
        className
    );

    if (href) {
        return (
            <Link href={href} className={classes} {...(props as any)}>
                {children}
            </Link>
        );
    }

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
}
