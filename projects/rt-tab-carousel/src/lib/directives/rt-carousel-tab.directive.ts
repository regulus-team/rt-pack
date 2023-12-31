import {Directive, ElementRef, HostListener, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {Subscription} from 'rxjs';
import {RtCarouselService} from '../services/rt-carousel.service';

@Directive({
    selector: '[rtCarouselTab]',
})
export class RtCarouselTabDirective implements OnInit, OnDestroy {
    @Input({required: true}) uuidCarousel!: string;

    private readonly subscription = new Subscription();

    constructor(private el: ElementRef, private renderer: Renderer2, private service: RtCarouselService) {
    }

    private _disabledTab?: boolean;

    get disabledTab(): boolean {
        return !!this._disabledTab;
    }

    @Input() set disabledTab(value: boolean) {
        this._disabledTab = value;
        if (value) {
            this.renderer.addClass(this.el.nativeElement, 'rt-tab-carousel-tab__disabled');
        } else {
            this.renderer.removeClass(this.el.nativeElement, 'rt-tab-carousel-tab__disabled');
        }
    }

    @HostListener('click', ['$event'])
    onClick(): void {
        if (!this.disabledTab) {
            this.service.selectHTMLElement(this.uuidCarousel, this.el);
        }
    }

    ngOnInit(): void {
        this.renderer.setStyle(this.el.nativeElement, 'white-space', 'nowrap');
        this.renderer.setStyle(this.el.nativeElement, 'cursor', 'pointer');
        this.renderer.addClass(this.el.nativeElement, `rt-carousel-tab-${this.uuidCarousel}`);
        this.service.setTab(this.uuidCarousel, this.el);
    }

    ngOnDestroy(): void {
        this.service.deleteTab(this.uuidCarousel, this.el);
        this.subscription.unsubscribe();
    }
}
