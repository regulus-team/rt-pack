import {AfterViewInit, Directive, ElementRef, Renderer2} from '@angular/core';

@Directive({
  selector: '[rtPinNavigation]',
  standalone: true,
})
export class RtPinNavigationDirective implements AfterViewInit {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {
  }

  ngAfterViewInit(): void {
    this.renderer.setStyle(this.el.nativeElement, 'position', 'sticky');
    this.renderer.setStyle(this.el.nativeElement, 'top', '0');
    this.renderer.setStyle(this.el.nativeElement, 'z-index', '1000');
  }

}
