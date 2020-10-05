import { Renderer2, RendererFactory2 } from '@angular/core';
import { hot } from 'jest-marbles';
import { when } from 'jest-when';
import { DarkModeService } from '../dark-mode.service';
import { defaultOptions } from '../default-options';
import { MediaQueryService } from '../media-query.service';
import { DarkModeOptions } from '../types';

describe('DarkModeService', () => {
  let rendererMock: Renderer2;
  let rendererFactoryMock: RendererFactory2;
  let mediaQueryServiceMock: MediaQueryService;

  const createService = (
    options?: Partial<DarkModeOptions>
  ): DarkModeService => {
    return new DarkModeService(
      rendererFactoryMock,
      mediaQueryServiceMock,
      options as DarkModeOptions
    );
  };

  const mockLocalStorageDarkMode = (
    darkMode: boolean,
    storageKey: string = defaultOptions.storageKey
  ): void => {
    when(localStorage.getItem as jest.Mock)
      .calledWith(storageKey)
      .mockReturnValue(JSON.stringify({ darkMode }));
  };

  beforeAll(() => {
    rendererMock = ({
      addClass: jest.fn(),
      removeClass: jest.fn(),
    } as unknown) as Renderer2;

    rendererFactoryMock = { createRenderer: jest.fn() };

    mediaQueryServiceMock = {
      matchMedia: jest.fn(),
      prefersDarkMode: jest.fn(),
    };
  });

  beforeEach(() => {
    jest.resetAllMocks();

    when(rendererFactoryMock.createRenderer as jest.Mock)
      .calledWith(null, null)
      .mockReturnValue(rendererMock);
  });

  describe('initialize', () => {
    it('should prefer prefersDarkMode when localStorage is empty', () => {
      (mediaQueryServiceMock.prefersDarkMode as jest.Mock)
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(false);

      let darkModeService = createService();
      expect(darkModeService.darkMode$).toBeObservable(hot('a', { a: true }));
      expect(rendererMock.addClass).toHaveBeenCalledWith(
        defaultOptions.element,
        defaultOptions.darkModeClass
      );

      darkModeService = createService();
      expect(darkModeService.darkMode$).toBeObservable(hot('a', { a: false }));
      expect(rendererMock.addClass).toHaveBeenCalledWith(
        defaultOptions.element,
        defaultOptions.lightModeClass
      );
    });

    it('should prefer prefersDarkMode when localStorage contains invalid string value', () => {
      when(localStorage.getItem as jest.Mock)
        .calledWith(defaultOptions.storageKey)
        .mockReturnValue(JSON.stringify({ invalidValue: true }));

      (mediaQueryServiceMock.prefersDarkMode as jest.Mock).mockReturnValue(
        true
      );

      const darkModeService = createService();

      expect(darkModeService.darkMode$).toBeObservable(hot('a', { a: true }));
    });

    it('should prefer prefersDarkMode when localStorage contains invalid value', () => {
      global.console.error = jest.fn();

      when(localStorage.getItem as jest.Mock)
        .calledWith(defaultOptions.storageKey)
        .mockReturnValue({ invalidValue: true });

      (mediaQueryServiceMock.prefersDarkMode as jest.Mock).mockReturnValue(
        true
      );

      const darkModeService = createService();

      expect(darkModeService.darkMode$).toBeObservable(hot('a', { a: true }));
      expect(global.console.error).toHaveReturnedTimes(1);
    });

    it('should prefer localStorage darkMode value', () => {
      when(localStorage.getItem as jest.Mock)
        .calledWith(defaultOptions.storageKey)
        .mockReturnValueOnce(JSON.stringify({ darkMode: true }))
        .mockReturnValueOnce(JSON.stringify({ darkMode: false }));

      let darkModeService = createService();
      expect(darkModeService.darkMode$).toBeObservable(hot('a', { a: true }));
      expect(rendererMock.addClass).toHaveBeenCalledWith(
        defaultOptions.element,
        defaultOptions.darkModeClass
      );

      darkModeService = createService();
      expect(darkModeService.darkMode$).toBeObservable(hot('a', { a: false }));
      expect(rendererMock.addClass).toHaveBeenCalledWith(
        defaultOptions.element,
        defaultOptions.lightModeClass
      );
    });

    it('should prefer provided options', () => {
      const providedOptions: Partial<DarkModeOptions> = {
        darkModeClass: 'provided-dark-mode',
        lightModeClass: 'provided-light-mode',
        storageKey: 'provided-storage-key',
      };

      when(localStorage.getItem as jest.Mock)
        .calledWith(providedOptions.storageKey)
        .mockReturnValueOnce(JSON.stringify({ darkMode: true }))
        .mockReturnValueOnce(JSON.stringify({ darkMode: false }));

      let darkModeService = createService(providedOptions);
      expect(darkModeService.darkMode$).toBeObservable(hot('a', { a: true }));
      expect(rendererMock.addClass).toHaveBeenCalledWith(
        defaultOptions.element,
        providedOptions.darkModeClass
      );

      darkModeService = createService(providedOptions);
      expect(darkModeService.darkMode$).toBeObservable(hot('a', { a: false }));
      expect(rendererMock.addClass).toHaveBeenCalledWith(
        defaultOptions.element,
        providedOptions.lightModeClass
      );
    });
  });

  describe('toggle', () => {
    it('should toggle darkMode value', () => {
      // start with true
      mockLocalStorageDarkMode(true);

      const buffer: boolean[] = [];

      const darkModeService = createService();

      darkModeService.darkMode$.subscribe(v => buffer.push(v));
      expect(buffer).toEqual([true]);

      // true => false
      darkModeService.toggle();
      expect(buffer).toEqual([true, false]);

      // false => true
      darkModeService.toggle();
      expect(buffer).toEqual([true, false, true]);
    });
  });

  describe('enable', () => {
    it('should enable dark mode', () => {
      // start with false
      mockLocalStorageDarkMode(false);

      const buffer: boolean[] = [];

      const darkModeService = createService();

      darkModeService.darkMode$.subscribe(v => buffer.push(v));
      expect(buffer).toEqual([false]);

      darkModeService.enable();
      expect(buffer).toEqual([false, true]);
    });

    it('should not emit when already enabled', () => {
      // start with true
      mockLocalStorageDarkMode(true);

      const buffer: boolean[] = [];

      const darkModeService = createService();

      darkModeService.darkMode$.subscribe(v => buffer.push(v));
      expect(buffer).toEqual([true]);

      darkModeService.enable();
      expect(buffer).toEqual([true]);
    });
  });

  describe('disable', () => {
    it('should disable dark mode', () => {
      // start with true
      mockLocalStorageDarkMode(true);

      const buffer: boolean[] = [];

      const darkModeService = createService();

      darkModeService.darkMode$.subscribe(v => buffer.push(v));
      expect(buffer).toEqual([true]);

      darkModeService.disable();
      expect(buffer).toEqual([true, false]);
    });

    it('should not emit when already disabled', () => {
      // start with false
      mockLocalStorageDarkMode(false);

      const buffer: boolean[] = [];

      const darkModeService = createService();

      darkModeService.darkMode$.subscribe(v => buffer.push(v));
      expect(buffer).toEqual([false]);

      darkModeService.disable();
      expect(buffer).toEqual([false]);
    });
  });
});
