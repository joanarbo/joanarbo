
const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '../data.json');
const TEMP_PATH = path.join(__dirname, '../temp_posts.json');

const cleanContent = (content) => {
    return content
        .replace(/<div.*?>/g, '')
        .replace(/<\/div>/g, '')
        .replace(/<form[\s\S]*?<\/form>/g, '') // Remove subscription forms
        .replace(/<input.*?>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&#8216;/g, "'")
        .replace(/&#8217;/g, "'")
        .replace(/&#8220;/g, '"')
        .replace(/&#8221;/g, '"')
        .replace(/&#8230;/g, '...')
        .replace(/&#8594;/g, '->')
        .replace(/&#128161;/g, '💡') // Map common entities if needed, or just let them be if valid chars
        .replace(/\n\s*\n\s*\n/g, '\n\n') // Max 2 newlines
        .trim();
};

const main = () => {
    const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
    const newPosts = JSON.parse(fs.readFileSync(TEMP_PATH, 'utf8'));

    // Create a map of title -> content from new posts
    // Normalize titles to improve matching (lowercase, remove punctuation)
    const normalize = (str) => str.toLowerCase().replace(/[^\w\s]/g, '').trim();

    const contentMap = {};
    newPosts.forEach(post => {
        contentMap[normalize(post.title)] = cleanContent(post.content);
        // Also try mapping by part of the title if exact match fails
    });

    // Update posts in data.json
    let updatedCount = 0;
    data.posts = data.posts.map(post => {
        const normTitle = normalize(post.title);
        // Try exact match
        let newContent = contentMap[normTitle];

        // If not found, try fuzzy match (if one title contains the other)
        if (!newContent) {
            const match = newPosts.find(p => {
                const pNorm = normalize(p.title);
                return pNorm.includes(normTitle) || normTitle.includes(pNorm);
            });
            if (match) {
                newContent = cleanContent(match.content);
            }
        }

        if (newContent) {
            updatedCount++;
            return {
                ...post,
                content: newContent
            };
        }
        return post;
    });

    // Also update ideas if they match
    if (data.ideas) {
        data.ideas = data.ideas.map(idea => {
            const normTitle = normalize(idea.title);
            let newContent = contentMap[normTitle];
            if (!newContent) {
                const match = newPosts.find(p => {
                    const pNorm = normalize(p.title);
                    return pNorm.includes(normTitle) || normTitle.includes(pNorm);
                });
                if (match) {
                    newContent = cleanContent(match.content);
                }
            }
            if (newContent) {
                updatedCount++;
                return {
                    ...idea,
                    content: newContent
                };
            }
            return idea;
        });
    }

    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
    console.log(`Updated ${updatedCount} items in data.json`);
};

main();
