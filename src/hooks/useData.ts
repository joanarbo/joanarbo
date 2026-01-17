import { useLanguage } from '@/context/LanguageContext';
import dataEn from '@/data/data_en.json';
import dataEs from '@/data/data_es.json';

// Infer the type from the English data (source of truth mostly)
export type AppData = typeof dataEn;

const data = {
    en: dataEn,
    es: dataEs,
};

export function useData() {
    const { language } = useLanguage();
    // Force type to match the expected AppData structure
    // In a real app, we might want runtime validation or a shared type definition
    return data[language] as AppData;
}
