import {AfterViewInit, Directive, ElementRef, Renderer2} from '@angular/core';
import {DeviceDetectorService} from 'ngx-device-detector';

@Directive({
  selector: '[rtPinNavigation]',
  standalone: true,
})
export class RtPinNavigationDirective implements AfterViewInit {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private deviceService: DeviceDetectorService,
  ) {
  }

  ngAfterViewInit(): void {
    if (this.deviceService.browser === 'Firefox') {
      return;
    }

    this.renderer.setStyle(this.el.nativeElement, 'position', 'sticky');
    this.renderer.setStyle(this.el.nativeElement, 'top', '0');
    this.renderer.setStyle(this.el.nativeElement, 'z-index', '1000');

  }

}
