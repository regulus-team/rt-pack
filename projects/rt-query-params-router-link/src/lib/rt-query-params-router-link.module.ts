import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RtQueryParamsRouterLinkDirective} from './rt-query-params-router-link.directive';

@NgModule({
  declarations: [RtQueryParamsRouterLinkDirective],
  imports: [CommonModule],
  exports: [RtQueryParamsRouterLinkDirective],
})
export class RtQueryParamsRouterLinkModule {
}
