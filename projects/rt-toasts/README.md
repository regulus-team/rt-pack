# Rt toasts

![](/projects/rt-toasts/rt-toasts.gif)

## About

- Version 1.0.1 - Create library
- Version 1.0.2 - Tweak icons styles
- Version 1.0.3 - Add shadow to toasts and fix stop timer in bottom sections
- Version 1.1.0 - Add methods to create toasts for each type
- Version 1.1.1 - Add width property for config
- Version 1.1.2 - Remove from DOM if toast list is empty
- Version 1.1.3 - Fix position of toasts

## Install

```bash
npm i rt-toasts
```

```bash
yarn add rt-toasts
```

## Usages

### Styles

### You can override the styles, here are all the classes used:

```scss
.rt-toast {
  box-shadow: 0 0 10px 0 #00000047;
  box-sizing: border-box;
  border-radius: 14px;
  width: 100%;
  padding: 14px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: calc(100vw - 30px);
  position: relative;
  overflow: hidden;

  &__content {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  &__icon {
    display: flex;

    &_success:before {
      content: "";
      background-image: url("/assets/rt-toasts/success.svg");
      background-size: contain;
      height: 20px;
      width: 20px;
      background-repeat: no-repeat;
      filter: brightness(0) saturate(100%) invert(59%) sepia(64%) saturate(4590%) hue-rotate(129deg) brightness(88%) contrast(98%);
      color: #02A876;
    }

    &_error:before {
      content: "";
      background-image: url("/assets/rt-toasts/info.svg");
      background-size: contain;
      height: 24px;
      width: 24px;
      background-repeat: no-repeat;
      filter: brightness(0) saturate(100%) invert(17%) sepia(98%) saturate(2813%) hue-rotate(349deg) brightness(92%) contrast(92%);
      color: #CD2222;
    }

    &_warning:before {
      content: "";
      background-image: url("/assets/rt-toasts/info.svg");
      background-size: contain;
      height: 24px;
      width: 24px;
      background-repeat: no-repeat;
      filter: brightness(0) saturate(100%) invert(73%) sepia(46%) saturate(737%) hue-rotate(336deg) brightness(103%) contrast(95%);
      color: #F9B249;
    }

    &_info:before {
      content: "";
      background-image: url("/assets/rt-toasts/info.svg");
      background-size: contain;
      height: 24px;
      width: 24px;
      background-repeat: no-repeat;
      filter: brightness(0) saturate(100%) invert(41%) sepia(81%) saturate(3505%) hue-rotate(204deg) brightness(94%) contrast(93%);
      color: #2674E8;
    }
  }

  &__success {
    background: #DEFFE9;
  }

  &__error {
    background: #FFE9E9;
  }

  &__warning {
    background: #FEF2DF;
  }

  &__info {
    background: #E0EEFF;
  }
}

.close-icon {
  cursor: pointer;
  display: flex;

  &:before {
    content: "";
    background-image: url("/assets/rt-toasts/close.svg");
    background-size: contain;
    background-repeat: no-repeat;
    width: 18px;
    height: 18px;
  }
}

.time-progress {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 4px;
  transition: all .5s;

  &__error {
    background: #CD2222;
  }

  &__warning {
    background: #F8A320;
  }

  &__info {
    background: #2674E8;
  }

  &__success {
    background: #02A876;
  }
}

.rt-toast__title {
  font-size: 16px;
  font-weight: 600;
  color: #333333;
  margin-bottom: 8px;
}


```

### add config to your angular.json in assets section

```json
...
"assets": [
...
{
"glob": "**/*",
"input": "node_modules/rt-toasts/src/lib/assets/",
"output": "/assets/rt-toasts/"
}
]
...
```
## Import into your module
```ts
imports: [
  // ... your imports,
  RtToastModule.forRoot({
    position: RtToastPosition.TopRight,
    timeout: 5000,
    isShowTimeout: true,
    groupByDuplicate: true,
  }),
]
```

## Add container for main html, for example app.component.html
```angular17html

<rt-toasts></rt-toasts>
```

## Create a toast
```ts

@Component({
  selector: 'app-your-component',
})
export class YourComponent implements OnInit {


  constructor(private rtToastService: RtToastService) {
  }

  ngOnInit(): void {
    
    this.rtToastService.createSuccessToast({label: 'Success', message: 'This is a success toast'});
    this.rtToastService.createWarningToast({label: 'Warning', message: 'This is a warning toast'});
    this.rtToastService.createInfoToast({label: 'Info', message: 'This is a info toast'});
    this.rtToastService.createErrorToast({label: 'Error', message: 'This is a error toast'});
    
    // or
    
    this.rtToastService.createToast({
      type: RtToastType.Success,
      label: 'Success',
      message: 'This is a success toast',
    });

    this.rtToastService.createToast({
      type: RtToastType.Info,
      label: 'Info',
      message: 'This is an info toast',
      timeout: 30000,
    });

    this.rtToastService.createToast({
      type: RtToastType.Warning,
      label: 'Warning',
      message: 'This is a warning toast',
    });

    this.rtToastService.createToast({
      type: RtToastType.Error,
      label: 'Error',
      message: 'This is an error toast',
    });
  }


}
```
