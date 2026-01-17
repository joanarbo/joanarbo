import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

import data from '@/data/data_es.json';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://joanarbo.com';

    // Static routes (anchors treated as main page priority or separate sections if they were pages)
    // Since it's a single page app, the main URL is the most important.
    // However, if we want to list meaningful anchors or if we have other pages:
    const routes = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 1,
        },
    ];

    // Blog posts
    const posts = data.posts.map((post) => ({
        url: `${baseUrl}/blog/${post.id}`,
        lastModified: post.date ? new Date(post.date) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    return [...routes, ...posts];
}
