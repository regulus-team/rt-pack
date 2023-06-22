import {NgModule} from '@angular/core';
import {IsElementVisibleDirective} from './rt-is-visible-element.directive';

@NgModule({
  declarations: [IsElementVisibleDirective],
  exports: [IsElementVisibleDirective],
})
export class RtIsVisibleElementModule {}
