'use client';

import React, { useState } from 'react';
import { useData } from '@/hooks/useData';
import { useTranslation } from '@/hooks/useTranslation';
import Link from 'next/link';
// import Image from 'next/image'; // Use standard img for now to match styles easily, or switch to Image

export function BlogSection() {
    const { t } = useTranslation();
    const data = useData();
    const [searchQuery, setSearchQuery] = useState('');

    const posts = data?.posts || [];

    // Filter posts based on search
    const filteredPosts = posts.filter((post: any) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q);
    });

    return (
        <section className="blog-section" id="blog">
            <div className="container">
                <div className="section-header">
                    <div>
                        <span className="section-label">{t.sections.blog.label}</span>
                        <h2 className="section-title">{t.sections.blog.title}</h2>
                        <p className="section-subtitle">{t.sections.blog.subtitle}</p>
                    </div>

                    <div className="search-box">
                        <i className="ph-thin ph-magnifying-glass search-icon"></i>
                        <input
                            type="text"
                            className="search-input"
                            placeholder={t.sections?.blog?.searchPlaceholder || "Search articles..."}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="posts-grid">
                    {filteredPosts.map((post: any, index: number) => (
                        <Link href={`/blog/${post.id}`} key={index} className={`post-card ${post.featured ? 'featured' : ''}`}>
                            <div className="post-cover">
                                <img src={post.image || post.coverImage || 'https://placehold.co/600x400/1a1a1a/FFF'} alt={post.title} />
                                {post.series && <span className="post-series-badge">{post.series}</span>}
                            </div>

                            <div className="post-content-wrap">
                                <div className="post-meta">
                                    <span className="post-date">{post.date}</span>
                                    <span className="meta-sep"></span>
                                    <span className="post-read-time">{post.readTime}</span>
                                </div>
                                <h3 className="post-title">{post.title}</h3>
                                <p className="post-excerpt">{post.description || post.excerpt}</p>

                                <div className="post-footer">
                                    <div className="post-tags">
                                        {post.tags?.slice(0, 2).map((tag: string, i: number) => (
                                            <span key={i} className="tag">
                                                <i className="ph-thin ph-hash"></i>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <span className="read-more-link">
                                        {t.labels?.readArticle || 'Read Article'}
                                        <i className="ph ph-arrow-right"></i>
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
