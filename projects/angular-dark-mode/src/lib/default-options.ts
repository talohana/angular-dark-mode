import { isPlatformBrowser } from '@angular/common';
import { InjectionToken } from '@angular/core';
import { DarkModeOptions } from './types';

export const DARK_MODE_DEFAULT_OPTIONS = new InjectionToken<DarkModeOptions>(
  'DARK_MODE_DEFAULT_OPTIONS'
);

/*  eslint-disable-next-line @typescript-eslint/ban-types */
export function defaultOptionsFactory(platformId: Object): DarkModeOptions {
  const isBrowser = isPlatformBrowser(platformId);

  return {
    darkModeClass: 'dark-mode',
    lightModeClass: 'light-mode',
    preloadingClass: 'dark-mode-preloading',
    storageKey: 'dark-mode',
    element: isBrowser ? document.body : null,
  };
}
