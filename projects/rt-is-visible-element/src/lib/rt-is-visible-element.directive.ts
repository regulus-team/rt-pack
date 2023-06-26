import {Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {debounceTime, Observable, Subscription} from 'rxjs';

@Directive({
  selector: '[rtIsVisibleElement]',
})
export class IsVisibleElement implements OnInit, OnDestroy {
  @Input() root: HTMLElement | null = null;
  @Input() rootMargin = '0px 0px 0px 0px';
  @Input() threshold = 0;
  @Input() debounceTime = 500;
  @Input() isContinuous = false;
  @Input() isDisabled = false;

  @Output() isIntersecting = new EventEmitter<boolean>();

  _isIntersecting = false;
  subscription: Subscription;

  constructor(private element: ElementRef) {
  }

  ngOnInit(): void {
    if (this.isDisabled) {
      return;
    }
    this.subscription = this.createAndObserve();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  createAndObserve(): Subscription {
    const options: IntersectionObserverInit = {
      root: this.root,
      rootMargin: this.rootMargin,
      threshold: this.threshold,
    };

    return new Observable<boolean>(subscriber => {
      const intersectionObserver = new IntersectionObserver(entries => {
        const {isIntersecting} = entries[0];
        subscriber.next(isIntersecting);
        return isIntersecting && !this.isContinuous && intersectionObserver.disconnect();
      }, options);

      intersectionObserver.observe(this.element.nativeElement);

      return () => intersectionObserver.disconnect();

    })
      .pipe(debounceTime(this.debounceTime))
      .subscribe(status => {
        this.isIntersecting.emit(status);
        this._isIntersecting = status;
      });
  }
}
