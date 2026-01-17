'use client';

import React from 'react';
import { useData } from '@/hooks/useData';
import { useTranslation } from '@/hooks/useTranslation';
import Link from 'next/link';

export function ProjectsSection() {
    const { t } = useTranslation();
    const data = useData();

    const projects = data?.projects || [];

    return (
        <section className="projects-section" id="work">
            <div className="container">
                <div className="section-header">
                    <span className="section-label">{t.sections.work.label}</span>
                    <h2 className="section-title">{t.sections.work.title}</h2>
                    <p className="section-subtitle">{t.sections.work.subtitle}</p>
                </div>

                <div className="projects-grid layout--zigzag">
                    {projects.map((project: any, index: number) => (
                        <div key={index} className="project-card fade-in-up">
                            <div className="project-img-wrapper">
                                <img src={project.image} alt={project.title} className="project-img" loading="lazy" />
                            </div>
                            <div className="project-content">
                                <div className="project-meta">
                                    <span className="project-company">{project.company}</span>
                                    <span className="meta-sep">•</span>
                                    <span className="project-impact">{project.impact}</span>
                                </div>
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-desc">{project.description}</p>
                                <div className="project-tags">
                                    {project.tags?.map((tag: string, i: number) => (
                                        <span key={i} className="tag tag-outline tag-sm">{tag}</span>
                                    ))}
                                </div>
                                <div className="project-footer">
                                    <span className="read-more">{t.labels?.readMore || "Learn more"}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
