'use client';

import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

// Elegant animation variants
const container = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
};

const item = {
    hidden: { opacity: 0, y: 25 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: 'easeOut' as const },
    },
};

const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, delay: 0.6 } },
};

export function Hero() {
    const { t } = useTranslation();

    return (
        <section className="hero">
            <motion.div
                className="container hero-content"
                initial="hidden"
                animate="visible"
                variants={container}
            >
                <motion.div className="hero-badge" variants={item}>
                    <span className="badge-dot"></span>
                    <span>{t.hero.badge}</span>
                </motion.div>

                <motion.h1
                    className="hero-title"
                    variants={item}
                    dangerouslySetInnerHTML={{ __html: t.hero.title }}
                />

                <motion.p className="hero-description" variants={item}>
                    {t.hero.description}
                </motion.p>

                <motion.div className="hero-cta" variants={item}>
                    <Button variant="primary" href="/#case-studies">
                        {t.hero.viewCases}
                    </Button>
                    <Button variant="secondary" href="/#contact">
                        {t.hero.talkSystem}
                    </Button>
                </motion.div>
            </motion.div>

            <motion.div
                className="scroll-indicator"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                <div className="mouse"></div>
                <span>Scroll</span>
            </motion.div>
        </section>
    );
}
