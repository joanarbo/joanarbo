'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';

interface BuildInPublicProps {
    data: any; // Type this properly later
}

export function BuildInPublic() {
    const { t } = useTranslation();

    // In a real app, this data might come from props or a dynamic source
    // For now we use static data from translations or assume it's passed or hardcoded for the demo structure
    // Since the original was hardcoded in HTML or JS, we'll implement the structure.

    return (
        <section className="bip-section" id="bodados">
            <div className="container">
                <div className="bip-content">
                    <div className="bip-main">
                        <div className="bip-badge">
                            <span className="pulse-dot"></span>
                            {t.buildInPublic?.badge || "Venture Lab"}
                        </div>
                        <h3 className="bip-title">Bodados</h3>
                        <p className="bip-subtitle">{t.buildInPublic?.role}</p>
                        <p className="bip-desc">
                            {t.buildInPublic?.desc}
                        </p>
                    </div>

                    <div className="bip-stats">
                        <div className="bip-stat-item">
                            <span className="bip-stat-label">{t.buildInPublic?.statusLabel}</span>
                            <span className="bip-stat-value">{t.buildInPublic?.statusValue}</span>
                        </div>
                        <div className="bip-stat-item">
                            <span className="bip-stat-label">{t.buildInPublic?.challengeLabel}</span>
                            <span className="bip-stat-value">{t.buildInPublic?.challengeValue}</span>
                        </div>
                    </div>

                    <div className="bip-actions">
                        <Link href="#" className="btn-text">
                            {t.buildInPublic?.viewProject || "Read More"}
                            <i className="ph-thin ph-arrow-right"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
