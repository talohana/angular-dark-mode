/*  
  If you use the default settings, include this in you angular.json scripts section
  
  If you changed the default settings:
    1) copy this script to your project
    2) change relevant settings
    3) include in angular.json scripts section
*/
(function () {
  var darkModeClass = 'dark-mode';
  var lightModeClass = 'light-mode';
  var preloadingClass = 'dark-mode-preloading';
  var storageKey = 'dark-mode';

  var darkModeFromStorage = localStorage[storageKey];
  var initialDarkModeValue = false;

  if (darkModeFromStorage) {
    try {
      var parsedDarkModeFromStorage = JSON.parse(darkModeFromStorage);
      initialDarkModeValue = parsedDarkModeFromStorage.darkMode;
    } catch (err) {
      console.warn('Error initializing angular-dark-mode');
      console.warn(err);
      return;
    }
  } else {
    /**
     *  Default initial state is via prefers-color-scheme media query. Override the below lines to change initial state.
     *
     *  For example to always start in light / dark mode you can immediately set the localStorage entry:
     *  ```js
     *  localStorage.setItem(storageKey, JSON.stringify({ darkMode: initialDarkModeValue }))
     *  ```
     */
    var prefersDarkSchemeQuery = '(prefers-color-scheme: dark)';
    initialDarkModeValue = window.matchMedia(prefersDarkSchemeQuery).matches;
  }

  document.body.classList.add(
    preloadingClass,
    initialDarkModeValue ? darkModeClass : lightModeClass
  );
})();
