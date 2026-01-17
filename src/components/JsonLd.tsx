import { Thing, WithContext, Person, WebSite } from 'schema-dts';

export function JsonLd() {
    const personSchema: WithContext<Person> = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Joan Arbo',
        url: 'https://joanarbo.com',
        jobTitle: 'Senior Design Technologist & UX Engineer',
        alumniOf: [
            { '@type': 'Organization', name: 'Amazon' },
            { '@type': 'Organization', name: 'Western Union' }
        ],
        sameAs: [
            'https://linkedin.com/in/joanarbo',
            'https://github.com/joanarbo',
            'https://twitter.com/joanarbo',
            'https://buildsystems.substack.com'
        ],
        knowsAbout: [
            'Design Systems',
            'React',
            'UX Engineering',
            'Wedding Industry SEO',
            'TypeScript',
            'Product Engineering',
            'AI Agents',
            'System Architecture',
            'Figma',
            'Voice UI',
            'Multimodal Design',
            'Amazon Alexa',
            'Design Tokens',
            'Design Ops'
        ],
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://joanarbo.com'
        }
    };

    const websiteSchema: WithContext<WebSite> = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Joan Arbo - Product Engineer & Systems Architect',
        url: 'https://joanarbo.com',
        description: 'Staff Product Engineer and System Builder helping teams scale design systems with AI-driven workflows.',
        author: {
            '@type': 'Person',
            name: 'Joan Arbo'
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
        </>
    );
}
