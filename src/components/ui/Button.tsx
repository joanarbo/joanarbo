'use client';

import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import styles from './Button.module.scss'; // We will create this or use global

// Since we are migrating from global SCSS, we can use global classes or migrate to modules.
// For a Design System in React, modules or CSS-in-JS is preferred to isolate styles,
// but for a strict clone, using the existing global classes is faster.
// However, to be "more optimized" and "React-way", I should probably use Modules or standard CSS classes.
// Given global SCSS is already set up with .btn-primary, etc., I will use those global classes for now.

type ButtonProps = {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    href?: string;
    target?: string;
    children: React.ReactNode;
    fullWidth?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

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
