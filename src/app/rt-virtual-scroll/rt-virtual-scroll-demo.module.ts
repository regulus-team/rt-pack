import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RtVirtualScrollRootComponent} from './containers/rt-virtual-scroll-root/rt-virtual-scroll-root.component';
import {CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {RtVirtualScrollService} from './rt-virtual-scroll.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MarkdownModule} from 'ngx-markdown';
import {
    RtVirtualScrollModule
} from '../../../projects/rt-virtual-scroll/src/lib/rt-virtual-scroll/rt-virtual-scroll.module';


const routes: Routes = [
    {
        path: '',
        component: RtVirtualScrollRootComponent,
    },
];


@NgModule({
    declarations: [
        RtVirtualScrollRootComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MarkdownModule,
        RtVirtualScrollModule,
        MatProgressSpinnerModule,
    ],
    providers: [RtVirtualScrollService],
})
export class RtVirtualScrollDemoModule {
}
