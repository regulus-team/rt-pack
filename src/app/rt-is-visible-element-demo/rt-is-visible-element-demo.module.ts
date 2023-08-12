import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RtIsVisibleElementComponent} from './components/rt-is-visible-element/rt-is-visible-element.component';
import {MarkdownModule} from 'ngx-markdown';
import {RtIsVisibleElementModule} from 'rt-is-visible-element';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: RtIsVisibleElementComponent,
    },
];

@NgModule({
    declarations: [
        RtIsVisibleElementComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MarkdownModule,
        RtIsVisibleElementModule,
    ],
})
export class RtIsVisibleElementDemoModule {
}
