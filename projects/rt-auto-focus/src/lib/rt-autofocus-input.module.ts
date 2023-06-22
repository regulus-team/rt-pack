import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RtAutofocusInputDirective} from './rt-autofocus-input.directive';

@NgModule({
  declarations: [RtAutofocusInputDirective],
  imports: [CommonModule],
  exports: [RtAutofocusInputDirective],
})
export class RtAutofocusInputModule {}
