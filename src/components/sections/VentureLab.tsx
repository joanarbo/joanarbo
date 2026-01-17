'use client';

import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useData } from '@/hooks/useData';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import clsx from 'clsx';
// No specific CSS here yet, will rely on global + new specific SCSS

export function VentureLab() {
    const { t } = useTranslation();
    const data = useData();
    const ventureData = data?.ventureLab;
    const { ref, isVisible } = useIntersectionObserver();

    if (!ventureData) return null;

    return (
        <section
            ref={ref}
            className={clsx("venture-lab-section fade-in-section", isVisible && "is-visible")}
            id="venture-lab"
        >
            <div className="container">
                <div className="section-header">
                    <span className="section-label">{ventureData.subtitle || "Venture Lab"}</span>
                    <h2 className="section-title">{ventureData.title}</h2>
                    <p className="section-subtitle">{ventureData.company} • {ventureData.period}</p>
                </div>

                <div className="venture-content">
                    {/* Left Column: Narrative & Pillars */}
                    <div className="venture-narrative-col">
                        <div className="venture-intro">
                            <span className="venture-role">{ventureData.role}</span>
                            <p className="venture-desc">{ventureData.narrative}</p>
                        </div>

                        <div className="venture-pillars">
                            {ventureData.pillars?.map((pillar: any, index: number) => (
                                <div key={index} className="pillar-item">
                                    <h3 className="pillar-title">{pillar.title}</h3>
                                    <p className="pillar-desc">{pillar.description}</p>
                                </div>
                            ))}
                        </div>

                        {ventureData.link && (
                            <a
                                href={ventureData.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-link btn btn-secondary"
                            >
                                {t.labels?.visitSite || "Visit Bodados"}
                            </a>
                        )}
                    </div>

                    {/* Right Column: Product Model Visualization */}
                    <div className="venture-visual-col">
                        <div className="product-model-diagram">
                            <div className="model-header-label">Product Model</div>

                            <div className="model-stages">
                                {ventureData.productModel?.map((stage: any, index: number) => (
                                    <div key={index} className="model-stage">
                                        <div className="stage-header">
                                            <span className="stage-step">0{index + 1}</span>
                                            <span className="stage-name">{stage.stage}</span>
                                        </div>
                                        <ul className="stage-items">
                                            {stage.items?.map((item: string, i: number) => (
                                                <li key={i} className="stage-item">{item}</li>
                                            ))}
                                        </ul>
                                        {index < (ventureData.productModel.length - 1) && (
                                            <div className="stage-connector">→</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
