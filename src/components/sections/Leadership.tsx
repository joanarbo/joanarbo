'use client';

import { useTranslation } from '@/hooks/useTranslation';
import { useData } from '@/hooks/useData';
import { useState } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import clsx from 'clsx';

export function Leadership() {
    const { t } = useTranslation();
    const data = useData();
    const [activeTab, setActiveTab] = useState<'philosophy' | 'mentoring' | 'advisory'>('philosophy');
    const { ref, isVisible } = useIntersectionObserver();

    const tabs = [
        { id: 'philosophy', label: t.sections.leadership.tabs.philosophy },
        { id: 'mentoring', label: t.sections.leadership.tabs.mentoring },
        { id: 'advisory', label: t.sections.leadership.tabs.advisory }
    ];

    return (
        <section
            ref={ref}
            className={clsx("leadership-section section--blocked fade-in-section", isVisible && "is-visible")}
            id="leadership"
        >
            <div className="container">
                <div className="section-header">
                    <span className="section-label">{t.sections.leadership.label}</span>
                    <h2 className="section-title">{t.sections.leadership.title}</h2>
                    <p className="section-subtitle">{t.sections.leadership.subtitle}</p>
                </div>

                <div className="leadership-tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id as any)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="leadership-content">
                    {activeTab === 'philosophy' && (
                        <div className="principles-grid">
                            {data?.principles?.map((principle: any, index: number) => (
                                <div key={index} className="principle-card">
                                    <span className="principle-number">0{index + 1}</span>
                                    <h3 className="principle-title">{principle.title}</h3>
                                    <p className="principle-content">{principle.content}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'mentoring' && (
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
                    )}

                    {activeTab === 'advisory' && (
                        <div className="advisory-grid">
                            {data?.advisory?.map((item: any, index: number) => (
                                <div key={index} className="advisory-card">
                                    <h3 className="advisory-title">{item.title}</h3>
                                    <p className="advisory-desc">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
