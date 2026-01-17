'use client';

import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

export function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="footer">
            <div className="container footer-content">
                <p>
                    {t.footer.rights}
                </p>
                <p>
                    {t.footer.builtWith}
                </p>
            </div>
        </footer>
    );
}
