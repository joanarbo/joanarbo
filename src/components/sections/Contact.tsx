'use client';

import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { motion } from 'framer-motion';

const container = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' as const },
    },
};

const cardHover = {
    rest: { scale: 1, y: 0 },
    hover: {
        scale: 1.02,
        y: -4,
        transition: { duration: 0.3, ease: 'easeOut' as const },
    },
};

export function Contact() {
    const { t } = useTranslation();

    return (
        <section className="contact-section" id="contact">
            <div className="container">
                <motion.div
                    className="contact-content"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    variants={container}
                >
                    <motion.div className="section-header" variants={item}>
                        <span className="section-label">{t.sections.contact.label}</span>
                        <h2 className="section-title">{t.sections.contact.title}</h2>
                        <p className="section-subtitle">{t.sections.contact.subtitle}</p>
                    </motion.div>

                    <div className="contact-methods">
                        <motion.a
                            href="mailto:me@joanarbo.com"
                            className="contact-card"
                            variants={item}
                            initial="rest"
                            whileHover="hover"
                        >
                            <motion.div className="contact-icon" variants={cardHover}>
                                <i className="ph-thin ph-envelope-simple"></i>
                            </motion.div>
                            <h3>{t.sections.contact.email}</h3>
                            <p>me@joanarbo.com</p>
                        </motion.a>
                        <motion.a
                            href="https://linkedin.com/in/joanarbo"
                            target="_blank"
                            className="contact-card"
                            variants={item}
                            initial="rest"
                            whileHover="hover"
                        >
                            <motion.div className="contact-icon" variants={cardHover}>
                                <i className="ph-thin ph-linkedin-logo"></i>
                            </motion.div>
                            <h3>{t.sections.contact.linkedin}</h3>
                            <p>{t.sections.contact.linkedinDesc}</p>
                        </motion.a>
                        <motion.a
                            href="https://substack.com/@joanarbo"
                            target="_blank"
                            className="contact-card"
                            variants={item}
                            initial="rest"
                            whileHover="hover"
                        >
                            <motion.div className="contact-icon" variants={cardHover}>
                                <i className="ph-thin ph-article-medium"></i>
                            </motion.div>
                            <h3>{t.sections.contact.substack}</h3>
                            <p>{t.sections.contact.substackDesc}</p>
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
