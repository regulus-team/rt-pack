import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MarkdownModule} from 'ngx-markdown';
import {RtSkeletonModule} from '../../../projects/rt-skeleton/src/lib/rt-skeleton.module';
import {RtSkeletonComponent} from './components/rt-skeleton-root/rt-skeleton.component';
import {SideBarComponent} from './components/side-bar/side-bar.component';
import {RtComponentsRootComponent} from './containers/rt-components-root/rt-components-root.component';
import { RtCarouselComponent } from './containers/rt-carousel/rt-carousel.component';

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
        path: 'rt-carousel',
        component: RtCarouselComponent,
      },
    ],
  },

];

@NgModule({
  declarations: [
    RtSkeletonComponent,
    SideBarComponent,
    RtComponentsRootComponent,
    RtCarouselComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    RtSkeletonModule,
    RtSkeletonModule,
    MarkdownModule,
  ],
})
export class RtComponentsModule {
}
