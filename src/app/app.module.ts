import { HttpClientModule }          from '@angular/common/http';
import { NgModule, SecurityContext } from '@angular/core';
import { MatButtonModule }           from '@angular/material/button';
import { BrowserModule }             from '@angular/platform-browser';
import { BrowserAnimationsModule }   from '@angular/platform-browser/animations';
import { MarkdownModule }            from 'ngx-markdown';
import { RtPlatformModule }          from 'rt-platform';
import { RtSkeletonService }         from 'rt-skeleton';
import { RtToastModule }             from '../../projects/rt-toasts/src/lib/rt-toast.module';
import { RtToastPosition }           from '../../projects/rt-toasts/src/lib/symbols';

import { AppRoutingModule }  from './app-routing.module';
import { AppComponent }      from './app.component';
import { HeaderComponent }   from './header/header.component';
import { RtToastsComponent } from './rt-toasts/rt-toasts.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RtToastsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MarkdownModule.forRoot({sanitize: SecurityContext.NONE}),
    MarkdownModule.forChild(),
    HttpClientModule,
    RtPlatformModule.forRoot({
      localBaseUrl: 'some_local_url',
      serverBaseUrl: 'some_server_url',
    }),
    RtToastModule.forRoot({
      position: RtToastPosition.TopRight,
      timeout: 5000,
      isShowTimeout: true,
      groupByDuplicate: true,
    }),
    BrowserAnimationsModule,
    MarkdownModule,
    MatButtonModule,
  ],
  providers: [RtSkeletonService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
