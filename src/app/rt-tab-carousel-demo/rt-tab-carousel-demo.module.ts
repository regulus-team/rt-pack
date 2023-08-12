import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {RtTabCarouselComponent} from './components/rt-tab-carousel/rt-tab-carousel.component';
import {RouterModule, Routes} from '@angular/router';
import {MarkdownModule} from 'ngx-markdown';
import {RtCarouselModule} from 'rt-tab-carousel';

const routes: Routes = [
    {
        path: '',
        component: RtTabCarouselComponent,
    },
];

@NgModule({
    declarations: [
        RtTabCarouselComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MarkdownModule,
        RtCarouselModule,
        NgOptimizedImage,
    ],
})
export class RtTabCarouselDemoModule {
}
