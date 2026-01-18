'use client';

import { motion, Variants } from 'framer-motion';

/**
 * Subtle, elegant animation variants for the portfolio.
 * Designed to feel refined and not overwhelming.
 */

// Timing constants - slower for elegance
const DURATION = 0.6;

/**
 * Fade in with subtle upward movement
 */
export const fadeInUp: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: DURATION,
            ease: 'easeOut' as const,
        },
    },
};

/**
 * Fade in with subtle scale
 */
export const fadeInScale: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.98,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: DURATION,
            ease: 'easeOut' as const,
        },
    },
};

/**
 * Simple fade in
 */
export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: DURATION * 0.8,
            ease: 'easeOut' as const,
        },
    },
};

/**
 * Stagger children container
 */
export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
};

/**
 * Slide in from left
 */
export const slideInLeft: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: DURATION,
            ease: 'easeOut' as const,
        },
    },
};

/**
 * Slide in from right
 */
export const slideInRight: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: DURATION,
            ease: 'easeOut' as const,
        },
    },
};

// Re-export motion for direct use
export { motion };
