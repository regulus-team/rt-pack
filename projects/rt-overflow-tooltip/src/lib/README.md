# About
RT Overflow Tooltip

Provides directive that shows tooltip when text is overflowed.

# Usage

Add `RtOverflowTooltipModule` in imports into your `module:

```ts
import {RtOverflowTooltipModule} from 'rt-overflow-tooltip';

@NgModule({
  ...
  imports: [
    ...
    RtOverflowTooltipModule,
    ...
  ],
  ...
})
export class YourModule {
}  
```

Apply the `rt-overflow-tooltip` attribute to the required element. Provided text will be displayed only if it is overflowed.
`RtOverflowTooltip` extends `MatToolTip` so you can use all its properties.

Please note that `RtOverflowTooltip` only defines the tooltip's logic.
You should define the display of the overflowing element itself.

# Example

Simple usage:
```html
<div>
  <div class="css-hide-overflow" [rtOverflowTooltip]="'tooltip'">Some text</div>
</div>

<style>
  .css-hide-overflow {
    display: block;
    width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>

```

https://www.regulus.team/
