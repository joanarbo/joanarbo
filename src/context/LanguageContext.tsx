'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '@/data/translations';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Detect browser language and map to supported languages
function detectBrowserLanguage(): Language {
    if (typeof window === 'undefined') return 'en';

    const browserLang = navigator.language || (navigator as any).userLanguage || 'en';
    const langCode = browserLang.toLowerCase().split('-')[0];

    // Map browser language to supported languages
    if (langCode === 'ca') return 'ca';
    if (langCode === 'es') return 'es';
    return 'en'; // Default fallback
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        // Check localStorage first, then browser detection
        const savedLang = localStorage.getItem('language') as Language;
        if (savedLang && (savedLang === 'en' || savedLang === 'es' || savedLang === 'ca')) {
            setLanguage(savedLang);
        } else {
            // No saved preference, detect from browser
            const detectedLang = detectBrowserLanguage();
            setLanguage(detectedLang);
            localStorage.setItem('language', detectedLang);
        }
        setIsInitialized(true);
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
