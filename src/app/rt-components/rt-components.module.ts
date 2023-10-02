import {CommonModule, NgOptimizedImage} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MarkdownModule} from 'ngx-markdown';
import {SideBarComponent} from './components/side-bar/side-bar.component';
import {RtComponentsRootComponent} from './containers/rt-components-root/rt-components-root.component';
import {RtPlatformComponent} from './components/rt-platform/rt-platform.component';
import {RtDefineStrokeWidthComponent} from './components/rt-define-stroke-width/rt-define-stroke-width.component';
import {RtMultipleSwitchComponent} from '../rt-multiple-switch/rt-multiple-switch.component';
import {RtAutofocusComponent} from '../rt-autofocus/rt-autofocus.component';
import {RtIsVisibleElementComponent} from '../rt-is-visible-element/rt-is-visible-element.component';
import {RtOverflowTooltipComponent} from '../rt-overflow-tooltip/rt-overflow-tooltip.component';
import {RtQueryParamsRouterLinkComponent} from '../rt-query-params-router-link/rt-query-params-router-link.component';
import {RtTabCarouselComponent} from '../rt-tab-carousel/rt-tab-carousel.component';
import {RtTableMovingComponent} from '../rt-table-moving/rt-table-moving.component';
import {RtVirtualScrollComponent} from '../rt-virtual-scroll/rt-virtual-scroll.component';

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
                component: RtTabCarouselComponent,
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
                path: 'rt-platform',
                component: RtPlatformComponent,
            },
            {
                path: 'rt-auto-focus',
                component: RtAutofocusComponent,
            },
            {
                path: 'rt-define-stroke-width',
                component: RtDefineStrokeWidthComponent,
            },
            {
                path: 'rt-table-moving',
                component: RtTableMovingComponent,
            },
            {
                path: 'rt-virtual-scroll',
                component: RtVirtualScrollComponent,
            },
            {
                path: 'rt-multiple-switch',
                component: RtMultipleSwitchComponent,
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
        MarkdownModule,
        NgOptimizedImage,
    ],

})
export class RtComponentsModule {
}
