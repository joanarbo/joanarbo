'use client';

import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

export function Contact() {
    const { t } = useTranslation();

    return (
        <section className="contact-section" id="contact">
            <div className="container">
                <div className="contact-content">
                    <div className="section-header">
                        <span className="section-label">{t.sections.contact.label}</span>
                        <h2 className="section-title">{t.sections.contact.title}</h2>
                        <p className="section-subtitle">{t.sections.contact.subtitle}</p>
                    </div>

                    <div className="contact-methods">
                        <a href="mailto:me@joanarbo.com" className="contact-card">
                            <div className="contact-icon"><i className="ph-thin ph-envelope-simple"></i></div>
                            <h3>{t.sections.contact.email}</h3>
                            <p>me@joanarbo.com</p>
                        </a>
                        <a href="https://linkedin.com/in/joanarbo" target="_blank" className="contact-card">
                            <div className="contact-icon"><i className="ph-thin ph-linkedin-logo"></i></div>
                            <h3>{t.sections.contact.linkedin}</h3>
                            <p>{t.sections.contact.linkedinDesc}</p>
                        </a>
                        <a href="https://substack.com/@joanarbo" target="_blank" className="contact-card">
                            <div className="contact-icon"><i className="ph-thin ph-article-medium"></i></div>
                            <h3>{t.sections.contact.substack}</h3>
                            <p>{t.sections.contact.substackDesc}</p>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
