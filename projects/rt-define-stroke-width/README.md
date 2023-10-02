# About
RT Define Stroke Width

Provides service that might calculate stroke width with specific CSS rules applied.

## Install
```bash
npm i rt-define-stroke-width
```

```bash
yarn add rt-define-stroke-width
```

## Usage

Add `RtDefineStrokeWidthModule` in imports into your `module`:

```ts
import {RtDefineStrokeWidthModule} from 'rt-define-stroke-width';

@NgModule({
  ...
  imports: [
    ...
    RtDefineStrokeWidthModule,
    ...
  ],
  ...
})
export class YourModule {
}  
```

Add `RtDefineStrokeWidthService` into constructor in your component and call `getTextWidth` method when needed.

# Api

Service API:
  * `getTextWidth` - Defines width for stroke with specific CSS rules.


# Example

Simple usage:
```ts
  constructor(private defineStrokeWidth: RtDefineStrokeWidthService) {
    this.strokeWidth = this.defineStrokeWidth.getTextWidth('text', 'font-size: 12px; font-family: Arial, sans-serif;');
  }
```


https://www.regulus.team/
