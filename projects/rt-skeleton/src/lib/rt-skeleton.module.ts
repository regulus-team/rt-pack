import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RtSkeletonPlaceholderDirective } from './directives/rt-skeleton-placeholder.directive';
import { RtSkeletonContainerDirective } from './directives/rt-skeleton-container.directive';
import { RtForDirective } from './directives/rt-for.directive';
import {RtSkeletonService} from './services/rt-skeleton.service';
import { RtSkeletonPlaceholderContainerDirective } from './directives/rt-skeleton-placeholder-container.directive';

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
    RtForDirective,
  ],
  imports: [
    CommonModule,
  ],
  providers: [RtSkeletonService]
})
export class RtSkeletonModule { }
