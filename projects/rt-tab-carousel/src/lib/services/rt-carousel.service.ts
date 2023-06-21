import {ElementRef, Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, interval, Observable} from 'rxjs';
import {distinctUntilChanged, first, map} from 'rxjs/operators';

@Injectable()
export class RtCarouselService {
  private _isLastTabVisible$!: Observable<{ [related: string]: boolean }>;
  private _isFirstTabVisible$!: Observable<{ [related: string]: boolean }>;
  private _scrollStep$ = new BehaviorSubject<{ [related: string]: number | null }>({});
  private _items = new BehaviorSubject<{ [related: string]: (ElementRef[]) }>({});
  private _currentSliderShift$ = new BehaviorSubject<{ [related: string]: number | null }>({});
  private _lastVisibleIndexEnd$ = new BehaviorSubject<{ [related: string]: number | null }>({});
  private _lastVisibleIndex$ = new BehaviorSubject<{ [related: string]: number | null }>({});
  private _selectedIndex = new BehaviorSubject<{ [related: string]: (number | null) }>({});
  private _activeClassTab = new BehaviorSubject<{ [related: string]: string | null }>({});

  constructor() {
    this._isFirstTabVisible$ = this._lastVisibleIndex$.asObservable().pipe(
      map(v => {
        const res: any = {};
        for (const key of Object.keys(v)) {
          res[key] = v[key] === 0;
        }
        return res;
      }),
    );

    this._isLastTabVisible$ = combineLatest([this._lastVisibleIndexEnd$.asObservable(), this._items.asObservable()]).pipe(
      map(([v, length]) => {
        const res: any = {};
        for (const key of Object.keys(v)) {
          res[key] = v[key] === length[key]?.length - 1;
        }
        return res;
      }),
    );
  }

  public setTab(related: string, value: ElementRef): void {
    const currValue = this._items.value;
    this._items.next({
      ...currValue,
      [related]: currValue[related]?.length ? [...currValue[related], value] : [value],
    });
  }

  public amountTabs(related: string): Observable<number> {
    return this._items.pipe(
      distinctUntilChanged((prev, curr) => prev[related] === curr[related]),
      map(v => v[related]?.length),
    );
  }

  public tabs(related: string): Observable<ElementRef[]> {
    return this._items.pipe(
      distinctUntilChanged((prev, curr) => prev[related] === curr[related]),
      map(v => v[related]),
    );
  }

  public isFirstTabVisible(related: string): Observable<boolean> {
    return this._isFirstTabVisible$.pipe(
      distinctUntilChanged((prev, curr) => prev[related] === curr[related]),
      map(v => v[related]),
    );
  }

  public isLastTabVisible(related: string): Observable<boolean> {
    return this._isLastTabVisible$.pipe(
      distinctUntilChanged((prev, curr) => prev[related] === curr[related]),
      map(v => v[related]),
    );
  }

  public currentSliderShift(related: string): Observable<number | null> {
    return this._currentSliderShift$.asObservable().pipe(
      distinctUntilChanged((prev, curr) => prev[related] === curr[related]),
      map(v => v[related]),
    );
  }

  public lastVisibleIndexEnd(related: string): Observable<number | null> {
    return this._lastVisibleIndexEnd$.pipe(
      distinctUntilChanged((prev, curr) => prev[related] === curr[related]),
      map(v => v[related]),
    );
  }

  public lastVisibleIndex(related: string): Observable<number | null> {
    return this._lastVisibleIndex$.pipe(
      distinctUntilChanged((prev, curr) => prev[related] === curr[related]),
      map(v => v[related]),
    );
  }

