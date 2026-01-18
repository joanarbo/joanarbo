import React from 'react';
import clsx from 'clsx';

type BadgeProps = {
    children: React.ReactNode;
    /** Visual style variant */
    variant?: 'default' | 'outline' | 'ghost' | 'contrast';
    /** Optional custom color override (background and border) */
    color?: string;
    className?: string;
};

/**
 * Badge/Tag component for labels and categories.
 * 
 * @example
 * <Badge variant="outline">Category</Badge>
 * <Badge variant="contrast">Highlighted</Badge>
 */
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
