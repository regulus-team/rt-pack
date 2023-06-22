import {InjectionToken} from '@angular/core';
import {WindowService} from './window.service';


export interface RtPlatformConfig {
  /** usually saved in settings */
  localBaseUrl?: string;
  /** have lower priority, as build may be run on a local machine */
  serverBaseUrl?: string;
}

export function factoryFn(windowService: WindowService): Window {
  return windowService.nativeWindow;
}

export const RtPlatformConfigToken = new InjectionToken<RtPlatformConfig>('RtPlatformConfig');

export const defaultConfig: RtPlatformConfig = {
  localBaseUrl: null,
  serverBaseUrl: null,
};
