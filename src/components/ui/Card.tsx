import React from 'react';
import clsx from 'clsx';

type CardProps = {
    children: React.ReactNode;
    className?: string;
    /** Enable hover animation with lift and shadow */
    hover?: boolean;
    /** Apply glassmorphism effect */
    glass?: boolean;
    /** Padding size using utility classes */
    padding?: 'none' | 'sm' | 'md' | 'lg';
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Card component with optional glass effect and hover animation.
 * 
 * @example
 * <Card glass hover padding="md">Content</Card>
 */
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
                glass && 'glass-panel',
                hover && 'card-hover',
                `p-${padding}`,
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
