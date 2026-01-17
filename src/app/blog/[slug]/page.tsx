'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useData } from '@/hooks/useData';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';

export default function BlogPost() {
    const params = useParams();
    const data = useData();
    const { t } = useTranslation();
    const slug = typeof params.slug === 'string' ? params.slug : '';

    const post = data?.posts?.find((p: any) => p.id === slug);

    if (!post) {
        return (
            <div className="blog-post-page">
                <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
                    <h1>Post not found</h1>
                    <Link href="/#blog" className="back-link">
                        <i className="ph-thin ph-arrow-left"></i> Back to home
                    </Link>
                </div>
            </div>
        );
    }

    const renderContent = (content: string | undefined) => {
        if (!content) return null;
        let processed = content;

        // Handle Headers
        processed = processed.replace(/^# (.*$)/gim, '<h1>$1</h1>');
        processed = processed.replace(/^## (.*$)/gim, '<h2>$1</h2>');
        processed = processed.replace(/^### (.*$)/gim, '<h3>$1</h3>');

        // Handle Bold
        processed = processed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // Handle Italic
        processed = processed.replace(/\*(.*?)\*/g, '<em>$1</em>');

        // Handle Blockquotes
        processed = processed.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');

        // Handle Code Blocks
        processed = processed.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

        // Handle Code Inline
        processed = processed.replace(/`([^`]+)`/g, '<code>$1</code>');

        // Replace newlines with breaks
        processed = processed.replace(/\n/g, '<br />');

        return <div dangerouslySetInnerHTML={{ __html: processed }} />;
    };

    // Ensure image path is absolute (relative to public)
    const displayImage = post.image?.startsWith('http')
        ? post.image
        : post.image?.startsWith('/')
            ? post.image
            : `/${post.image}`;

    return (
        <article className="blog-post-page">
            <div className="container">
                <Link href="/#blog" className="back-link">
                    <i className="ph-bold ph-arrow-left"></i> {t.labels?.back || 'Back'}
                </Link>

                <header className="post-header">
                    <div className="post-meta">
                        <span>{post.date}</span>
                        <span className="meta-sep">•</span>
                        <span>{post.readTime}</span>
                    </div>
                    <h1 className="post-title">{post.title}</h1>
                    {post.tags && (
                        <div className="post-tags">
                            {post.tags.map((tag: string, i: number) => (
                                <span key={i} className="tag">{tag}</span>
                            ))}
                        </div>
                    )}
                </header>

                {(post.image) && (
                    <div className="post-image-container">
                        <img
                            src={displayImage || '/placeholder.jpg'}
                            alt={post.title}
                        />
                    </div>
                )}

                <div className="post-content">
                    {renderContent(post.content)}
                </div>

                <div style={{
                    marginTop: '4rem',
                    paddingTop: '2rem',
                    borderTop: '1px solid var(--line-color)',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    <p style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.9rem',
                        color: 'var(--text-secondary-color)'
                    }}>
                        {t.sections?.blog?.share || "Enjoyed this read?"}
                    </p>
                    <Link href="#contact" className="btn-primary" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '12px 24px',
                        background: 'var(--text-color)',
                        color: 'var(--bg-color)',
                        borderRadius: '4px',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        fontFamily: 'var(--font-mono)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}>
                        {t.nav?.contact || "Let's discuss"}
                    </Link>
                </div>
            </div>
        </article>
    );
}
