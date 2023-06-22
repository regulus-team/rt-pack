import {isPlatformBrowser, isPlatformServer} from '@angular/common';
import {Inject, Injectable, Optional, PLATFORM_ID} from '@angular/core';
import {defaultConfig, RtPlatformConfig, RtPlatformConfigToken} from './symbols';


@Injectable({
  providedIn: 'root',
})
export class RtPlatformService {

  private readonly config: RtPlatformConfig;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Optional() @Inject(RtPlatformConfigToken) injectedConfig: RtPlatformConfig,
  ) {
    /** merge with default config & save in local variable (so it will be never undefined) */
    this.config = Object.assign(defaultConfig, injectedConfig);
  }

  get baseUrl(): string {
    /** local base url should have higher priority, as build may be run on a local machine */
    if (this.config.localBaseUrl) {
      return this.config.localBaseUrl;
    }
    if (this.config.serverBaseUrl) {
      return this.config.serverBaseUrl;
    }
    return '';
  }

  get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  get isServer(): boolean {
    return isPlatformServer(this.platformId);
  }
}
