import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import {combineLatest, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {RtCarouselService} from '../services/rt-carousel.service';

@Directive({
  selector: '[rtCarouselNextButton]',
})
export class RtCarouselNextButtonDirective implements OnInit, OnDestroy {
  @Input() activeClass?: string;
  @Input() autoHide = true;
  @Input({required: true}) uuidCarousel!: string;

  @Output() buttonHidden = new EventEmitter<boolean>();

  private readonly subscription = new Subscription();

  constructor(private el: ElementRef, private renderer: Renderer2, private service: RtCarouselService) {
  }


  @HostListener('click', ['$event'])
  onClick(): void {
    this.service.nextPart(this.uuidCarousel);
  }


  ngOnInit(): void {
    this.subscription.add(
      this.service.isLastTabVisible(this.uuidCarousel).subscribe({
        next: v => {
          if (v) {
            if (this.activeClass) {
              this.renderer.removeClass(this.el.nativeElement, this.activeClass);
            }
          } else if (v !== undefined) {
            if (this.activeClass) {
              this.renderer.addClass(this.el.nativeElement, this.activeClass);
            }
          }
        },
      }),
    );

    if (this.autoHide) {
      this.subscription.add(
        combineLatest(
          [
            this.service.isFirstTabVisible(this.uuidCarousel).pipe(map(v => v || v === undefined)),
            this.service.isLastTabVisible(this.uuidCarousel).pipe(map(v => v || v === undefined)),
          ],
        )
          .pipe(map(([first, last]) => first && last))
          .subscribe({
            next: v => {
              this.renderer.setStyle(this.el.nativeElement, 'display', v ? 'none' : 'flex');
              this.buttonHidden.emit(v);
            },
          }),
      );
    }

  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
