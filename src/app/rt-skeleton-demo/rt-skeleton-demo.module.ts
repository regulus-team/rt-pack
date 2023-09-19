import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RtSkeletonRootComponent} from './containers/rt-skeleton-root/rt-skeleton-root.component';
import {RtSkeletonDemoComponent} from './components/rt-skeleton-demo/rt-skeleton-demo.component';
import {RouterModule, Routes} from '@angular/router';
import {MarkdownModule} from 'ngx-markdown';
import {RtSkeletonModule} from 'rt-skeleton';

const routes: Routes = [
    {
        path: '',
        component: RtSkeletonRootComponent,
    },
];

@NgModule({
    declarations: [
        RtSkeletonRootComponent,
        RtSkeletonDemoComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MarkdownModule,
        RtSkeletonModule,
    ],
})
export class RtSkeletonDemoModule {
}
