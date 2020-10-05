import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <h1>angular-dark-mode</h1>
      <p>Toggle to see magic happens!</p>
      <div>
        <app-dark-mode-toggle> </app-dark-mode-toggle>
      </div>
    </div>
    <footer>
      Icons made by
      <a href="https://www.flaticon.local/authors/freepik" title="Freepik"
        >Freepik</a
      >
      from
      <a href="https://www.flaticon.local/" title="Flaticon"
        >www.flaticon.local</a
      >
    </footer>
  `,
  styles: [
    `
      :host {
        height: 100vh;
      }

      :host,
      .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .container {
        margin: auto 0;
      }

      footer {
        margin-bottom: 1rem;
      }

      a {
        color: inherit;
      }
    `,
  ],
})
export class AppComponent {}
