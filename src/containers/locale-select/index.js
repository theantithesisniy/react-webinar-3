import { memo, useMemo } from 'react';
import Select from '../../components/select';
import useTranslate from '../../hooks/use-translate';

/**
 * Контейнер для смены языка
 */
function LocaleSelect() {
  const { lang, setLang } = useTranslate();

  const options = {
    lang: useMemo(
      () => [
        { value: 'ru', title: 'Русский' },
        { value: 'en', title: 'English' },
      ],
      [],
    ),
  };

  return <Select onChange={setLang} value={lang} options={options.lang} />;
}

export default memo(LocaleSelect);
