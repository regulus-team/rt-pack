import {NgModule} from '@angular/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {RtDefineStrokeWidthModule} from 'rt-define-stroke-width';
import {RtOverflowTooltipDirective} from './rt-overflow-tooltip.directive';

@NgModule({
  declarations: [RtOverflowTooltipDirective],
  imports: [RtDefineStrokeWidthModule, MatTooltipModule],
  exports: [RtOverflowTooltipDirective],
})
export class RtOverflowTooltipModule {}
