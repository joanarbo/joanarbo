'use client';

import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import clsx from 'clsx';

export function Ideas() {
    const { t } = useTranslation();
    const { ref, isVisible } = useIntersectionObserver();

    return (
        <section
            ref={ref}
            className={clsx("ideas-section fade-in-section", isVisible && "is-visible")}
            id="ideas"
        >
            <div className="container">
                <div className="section-header">
                    <span className="section-label">{t.sections.ideas.label}</span>
                    <h2 className="section-title">{t.sections.ideas.title}</h2>
                    <p className="section-subtitle">{t.sections.ideas.subtitle}</p>
                </div>
                <div className="ideas-list">
                    {/* Items would be dynamic, hardcoding one example structure for now based on CSS/HTML */}
                    <div className="idea-row">
                        <div className="idea-status active"></div>
                        <div className="idea-main">
                            <h3 className="idea-title">Design Agent Alpha</h3>
                        </div>
                        <div className="idea-meta">
                            <span className="idea-desc">Autonomous UI auditing agent</span>
                            <span className="idea-type">Python / LLM</span>
                        </div>
                        <div className="idea-arrow">
                            <i className="ph-thin ph-arrow-right"></i>
                        </div>
                    </div>
                    <div className="idea-row">
                        <div className="idea-status"></div>
                        <div className="idea-main">
                            <h3 className="idea-title">System Metrics Dashboard</h3>
                        </div>
                        <div className="idea-meta">
                            <span className="idea-desc">Real-time adoption tracking</span>
                            <span className="idea-type">React / Grafana</span>
                        </div>
                        <div className="idea-arrow">
                            <i className="ph-thin ph-arrow-right"></i>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
