import { LocalStorageService } from '../local-storage.service';

describe('LocalStorageService', () => {
  let localStorageService: LocalStorageService;

  beforeEach(() => {
    localStorageService = new LocalStorageService(document);

    jest.clearAllMocks();
    jest.spyOn(localStorage, 'getItem');
    jest.spyOn(localStorage, 'setItem');
  });

  describe('getItem', () => {
    it('should delegate call to localStorage', () => {
      localStorageService.getItem('test');

      expect(localStorage.getItem).toHaveBeenCalledTimes(1);
      expect(localStorage.getItem).toHaveBeenCalledWith('test');
    });

    it('should return null if localStorage is not available', () => {
      localStorageService = new LocalStorageService(null);

      const result = localStorageService.getItem('test');

      expect(result).toBeNull();
      expect(localStorage.getItem).toHaveBeenCalledTimes(0);
    });
  });

  describe('setItem', () => {
    it('should delegate call to localStorage', () => {
      localStorageService.setItem('testKey', 'testValue');

      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith('testKey', 'testValue');
    });

    it('should not throw when localStorage is not available', () => {
      localStorageService = new LocalStorageService(null);

      expect(() =>
        localStorageService.setItem('testKey', 'testValue')
      ).not.toThrowError();
    });
  });
});
