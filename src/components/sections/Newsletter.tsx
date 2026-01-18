'use client';

import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { motion } from 'framer-motion';

const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.7,
            ease: 'easeOut' as const,
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' as const },
    },
};

export function Newsletter() {
    const { t } = useTranslation();

    return (
        <section className="newsletter-section section--blocked" id="newsletter">
            <div className="container">
                <motion.div
                    className="newsletter-card"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    variants={cardVariants}
                >
                    <motion.h2 className="newsletter-title" variants={itemVariants}>
                        {t.sections.newsletter.title}
                    </motion.h2>
                    <motion.p className="newsletter-subtitle" variants={itemVariants}>
                        {t.sections.newsletter.desc}
                    </motion.p>

                    <motion.div
                        className="newsletter-bonus"
                        variants={itemVariants}
                        dangerouslySetInnerHTML={{ __html: t.sections.newsletter.bonus }}
                    />

                    <motion.div className="newsletter-form-container" variants={itemVariants}>
                        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder={t.labels.emailPlaceholder}
                                className="newsletter-input"
                                required
                            />
                            <button type="submit" className="newsletter-submit">
                                {t.sections.newsletter.cta} <i className="ph-thin ph-arrow-right"></i>
                            </button>
                        </form>
                        <p className="newsletter-note">{t.sections.newsletter.note}</p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
