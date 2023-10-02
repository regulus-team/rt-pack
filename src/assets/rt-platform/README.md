# RT Platform v.0.0.4

Module provide service that:
* may return base url depends on data provided in configs;
* may check if current environment is browser or server;

## Install

```bash
npm i rt-platform
```

```bash
yarn add rt-platform
```


## Usage

Import `RtPlatformModule` into your module and provide configs (see `RtPlatformConfig` interface for more details):

```ts
import {RtPlatformModule} from 'rt-platform';

@NgModule({  
  imports: 
    ...
    RtPlatformModule.forRoot({
      localBaseUrl: settings.BASE_URL,
      serverBaseUrl: 'some_server_url',
    }),
  ...
})
export class AppModule {}
```


# Changes history
`v.0.0.0` - copy rt-platform module from exiting projects

`v.0.0.1` - move BASE_URL variable from settings to injected configs

`v.0.0.2` - update README, rename rt-platform.model.ts to symbols.ts

`v.0.0.3` - update README, add global var --app-height

`v.0.0.4` - update README
