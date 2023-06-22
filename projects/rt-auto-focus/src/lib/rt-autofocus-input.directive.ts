import {AfterViewInit, Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[rtAutofocus]',
})
export class RtAutofocusInputDirective implements AfterViewInit {
  constructor(private host: ElementRef) {}

  ngAfterViewInit(): void {
    this.host.nativeElement.focus();
  }
}
