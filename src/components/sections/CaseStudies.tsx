'use client';

import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useData } from '@/hooks/useData';

export function CaseStudies() {
    const { t } = useTranslation();
    const data = useData();
    const caseStudies = data?.caseStudies || [];

    return (
        <section className="case-studies-section" id="case-studies">
            <div className="container">
                <div className="section-header">
                    <span className="section-label">{t.sections.caseStudies.label}</span>
                    <h2 className="section-title">{t.sections.caseStudies.title}</h2>
                    <p className="section-subtitle">{t.sections.caseStudies.subtitle}</p>
                </div>
                <div className="case-studies-grid layout--zigzag">
                    {caseStudies.map((study: any, index: number) => {
                        const hasContent = study.content && study.content.trim().length > 0;
                        const clickableClass = hasContent ? 'is-clickable' : '';

                        return (
                            <div key={index} className={`case-study-card fade-in-up ${clickableClass} case-study-${study.id}`}>
                                <div className="case-study-image-container">
                                    <img src={study.image} alt={study.title} className="case-study-image" loading="lazy" />
                                </div>
                                <div className="case-study-content">
                                    <div className="case-study-meta">
                                        <span className="case-study-company">{study.company}</span>
                                        <span className="meta-sep">•</span>
                                        <span className="case-study-year">{study.year}</span>
                                    </div>
                                    <h3 className="case-study-title">{study.title}</h3>
                                    <p className="case-study-desc">{study.description}</p>

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
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
