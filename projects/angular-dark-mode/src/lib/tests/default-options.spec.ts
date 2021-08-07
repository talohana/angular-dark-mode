import { isPlatformBrowser } from '@angular/common';
import { when } from 'jest-when';
import { defaultOptionsFactory } from '../default-options';
import { DarkModeOptions } from '../types';

jest.mock('@angular/common', () => ({ isPlatformBrowser: jest.fn() }));

describe('defaultOptionsFactor', () => {
  const browserDefaultOptions: DarkModeOptions = {
    darkModeClass: 'dark-mode',
    lightModeClass: 'light-mode',
    preloadingClass: 'dark-mode-preloading',
    storageKey: 'dark-mode',
    element: document.body,
  };

  const serverDefaultOptions: DarkModeOptions = {
    ...browserDefaultOptions,
    element: null,
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should provide correct default options for browser environment', () => {
    when(isPlatformBrowser as jest.Mock)
      .calledWith(expect.anything())
      .mockReturnValue(true);

    expect(defaultOptionsFactory({})).toEqual(browserDefaultOptions);
  });

  it('should provide correct default options for non-browser environment', () => {
    when(isPlatformBrowser as jest.Mock)
      .calledWith(expect.anything())
      .mockReturnValue(false);

    expect(defaultOptionsFactory({})).toEqual(serverDefaultOptions);
  });
});
