'use client';

import React from 'react';
import { useData } from '@/hooks/useData';
import { useTranslation } from '@/hooks/useTranslation';
import Link from 'next/link';
import Image from 'next/image';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import clsx from 'clsx';

export function ProjectsSection() {
    const { t } = useTranslation();
    const data = useData();

    const projects = data?.projects || [];
    const { ref, isVisible } = useIntersectionObserver();

    return (
        <section
            ref={ref}
            className={clsx("projects-section fade-in-section", isVisible && "is-visible")}
            id="work"
        >
            <div className="container">
                <div className="section-header">
                    <span className="section-label">{t.sections.work.label}</span>
                    <h2 className="section-title">{t.sections.work.title}</h2>
                    <p className="section-subtitle">{t.sections.work.subtitle}</p>
                </div>

                <div className="projects-grid layout--zigzag">
                    {projects.map((project: any, index: number) => {
                        const cardContent = (
                            <>
                                <div className="project-img-wrapper">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        width={600}
                                        height={400}
                                        className="project-img"
                                        loading="lazy"
                                        style={{ objectFit: 'cover' }}
                                    />
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
                            </>
                        );

                        if (project.link) {
                            return (
                                <Link
                                    key={index}
                                    href={project.link}
                                    className="project-card fade-in-up is-clickable"
                                >
                                    {cardContent}
                                </Link>
                            );
                        }

                        return (
                            <div
                                key={index}
                                className="project-card fade-in-up"
                            >
                                {cardContent}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
