import {AfterViewInit, Directive, ElementRef, Inject, OnDestroy, Renderer2} from '@angular/core';
import {WINDOW} from 'rt-platform';
import {fromEvent, Subscription} from 'rxjs';

@Directive({
  selector: '[rtPinNavigation]',
  standalone: true,
})
export class RtPinNavigationDirective implements OnDestroy, AfterViewInit {

  private subscription: Subscription | null = null;
  private originalPosition: string;
  private originalZIndex: string;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(WINDOW) private window: Window,
  ) {
  }

  ngAfterViewInit(): void {
    this.originalPosition = getComputedStyle(this.el.nativeElement).position;
    this.originalZIndex = getComputedStyle(this.el.nativeElement).zIndex;
    this.subscription = this.createAndObserve();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.resetElementStyle();
  }

  createAndObserve(): Subscription {
    return fromEvent(this.window, 'scroll')
      .subscribe(() => {
        this.resetElementStyle();
        const position = this.el.nativeElement.getBoundingClientRect();
        this.handleIntersection(position.top > 0);
      });
  }

  private handleIntersection(isVisible: boolean): void {
    if (!isVisible) {
      this.makeElementSticky();
    } else {
      this.resetElementStyle();
    }
  }

  private makeElementSticky(): void {
    this.renderer.setStyle(this.el.nativeElement, 'z-index', '1000');
    this.renderer.setStyle(this.el.nativeElement, 'position', 'fixed');
    this.renderer.setStyle(this.el.nativeElement, 'top', '0');
    this.renderer.setStyle(this.el.nativeElement, 'width', '100%');
  }

  private resetElementStyle(): void {
    this.renderer.setStyle(this.el.nativeElement, 'z-index', this.originalZIndex);
    this.renderer.setStyle(this.el.nativeElement, 'position', this.originalPosition);
  }
}
