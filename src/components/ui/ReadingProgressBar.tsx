'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export function ReadingProgressBar() {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const calculateProgress = () => {
            // Calculate progress based on the article content specifically if possible, 
            // or document body minus viewport
            const article = document.querySelector('article');
            if (!article) return;

            const totalHeight = article.clientHeight - window.innerHeight;
            const windowScrollTop = window.scrollY;

            if (windowScrollTop === 0) {
                return setProgress(0);
            }

            if (windowScrollTop > totalHeight) {
                return setProgress(100);
            }

            // Start showing progress after passing the header/intro slightly? 
            // Or just mapping 0-100 for the whole page
            const currentProgress = (windowScrollTop / totalHeight) * 100;
            setProgress(currentProgress);

            // Show only after scrolling a bit
            setIsVisible(windowScrollTop > 100);
        };

        window.addEventListener('scroll', calculateProgress);
        return () => window.removeEventListener('scroll', calculateProgress);
    }, []);

    // Create a portal to attach to the header or body
    // But simplest is just fixed position at top
    // We want it attached to the header bottom if the header is sticky
    // The header is sticky (navbar). 
    // Navbar height changes on scroll, but the bar can just be fixed at top or bottom of navbar.
    // If navbar is top: 0, this bar can be top: 0 + navbar height? 
    // Or simpler: fixed at top: 0, z-index higher than navbar? No, user said "to the header".
    // Usually it acts as a border-bottom of the header.

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: `${progress}%`,
                height: '4px',
                background: 'var(--accent-color)',
                zIndex: 1001, // Above header (100)
                transition: 'width 0.1s ease-out, opacity 0.3s ease',
                opacity: isVisible ? 1 : 0
            }}
        />
    );
}
