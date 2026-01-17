export default function JsonLd() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Joan Arbo',
        url: 'https://joanarbo.com',
        jobTitle: 'Design Systems Lead & Strategist',
        sameAs: [
            'https://linkedin.com/in/joanarbo',
            'https://github.com/joanarbo',
            'https://twitter.com/joanarbo'
        ],
        worksFor: {
            '@type': 'Organization',
            name: 'Freelance'
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
