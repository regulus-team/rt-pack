import {CommonModule, NgOptimizedImage} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RtOverflowTooltipModule} from '../rt-overflow-tooltip/rt-overflow-tooltip.module';
import {RtAutofocusInputModule} from '../shared/directives/rt-autofocus-input.directive.ts/rt-autofocus-input.module';
import {RtTableMovingComponent} from './components/rt-table-moving/rt-table-moving.component';


@NgModule({
  declarations: [
    RtTableMovingComponent,
  ],
  imports: [
    CommonModule,
    RtOverflowTooltipModule,
    ReactiveFormsModule,
    NgOptimizedImage,
  ],
  exports: [
    RtTableMovingComponent,
  ],
})
export class RtTableMovingModule {
}
