import { animate, keyframes, style, transition, trigger }                                  from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { config, interval, Subject, Subscription }                                         from 'rxjs';
import { takeUntil }                                                                       from 'rxjs/operators';
import {
  RtToastService,
}                                                                                          from '../../rt-toast.service';
import { RtToast }                                                                         from '../../symbols';

@Component({
  selector: 'rt-toast',
  templateUrl: './rt-toast.component.html',
  styleUrls: ['./rt-toast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('payAttentionAnimation', [
      transition('none => triggered', [
        animate(
          300,
          keyframes([
            style({transform: 'rotateZ(3deg)'}),
            style({transform: 'rotateZ(-3deg)'}),
            style({transform: 'rotateZ(3deg)'}),
            style({transform: 'rotateZ(-3deg)'}),
          ]),
        ),
      ]),
    ]),
  ],
})
export class RtToastComponent implements OnInit, OnDestroy {

  @Input() isHoveredContainer = false;

  public segment = 0;
  public toastTimeout = 0;
  private destroyed = new Subject<void>();
  private _toast: RtToast;
  private subscription = new Subscription();

  constructor(private cd: ChangeDetectorRef, private toastService: RtToastService) {
  }

  @Input() set toast(value: RtToast) {
    this.toastTimeout = value.timeout;
    this._toast = value;
    this.segment = 100 / value.timeout;
  }

  get toast(): RtToast {
    return this._toast;
  }

  ngOnInit(): void {
    this.subscription.add(
      interval(100)
        .pipe(takeUntil(this.destroyed))
        .subscribe(() => {
          if (!this.isHoveredContainer) {
            this.toastTimeout -= 100;
            if (this.toastTimeout <= 0) {
              this.toastService.removeToastById(this.toast.id);
              this.destroyed.next();
            }

            this.cd.detectChanges();
          }
        }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  closeToast(): void {
    this.toastService.removeToastById(this.toast.id);
  }

  forgotAboutDuplicate(id: string): void {
    this.toastService.forgotAboutDuplicate(id);
    this.toastTimeout = this.toast.timeout;
  }
}
