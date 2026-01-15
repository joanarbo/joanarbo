const https = require('https');
https.get('https://buildsystems.substack.com/p/perihelion-finding-flow-state-in', (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        // Look for common youtube embed patterns
        const match = data.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/)
            || data.match(/youtu\.be\/([a-zA-Z0-9_-]+)/)
            || data.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/);

        console.log('Video ID:', match ? match[1] : 'Not found');

        // Also dump a snippet if not found to debug
        if (!match) {
            const ytIndex = data.indexOf('youtube');
            if (ytIndex !== -1) {
                console.log('Context:', data.substring(ytIndex - 50, ytIndex + 100));
            }
        }
    });
});
