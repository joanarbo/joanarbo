'use client';

import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

export function Newsletter() {
    const { t } = useTranslation();

    return (
        <section className="newsletter-section" id="newsletter">
            <div className="container">
                <div className="newsletter-card">
                    <h2 className="newsletter-title">{t.sections.newsletter.title}</h2>
                    <p className="newsletter-subtitle">{t.sections.newsletter.desc}</p>

                    <div className="newsletter-bonus" dangerouslySetInnerHTML={{ __html: t.sections.newsletter.bonus }}></div>

                    <div className="newsletter-form-container">
                        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                            <input type="email" placeholder={t.labels.emailPlaceholder} className="newsletter-input" required />
                            <button type="submit" className="newsletter-submit">
                                {t.sections.newsletter.cta} <i className="ph-thin ph-arrow-right"></i>
                            </button>
                        </form>
                        <p className="newsletter-note">{t.sections.newsletter.note}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
