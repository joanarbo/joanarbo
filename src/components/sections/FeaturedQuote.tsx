'use client';

import React from 'react';
import { useData } from '@/hooks/useData';
import { motion } from 'framer-motion';

interface FeaturedPostType {
    id: string;
    title: string;
    keyQuote?: string;
    series?: string;
    tags?: string[];
}

const container = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
};

const item = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' as const },
    },
};

export function FeaturedQuote() {
    const data = useData();

    // Find the first post with a keyQuote
    const featuredPost = data?.posts?.find((post: any) => post.keyQuote) as FeaturedPostType | undefined;

    if (!featuredPost?.keyQuote) return null;

    return (
        <section className="featured-quote-section">
            <div className="container">
                <motion.div
                    className="featured-quote-card"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    variants={container}
                >
                    <motion.div className="quote-icon" variants={item}>
                        <i className="ph-thin ph-quotes"></i>
                    </motion.div>
                    <motion.blockquote className="featured-quote-text" variants={item}>
                        "{featuredPost.keyQuote}"
                    </motion.blockquote>
                    <motion.cite className="featured-quote-source" variants={item}>
                        — {featuredPost.title}
                    </motion.cite>
                    {featuredPost.series && (
                        <motion.span className="featured-quote-series" variants={item}>
                            {featuredPost.series}
                        </motion.span>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
