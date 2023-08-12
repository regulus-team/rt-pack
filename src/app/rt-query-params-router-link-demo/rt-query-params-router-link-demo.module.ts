import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    RtQueryParamsRouterLinkComponent,
} from './components/rt-query-params-router-link/rt-query-params-router-link.component';
import {RouterModule, Routes} from '@angular/router';
import {MarkdownModule} from 'ngx-markdown';
import {RtQueryParamsRouterLinkModule} from 'rt-query-params-router-link';

const routes: Routes = [
    {
        path: '',
        component: RtQueryParamsRouterLinkComponent,
    },
];

@NgModule({
    declarations: [RtQueryParamsRouterLinkComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MarkdownModule,
        RtQueryParamsRouterLinkModule,
    ],
})
export class RtQueryParamsRouterLinkDemoModule {
}
