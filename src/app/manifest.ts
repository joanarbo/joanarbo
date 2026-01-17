import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Joan Arbo | Design Systems Lead & Strategist',
        short_name: 'Joan Arbo',
        description: 'Operational Strategy Lead. I help organizations translate business strategy into efficient design infrastructure.',
        start_url: '/',
        display: 'standalone',
        background_color: '#fafaf9',
        theme_color: '#fafaf9',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    };
}
