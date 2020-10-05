import { DarkModeOptions } from './types';

/**
 * Default options used in DarkModeService
 */
export const defaultOptions: DarkModeOptions = {
  darkModeClass: 'dark-mode',
  lightModeClass: 'light-mode',
  loadedClass: 'dark-mode-loaded',
  storageKey: 'dark-mode',
  element: document.body,
};
