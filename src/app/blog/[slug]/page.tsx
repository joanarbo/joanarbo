import React from 'react';
import BlogPostClient from './BlogPostClient';
import dataEn from '@/data/data_en.json';
import dataEs from '@/data/data_es.json';
import dataCa from '@/data/data_ca.json';

export function generateStaticParams() {
    const allPosts = [
        ...dataEn.posts,
        ...dataEs.posts,
        ...dataCa.posts,
    ];

    // Get unique IDs to ensure we generate all necessary paths
    const uniqueSlugs = Array.from(new Set(allPosts.map((post) => post.id)));

    return uniqueSlugs.map((slug) => ({
        slug: slug,
    }));
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    return <BlogPostClient slug={params.slug} />;
}
