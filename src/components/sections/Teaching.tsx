'use client';

import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useData } from '@/hooks/useData';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import clsx from 'clsx';

export function Teaching() {
    const { t } = useTranslation();
    const data = useData();
    const { ref, isVisible } = useIntersectionObserver();

    return (
        <section
            ref={ref}
            className={clsx("teaching-section fade-in-section", isVisible && "is-visible")}
            id="teaching"
        >
            <div className="container">
                <div className="section-header">
                    <span className="section-label">{t.sections.thoughtLeadership.label}</span>
                    <h2 className="section-title">{t.sections.thoughtLeadership.title}</h2>
                    <p className="section-subtitle">{t.sections.thoughtLeadership.subtitle}</p>
                </div>
                <div className="teaching-grid">
                    {data?.experience
                        ?.filter((exp: any) => exp.company.includes('Mr Marcel') || exp.company.includes('UOC'))
                        .map((exp: any, index: number) => (
                            <div key={index} className="teaching-card">
                                <div className="teaching-card-header">
                                    <span className="teaching-period">{exp.period}</span>
                                    <h3 className="teaching-company">{exp.company}</h3>
                                </div>
                                <h4 className="teaching-role">{exp.role}</h4>
                                <p className="teaching-desc">{exp.description}</p>
                            </div>
                        ))}
                </div>
                <div className="talks-grid" id="talksGrid">
                    {data?.thoughtLeadershipItems?.map((item: any, index: number) => {
                        const iconClass = item.type === 'publication' ? 'ph-newspaper' : 'ph-microphone-stage';
                        const linkLabel = item.type === 'publication' ? (t.labels?.readArticle || "Read article") : (t.labels?.viewTalk || "View talk");

                        return (
                            <article key={index} className="talk-card fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                                <div className="talk-thumbnail">
                                    <div className="play-overlay">
                                        <i className={`ph-thin ${item.type === 'publication' ? 'ph-book-open' : 'ph-play'}`}></i>
                                    </div>
                                    <img src={item.image} alt={item.title} className="talk-img" />
                                </div>
                                <div className="talk-content">
                                    <div className="talk-meta">
                                        <span className="talk-event"><i className={`ph-thin ${iconClass}`}></i> {item.event}</span>
                                        <span className="meta-sep">•</span>
                                        <span className="talk-date">{item.date}</span>
                                    </div>
                                    <h3 className="talk-title">{item.title}</h3>
                                    {item.description && <p className="talk-desc">{item.description}</p>}
                                    <div className="talk-footer">
                                        <div className="talk-tags">
                                            {item.tags?.map((tag: string, i: number) => (
                                                <span key={i} className="tag-sm">#{tag}</span>
                                            ))}
                                        </div>
                                        <a href={item.videoUrl || "#"} target="_blank" className="talk-link">
                                            {linkLabel} <i className="ph-thin ph-arrow-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
