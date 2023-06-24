import {CommonModule, NgOptimizedImage} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RtAutofocusInputModule} from 'rt-auto-focus';
import {RtOverflowTooltipModule} from 'rt-overflow-tooltip';
import {RtTableMovingComponent} from './components/rt-table-moving/rt-table-moving.component';


@NgModule({
  declarations: [
    RtTableMovingComponent,
  ],
  imports: [
    CommonModule,
    RtOverflowTooltipModule,
    ReactiveFormsModule,
    RtAutofocusInputModule,
    NgOptimizedImage,
  ],
  exports: [
    RtTableMovingComponent,
  ],
})
export class RtTableMovingModule {
}
