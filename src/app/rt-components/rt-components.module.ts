import {CommonModule, NgOptimizedImage} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MarkdownModule} from 'ngx-markdown';
import {RtIsVisibleElementModule} from 'rt-is-visible-element';
import {RtOverflowTooltipModule} from 'rt-overflow-tooltip';
import {RtQueryParamsRouterLinkModule} from 'rt-query-params-router-link';

import {RtCarouselModule} from 'rt-tab-carousel';
import {RtTableMovingModule} from 'rt-table-moving';
import {RtSkeletonModule} from 'rt-skeleton';

import {SideBarComponent} from './components/side-bar/side-bar.component';
import {RtComponentsRootComponent} from './containers/rt-components-root/rt-components-root.component';
import {RtPlatformComponent} from './components/rt-platform/rt-platform.component';
import {RtDefineStrokeWidthComponent} from './components/rt-define-stroke-width/rt-define-stroke-width.component';

const routes: Routes = [
    {
        path: '',
        component: RtComponentsRootComponent,
        children: [
            {
                path: 'rt-skeleton',
                loadChildren: () => import('../rt-skeleton-demo/rt-skeleton-demo.module').then(m => m.RtSkeletonDemoModule),
            },
            {
                path: 'rt-tab-carousel',
                loadChildren: () => import('../rt-tab-carousel-demo/rt-tab-carousel-demo.module').then(m => m.RtTabCarouselDemoModule),
            },
            {
                path: 'rt-query-params-router-link',
                loadChildren: () => import('../rt-query-params-router-link-demo/rt-query-params-router-link-demo.module').then(m => m.RtQueryParamsRouterLinkDemoModule),
            },
            {
                path: 'rt-is-visible-element',
                loadChildren: () => import('../rt-is-visible-element-demo/rt-is-visible-element-demo.module').then(m => m.RtIsVisibleElementDemoModule),
            },
            {
                path: 'rt-overflow-tooltip',
                loadChildren: () => import('../rt-overflow-tooltip-demo/rt-overflow-tooltip-demo.module').then(m => m.RtOverflowTooltipDemoModule),
            },
            {
                path: 'rt-platform',
                component: RtPlatformComponent,
            },
            {
                path: 'rt-auto-focus',
                loadChildren: () => import('../rt-autofocus-demo/rt-autofocus-demo.module').then(m => m.RtAutofocusDemoModule),
            },
            {
                path: 'rt-define-stroke-width',
                component: RtDefineStrokeWidthComponent,
            },
            {
                path: 'rt-table-moving',
                loadChildren: () => import('../rt-table-moving/rt-table-moving-demo.module').then(m => m.RtTableMovingDemoModule),
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
        SideBarComponent,
        RtComponentsRootComponent,
        RtPlatformComponent,
        RtDefineStrokeWidthComponent,
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
        RtOverflowTooltipModule,
        RtTableMovingModule,
    ],

})
export class RtComponentsModule {
}
