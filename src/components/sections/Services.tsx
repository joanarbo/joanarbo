'use client';

import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useData } from '@/hooks/useData';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import clsx from 'clsx';

export function Services() {
    const { t } = useTranslation();
    const data = useData();
    const services = data?.services || [];
    const { ref, isVisible } = useIntersectionObserver();

    return (
        <section
            ref={ref}
            className={clsx("services-section section--blocked fade-in-section", isVisible && "is-visible")}
            id="services"
        >
            <div className="container">
                <div className="section-header">
                    <span className="section-label">{t.sections.services.label}</span>
                    <h2 className="section-title">{t.sections.services.title}</h2>
                    <p className="section-subtitle">{t.sections.services.subtitle}</p>
                </div>
                <div className={clsx("services-grid stagger-children", isVisible && "is-visible")}>
                    {services.map((service: any, index: number) => (
                        <div key={index} className="service-card fade-in-up">
                            <div className="service-icon-box">
                                <i className={`ph-thin ${service.icon}`}></i>
                            </div>
                            <div className="service-header">
                                <h3>{service.title}</h3>
                                <span className="service-price">{service.price}</span>
                            </div>
                            <p className="service-description">{service.description}</p>
                            <ul className="service-features">
                                {service.features?.map((feature: string, i: number) => (
                                    <li key={i}><i className="ph-thin ph-check"></i> {feature}</li>
                                ))}
                            </ul>
                            <a href={`mailto:me@joanarbo.com?subject=Inquiry: ${encodeURIComponent(service.title)}`} className="service-cta button outline">
                                {service.cta} <i className="ph-thin ph-arrow-right"></i>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
