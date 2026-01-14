const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data.json');
const OUTPUT_DIR = path.join(__dirname, '../');
const SITE_URL = 'https://joanarbo.com';
const AUTHOR_NAME = 'Joan Arbo';
const SITE_TITLE = 'Joan Arbo - AI Design Architect';
const SITE_DESCRIPTION = 'Senior System Builder. AI Design Architect at Amazon. Exploring the intersection of design systems, AI, and flow state.';

function loadData() {
    try {
        const rawData = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(rawData);
    } catch (error) {
        console.error('Error loading data.json:', error);
        process.exit(1);
    }
}

function escapeXml(unsafe) {
    return unsafe.replace(/[<>&'"]/g, function (c) {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
        }
    });
}

function generateSitemap(data) {
    const posts = data.posts || [];
    const ideas = data.ideas || [];

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${SITE_URL}/</loc>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>`;

    // Add Posts
    posts.forEach(post => {
        const lastMod = post.date ? new Date(post.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
        sitemap += `
    <url>
        <loc>${SITE_URL}/#post/${post.id}</loc>
        <lastmod>${lastMod}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>`;
    });

    // Add Ideas (if they have specialized content views)
    ideas.forEach(idea => {
        sitemap += `
    <url>
        <loc>${SITE_URL}/#idea/${idea.id}</loc>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>`;
    });

    sitemap += `
</urlset>`;

    fs.writeFileSync(path.join(OUTPUT_DIR, 'sitemap.xml'), sitemap);
    console.log(`✅ Generated sitemap.xml with ${posts.length + ideas.length + 1} URLs`);
}

function generateRSS(data) {
    const posts = data.posts || [];
    const now = new Date().toUTCString();

    let rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <image>
        <url>${SITE_URL}/assets/images/favicon.png</url>
        <title>${escapeXml(SITE_TITLE)}</title>
        <link>${SITE_URL}</link>
    </image>`;

    posts.forEach(post => {
        const pubDate = post.date ? new Date(post.date).toUTCString() : now;
        const link = `${SITE_URL}/#post/${post.id}`;

        let content = post.content || post.excerpt;
        // Basic Markdown cleanup for description (remove images, headers)
        const description = post.excerpt ? escapeXml(post.excerpt) : '';

        rss += `
    <item>
        <title>${escapeXml(post.title)}</title>
        <link>${link}</link>
        <guid isPermaLink="false">${post.id}</guid>
        <pubDate>${pubDate}</pubDate>
        <dc:creator><![CDATA[${AUTHOR_NAME}]]></dc:creator>
        <description>${description}</description>
        <content:encoded><![CDATA[${content}]]></content:encoded>
        ${(post.tags || []).map(tag => `<category>${escapeXml(tag)}</category>`).join('')}
    </item>`;
    });

    rss += `
</channel>
</rss>`;

    fs.writeFileSync(path.join(OUTPUT_DIR, 'feed.xml'), rss);
    console.log(`✅ Generated feed.xml with ${posts.length} items`);
}

function generateRobots() {
    const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml`;

    fs.writeFileSync(path.join(OUTPUT_DIR, 'robots.txt'), robots);
    console.log(`✅ Generated robots.txt`);
}

function main() {
    console.log('🚀 Starting SEO generation...');
    const data = loadData();
    generateSitemap(data);
    generateRSS(data);
    generateRobots();
    console.log('✨ SEO generation complete!');
}

main();
