import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  constructor(@Inject(DOCUMENT) private document: Document | null) {}

  setItem(key: string, value: string): void {
    this.localStorage?.setItem(key, value);
  }

  getItem(key: string): ReturnType<Storage['getItem']> {
    return this.localStorage?.getItem(key) ?? null;
  }

  get localStorage(): Storage | null {
    return this.document?.defaultView?.localStorage ?? null;
  }
}
