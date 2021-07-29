import { NgModule, PLATFORM_ID } from '@angular/core';
import {
  DARK_MODE_DEFAULT_OPTIONS,
  defaultOptionsFactory,
} from './default-options';

@NgModule({
  providers: [
    {
      provide: DARK_MODE_DEFAULT_OPTIONS,
      useFactory: defaultOptionsFactory,
      deps: [PLATFORM_ID],
    },
  ],
})
export class DarkModeModule {}
