import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RtForDirective} from './directives/rt-for.directive';
import {RtSkeletonContainerDirective} from './directives/rt-skeleton-container.directive';
import {RtSkeletonPlaceholderContainerDirective} from './directives/rt-skeleton-placeholder-container.directive';
import {RtSkeletonPlaceholderDirective} from './directives/rt-skeleton-placeholder.directive';
import {RtSkeletonService} from './services/rt-skeleton.service';

@NgModule({
  declarations: [
    RtSkeletonPlaceholderDirective,
    RtSkeletonContainerDirective,
    RtForDirective,
    RtSkeletonPlaceholderContainerDirective,
  ],
  exports: [
    RtSkeletonPlaceholderDirective,
    RtSkeletonContainerDirective,
    RtSkeletonPlaceholderContainerDirective,
    RtForDirective,
  ],
  imports: [
    CommonModule,
  ],
  providers: [RtSkeletonService],
})
export class RtSkeletonModule {
}
