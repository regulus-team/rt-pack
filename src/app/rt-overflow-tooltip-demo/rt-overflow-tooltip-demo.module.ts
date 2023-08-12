import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RtOverflowTooltipComponent } from './components/rt-overflow-tooltip/rt-overflow-tooltip.component';
import {MarkdownModule} from 'ngx-markdown';
import {RtOverflowTooltipModule} from 'rt-overflow-tooltip';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: RtOverflowTooltipComponent,
    },
];

@NgModule({
  declarations: [
    RtOverflowTooltipComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MarkdownModule,
        RtOverflowTooltipModule,
    ],
})
export class RtOverflowTooltipDemoModule { }
