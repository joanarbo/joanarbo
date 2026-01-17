export default function JsonLd() {
    const personLd = {
        '@type': 'Person',
        '@id': 'https://joanarbo.com/#person',
        name: 'Joan Arbo',
        url: 'https://joanarbo.com',
        jobTitle: 'Design Systems Lead & Strategist',
        description: 'Operational Strategy Lead bridging design and engineering. Specialized in design infrastructure for global scale.',
        image: 'https://joanarbo.com/images/joan-arbo.jpg',
        sameAs: [
            'https://linkedin.com/in/joanarbo',
            'https://github.com/joanarbo',
            'https://twitter.com/joanarbo',
            'https://read.cv/joanarbo'
        ],
        worksFor: {
            '@type': 'Organization',
            name: 'Western Union'
        },
        alumniOf: [
            {
                '@type': 'Organization',
                name: 'Amazon'
            },
            {
                '@type': 'Organization',
                name: 'Telefónica'
            }
        ],
        knowsAbout: ['Design Systems', 'UX Engineering', 'Product Strategy', 'Front-end Development', 'Design Ops', 'Multimodal Design']
    };

    const websiteLd = {
        '@type': 'WebSite',
        '@id': 'https://joanarbo.com/#website',
        url: 'https://joanarbo.com',
        name: 'Joan Arbo | Portfolio',
        publisher: { '@id': 'https://joanarbo.com/#person' },
        inLanguage: ['en-US', 'es-ES', 'ca-ES']
    };

    const serviceLd = {
        '@type': 'ProfessionalService',
        '@id': 'https://joanarbo.com/#service',
        name: 'Joan Arbo UX Engineering & Consulting',
        url: 'https://joanarbo.com',
        image: 'https://joanarbo.com/images/joan-arbo.jpg',
        priceRange: '$$$',
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Barcelona',
            addressCountry: 'ES'
        }
    };

    const breadcrumbLd = {
        '@type': 'BreadcrumbList',
        'itemListElement': [
            {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Home',
                'item': 'https://joanarbo.com'
            }
        ]
    };

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [personLd, websiteLd, serviceLd, breadcrumbLd]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