  public nextPart(related: string): void {
    if (!this._lastVisibleIndex$.value[related]) {
      this._lastVisibleIndex$.next({...this._lastVisibleIndex$.value, [related]: 0});
    }

    const scrollStep = this._scrollStep$.value[related];
    const amount = this._items.value[related];
    const nextStep =
      this._lastVisibleIndexEnd$.value[related]! + scrollStep! > amount?.length - 1
        ? amount?.length - 1
        : this._lastVisibleIndexEnd$.value[related]! + scrollStep!;

    this._items.value[related][nextStep]?.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'end',
    });
    this._currentSliderShift$.next({
      ...this._currentSliderShift$.value,
      [related]: nextStep,
    });
  }

  public previousPart(related: string): void {

    if (this._lastVisibleIndex$.value[related]! - this._scrollStep$.value[related]! >= 0) {
      this._currentSliderShift$.next({
        ...this._currentSliderShift$.value,
        [related]: this._lastVisibleIndex$.value[related]! - this._scrollStep$.value[related]!,
      });

      this._items.value[related][this._lastVisibleIndex$.value[related]! - this._scrollStep$.value[related]!].nativeElement.scrollIntoView({
        behavior: 'smooth',
        inline: 'start',
        block: 'nearest',
      });

    } else {
      this._currentSliderShift$.next({
        ...this._currentSliderShift$.value,
        [related]: 0,
      });
      this._items.value[related][0].nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
    }
  }

  public setLastVisibleIndex(related: string, value: number): void {
    const currValue = this._lastVisibleIndex$.value;
    this._lastVisibleIndex$.next({...currValue, [related]: value});
  }

  public setLastVisibleIndexEnd(related: string, value: number): void {
    const currValue = this._lastVisibleIndexEnd$.value;
    this._lastVisibleIndexEnd$.next({...currValue, [related]: value});
  }

  public setScrollStep(related: string, value: number): void {
    const currValue = this._scrollStep$.value;
    this._scrollStep$.next({...currValue, [related]: value});
  }

  public selectTab(related: string, index: number | string): void {
    if (isNaN(+index)) {
      return;
    }
    if (this._items.value?.[related]?.[+index]) {
      this.applyActiveClassForTab(related, this._items.value[related][+index]);
      const currentValues = this._selectedIndex.value;
      this._selectedIndex.next({...currentValues, [related]: +index});
      const el = this._items.value[related][+index].nativeElement;

      el.scrollIntoView({inline: 'nearest', block: 'nearest', behavior: 'smooth'});
    } else {
      const className = this._activeClassTab.value[related];
      const selectedIndexPreview = this._selectedIndex.value?.[related];
      if (selectedIndexPreview) {
        this._items.value?.[related]?.[selectedIndexPreview]?.nativeElement.classList.remove(className);
      }
    }
  }

  public selectHTMLElement(related: string, el: ElementRef): void {
    this.applyActiveClassForTab(related, el);
    const currentValues = this._selectedIndex.value;
    const index = this._items.value[related].findIndex(v => v === el);

    this._selectedIndex.next({...currentValues, [related]: index});
    interval(10).pipe(first()).subscribe({
      next: () => el.nativeElement.scrollIntoView({inline: 'nearest', block: 'nearest', behavior: 'smooth'}),
    });

  }

  public selectedTab(related: string): Observable<number | null> {
    return this._selectedIndex.pipe(
      distinctUntilChanged((prev, curr) => prev[related] === curr[related]),
      map(v => v[related]),
    );
  }

  public setActiveClassTab(related: string, className: string): void {
    const currValue = this._activeClassTab.value;
    this._activeClassTab.next({...currValue, [related]: className});
  }

  public destroyCarousel(related: string): void {
    this._items.value[related] = [];
    this._selectedIndex.value[related] = null;
    this._activeClassTab.value[related] = null;
    this._scrollStep$.value[related] = null;
    this._currentSliderShift$.value[related] = null;
    this._lastVisibleIndexEnd$.value[related] = null;
    this._lastVisibleIndex$.value[related] = null;
  }

  private applyActiveClassForTab(related: string, el: ElementRef): void {
    const className = this._activeClassTab.value[related];
    const selectedIndexPreview = this._selectedIndex.value[related];
    if (selectedIndexPreview! >= 0) {
      this._items.value[related][selectedIndexPreview!]?.nativeElement.classList.remove(className);
    }
    el.nativeElement.classList.add(className);
  }
}
