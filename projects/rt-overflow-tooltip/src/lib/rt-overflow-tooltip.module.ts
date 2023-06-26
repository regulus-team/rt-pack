import {NgModule} from '@angular/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {RtDefineStrokeWidthModule} from 'rt-define-stroke-width';
import {RtPlatformModule} from 'rt-platform';
import {RtOverflowTooltipDirective} from './rt-overflow-tooltip.directive';

@NgModule({
  declarations: [RtOverflowTooltipDirective],
  imports: [
    RtDefineStrokeWidthModule,
    MatTooltipModule,
    RtPlatformModule,
  ],
  exports: [RtOverflowTooltipDirective],
})
export class RtOverflowTooltipModule {
}
