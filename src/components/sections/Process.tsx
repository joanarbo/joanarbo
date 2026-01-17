'use client';

import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

export function Process() {
    const { t } = useTranslation();

    return (
        <section className="process-section section--blocked" id="ai-process">
            <div className="container">
                <div className="section-header">
                    <span className="section-label">{t.sections.process.label}</span>
                    <h2 className="section-title">{t.sections.process.title}</h2>
                    <p className="section-subtitle">{t.sections.process.subtitle}</p>
                </div>
                <div className="process-steps">
                    <div className="process-step">
                        <span className="process-step-title">{t.sections.process.step1.title}</span>
                        <p>{t.sections.process.step1.desc}</p>
                    </div>
                    <div className="process-step">
                        <span className="process-step-title">{t.sections.process.step2.title}</span>
                        <p>{t.sections.process.step2.desc}</p>
                    </div>
                    <div className="process-step">
                        <span className="process-step-title">{t.sections.process.step3.title}</span>
                        <p>{t.sections.process.step3.desc}</p>
                    </div>
                    <div className="process-step">
                        <span className="process-step-title">{t.sections.process.step4.title}</span>
                        <p>{t.sections.process.step4.desc}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
