import {AfterViewInit, Directive, ElementRef, Inject, OnDestroy, Renderer2} from '@angular/core';
import {factoryFn, WINDOW, WindowService} from 'rt-platform';
import {fromEvent, Subscription} from 'rxjs';

@Directive({
  selector: '[rtPinNavigation]',
  providers: [
    {
      provide: WINDOW,
      useFactory: factoryFn,
      deps: [WindowService],
    },
    WindowService,
  ],
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
        this.handleIntersection(position.top > 0, position.top);
      });
  }

  private handleIntersection(isVisible: boolean, position: number): void {
    if (!isVisible) {
      this.makeElementSticky(position);
    } else {
      this.resetElementStyle();
    }
  }

  private makeElementSticky(position: number): void {
    this.renderer.setStyle(this.el.nativeElement, 'z-index', '1000');
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    this.renderer.setStyle(this.el.nativeElement, 'top', `${position * -1}px`);
  }

  private resetElementStyle(): void {
    this.renderer.setStyle(this.el.nativeElement, 'position', this.originalPosition);
    this.renderer.setStyle(this.el.nativeElement, 'z-index', this.originalZIndex);
  }
}
