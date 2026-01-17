'use client';

import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

export function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button
            className={clsx('scroll-to-top', isVisible && 'visible')}
            onClick={scrollToTop}
            aria-label="Scroll to top"
        >
            <i className="ph-thin ph-arrow-up"></i>
        </button>
    );
}
