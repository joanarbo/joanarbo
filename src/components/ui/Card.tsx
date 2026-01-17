import React from 'react';
import clsx from 'clsx';

type CardProps = {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    glass?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
} & React.HTMLAttributes<HTMLDivElement>;

export function Card({
    children,
    className,
    hover = false,
    glass = true,
    padding = 'md',
    ...props
}: CardProps) {
    return (
        <div
            className={clsx(
                'card',
                glass && 'glass-panel', // Assuming we add this utility class or use mixin in globals
                hover && 'card-hover',
                `p-${padding}`, // Utility for padding if we add it, or just use style
                className
            )}
            style={{
                padding: padding === 'none' ? '0' : padding === 'sm' ? '1rem' : padding === 'lg' ? '2.5rem' : '1.5rem',
                ...props.style
            }}
            {...props}
        >
            {children}
        </div>
    );
}
