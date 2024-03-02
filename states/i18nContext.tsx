import { I18n, Scope, TranslateOptions } from 'i18n-js';
import { createContext, ReactNode, useState, useEffect } from 'react';

import useUpdateEffect from '@/hooks/useUpdateEffect';
import en from '@/languages/en';
import ja from '@/languages/ja';
import { LanguageService } from '@/services/LanguageService';

// I18nの初期設定
const i18n = new I18n({
  en,
  ja,
});
i18n.defaultLocale = 'en';

interface I18nContextType {
  t: (scope: Scope, options?: TranslateOptions) => string;
  locale: string;
  isLoading: boolean;
  setLocale: (locale: string) => void;
}

export const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState('en');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    new LanguageService().getLanguageCode().then((languageCode) => {
      setLocale(languageCode);
      setIsLoading(true);
    });
  }, []);

  useUpdateEffect(() => {
    i18n.locale = locale;
    setIsLoading(true);
    new LanguageService().setLanguageCode(locale).then(() => {
      setIsLoading(false);
    });
  }, [locale]);

  // Note: `t`関数を直接Contextに渡すことで、i18nのインスタンスを直接渡す必要がなくなる
  // なのでuseEffectでのlocaleの変更が即座にコンポーネントに反映される
  const t = (scope: Scope, options?: TranslateOptions) => i18n.t(scope, { locale, ...options });

  return <I18nContext.Provider value={{ t, locale, setLocale, isLoading }}>{children}</I18nContext.Provider>;
};
