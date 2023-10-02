# About
RT Multiple Switch

The module provides directives similar to `ngSwitch` but for multiple cases simultaneously. 
It is supposed to be used in highly dynamic applications based on configs.

## Install

```bash
npm i rt-multiple-switch
```

```bash
yarn add rt-multiple-switch
```

## Usage

Import `RtMultipleSwitchDirective` & `RtMultipleSwitchCaseDirective` into your module or standalone component.

```ts

import {RtMultipleSwitchDirective, RtMultipleSwitchCaseDirective} from './rt-multiple-switch/rt-multiple-switch.ts';

... 
  imports: 
    ...
    RtMultipleSwitchDirective,
    RtMultipleSwitchCaseDirective,
  ...
...
```

# Api

Directives:
* `RtMultipleSwitchDirective` - Same usage as `ngSwitch`, but takes array of the strings instead of single one.
* `RtMultipleSwitchCaseDirective` - Same usage as `ngSwitchCase`. Takes string as an input. Displays content if input string is included into `RtMultipleSwitchDirective` input array.

# Example

Directive usage:
```html
<ng-container [rtMultipleSwitch]="['Case_1', 'Case_3', 'Case_3', 'Case_2', 'Case_7']">
  <ng-container *rtMultipleSwitchCase="'Case_1'">Case 1 Displayed.</ng-container>
  <ng-container *rtMultipleSwitchCase="'Case_2'">Case 2 Displayed.</ng-container>
  <ng-container *rtMultipleSwitchCase="'Case_3'">Case 3 Displayed.</ng-container>
  <ng-container *rtMultipleSwitchCase="'Case_4'">Case 4 Displayed.</ng-container>
  <ng-container *rtMultipleSwitchCase="'Case_5'">Case 5 Displayed.</ng-container>
  <ng-container *rtMultipleSwitchCase="'Case_6'">Case 6 Displayed.</ng-container>
  <ng-container *rtMultipleSwitchCase="'Case_7'">Case 7 Displayed.</ng-container>
  <ng-container *rtMultipleSwitchCase="'Case_8'">Case 8 Displayed.</ng-container>
</ng-container>
```

Result:
```
Case 1 Displayed.
Case 3 Displayed.
Case 3 Displayed.
Case 2 Displayed.
Case 7 Displayed.
```
