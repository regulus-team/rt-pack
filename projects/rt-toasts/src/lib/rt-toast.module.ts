import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ModuleWithProviders, NgModule}                             from '@angular/core';
import {RtToastComponent}                                          from './components/rt-toast/rt-toast.component';
import {RtToastsComponent}                                         from './containers/rt-toasts/rt-toasts.component';
import {RtToastService}                                            from './rt-toast.service';
import {defaultRtToastsConfig, RtToastConfig, RtToastsConfigToken} from './symbols';


@NgModule({
  declarations: [
    RtToastComponent,
    RtToastsComponent,
  ],
  exports: [
    RtToastsComponent,
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
  ],
  providers: [RtToastService],
})
export class RtToastModule {
  static forRoot(config?: RtToastConfig): ModuleWithProviders<RtToastModule> {
    return {
      ngModule: RtToastModule,
      providers: [
        {
          provide: RtToastsConfigToken,
          useValue: {...defaultRtToastsConfig, ...config},
        },
      ],
    };
  }
}
