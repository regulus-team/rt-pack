import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RtVirtualScrollRootComponent} from './containers/rt-virtual-scroll-root/rt-virtual-scroll-root.component';
import {CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {RtVirtualScrollService} from './rt-virtual-scroll.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


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
        CdkVirtualScrollViewport,
        CdkVirtualForOf,
        CdkFixedSizeVirtualScroll,
        MatProgressSpinnerModule,
    ],
    providers: [RtVirtualScrollService],
})
export class RtVirtualScrollModule {
}
