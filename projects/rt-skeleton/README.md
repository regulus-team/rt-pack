## RT_SKELETON

![](/projects/rt-skeleton/rt-skeleton.gif)

- Version 1.1.0 - Add rtSkeletonPlaceholderContainer directive
- Version 1.1.1 - Fix export rtSkeletonPlaceholderContainer directive
- Version 1.1.2 - Edit readme
- Version 1.1.3 - Changed removing elements on display none
- Version 1.1.4 - Change display block on flex for rtSkeletonPlaceholderContainer
- Version 1.2.0 - Add rightSkeleton option for rtSkeletonPlaceholder directive
- Version 1.3.0 - Changed rightSkeleton option on marginSkeleton for rtSkeletonPlaceholder directive 
- Version 1.3.1 - Fix bug with marginSkeleton option for rtSkeletonPlaceholder directive 
- Version 1.3.2 - Fix bug with marginSkeleton option for rtSkeletonPlaceholder directive 
- Version 1.3.3 - Fix bug with marginSkeleton option for rtSkeletonPlaceholder directive 
- Version 1.3.4 - Fix bug with marginSkeleton option for rtSkeletonPlaceholder directive 
- Version 1.3.5 - Fix bug with marginSkeleton option for rtSkeletonPlaceholder directive 
- Version 1.3.6 - Optimization for rtSkeletonPlaceholder directive 
- Version 1.3.7 - Set pointer-events none for rtSkeletonPlaceholder directive 
- Version 1.4.0 - Add rtSkeletonIf directive 
- Version 1.4.1 - Fix a bug related to remapping in rtSkeletonIf directive 
- Version 1.4.2 - Fix bug related visibility for rtSkeletonIf directive (Added detectChanges)

## Install

```bash
npm i rt-skeleton
```

```bash
yarn add rt-skeleton
```

## Usage

## rtSkeletonPlaceholderContainer
``This directive sets the attribute for removing elements from DOM after loaded``


## rtSkeletonContainer
``This directive sets the attribute for removing elements from DOM after loaded``

## rtSkeletonPlaceholder directive

| Option                | Default | Type  | Description |
|-----------------------|---------|-------|-------------|
| **widthSkeleton**     | 100%    | Input |             |
| **heightSkeleton**    | 100%    | Input |             |
| **radiusPlaceholder** | 5px     | Input |             |
| **leftSkeleton**      | 0       | Input |             |



## rtSkeletonContainer directive

| Option                | Default | Type  | Description                     |
|-----------------------|---------|-------|---------------------------------|
| **iterations**        | 1       | Input | amount mock containers for load |

``*rtForSkeleton extended by *ngFor directive``

### Import or add global style for skeleton placeholder
```css
@import 'node_modules/rt-skeleton/styles/styles.scss';
```

```css

.rt-skeleton-segment {

  background: linear-gradient(0.85turn, rgba(39, 39, 39, 0.09), rgba(39, 39, 39, 0.03), rgba(39, 39, 39, 0.09));
  animation: colorChange 2s infinite linear;

  @keyframes colorChange {
    from {
      background-position: top 0 left 0;
      background-size: 1000%
    }
    50% {
      background-position: top center;
      background-size: 1000%
    }
    to {
      background-position: top 0 right 0;
      background-size: 1000%
    }
  }
}

```

## Use for single item

- Note that we are creating a ```*rtSkeletonIf="item$ | async as data"``` object instead of the usual ```*ngIf="item$ | async"```

```html

<div rtSkeletonContainer [while]="inProgress$ | async">
    <div
            *rtSkeletonIf="item$ | async as data; else emptyList"
            class="rt-skeleton__item"
    >
        <div
                class="item__avatar"
                rtSkeletonPlaceholder
                radiusPlaceholder="50%"
                widthSkeleton="50px"
                heightSkeleton="50px"
        >
            <img class="item__avatar" src="/assets/icons/avatar_1.png" alt="">
        </div>

        <div class="item-group"><span>Name: </span>
            <div rtSkeletonPlaceholder widthSkeleton="150px"
                 class="item__value">{{data.name.first_name}}
            </div>
        </div>
        <div class="item-group"><span>Age: </span>
            <div rtSkeletonPlaceholder widthSkeleton="150px" class="item__value">{{data.age}}</div>
        </div>
        <div class="item-group"><span>address: </span>
            <div rtSkeletonPlaceholder widthSkeleton="150px" class="item__value">{{data.address}}</div>
        </div>

        <div class="item-group"><span>phone: </span>
            <div rtSkeletonPlaceholder widthSkeleton="150px" class="item__value">{{data.phone}}</div>
        </div>


    </div>
    <ng-template #emptyList>The list is empty</ng-template>
</div>
```

## Use for list

```html

<div
  rtSkeletonContainer
  [iterations]="5"
  [while]="inProgress$ | async"
  class="rt-skeleton-example__container"
>
  <div
    class="rt-skeleton__item"
    *rtForSkeleton="let data of items$ | async;"
  >
    <div
      rtSkeletonPlaceholder
      radiusPlaceholder="50%"
      widthSkeleton="50px"
      heightSkeleton="50px"
      class="item__avatar"
    >
      <img class="item__avatar" src="/assets/images/profile/avatar-list/avatar_1.png" alt="">
    </div>

    <div class="item-group">
      <div>Name:</div>
      <div class="item__value" rtSkeletonPlaceholder widthSkeleton="150px">{{data.name.first_name}}</div>
    </div>
    <div class="item-group">
      <div>Age:</div>
      <div class="item__value" rtSkeletonPlaceholder widthSkeleton="150px">{{data.age}}</div>
    </div>
    <div class="item-group">
      <div>Address:</div>
      <div class="item__value" rtSkeletonPlaceholder widthSkeleton="150px">{{data.address}}</div>
    </div>
    <div class="item-group">
      <div>Phone:</div>
      <div class="item__value" rtSkeletonPlaceholder widthSkeleton="150px">{{data.phone}}</div>
    </div>

  </div>
</div>
```




https://www.regulus.team/
