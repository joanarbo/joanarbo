'use client';

import React from 'react';
import { useData } from '@/hooks/useData';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import clsx from 'clsx';

interface FeaturedPostType {
    id: string;
    title: string;
    keyQuote?: string;
    series?: string;
    tags?: string[];
}

export function FeaturedQuote() {
    const data = useData();
    const { ref, isVisible } = useIntersectionObserver();

    // Find the first post with a keyQuote
    const featuredPost = data?.posts?.find((post: any) => post.keyQuote) as FeaturedPostType | undefined;

    if (!featuredPost?.keyQuote) return null;

    return (
        <section
            ref={ref}
            className={clsx("featured-quote-section fade-in-section", isVisible && "is-visible")}
        >
            <div className="container">
                <div className="featured-quote-card">
                    <div className="quote-icon">
                        <i className="ph-thin ph-quotes"></i>
                    </div>
                    <blockquote className="featured-quote-text">
                        "{featuredPost.keyQuote}"
                    </blockquote>
                    <cite className="featured-quote-source">
                        — {featuredPost.title}
                    </cite>
                    {featuredPost.series && (
                        <span className="featured-quote-series">{featuredPost.series}</span>
                    )}
                </div>
            </div>
        </section>
    );
}
