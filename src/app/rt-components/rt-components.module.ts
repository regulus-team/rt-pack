import {CommonModule, NgOptimizedImage} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MarkdownModule} from 'ngx-markdown';
import {RtIsVisibleElementModule} from 'rt-is-visible-element';
import {RtOverflowTooltipModule} from 'rt-overflow-tooltip';
import {RtQueryParamsRouterLinkModule} from 'rt-query-params-router-link';
import {RtSkeletonModule} from 'rt-skeleton';
import {RtCarouselModule} from 'rt-tab-carousel';

import {RtCarouselRootComponent} from './components/rt-carousel-root/rt-carousel-root.component';
import {RtIsVisibleElementComponent} from './components/rt-is-visible-element/rt-is-visible-element.component';
import {RtOverflowTooltipComponent} from './components/rt-overflow-tooltip/rt-overflow-tooltip.component';
import {
  RtQueryParamsRouterLinkComponent,
} from './components/rt-query-params-router-link/rt-query-params-router-link.component';
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
      {
        path: 'rt-query-params-router-link',
        component: RtQueryParamsRouterLinkComponent,
      },
      {
        path: 'rt-is-visible-element',
        component: RtIsVisibleElementComponent,
      },
      {
        path: 'rt-overflow-tooltip',
        component: RtOverflowTooltipComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],

  },
  {
    path: '**',
    redirectTo: '',
  },

];

@NgModule({
  declarations: [
    RtSkeletonComponent,
    RtCarouselRootComponent,
    SideBarComponent,
    RtComponentsRootComponent,
    RtQueryParamsRouterLinkComponent,
    RtIsVisibleElementComponent,
    RtOverflowTooltipComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    RtSkeletonModule,
    MarkdownModule,
    RtCarouselModule,
    RtIsVisibleElementModule,
    RtQueryParamsRouterLinkModule,
    NgOptimizedImage,
    RtOverflowTooltipModule
  ],

})
export class RtComponentsModule {
}
