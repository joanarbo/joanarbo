'use client';

import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

export function PublicCases() {
    const { t } = useTranslation();

    return (
        <section className="public-cases-section">
            <div className="container">
                <div className="section-header">
                    <span className="section-label">{t.sections.publicCases.label}</span>
                    <h2 className="section-title">{t.sections.publicCases.title}</h2>
                    <p className="section-subtitle">{t.sections.publicCases.subtitle}</p>
                </div>
                <div className="public-cases-grid">
                    <a href="https://bodados.com" target="_blank" className="public-case-card">
                        <div className="public-case-meta">
                            <span className="case-status on-track">
                                <i className="ph-thin ph-circle"></i> Live System
                            </span>
                            <span className="meta-sep">•</span>
                            <span className="case-category">Wedding OS</span>
                        </div>
                        <h3 className="public-case-title">Bodados DS</h3>
                        <p className="public-case-desc">{t.sections.publicCases.bodadosDesc}</p>
                        <div className="link-text">
                            {t.sections.publicCases.viewDocs} <i className="ph-thin ph-arrow-right"></i>
                        </div>
                    </a>
                    <a href="#" className="public-case-card">
                        <div className="public-case-meta">
                            <span className="case-status completed">
                                <i className="ph-thin ph-check-circle"></i> Completed
                            </span>
                            <span className="meta-sep">•</span>
                            <span className="case-category">Voice UI</span>
                        </div>
                        <h3 className="public-case-title">Alexa Voice Patterns</h3>
                        <p className="public-case-desc">{t.sections.publicCases.alexaDesc}</p>
                        <div className="link-text">
                            {t.sections.publicCases.viewArchive} <i className="ph-thin ph-arrow-right"></i>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
}
