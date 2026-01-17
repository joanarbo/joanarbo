'use client';

import React from 'react';
import { useData } from '@/hooks/useData';
import { useTranslation } from '@/hooks/useTranslation';

export function Experience() {
    const { t } = useTranslation();
    const data = useData();

    if (!data) return null; // Or a skeleton

    const experienceItems = data?.experience || [];

    return (
        <section className="experience-section" id="experience">
            <div className="container">
                <div className="section-header">
                    <span className="section-label">{t.sections.experience.label}</span>
                    <h2 className="section-title">{t.sections.experience.title}</h2>
                    <p className="section-subtitle">{t.sections.experience.subtitle}</p>
                </div>

                <div className="experience-grid layout--zigzag">
                    {experienceItems.map((item: any, index: number) => (
                        <div key={index} className="experience-item fade-in-up">
                            <div className="exp-header">
                                {item.logo ? (
                                    <img src={item.logo} alt={item.company} className="exp-logo" loading="lazy" />
                                ) : (
                                    <div className="exp-logo-placeholder">{item.company.charAt(0)}</div>
                                )}
                                <div className="exp-meta">
                                    <span className="exp-period">{item.period}</span>
                                    <span className="exp-company">{item.company}</span>
                                </div>
                            </div>
                            <div className="exp-content">
                                <h3 className="exp-role">{item.role}</h3>
                                <p className="exp-description">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="experience-cv fade-in-up">
                    <a href="https://linkedin.com/in/joanarbo" target="_blank" className="cv-link">
                        {t.sections?.experience?.viewFullCv || "View Full CV"} <i className="ph-thin ph-arrow-right"></i>
                    </a>
                </div>
            </div>
        </section>
    );
}
