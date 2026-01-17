'use client';

import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

export function Principles() {
    const { t } = useTranslation();

    return (
        <section className="principles-section" id="principles">
            <div className="container">
                <div className="section-header">
                    <span className="section-label">{t.sections.principles.label}</span>
                    <h2 className="section-title">{t.sections.principles.title}</h2>
                    <p className="section-subtitle">{t.sections.principles.subtitle}</p>
                </div>
                <div className="principles-grid">
                    <div className="principle-card">
                        <span className="principle-number">01</span>
                        <h3 className="principle-title">Systems over Goals</h3>
                        <p className="principle-content">Goals are for direction, systems are for progress. Winners and losers have the same goals.</p>
                    </div>
                    <div className="principle-card">
                        <span className="principle-number">02</span>
                        <h3 className="principle-title">Subtract to Add</h3>
                        <p className="principle-content">Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.</p>
                    </div>
                    <div className="principle-card">
                        <span className="principle-number">03</span>
                        <h3 className="principle-title">Compound Interest</h3>
                        <p className="principle-content">Play long-term games with long-term people. All returns in life come from compound interest.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
