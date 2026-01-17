'use client';

import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/Button';

export function Hero() {
    const { t } = useTranslation();

    return (
        <section className="hero">
            <div className="container hero-content">
                <div className="hero-badge">
                    <span className="badge-dot"></span>
                    <span>{t.hero.badge}</span>
                </div>

                <h1
                    className="hero-title"
                    dangerouslySetInnerHTML={{ __html: t.hero.title }}
                />

                <p className="hero-description">
                    {t.hero.description}
                </p>

                <div className="hero-cta">
                    <Button variant="primary" href="/experience">
                        {t.hero.viewCases}
                    </Button>
                    <Button variant="secondary" href="/contact">
                        {t.hero.talkSystem}
                    </Button>
                </div>
            </div>

            <div className="scroll-indicator">
                <div className="mouse"></div>
                <span>Scroll</span>
            </div>
        </section>
    );
}
