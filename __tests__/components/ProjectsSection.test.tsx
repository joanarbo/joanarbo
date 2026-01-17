import { render, screen } from '@testing-library/react'
import { ProjectsSection } from '../../src/components/sections/ProjectsSection'

// Mock the data hook
jest.mock('../../src/hooks/useData', () => ({
    useData: () => ({
        projects: [
            {
                id: "test-project",
                title: "Test Project",
                image: "/assets/images/test.png",
                description: "Test Description",
                tags: ["Test"],
                metrics: {
                    primary: "100%",
                    primaryLabel: "Success"
                },
                link: "https://example.com"
            }
        ],
        t: {
            sections: {
                projects: { title: "Projects" },
                work: { label: "Work", title: "Projects", subtitle: "My projects" }
            },
            labels: { readMore: "Read More" },
            hero: { badge: "Badge" } // Just in case
        }
    })
}))

// Mock useTranslation
jest.mock('../../src/hooks/useTranslation', () => ({
    useTranslation: () => ({
        t: {
            sections: {
                projects: { title: "Projects" },
                work: { label: "Work", title: "Projects", subtitle: "My projects" }
            },
            labels: { readMore: "Read More" }
        }
    })
}))

// Mock useIntersectionObserver
jest.mock('../../src/hooks/useIntersectionObserver', () => ({
    useIntersectionObserver: () => ({
        ref: jest.fn(),
        isVisible: true
    })
}))

// Mock Next/Image
jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => {
        // eslint-disable-next-line @next/next/no-img-element
        return <img {...props} alt={props.alt} />
    },
}))

// Mock Next/Link
jest.mock('next/link', () => ({
    __esModule: true,
    default: ({ children, href }: any) => <a href={href}>{children}</a>,
}))

describe('ProjectsSection', () => {
    it('renders projects correctly', () => {
        render(<ProjectsSection />)

        expect(screen.getByText('Test Project')).toBeInTheDocument()
        expect(screen.getByText('Test Description')).toBeInTheDocument()
    })

    it('renders images with correct paths', () => {
        render(<ProjectsSection />)

        const image = screen.getByAltText('Test Project') as HTMLImageElement
        expect(image.src).toContain('/assets/images/test.png')
    })

    it('renders link correctly', () => {
        render(<ProjectsSection />)

        const link = screen.getByRole('link')
        expect(link).toHaveAttribute('href', 'https://example.com')
    })
})
