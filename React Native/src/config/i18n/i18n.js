import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import en from './en.json';
import de from './de.json';
import es from './es.json';

// Add the German translation to the list
const translations = { en, de, es };

const { languageTag } = RNLocalize.findBestAvailableLanguage(
  Object.keys(translations),
) || { languageTag: 'en' };

i18n.locale = languageTag;
i18n.fallbacks = true;
i18n.translations = translations;

export default i18n;

