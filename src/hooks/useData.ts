import { useLanguage } from '@/context/LanguageContext';
import dataEn from '@/data/data_en.json';
import dataEs from '@/data/data_es.json';
import dataCa from '@/data/data_ca.json';

// Infer the type from the English data (source of truth mostly)
export type AppData = typeof dataEn;

const data: Record<string, typeof dataEn> = {
    en: dataEn,
    es: dataEs,
    ca: dataCa,
};

export function useData() {
    const { language } = useLanguage();
    // Force type to match the expected AppData structure
    // In a real app, we might want runtime validation or a shared type definition
    return data[language] as AppData;
}
