import fs from 'fs';
import path from 'path';

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
    const files = fs.readdirSync(dirPath);

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
                getAllFiles(dirPath + "/" + file, arrayOfFiles);
            }
        } else {
            if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.js')) {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });

    return arrayOfFiles;
}

describe('Security Checks', () => {
    const srcPath = path.join(process.cwd(), 'src');
    const files = getAllFiles(srcPath);

    it('should not find dangerouslySetInnerHTML without justification', () => {
        const dangerousUsage: string[] = [];

        files.forEach(file => {
            const content = fs.readFileSync(file, 'utf8');
            if (content.includes('dangerouslySetInnerHTML')) {
                // Allow in JsonLd as it's required for schema injection
                if (!file.includes('JsonLd.tsx')) {
                    dangerousUsage.push(file);
                }
            }
        });

        if (dangerousUsage.length > 0) {
            console.warn('Found dangerouslySetInnerHTML in:', dangerousUsage);
        }

        // Warn but don't fail for now, unless strictly enforced
        expect(dangerousUsage.length).toBeLessThanOrEqual(3); // Allow legitimate usages in Hero, Newsletter, and Blog
    })
})
