
const fs = require('fs');
const https = require('https');

const RSS_URL = 'https://buildsystems.substack.com/feed';

const fetchFeed = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', (err) => reject(err));
    });
};

const htmlToMarkdown = (html) => {
    if (!html) return '';
    let md = html
        .replace(/<p>(.*?)<\/p>/g, '$1\n\n')
        .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
        .replace(/<em>(.*?)<\/em>/g, '*$1*')
        .replace(/<blockquote>(.*?)<\/blockquote>/g, '> $1\n\n')
        .replace(/<h3>(.*?)<\/h3>/g, '### $1\n')
        .replace(/<h4>(.*?)<\/h4>/g, '#### $1\n')
        .replace(/<a href="(.*?)".*?>(.*?)<\/a>/g, '[$2]($1)')
        .replace(/<ul>(.*?)<\/ul>/gs, (match, p1) => p1.replace(/<li>(.*?)<\/li>/g, '* $1\n'))
        .replace(/<ol>(.*?)<\/ol>/gs, (match, p1) => p1.replace(/<li>(.*?)<\/li>/g, '1. $1\n')) // Simple ordered list
        .replace(/<pre><code>(.*?)<\/code><\/pre>/gs, '```\n$1\n```\n')
        .replace(/<img.*?src="(.*?)".*?>/g, '![]($1)')
        .replace(/<figure>.*?<\/figure>/gs, '') // Remove complex figures for now or simplify
        .replace(/<div.*?>.*?<\/div>/gs, '') // Remove divs
        .replace(/&nbsp;/g, ' ')
        .replace(/&#8216;/g, "'").replace(/&#8217;/g, "'").replace(/&#8220;/g, '"').replace(/&#8221;/g, '"')
        .replace(/<!\[CDATA\[|\]\]>/g, '');

    // Clean up multiple newlines
    return md.replace(/\n\s*\n/g, '\n\n').trim();
};

const extractItems = (xml) => {
    const items = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;
    while ((match = itemRegex.exec(xml)) !== null) {
        const itemXml = match[1];
        const titleMatch = /<title><!\[CDATA\[(.*?)\]\]><\/title>/.exec(itemXml) || /<title>(.*?)<\/title>/.exec(itemXml);
        const encodedContentMatch = /<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/.exec(itemXml);
        const linkMatch = /<link>(.*?)<\/link>/.exec(itemXml);

        if (titleMatch && encodedContentMatch) {
            items.push({
                title: titleMatch[1],
                content: htmlToMarkdown(encodedContentMatch[1]),
                link: linkMatch ? linkMatch[1] : ''
            });
        }
    }
    return items;
};

async function main() {
    try {
        console.log('Fetching feed...');
        const xml = await fetchFeed(RSS_URL);
        console.log('Parsing items...');
        const items = extractItems(xml);
        fs.writeFileSync('temp_posts.json', JSON.stringify(items, null, 2));
        console.log('Successfully wrote to temp_posts.json');
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
