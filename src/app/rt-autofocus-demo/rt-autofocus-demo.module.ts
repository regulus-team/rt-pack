import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RtAutofocusComponent} from './components/rt-autofocus/rt-autofocus.component';
import {RouterModule, Routes} from '@angular/router';
import {MarkdownModule} from 'ngx-markdown';

const routes: Routes = [
    {
        path: '',
        component: RtAutofocusComponent,
    },
];

@NgModule({
    declarations: [
        RtAutofocusComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MarkdownModule,
    ],
})
export class RtAutofocusDemoModule {
}
