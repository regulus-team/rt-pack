import {NgModule} from '@angular/core';
import {RtDefineStrokeWidthModule} from 'rt-define-stroke-width';
import {RtOverflowTooltipDirective} from './rt-overflow-tooltip.directive';

@NgModule({
  declarations: [RtOverflowTooltipDirective],
  imports: [RtDefineStrokeWidthModule],
  exports: [RtOverflowTooltipDirective],
})
export class RtOverflowTooltipModule {}
