import {NgForOf, NgForOfContext} from '@angular/common';
import {
  Directive,
  Input,
  IterableDiffers,
  NgIterable,
  OnDestroy,
  OnInit,
  TemplateRef,
  TrackByFunction,
  ViewContainerRef,
} from '@angular/core';
import {distinctUntilChanged, Subscription, switchMap, tap} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {RtSkeletonContainerDirective} from './rt-skeleton-container.directive';

@Directive({
  selector: '[rtForSkeleton]',
})
export class RtForDirective<T, U extends NgIterable<T> = NgIterable<T>> extends NgForOf<T, U> implements OnInit, OnDestroy {

  private subscription = new Subscription();
  private _items: U & NgIterable<T> | undefined | null;

  constructor(
    private container: RtSkeletonContainerDirective,
    private templateRef: TemplateRef<NgForOfContext<T, U>>,
    private viewContainer: ViewContainerRef,
    private differs: IterableDiffers,
  ) {
    super(viewContainer, templateRef, differs);
  }

  get rtForSkeletonOf(): U & NgIterable<T> | undefined | null {
    return this._items;
  }

  @Input() set rtForSkeletonOf(items: U & NgIterable<T> | undefined | null) {
    super['ngForOf'] = items;
    this._items = items;
  }

  @Input()
  override set ngForOf(items: U & NgIterable<T> | undefined | null) {
  }

  @Input() set rtForSkeletonTrackBy(fn: TrackByFunction<T>) {
    super['ngForTrackBy'] = fn;
  }

  ngOnInit(): void {
    if (this.container) {
      this.container.skeletonTemplate = this.templateRef;
      this.container.buildTemplate(this.viewContainer);
    }

    this.subscription.add(
      this.container.while$
        .pipe(
          tap((whileValue) =>  this.container.updateViewSkeleton(!whileValue)),
          switchMap(() => this.container.ngForTrigger$),
          distinctUntilChanged(),
          )
        .subscribe((show) => {
        if (!show) {
          super['ngForOf'] = null;
        } else {
          super['ngForOf'] = this._items;
        }

      }),
    );
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
