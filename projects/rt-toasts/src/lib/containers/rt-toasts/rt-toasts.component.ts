import { animate, state, style, transition, trigger }                                             from '@angular/animations';
import { ChangeDetectionStrategy, Component, HostListener, Inject }                               from '@angular/core';
import {
  RtToastService,
}                                                                                                 from '../../rt-toast.service';
import { fadeInTop, RtToast, RtToastConfig, RtToastsConfigToken, rtToastsPositionRelatedClasses } from '../../symbols';

@Component({
  selector: 'rt-toasts',
  templateUrl: './rt-toasts.component.html',
  styleUrls: ['./rt-toasts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInTop', [
      state('in', style({opacity: 1, transform: 'translateY(0)'})),
      transition(':enter', [style({opacity: 0, transform: 'translateY(-80px)'}), animate(200)]),
      transition(':leave', animate(200, style({opacity: 0, transform: 'translateY(-300px)'}))),
    ]),
    trigger('fadeInBottom', [
      state('in', style({opacity: 1, transform: 'translateY(0)'})),
      transition(':enter', [style({opacity: 0, transform: 'translateY(80px)'}), animate(200)]),
      transition(':leave', animate(200, style({opacity: 0, transform: 'translateY(300px)'}))),
    ]),
  ],
})
export class RtToastsComponent {
  isHovered = false;

  @HostListener('mouseenter') onMouseEnter(): void {
    this.isHovered = true;
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.isHovered = false;
  }


  constructor(public toastService: RtToastService, @Inject(RtToastsConfigToken) public config: RtToastConfig) {
  }

  protected readonly rtToastsPositionRelatedClasses = rtToastsPositionRelatedClasses;
  protected readonly fadeInTop = fadeInTop;

  trackBy(index: number, toast: RtToast): string {
    return toast.id;
  };
}

