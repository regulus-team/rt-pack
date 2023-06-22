import {HttpClientModule} from '@angular/common/http';
import {NgModule, SecurityContext} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MarkdownModule} from 'ngx-markdown';
import {RtPlatformModule} from 'rt-platform';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';


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
    // RtPlatformModule.forRoot({
    //   localBaseUrl: 'test',
    //   serverBaseUrl: 'some_server_url',
    // }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
