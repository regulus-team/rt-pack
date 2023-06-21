# RT-TAB-CAROUSEL

## Install

```bash
yarn add rt-tab-carousel
```

or

```bash
npm install rt-tab-carousel
```



![](/projects/rt-tab-carousel/rt-carousel_1.gif)
![](/projects/rt-tab-carousel/rt-carousel_2.gif)


``rtCarouselContainer``

Use for a ready-made container in which all the items lie

| Option                     | Default | Type  | Description                                                                                                            |
|----------------------------|---------|-------|------------------------------------------------------------------------------------------------------------------------|
| **scrollStep**             | 1       | Input |                                                                                                                        |
| **uuidCarousel** *required | null    | Input | This is a required property that indicates ownership and creates relationships between controls, containers, and items |
| **activeClass**            | null    | Input | Apply class for styling for the last selected tab                                                                      |
| **antiBounce**             | 5       | Input | Anti bounce for scrolling                                                                                              |

# IMPORTANT USE trackBy for *ngFor

``rtCarouselTab``

| Option           | Default        | Type  | Description                                                                                                            |
|------------------|----------------|-------|------------------------------------------------------------------------------------------------------------------------|
| **disabledTab**  | false          | Input |                                                                                                                        |
| **uuidCarousel** | null *required | Input | This is a required property that indicates ownership and creates relationships between controls, containers, and items |

``rtCarouselNextButton``
``rtCarouselPreviousButton``

| Option           | Default         | Type   | Description                                                                                                            |
|------------------|-----------------|--------|------------------------------------------------------------------------------------------------------------------------|
| **activeClass**  | false           | Input  | Applies the given class to the active item                                                                             |
| **uuidCarousel** | null  *required | Input  | This is a required property that indicates ownership and creates relationships between controls, containers, and items |
| **autoHide**     | true            | Input  | If the content is placed in the container, the button will disappear automatically                                     |
| **buttonHidden** |                 | Output | boolean                                                                                                                |

## Button components

``` html
<rt-carousel-previous-button></rt-carousel-previous-button>
<rt-carousel-next-button></rt-carousel-next-button>
```

| Option           | Default         | Type  | Description                                                                                                            |
|------------------|-----------------|-------|------------------------------------------------------------------------------------------------------------------------|
| **uuidCarousel** | null  *required | Input | This is a required property that indicates ownership and creates relationships between controls, containers, and items |
| **autoHide**     | true            | Input | If the content is placed in the container, the button will disappear automatically                                     |

## Service

``RtCarouselService``

| Option                            | Input               | Output               |
|-----------------------------------|---------------------|----------------------|
| **setScrollStep(string, number)** | uuidCarousel, value | void                 |
| **previousPart(string)**          | uuidCarousel        | void                 |
| **nextPart(string)**              | uuidCarousel        | void                 |
| **selectedTab(string)**           | uuidCarousel        | Observable\<number>  |
| **selectTab(string)**             | uuidCarousel        | void                 |
| **lastVisibleIndex(string)**      | uuidCarousel        | Observable\<number>  |
| **lastVisibleIndexEnd(string)**   | uuidCarousel        | Observable\<number>  |
| **isLastTabVisible(string)**      | uuidCarousel        | Observable\<boolean> |
| **isFirstTabVisible(string)**     | uuidCarousel        | Observable\<boolean> |

## Usages Directive

### rt-carousel-directive-example.ts

```ts
import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'rt-tab-carousel-directive-example',
  templateUrl: './rt-tab-carousel-root.component.html',
  styleUrls: ['./rt-tab-carousel-root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RtCarouselRootComponent {
  disableTab = false;
  selectedTabIndex: number;

  selectedTab(index: number): void {
    this.selectedTabIndex = index;
  }
}
```

### rt-carousel-directive-example.html

```html

<div class="rt-carousel-directive-example">

  <div
    rtCarouselPreviousButton
    [uuidCarousel]="'first-carousel'"
    [activeClass]="'rt-carousel__shadow-left-array'"
    class="rt-carousel__next-part"
  >
    <img ngSrc="/assets/images/icons/icn_chevron-left.svg" alt="" height="24" width="24">
  </div>

  <nav
    rtCarouselContainer
    [uuidCarousel]="'first-carousel'"
    [scrollStep]="4"
  >

    <div
      *ngFor="let tab of [].constructor(50); let index=index; trackBy: trackByFn"
      class="tab"
      [ngClass]="{'tab__active': selectedTabIndex === index}"
      rtCarouselTab
      [uuidCarousel]="'first-carousel'"
      [disabledTab]="disableTab"
    >
      First {{index + 1}}
    </div>

  </nav>


  <div
    rtCarouselNextButton
    [uuidCarousel]="'first-carousel'"
    [activeClass]="'rt-carousel__shadow-right-array'"
    class="rt-carousel__next-part"
  >
    <img ngSrc="/assets/images/icons/icn_chevron-right.svg" alt="" height="24" width="24">
  </div>

</div>

```

## Note that you can also use ready-made button components

```html

<rt-carousel-previous-button uuidCarousel="carousel-text-book"></rt-carousel-previous-button>
<rt-carousel-next-button uuidCarousel="carousel-text-book"></rt-carousel-next-button>
```

### rt-carousel-directive-example.scss

```css
.rt-carousel-example {
  display: flex;
  flex-direction: column;
  margin: 20px;
}

.rt-carousel-directive-example {
  display: flex;
  align-items: center;
  height: 100px;
  margin: 20px;
}

.tab {
  padding: 10px;
}

.tab__active {
  border-bottom: #6a88d9 solid 2px;
}

.rt-carousel-tab__disabled {
  opacity: .6;
  pointer-events: none;
}

.rt-carousel__next-part {
  cursor: pointer;
  width: 24px;
  align-items: center;
  display: flex;
  z-index: 1;
  transition: box-shadow .3s;
}

.rt-carousel__shadow-left-array {
  box-shadow: 10px 0 10px -10px #000000b5;
  border-right: solid 0.3px;
  border-image: linear-gradient(to bottom, transparent, #0e0e0e, rgb(0 0 0 / 0%)) 0 100%;
  height: 100%;
  align-items: center;
  display: flex;
}

.rt-carousel__shadow-right-array {
  box-shadow: -10px 0 10px -10px #000000b5;
  border-left: solid 0.3px;
  border-image: linear-gradient(to bottom, transparent, #0e0e0e, rgb(0 0 0 / 0%)) 0 100%;
  height: 100%;
  align-items: center;
  display: flex;
}

```

https://www.regulus.team/
