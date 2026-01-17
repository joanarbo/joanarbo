import React from 'react';
import clsx from 'clsx';

type BadgeProps = {
    children: React.ReactNode;
    variant?: 'default' | 'outline' | 'ghost' | 'contrast';
    color?: string; // Optional custom color override
    className?: string;
};

export function Badge({ children, variant = 'default', className, color }: BadgeProps) {
    return (
        <span
            className={clsx('tag', `tag-${variant}`, className)}
            style={color ? { backgroundColor: color, borderColor: color } : undefined}
        >
            {children}
        </span>
    );
}
