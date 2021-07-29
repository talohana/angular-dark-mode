import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DarkModeModule } from 'angular-dark-mode';
import { AppComponent } from './app.component';
import { DarkModeToggleComponent } from './dark-mode-toggle.component';

@NgModule({
  declarations: [AppComponent, DarkModeToggleComponent],
  imports: [
    DarkModeModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
