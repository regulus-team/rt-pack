import {
    AfterViewInit,
    ChangeDetectorRef,
    Directive,
    ElementRef,
    Input,
    OnDestroy,
    OnInit,
    Renderer2,
} from '@angular/core';
import {combineLatest, fromEvent, Observable, Subscription} from 'rxjs';
import {debounceTime, filter, first, startWith} from 'rxjs/operators';
import {RtCarouselService} from '../services/rt-carousel.service';

@Directive({
    selector: '[rtCarouselContainer]',
})
export class RtCarouselContainerDirective implements OnInit, AfterViewInit, OnDestroy {
    @Input() scrollStep = 1;
    @Input({required: true}) uuidCarousel!: string;
    @Input() activeClass?: string;
    @Input() antiBounce = 5;

    private readonly subscription = new Subscription();
    private firstDebounce = 1500;

    constructor(private el: ElementRef, private renderer: Renderer2, private service: RtCarouselService, private cd: ChangeDetectorRef) {
    }

    private _selectedTab?: number;

    @Input() set selectedTab(value: number) {
        this._selectedTab = value;

        this.service.amountTabs(this.uuidCarousel).pipe(debounceTime(this.firstDebounce), first()).subscribe({
            next: () => {
                this.firstDebounce = 0;
                this.service.selectTab(this.uuidCarousel, value);
            },
        });
    }

    ngOnInit(): void {
        this.renderer.setStyle(this.el.nativeElement, 'display', 'flex');
        this.renderer.setStyle(this.el.nativeElement, 'overflow', 'auto');
        this.renderer.setStyle(this.el.nativeElement, 'z-index', '10');
        this.renderer.setStyle(this.el.nativeElement, 'padding', '0 2px');
        this.renderer.setStyle(this.el.nativeElement, 'align-items', 'center');
        this.renderer.setStyle(this.el.nativeElement, 'gap', '6px');
        this.renderer.setStyle(this.el.nativeElement, 'scrollbar-width', 'none');
        this.renderer.addClass(this.el.nativeElement, 'rt-tab-carousel-container');


        this.subscription.add(
            this.service.amountTabs(this.uuidCarousel)
                .pipe(debounceTime(10))
                .subscribe({
                    next: () => this.cd.detectChanges(),
                }),
        );
    }

    ngAfterViewInit(): void {
        if (this.activeClass) {
            this.service.setActiveClassTab(this.uuidCarousel, this.activeClass);
        }
        this.service.setScrollStep(this.uuidCarousel, this.scrollStep);
        const style = this.renderer.createElement('style');
        this.renderer.appendChild(this.el.nativeElement, style);
        style.innerHTML = `::-webkit-scrollbar { width: 0; height: 0 }`;


        this.service.amountTabs(this.uuidCarousel).pipe(debounceTime(1000), first()).subscribe({
            next: () => {
                this.initIndexes();
            },
        });


        const resize$ = fromEvent(window, 'resize').pipe(startWith(null));
        const scroll$ = fromEvent(this.el.nativeElement, 'scroll').pipe(startWith(null));


        const mutationObserver$ = this.createMutationObserverObservable(this.el.nativeElement).pipe(startWith(null));


        this.subscription.add(combineLatest([resize$, scroll$, mutationObserver$]).subscribe({
            next: () => {
                const currentItems = document.querySelectorAll(`.rt-carousel-tab-${this.uuidCarousel}`);
                const scrollLeft = this.el.nativeElement.scrollLeft;

                for (let i = 0; i < currentItems.length; i++) {
                    const child = currentItems[i] as HTMLElement;
                    if (child.offsetLeft - scrollLeft - this.el.nativeElement.offsetLeft + this.antiBounce >= 0) {
                        this.service.setLastVisibleIndex(this.uuidCarousel, i);
                        break;
                    }
                }

                for (let i = currentItems.length - 1; i >= 0; i--) {
                    const child = currentItems[i] as HTMLElement;
                    if (
                        this.el.nativeElement.offsetLeft + this.el.nativeElement.offsetWidth >=
                        child.offsetLeft + child.offsetWidth - this.el.nativeElement.scrollLeft - this.antiBounce
                    ) {
                        this.service.setLastVisibleIndexEnd(this.uuidCarousel, i);
                        break;
                    }
                }
            },
        }));


        this.cd.detectChanges();
    }

    initIndexes(): void {
        this.service
            .tabs(this.uuidCarousel)
            .pipe(
                filter(items => items && !!items.length),
                first(),
            )
            .subscribe({
                next: tabs => {
                    const currentItems = document.querySelectorAll(`.rt-carousel-tab-${this.uuidCarousel}`);
                    const scrollLeft = this.el.nativeElement.scrollLeft;
                    const firstTab = tabs[0].nativeElement as HTMLElement;
                    const offsetLeft = firstTab.offsetLeft;
                    if (offsetLeft >= scrollLeft) {
                        this.service.setLastVisibleIndex(this.uuidCarousel, 0);
                    }

                    for (let i = currentItems.length - 1; i >= 0; i--) {
                        const child = currentItems[i] as HTMLElement;
                        if (
                            this.el.nativeElement.offsetLeft + this.el.nativeElement.offsetWidth >=
                            child.offsetLeft + child.offsetWidth - this.el.nativeElement.scrollLeft - this.antiBounce
                        ) {
                            this.service.setLastVisibleIndexEnd(this.uuidCarousel, i);
                            break;
                        }
                    }
                },
            });
    }

    ngOnDestroy(): void {
        const tabs = document.querySelectorAll(`.rt-carousel-tab-${this.uuidCarousel}`);
        tabs.forEach(tab => {
            tab.removeEventListener('scroll', () => {
            });
            tab.removeEventListener('click', () => {
            });
        });

        this.service.destroyCarousel(this.uuidCarousel);
        this.subscription.unsubscribe();
    }

    private createMutationObserverObservable(target: HTMLElement): Observable<MutationRecord[]> {
        return new Observable(observer => {
            const observerInstance = new MutationObserver(mutationsList => {
                observer.next(mutationsList);
            });
            observerInstance.observe(target, {
                childList: true,
                subtree: true,
            });
            return () => {
                observerInstance.disconnect();
            };
        });
    }
}
