import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {RtSkeletonService} from '../services/rt-skeleton.service';
import {addPlaceholderForRtSkeleton} from '../utils/rt-skeleton.utils';
import {RtSkeletonContainerDirective} from './rt-skeleton-container.directive';

@Directive({
  selector: '[rtSkeletonPlaceholder]',
})
export class RtSkeletonPlaceholderDirective implements OnInit {

  @Input() radiusPlaceholder = '5px';
  @Input() widthSkeleton = 'auto';
  @Input() heightSkeleton = 'auto';
  @Input() leftSkeleton = '0';
  @Input() marginSkeleton = 'initial';


  constructor(
    private container: RtSkeletonContainerDirective,
    private el: ElementRef,
    private renderer: Renderer2,
    private service: RtSkeletonService,
  ) {
  }


  ngOnInit(): void {
    this.service.addPlaceholderDirectives(this.container.uuid, this);
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    this.renderer.setStyle(this.el.nativeElement, 'width', this.widthSkeleton);
    this.renderer.setStyle(this.el.nativeElement, 'height', this.heightSkeleton);
    this.renderer.setStyle(this.el.nativeElement, 'margin', this.marginSkeleton);

    addPlaceholderForRtSkeleton(
      this.el.nativeElement,
      this.renderer,
      this.radiusPlaceholder,
      this.leftSkeleton,
      this.widthSkeleton,
      this.heightSkeleton,
    );

    this.container.updateViewSkeleton();
  }

  hideSkeleton(): void {
    this.renderer.removeStyle(this.el.nativeElement, 'visibility');

    //Show all content data
    this.el.nativeElement.querySelectorAll('*').forEach((element: HTMLElement) => {
      this.renderer.removeStyle(element, 'visibility');
    });

    this.el.nativeElement
      .querySelectorAll('[rtSkeletonPlaceholder]')
      .forEach((element: HTMLElement) => this.renderer
        .setStyle(element, 'visibility', 'hidden'));

    this.renderer.removeStyle(this.el.nativeElement, 'position');
    this.renderer.removeStyle(this.el.nativeElement, 'width');
    this.renderer.removeStyle(this.el.nativeElement, 'height');
    this.renderer.removeStyle(this.el.nativeElement, 'pointer-events');
  }

  showSkeleton(): void {
    this.el.nativeElement.querySelectorAll('[rtSkeletonPlaceholder]').forEach((element: HTMLElement) => {
      this.renderer.setStyle(element, 'visibility', 'visible');
      this.renderer.setStyle(this.el.nativeElement, 'pointer-events', 'none');
    });


    this.renderer.setStyle(this.el.nativeElement, 'visibility', 'hidden');
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    this.renderer.setStyle(this.el.nativeElement, 'width', this.widthSkeleton);
    this.renderer.setStyle(this.el.nativeElement, 'height', this.heightSkeleton);

  }

}
