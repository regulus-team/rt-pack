import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RtVirtualScrollRootComponent} from './containers/rt-virtual-scroll-root/rt-virtual-scroll-root.component';


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
    ],
})
export class RtVirtualScrollModule {
}
