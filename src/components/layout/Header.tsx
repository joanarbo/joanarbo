'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { useTranslation } from '@/hooks/useTranslation';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/Button';

export function Header() {
    const { t } = useTranslation();
    const { theme, toggleTheme } = useTheme();
    const { language, setLanguage } = useLanguage();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleLanguage = () => {
        if (language === 'en') setLanguage('es');
        else if (language === 'es') setLanguage('ca');
        else setLanguage('en');
    };

    return (
        <nav className={clsx('navbar', scrolled && 'navbar--scrolled')}>
            <div className="container nav-content">
                <Link href="/" className="nav-logo">
                    Joan Arbo
                </Link>

                {/* Desktop Nav */}
                <div className="nav-links">
                    <Link href="/#case-studies" className="nav-link">{t.nav.caseStudies}</Link>
                    <Link href="/#services" className="nav-link">{t.nav.services}</Link>
                    <Link href="/#blog" className="nav-link">{t.nav.blog}</Link>
                    <Link href="/#experience" className="nav-link">{t.nav.about}</Link>
                    <Link href="/#contact" className="nav-link">{t.nav.contact}</Link>
                </div>

                <div className="nav-actions">
                    <div className="desktop-cta">
                        <Button
                            variant="primary"
                            size="sm"
                            href="https://cal.com/joan-arbo"
                            target="_blank"
                        >
                            <span>{t.nav.bookCall}</span>
                        </Button>
                    </div>

                    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                        <i className={theme === 'dark' ? 'ph-thin ph-sun' : 'ph-thin ph-moon-stars'}></i>
                    </button>

                    <button className="lang-toggle" onClick={toggleLanguage} aria-label="Toggle language">
                        {language.toUpperCase()}
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        className={clsx("mobile-toggle", mobileMenuOpen && "open")}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                    >
                        <i className={clsx("ph-thin", mobileMenuOpen ? "ph-x" : "ph-list")}></i>
                    </button>
                </div>
            </div>

            {/* Mobile Nav Overlay */}
            <div className={clsx("mobile-menu", mobileMenuOpen && "open")}>
                <div className="mobile-nav-links">
                    <Link href="/#case-studies" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>{t.nav.caseStudies}</Link>
                    <Link href="/#services" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>{t.nav.services}</Link>
                    <Link href="/#blog" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>{t.nav.blog}</Link>
                    <Link href="/#experience" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>{t.nav.about}</Link>
                    <Link href="/#contact" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>{t.nav.contact}</Link>

                    <div className="mobile-cta">
                        <Button
                            variant="primary"
                            size="lg"
                            href="https://cal.com/joan-arbo"
                            target="_blank"
                            fullWidth
                        >
                            <span>{t.nav.bookCall}</span>
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
