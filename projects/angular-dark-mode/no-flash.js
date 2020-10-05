/*  
  If you use the default settings, include this in you angular.json scripts section
  
  If you changed the default settings:
    1) copy this script to your project
    2) changed the relevant settings
    3) include in angular.json scripts section
*/
(function () {
  var darkModeClass = 'dark-mode';
  var lightModeClass = 'light-mode';
  var storageKey = 'dark-mode';

  var darkModeFromStorage = localStorage[storageKey];
  var initialDarkModeValue = false;

  if (darkModeFromStorage === null) {
    var prefersDarkSchemeQuery = '(prefers-color-scheme: dark)';
    initialDarkModeValue = window.matchMedia(prefersDarkSchemeQuery).matches;
  } else {
    try {
      var parsedDarkModeFromStorage = JSON.parse(darkModeFromStorage);
      initialDarkModeValue = parsedDarkModeFromStorage.darkMode;
    } catch (err) {
      console.warn('Error initializing angular-dark-mode');
      console.warn(err);
      return;
    }
  }

  document.body.classList.add(
    initialDarkModeValue ? darkModeClass : lightModeClass
  );
})();
