import {
  Inject,
  Injectable,
  Optional,
  Renderer2,
  RendererFactory2,
  WritableSignal,
  signal,
} from '@angular/core'
import { DARK_MODE_OPTIONS } from './dark-mode-options'
import { defaultOptions } from './default-options'
import { isNil } from './isNil'
import { MediaQueryService } from './media-query.service'
import { DarkModeOptions } from './types'

@Injectable({ providedIn: 'root' })
export class DarkModeService {
  private readonly options: DarkModeOptions
  private readonly renderer: Renderer2
  readonly darkMode$: WritableSignal<boolean>

  constructor(
    private rendererFactory: RendererFactory2,
    private mediaQueryService: MediaQueryService,
    // prettier-ignore
    @Optional() @Inject(DARK_MODE_OPTIONS) private providedOptions: DarkModeOptions | null,
  ) {
    this.options = { ...defaultOptions, ...(this.providedOptions || {}) }
    this.renderer = this.rendererFactory.createRenderer(null, null)

    this.darkMode$ = signal<boolean>(this.getInitialDarkModeValue())
    this.darkMode$() ? this.enable() : this.disable()

    this.removePreloadingClass()
  }

  toggle(): void {
    this.darkMode$() ? this.disable() : this.enable()
  }

  enable(): void {
    const { element, darkModeClass, lightModeClass } = this.options
    this.renderer.removeClass(element, lightModeClass)
    this.renderer.addClass(element, darkModeClass)

    this.saveDarkModeToStorage(true)
    this.darkMode$.set(true)
  }

  disable(): void {
    const { element, darkModeClass, lightModeClass } = this.options
    this.renderer.removeClass(element, darkModeClass)
    this.renderer.addClass(element, lightModeClass)

    this.saveDarkModeToStorage(false)
    this.darkMode$.set(false)
  }

  private getInitialDarkModeValue(): boolean {
    const darkModeFromStorage = this.getDarkModeFromStorage()

    if (isNil(darkModeFromStorage)) {
      return this.mediaQueryService.prefersDarkMode()
    }

    return darkModeFromStorage
  }

  private saveDarkModeToStorage(darkMode: boolean): void {
    localStorage.setItem(this.options.storageKey, JSON.stringify({ darkMode }))
  }

  private getDarkModeFromStorage(): boolean | null {
    const storageItem = localStorage.getItem(this.options.storageKey)

    if (storageItem) {
      try {
        return JSON.parse(storageItem)?.darkMode
      } catch (error) {
        console.error(
          'Invalid darkMode localStorage item:',
          storageItem,
          'falling back to color scheme media query',
        )
      }
    }

    return null
  }

  private removePreloadingClass(): void {
    // defer to next tick
    setTimeout(() => {
      this.renderer.removeClass(this.options.element, this.options.preloadingClass)
    })
  }
}
