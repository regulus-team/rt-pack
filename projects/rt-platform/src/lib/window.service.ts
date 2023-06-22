import {isPlatformBrowser} from '@angular/common';
import {Inject, Injectable, InjectionToken, Injector, PLATFORM_ID} from '@angular/core';

@Injectable()
export class WindowService {
  private readonly _window: Window;

  constructor(@Inject(PLATFORM_ID) private platformId: string, private injector: Injector) {
    if (!isPlatformBrowser(platformId)) {
      this._window = {navigator: {userAgent: 'fakeAgent'}} as Window;
    } else {
      this._window = window;
    }
  }

  get nativeWindow(): Window {
    return this._window;
  }

  calculateHeight(): number {
    if (isPlatformBrowser(this.platformId)) {
      const appHeight = () => {
        const doc = document.documentElement;
        doc.style.setProperty(`--app-height`, `${window.innerHeight}px`);
      };
      window.addEventListener(`resize`, appHeight);
      appHeight();
      return window.innerHeight;
    }
  }
}

export const WINDOW = new InjectionToken('ng-toolkit-window');
