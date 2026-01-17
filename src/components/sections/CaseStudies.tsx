'use client';

import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useData } from '@/hooks/useData';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import Image from 'next/image';
import clsx from 'clsx';

export function CaseStudies() {
    const { t } = useTranslation();
    const data = useData();
    const caseStudies = data?.caseStudies || [];
    const { ref, isVisible } = useIntersectionObserver();

    return (
        <section
            ref={ref}
            className={clsx("case-studies-section fade-in-section", isVisible && "is-visible")}
            id="case-studies"
        >
            <div className="container">
                <div className="section-header">
                    <span className="section-label">{t.sections.caseStudies.label}</span>
                    <h2 className="section-title">{t.sections.caseStudies.title}</h2>
                    <p className="section-subtitle">{t.sections.caseStudies.subtitle}</p>
                </div>
                <div className="case-studies-grid layout--zigzag">
                    {caseStudies.map((study: any, index: number) => {
                        const hasContent = study.content && study.content.trim().length > 0;
                        // Use study.link if available
                        const LinkComponent = study.link ? 'a' : 'div';
                        const linkProps = study.link ? {
                            href: study.link,
                            target: study.link.startsWith('http') ? '_blank' : undefined,
                            rel: study.link.startsWith('http') ? 'noopener noreferrer' : undefined
                        } : {};

                        return (
                            <LinkComponent
                                key={index}
                                className={`case-study-card ${study.link ? 'is-clickable' : ''} case-study-${study.id}`}
                                {...linkProps}
                            >
                                <div className="case-study-image-container">
                                    <Image
                                        src={study.image}
                                        alt={study.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        priority={index === 0}
                                        style={{ objectFit: study.id === 'alexa-multimodal' ? 'contain' : 'cover' }}
                                        className="case-study-image"
                                    />
                                </div>
                                <div className="case-study-content">
                                    <div className="case-study-meta">
                                        <span className="case-study-company">{study.company}</span>
                                        <span className="meta-sep">•</span>
                                        <span className="case-study-year">{study.year}</span>
                                    </div>
                                    <h3 className="case-study-title">{study.title}</h3>
                                    <p className="case-study-challenge">{study.challenge}</p>

                                    {study.strategy && (
                                        <p className="case-study-strategy">{study.strategy}</p>
                                    )}

                                    {study.result && (
                                        <p className="case-study-result">{study.result}</p>
                                    )}

                                    <div className="impact-metrics">
                                        <div className="metric">
                                            <span className="metric-value">{study.impact?.adoption}</span>
                                            <span className="metric-label">{study.impact?.adoptionLabel}</span>
                                        </div>
                                        <div className="metric">
                                            <span className="metric-value">{study.impact?.efficiency}</span>
                                            <span className="metric-label">{study.impact?.efficiencyLabel}</span>
                                        </div>
                                    </div>

                                    <div className="case-study-footer">
                                        <span className="read-more">{t.labels?.readMore || "Learn more"}</span>
                                        <div className="case-study-tech-mini">
                                            {study.technologies?.slice(0, 3).map((tech: string, i: number) => (
                                                <span key={i} className="tech-tag">{tech}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </LinkComponent>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
