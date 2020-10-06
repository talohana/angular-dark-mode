<p align="center">
    <img width="600px" src="https://raw.githubusercontent.com/talohana/angular-dark-mode/master/logo.svg" />
</p>

<hr />

![GitHub](https://img.shields.io/github/license/talohana/angular-dark-mode)
![Codecov](https://img.shields.io/codecov/c/github/talohana/angular-dark-mode)
![Travis (.com)](https://img.shields.io/travis/com/talohana/angular-dark-mode)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

angular-dark-mode is a zero-dependency library that helps you integrate dark mode into you Angular applications with ease!

Inspired by the awesome [use-dark-mode](https://github.com/donavon/use-dark-mode) library

<p align="center">
  <img width="400px" src="https://raw.githubusercontent.com/talohana/angular-dark-mode/master/example.gif" />
</p>

## Installation

To use angular-dark-mode in your project install it via npm:

```
npm i angular-dark-mode
```

or if you are using yarn:

```
yarn add angular-dark-mode
```

and add `angular-dark-mode.js` file to `angular.json` scripts section:

```json
{
  "scripts": ["./node_modules/angular-dark-mode/angular-dark-mode.js"]
}
```

if you are using custom configuration see [angular-dark-mode.js](#angular-dark-mode.js)

## Usage

In order to use angular-dark-mode you need to inject the service somewhere in your applications - presumably where you hold the dark mode toggle, and get the dark mode value from the exported `darkMode$` Observable:

```ts
// dark-mode-toggle.component.ts

@Component({
  selector: 'app-dark-mode-toggle',
  template: `<input
    type="checkbox"
    [checked]="darkMode$ | async"
    (change)="onToggle()"
  />`,
})
export class DarkModeToggle {
  darkMode$: Observable<boolean> = this.darkModeService.darkMode$;

  constructor(private darkModeService: DarkModeService) {}

  onToggle(): void {
    this.darkModeService.toggle();
  }
}
```

Next, include global styles and some text to reflect the mode:

```css
/* styles.css */

body.dark-mode {
  background-color: #2d3436;
  color: #dfe6e9;
}

body.light-mode {
  background-color: #dfe6e9;
  color: #2d3436;
}
```

```ts
// app.component.ts

@Component({
  selector: 'app-root',
  template: `
    <h1>angular-dark-mode</h1>
    <p>Toggle to see magic happens!</p>
    <app-dark-mode-toggle></app-dark-mode-toggle>
  `,
})
export class AppComponent {}
```

You're all set!  
Save and run your application, play with the toggle button to change between modes.

## Options

`angular-dark-mode` ships with the following options:

| Option          |                         Description                          |          Default Value |
| --------------- | :----------------------------------------------------------: | ---------------------: |
| darkModeClass   |                   dark mode css class name                   |            `dark-mode` |
| lightModeClass  |                  light mode css class name                   |           `light-mode` |
| preloadingClass | css class name to flag that `element` is in preloading state | `dark-mode-preloading` |
| storageKey      |            localStorage key to persist dark mode             |            `dark-mode` |
| element         |         target HTMLElement to set given css classes          |        `document.body` |

<br />

All options are set to default and can be configured via the `DARK_MODE_OPTIONS` InjectionToken:

```ts
import { DARK_MODE_OPTIONS } from 'angular-dark-mode';

@NgModule({
    ...
    providers: [
        {
            provide: DARK_MODE_OPTIONS,
            useValue: {
                darkModeClass: 'my-dark-mode',
                lightModeClass: 'my-light-mode'
            }
        }
    ]
    ...
})
export class AppModule {}
```

## angular-dark-mode.js

This file has multiple purposes:

1. Persistence - retrieve previous dark mode state from `localStorage` if empty falls back to [`(prefers-color-scheme: dark)` media query](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
2. Preloading - set a `preloadingClass` to `document.body` which can be used to prevent initial transitioning

If you are using the default configurations, adding the `angular-dark-mode.js` file bundled with this library is enough.

In any other case, copy `angular-dark-mode.js` locally, make the necessary changes and load it instead of the bundled one.

### Transitioning

It is often useful to transition the changes between dark and light modes, and most of the time we would want to skip the initial transition, in order to achieve this use the `preloadingClass` option like so:

```css
/* styles.css */
...

body:not(.dark-mode-preloading) {
  transition: all 0.3s linear;
}

...
```
