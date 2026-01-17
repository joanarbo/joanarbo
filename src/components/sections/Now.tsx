'use client';

import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

export function Now() {
    const { t } = useTranslation();

    return (
        <section className="now-section" id="now">
            <div className="container">
                <div className="section-header">
                    <span className="section-label">{t.sections.now.label}</span>
                    <h2 className="section-title">{t.sections.now.title}</h2>
                    <p className="section-subtitle">{t.sections.now.subtitle}</p>
                    <div className="section-meta">
                        <i className="ph-thin ph-clock"></i>
                        <span>{t.sections.now.date}</span>
                    </div>
                </div>
                <div className="now-grid">
                    <div className="now-card">
                        <div className="now-icon"><i className="ph-thin ph-rocket"></i></div>
                        <h3>{t.sections.now.card1.title}</h3>
                        <p>{t.sections.now.card1.desc}</p>
                    </div>
                    <div className="now-card">
                        <div className="now-icon"><i className="ph-thin ph-pencil-simple"></i></div>
                        <h3>{t.sections.now.card2.title}</h3>
                        <p>{t.sections.now.card2.desc}</p>
                    </div>
                    <div className="now-card">
                        <div className="now-icon"><i className="ph-thin ph-brain"></i></div>
                        <h3>{t.sections.now.card3.title}</h3>
                        <p>{t.sections.now.card3.desc}</p>
                    </div>
                    <div className="now-card">
                        <div className="now-icon"><i className="ph-thin ph-users-three"></i></div>
                        <h3>{t.sections.now.card4.title}</h3>
                        <p>{t.sections.now.card4.desc}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
