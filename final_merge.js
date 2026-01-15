const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.json');
const tempPath = path.join(__dirname, 'temp_posts.json');

const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const tempPosts = JSON.parse(fs.readFileSync(tempPath, 'utf8'));

let updatedCount = 0;

data.posts = data.posts.map(post => {
    // If content is already long (heuristic > 500 chars), assume it's updated or manually written full article
    if (post.content && post.content.length > 500) {
        return post;
    }

    // Try to find match in tempPosts
    // Strategy 1: Link in description
    // Strategy 2: Title similarity (fuzzy) -> we'll skip for now as we want determinism

    let match = tempPosts.find(p => {
        // Strategy 1: Check if description contains the full link
        if (post.description && post.description.includes(p.link)) {
            return true;
        }

        // Strategy 2: Extract slug from data.json link and check if it exists in p.link
        // Find link in description first: (url)
        const urlMatch = post.description && post.description.match(/\((https:\/\/buildsystems\.substack\.com\/p\/[^)]+)\)/);
        if (urlMatch) {
            const dataUrl = urlMatch[1];
            // Extract slug: part after /p/
            const slug = dataUrl.split('/p/')[1].split('?')[0].split('-').slice(0, 3).join('-'); // Compare first 3 words of slug to be safe
            if (p.link.includes(slug)) {
                return true;
            }
        }

        return false;
    });

    if (!match) {
        // Strategy 3: Hardcoded fallback for known failures if needed
        if (post.id === 'two-scales') {
            match = tempPosts.find(p => p.title.includes('El día que una alumna'));
        } else if (post.id === 'writing-workflow') {
            match = tempPosts.find(p => p.title.includes('Cómo escribo (y lanzo)'));
        }
    }

    if (match) {
        console.log(`Updating post "${post.title}" with content from "${match.title}"`);
        // We only update content to preserve the curated titles in data.json
        // But we DO need to make sure we aren't just pasting the description again.
        // temp_posts.json has 'content' which is the full markdown.

        // Remove the "Listen/Share" footer if present (simple heuristic)
        let newContent = match.content;

        post.content = newContent;
        updatedCount++;
    } else {
        console.log(`No match found for "${post.title}"`);
    }

    return post;
});

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
console.log(`Updated ${updatedCount} posts.`);
