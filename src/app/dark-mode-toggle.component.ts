import { Component } from '@angular/core';
import { DarkModeService } from 'angular-dark-mode';

@Component({
  selector: 'app-dark-mode-toggle',
  template: `
    <input
      id="darkMode"
      type="checkbox"
      [checked]="darkMode$()"
      (change)="onToggle()"
      class="toggle"
    />
    <label class="toggle-label" for="darkMode">
      <img src="assets/moon.svg" class="moon" />
      <img src="assets/sun.svg" class="sun" />
    </label>
  `,
  styles: [
    `
      .toggle {
        display: none;
      }

      .toggle-label {
        position: relative;
        display: inline-block;
        width: 3rem;
        height: 3rem;
        overflow: hidden;
      }

      .sun,
      .moon {
        position: absolute;
        left: 0;
        width: 100%;
        height: auto;
        transition: top 0.3s;
      }

      .sun {
        top: 0;
      }

      .moon {
        top: -150%;
      }

      .toggle:checked + .toggle-label .sun {
        top: 150%;
      }

      .toggle:checked + .toggle-label .moon {
        top: 0;
      }
    `,
  ],
})
export class DarkModeToggleComponent {
  readonly darkMode$ = this.darkModeService.darkMode$;

  constructor(private darkModeService: DarkModeService) {}

  onToggle(): void {
    this.darkModeService.toggle();
  }
}
