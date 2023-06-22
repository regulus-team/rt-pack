import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {RtPlatformService} from './rt-platform.service';
import {factoryFn, RtPlatformConfig, RtPlatformConfigToken} from './symbols';
import {WINDOW, WindowService} from './window.service';


@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [RtPlatformService, WindowService, {provide: WINDOW, useFactory: factoryFn, deps: [WindowService]}],
})
export class RtPlatformModule {
  static forRoot(config?: RtPlatformConfig): ModuleWithProviders<RtPlatformModule> {
    return {
      ngModule: RtPlatformModule,
      providers: [
        RtPlatformService,
        WindowService,
        {
          provide: WINDOW,
          useFactory: factoryFn,
          deps: [WindowService],
        },
        {
          provide: RtPlatformConfigToken,
          useValue: config,
        },
      ],
    };
  }
}



