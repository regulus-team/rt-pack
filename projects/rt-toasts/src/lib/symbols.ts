import {InjectionToken} from '@angular/core';

export enum RtToastPosition {
  TopLeft = 'top-left',
  TopRight = 'top-right',
  BottomLeft = 'bottom-left',
  BottomRight = 'bottom-right',
  TopCenter = 'top-center',
  BottomCenter = 'bottom-center',
}

export enum RtToastType {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
}

export const rtToastsPositionRelatedClasses = {
  [RtToastPosition.TopLeft]: 'rt-toasts__top-left',
  [RtToastPosition.TopRight]: 'rt-toasts__top-right',
  [RtToastPosition.TopCenter]: 'rt-toasts__top-center',
  [RtToastPosition.BottomLeft]: 'rt-toasts__bottom-left',
  [RtToastPosition.BottomRight]: 'rt-toasts__bottom-right',
  [RtToastPosition.BottomCenter]: 'rt-toasts__bottom-center',
};

export const fadeInTop = {
  [RtToastPosition.TopLeft]: true,
  [RtToastPosition.TopRight]: true,
  [RtToastPosition.TopCenter]: true,
  [RtToastPosition.BottomLeft]: false,
  [RtToastPosition.BottomRight]: false,
  [RtToastPosition.BottomCenter]: false,
};


export interface RtToastConfig {
  position: RtToastPosition;
  timeout?: number;
  isShowTimeout?: boolean;
  groupByDuplicate?: boolean;
  width?: number;
}

export interface RtToastData {
  label: string;
  message: string;
  timeout?: number;
  isShowTimeout?: boolean;
}
export interface RtToast {
  id?: string;
  label: string;
  type?: RtToastType;
  message: string;
  timeout?: number;
  isShowTimeout?: boolean;
  isDuplicate?: boolean;
}

/** Default config for `RtMemorizedNavigationModule`. Used if no configs provided. */
export const defaultRtToastsConfig: Required<RtToastConfig> = {
  position: RtToastPosition.TopRight,
  timeout: 5000,
  isShowTimeout: true,
  groupByDuplicate: true,
  width: 400,
};


export const RtToastsConfigToken = new InjectionToken<string>('RtToastsConfigToken');

