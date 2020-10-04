<p align="center">
    <img width="50%" height="50%" src="https://raw.githubusercontent.com/talohana/ngx-dark-theme/master/logo.svg" />
</p>

<hr />

![GitHub](https://img.shields.io/github/license/talohana/ngx-dark-theme)
![Codecov](https://img.shields.io/codecov/c/github/talohana/ngx-dark-theme)
![Travis (.com)](https://img.shields.io/travis/com/talohana/ngx-dark-theme)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

ngx-dark-theme is a zero-dependency library that helps you integrate dark mode into you Angular applications with ease!

Inspired by the awesome [use-dark-mode](https://github.com/donavon/use-dark-mode) library

<p align="left">
  <img width="40%" src="https://raw.githubusercontent.com/talohana/ngx-dark-theme/master/example.gif" />
</p>

## Installation

To use ngx-dark-theme in your project install it via npm:

```
npm i ngx-dark-theme
```

or if you are using yarn:

```
yarn add ngx-dark-theme
```

## Usage

In order to use ngx-dark-theme you need to inject the service somewhere in your applications - presumably where you hold the dark mode toggle, and get the dark mode value from the exported `darkMode$` Observable:

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

Next, include global styles and some text to reflect the themes:

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
    <h1>ngx-dark-theme</h1>
    <p>Toggle to see magic happens!</p>
    <app-dark-mode-toggle></app-dark-mode-toggle>
  `,
})
export class AppComponent {}
```

You're all set!  
Save and run your application, play with the toggle button to change between themes.

## Options

`ngx-dark-theme` ships with the following options:

| Option         |               Description                |   Default Value |
| -------------- | :--------------------------------------: | --------------: |
| darkModeClass  | The class name to set when in dark mode  |     `dark-mode` |
| lightModeClass | The class name to set when in light mode |    `light-mode` |
| storageKey     | localStorage key to persis the dark mode |     `dark-mode` |
| element        |      HTMLElement to set the classes      | `document.body` |

<br />

All options are set to default and can be configured via the `DARK_MODE_OPTIONS` InjectionToken:

```ts
import { DARK_MODE_OPTIONS } from 'ngx-dark-theme';

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

## No Flash

When the page is refreshed it causes the theme to flash, to avoid it we need to set the dark/light class name before the page loads.

To resolve this problem include a file `no-flash.js` shipped with ngx-dark-theme in your `angular.json` scripts section

```json
{
  "scripts": ["./node_modules/ngx-dark-theme/no-flash.js"]
}
```

In case you changed the default options, copy [`no-flash.js`](./projects/ngx-dark-theme/no-flash.js) locally, configure it accordingly and include it in your `angular.json` scripts section.
