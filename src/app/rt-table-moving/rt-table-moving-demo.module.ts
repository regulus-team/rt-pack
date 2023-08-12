import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RtTableMovingRootComponent} from './containers/rt-table-moving-root/rt-table-moving-root.component';
import {RtTableMovingComponent} from './components/rt-table-moving/rt-table-moving.component';
import {MarkdownModule} from 'ngx-markdown';
import {RtTableMovingModule} from 'rt-table-moving';

const routes: Routes = [
    {
        path: '',
        component: RtTableMovingRootComponent,
    },
];

@NgModule({
    declarations: [
        RtTableMovingRootComponent,
        RtTableMovingComponent,
        RtTableMovingComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MarkdownModule,
        RtTableMovingModule,
    ],
})
export class RtTableMovingDemoModule {
}
