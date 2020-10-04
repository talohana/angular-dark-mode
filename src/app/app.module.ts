import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DarkModeToggleComponent } from './dark-mode-toggle.component';

@NgModule({
  declarations: [AppComponent, DarkModeToggleComponent],
  imports: [BrowserModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
