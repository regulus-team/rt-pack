import {HttpClientModule} from '@angular/common/http';
import {NgModule, SecurityContext} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MarkdownModule} from 'ngx-markdown';
import {RtPlatformModule} from 'rt-platform';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RtSkeletonService} from 'rt-skeleton';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
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
    BrowserAnimationsModule,
  ],
  providers: [RtSkeletonService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
