import { Renderer2, RendererFactory2 } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
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
    rendererMock = {
      addClass: jest.fn(),
      removeClass: jest.fn(),
    } as unknown as Renderer2;

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
      expect(darkModeService.darkMode$()).toBe(true);
      expect(rendererMock.addClass).toHaveBeenCalledWith(
        defaultOptions.element,
        defaultOptions.darkModeClass
      );

      darkModeService = createService();
      expect(darkModeService.darkMode$()).toBe(false);
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

      expect(darkModeService.darkMode$()).toBe(true);
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

      expect(darkModeService.darkMode$()).toBe(true);
      expect(global.console.error).toHaveReturnedTimes(1);
    });

    it('should prefer localStorage darkMode value', () => {
      when(localStorage.getItem as jest.Mock)
        .calledWith(defaultOptions.storageKey)
        .mockReturnValueOnce(JSON.stringify({ darkMode: true }))
        .mockReturnValueOnce(JSON.stringify({ darkMode: false }));

      let darkModeService = createService();
      expect(darkModeService.darkMode$()).toBe(true);
      expect(rendererMock.addClass).toHaveBeenCalledWith(
        defaultOptions.element,
        defaultOptions.darkModeClass
      );

      darkModeService = createService();
      expect(darkModeService.darkMode$()).toBe(false);
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
      expect(darkModeService.darkMode$()).toBe(true);
      expect(rendererMock.addClass).toHaveBeenCalledWith(
        defaultOptions.element,
        providedOptions.darkModeClass
      );

      darkModeService = createService(providedOptions);
      expect(darkModeService.darkMode$()).toBe(false);
      expect(rendererMock.addClass).toHaveBeenCalledWith(
        defaultOptions.element,
        providedOptions.lightModeClass
      );
    });

    it('should remove preloadingClass after loading', fakeAsync(() => {
      createService();

      tick();

      // for enable/disable and remove preloading class
      expect(rendererMock.removeClass).toHaveBeenCalledTimes(2);
      expect(rendererMock.removeClass).toHaveBeenCalledWith(
        defaultOptions.element,
        defaultOptions.preloadingClass
      );
    }));
  });

  describe('toggle', () => {
    it('should toggle darkMode value', () => {
      // start with true
      mockLocalStorageDarkMode(true);

      const darkModeService = createService();
      const darkModeValue = darkModeService.darkMode$.asReadonly();

      expect(darkModeValue()).toEqual(true);

      // true => false
      darkModeService.toggle();
      expect(darkModeValue()).toEqual(false);

      // false => true
      darkModeService.toggle();
      expect(darkModeValue()).toEqual(true);
    });
  });

  describe('enable', () => {
    it('should enable dark mode', () => {
      // start with false
      mockLocalStorageDarkMode(false);

      const darkModeService = createService();
      const darkModeValue = darkModeService.darkMode$.asReadonly();

      expect(darkModeValue()).toEqual(false);

      darkModeService.enable();
      expect(darkModeValue()).toEqual(true);
    });

    it('should not emit when already enabled', () => {
      // start with true
      mockLocalStorageDarkMode(true);

      const darkModeService = createService();
      const darkModeValue = darkModeService.darkMode$.asReadonly();

      expect(darkModeValue()).toEqual(true);

      darkModeService.enable();
      expect(darkModeValue()).toEqual(true);
    });
  });

  describe('disable', () => {
    it('should disable dark mode', () => {
      // start with true
      mockLocalStorageDarkMode(true);

      const darkModeService = createService();
      const darkModeValue = darkModeService.darkMode$.asReadonly();

      expect(darkModeValue()).toEqual(true);

      darkModeService.disable();
      expect(darkModeValue()).toEqual(false);
    });

    it('should not emit when already disabled', () => {
      // start with false
      mockLocalStorageDarkMode(false);

      const darkModeService = createService();
      const darkModeValue = darkModeService.darkMode$.asReadonly();

      expect(darkModeValue()).toEqual(false);

      darkModeService.disable();
      expect(darkModeValue()).toEqual(false);
    });
  });
});
