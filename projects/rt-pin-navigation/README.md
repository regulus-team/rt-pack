# About
RT PIN NAVIGATION

![](/projects/rt-pin-navigation/rt-pin-navigation.gif)

## Install
```bash
npm i rt-pin-navigation
```

```bash
yarn add rt-pin-navigation
```


## Usage

Add `RtPinNavigationDirective` in imports into your `module:

```ts
import {RtPinNavigationDirective} from 'rt-pin-navigation';

@NgModule({
  ...
  imports: [
    ...
      RtPinNavigationDirective,
    ...
  ],
  ...
})
export class YourModule {
}  
```

# Example

Simple usage:
```html
<div rtPinNavigation class="navigation-example">
  <div>actions...</div>
</div>
```

https://www.regulus.team/
