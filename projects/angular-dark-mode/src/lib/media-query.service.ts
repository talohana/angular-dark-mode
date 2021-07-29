import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { prefersDarkSchemeQuery } from './media-query';

@Injectable({ providedIn: 'root' })
export class MediaQueryService {
  private readonly isBrowser: boolean;

  /*  eslint-disable-next-line @typescript-eslint/ban-types */
  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  matchMedia(query: string): MediaQueryList {
    return window.matchMedia(query);
  }

  prefersDarkMode(): boolean {
    if (this.isBrowser) {
      return this.matchMedia(prefersDarkSchemeQuery).matches;
    }

    return false;
  }
}
