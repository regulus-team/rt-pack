import {CommonModule, NgOptimizedImage} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MarkdownModule} from 'ngx-markdown';
import {RtSkeletonModule} from 'rt-skeleton';
import {RtCarouselModule} from 'rt-tab-carousel';

import {RtCarouselRootComponent} from './components/rt-carousel-root/rt-carousel-root.component';
import {RtSkeletonComponent} from './components/rt-skeleton-root/rt-skeleton.component';
import {SideBarComponent} from './components/side-bar/side-bar.component';
import {RtComponentsRootComponent} from './containers/rt-components-root/rt-components-root.component';


const routes: Routes = [
  {
    path: '',
    component: RtComponentsRootComponent,
    children: [
      {
        path: 'rt-skeleton',
        component: RtSkeletonComponent,
      },
      {
        path: 'rt-tab-carousel',
        component: RtCarouselRootComponent,
      },
    ],
  },

];

@NgModule({
  declarations: [
    RtSkeletonComponent,
    RtCarouselRootComponent,
    SideBarComponent,
    RtComponentsRootComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    RtSkeletonModule,
    MarkdownModule,
    RtCarouselModule,
    NgOptimizedImage,
  ],
})
export class RtComponentsModule {
}
