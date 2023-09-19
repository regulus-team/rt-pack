import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RtForDirective} from './directives/rt-for.directive';
import {RtSkeletonContainerDirective} from './directives/rt-skeleton-container.directive';
import {RtSkeletonPlaceholderContainerDirective} from './directives/rt-skeleton-placeholder-container.directive';
import {RtSkeletonPlaceholderDirective} from './directives/rt-skeleton-placeholder.directive';
import {RtSkeletonService} from './services/rt-skeleton.service';
import { RtSkeletonIfDirective } from './directives/rt-skeleton-if.directive';

@NgModule({
  declarations: [
    RtSkeletonPlaceholderDirective,
    RtSkeletonContainerDirective,
    RtForDirective,
    RtSkeletonPlaceholderContainerDirective,
    RtSkeletonIfDirective,
  ],
  exports: [
    RtSkeletonPlaceholderDirective,
    RtSkeletonContainerDirective,
    RtSkeletonPlaceholderContainerDirective,
    RtForDirective,
    RtSkeletonIfDirective,
  ],
  imports: [
    CommonModule,
  ],
  providers: [RtSkeletonService],
})
export class RtSkeletonModule {
}
