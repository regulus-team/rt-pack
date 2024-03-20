import { Inject, Injectable }                                                    from '@angular/core';
import uniqueId                                                                  from 'lodash/uniqueId';
import { BehaviorSubject }                                                       from 'rxjs';
import { RtToast, RtToastConfig, RtToastData, RtToastsConfigToken, RtToastType } from './symbols';

@Injectable()
export class RtToastService {
  private _toasts: BehaviorSubject<RtToast[]> = new BehaviorSubject([]);

  constructor(@Inject(RtToastsConfigToken) private config: RtToastConfig) {
  }


  get toasts(): BehaviorSubject<RtToast[]> {
    return this._toasts;
  }

  public createSuccessToast(data: RtToastData): void {
    this.createToast({...this.config, type: RtToastType.Success, ...data});
  }

  public createErrorToast(data: RtToastData): void {
    this.createToast({...this.config, type: RtToastType.Error, ...data});
  }

  public createWarningToast(data: RtToastData): void {
    this.createToast({...this.config, type: RtToastType.Warning, ...data});
  }

  public createInfoToast(data: RtToastData): void {
    this.createToast({...this.config, type: RtToastType.Info, ...data});
  }

  public createToast(toast: RtToast): void {
    const toasts = this._toasts.value;
    let duplicateIndex = -1;
    for (let i = 0; i < toasts.length; i++) {
      const t = toasts[i];
      if (`${t.message}${t.label}` === `${toast.message}${toast.label}`) {
        duplicateIndex = i;
      }
    }
    if (duplicateIndex !== -1 && duplicateIndex === toasts.length - 1 && this.config.groupByDuplicate) {
      toasts[duplicateIndex].isDuplicate = true;
      this._toasts.next(toasts);
      return;
    }

    toasts.push({...this.config, id: uniqueId(), type: RtToastType.Success, ...toast});
    this._toasts.next(toasts);
  }

  public removeToastById(id: string): void {
    const toastsFiltered = this._toasts.value.filter((toast) => toast.id !== id);
    this._toasts.next(toastsFiltered);
  }

  public forgotAboutDuplicate(id: string): void {
    const toasts = this._toasts.value;
    const duplicateIndex = toasts.findIndex((t) => t.id === id);
    if (duplicateIndex !== -1) {
      toasts[duplicateIndex].isDuplicate = false;
      this._toasts.next(toasts);
    }
  }
}
