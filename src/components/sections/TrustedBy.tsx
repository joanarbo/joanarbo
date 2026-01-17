'use client';

import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

export function TrustedBy() {
    const { t } = useTranslation();

    return (
        <section className="trusted-section section--blocked">
            <div className="container">
                <div className="trusted-content">
                    <span className="trusted-label">{t.trustedBy}</span>
                    <div className="trusted-logos">
                        {/* Ensure these images exist in public/assets/images/logos/ */}
                        <img src="/assets/images/logos/amazon-business.svg" alt="Amazon Business" className="trusted-logo-img" />
                        <img src="/assets/images/logos/Amazon_Alexa_Logo_2024.svg" alt="Amazon Alexa" className="trusted-logo-img" />
                        <img src="/assets/images/logos/Western_Union_current_logo.svg" alt="Western Union" className="trusted-logo-img" />
                    </div>
                </div>
            </div>
        </section>
    );
}
