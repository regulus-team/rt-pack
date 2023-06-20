import {CommonModule, NgOptimizedImage} from '@angular/common';
import {NgModule} from '@angular/core';
import {RtCarouselNextButtonComponent} from './components/rt-carousel-next-button/rt-carousel-next-button.component';
import {
  RtCarouselPreviousButtonComponent,
} from './components/rt-carousel-previous-button/rt-carousel-previous-button.component';
import {RtCarouselContainerDirective} from './directives/rt-carousel-container.directive';
import {RtCarouselNextButtonDirective} from './directives/rt-carousel-next-button.directive';
import {RtCarouselPreviousButtonDirective} from './directives/rt-carousel-previous-button.directive';
import {RtCarouselTabDirective} from './directives/rt-carousel-tab.directive';
import {RtCarouselService} from './services/rt-carousel.service';


@NgModule({
  declarations: [
    RtCarouselContainerDirective,
    RtCarouselTabDirective,
    RtCarouselPreviousButtonDirective,
    RtCarouselNextButtonDirective,
    RtCarouselPreviousButtonComponent,
    RtCarouselNextButtonComponent,
  ],
  exports: [
    RtCarouselContainerDirective,
    RtCarouselTabDirective,
    RtCarouselNextButtonDirective,
    RtCarouselPreviousButtonDirective,
    RtCarouselNextButtonComponent,
    RtCarouselPreviousButtonComponent,
  ],
  imports: [CommonModule, NgOptimizedImage],
  providers: [RtCarouselService],
})
export class RtCarouselModule {
}
