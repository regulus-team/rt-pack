import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[rtSkeletonPlaceholderContainer]'
})
export class RtSkeletonPlaceholderContainerDirective {

  constructor(private el: ElementRef) { }

}
