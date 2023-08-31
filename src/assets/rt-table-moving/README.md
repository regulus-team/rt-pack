# Rt table moving

![](/projects/rt-table-moving/rt-table-moving.gif)
![](/projects/rt-table-moving/rt-table-moving-validation.png)

### About

- Version 1.0.5 - Add endEdited output
- Version 1.0.6 - Rename output from endEdited to endEditing
- Version 1.0.7 - Remove basic color variables
- Version 1.0.8 - Tweak cell styles for long text
- Version 1.0.9 - Tweak cell styles. Change box-sizing to border-box
- Version 1.0.10 - Tweak header styles. Fix position of the remove button
- Version 1.0.11 - Update rt-overflow-tooltip to 1.0.3
- Version 1.0.12 - Update rt-overflow-tooltip to 1.0.4
- Version 1.0.13 - Update rt-overflow-tooltip to 1.0.5, Fix tooltip visibility
- Version 1.0.14 - Fix updating dynamicItemsOnPage
- Version 1.0.15 - Fix updating dynamicItemsOnPage
- Version 1.0.16 - Fix updating dynamicItemsOnPage
- Version 1.1.0 - Add validation
- Version 1.2.0 - Add isClick output
- Version 1.2.1 - Add interface for isClick output
- Version 1.2.3 - Fix hideControls input
- Version 1.2.4 - Add trackBy to ngFor
- Version 1.2.5 - Optimization
- Version 1.2.6 - Fix bug related with update date

### Install

```bash
npm i rt-table-moving
```

```bash
yarn add rt-table-moving
```

### Styles

### Add color variables to your global styles.scss

```css
:root {
    --primary-200: #41789b;
    --primary-800: #25495b;
    --text-border-light: #E5E5E5;
    --text-background: #F7F7F7;
}
```

### add config to your angular.json in assets section

```json
...
"assets": [
...
{
"glob": "**/*",
"input": "node_modules/rt-table-moving/src/lib/assets/",
"output": "/assets/rt-table-moving/"
}
]
...
```

# About

| name               | type   | interface                | description                   |
|--------------------|--------|--------------------------|-------------------------------|
| hideControls       | input  | boolean                  |                               |
| dynamicItemsOnPage | input  | number                   | Number of visible columns     |
| data               | input  | RtTableMovingModel       |                               |
| changedData        | output | RtTableMovingChangedData | If remove column or edit item |
| endEdited          | output | RtTableMovingChangedData | End edit item                 |
| isValid            | output | boolean                  | Validation                    |
| isClick            | output |                          |                               |

### If you want to reproduce the following table

| Static [subTitle] | [x] Dynamic             |
|-------------------|-------------------------|
| S1                | D1 (editable, required) |
| S2                | D2                      |
| S3                | D3                      |

### Then the data will be as follows

```Table data: ```

```ts
{
    staticData: [
        {header: {title: 'Static', subTitle: 'subTitle'}, data: 'S1'},
        {header: {title: 'Static', subTitle: 'subTitle'}, data: 'S2'},
        {header: {title: 'Static', subTitle: 'subTitle'}, data: 'S3'},
    ],
        dynamicData
:
    [
        {
            header: {title: 'Dynamic', isRemovable: true}, data: 'D1',
            isEditable: true,
            validators: [Validators.required], errorMessages: {required: 'This field is required'},
        },
        {header: {title: 'Dynamic', isRemovable: true}, data: 'D2'},
        {header: {title: 'Dynamic', isRemovable: true}, data: 'D3'},
    ]
}
;
```

# Usage

```html

<rt-table-moving
        [data]="tableData$ | async"
        (changedData)="changedItems($event)"
        (endEdited)="endEditing($event)"
        [dynamicItemsOnPage]="3">

</rt-table-moving>
```

```ts
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';

@Component({
    selector: 'app-component',
    templateUrl: './app-component.html',
    styleUrls: ['./app-component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

    tableData$: Observable<RtTableMovingModel>;

    ngOnInit(): void {

        this.tableData$ = of({
            staticData: [
                {
                    header: {
                        title: 'Static', width: 350, isRemovable: true,
                        subTitle: 'SubTitle',
                    },
                    data: 'S1',
                    isEditable: true,

                },
                {
                    header: {
                        title: 'Static', width: 350,
                    },
                    data: 'S2',
                },
                {
                    header: {
                        title: 'Static 2', width: 350,
                    },
                    data: 'S3',
                },
                {
                    header: {
                        title: 'Static 2', width: 350,
                    },
                    data: 'S4',
                },
            ],

            dynamicData: [

                {header: {title: 'Dynamic 1'}, data: 'D1', isEditable: true},
                {header: {title: 'Dynamic 1'}, data: 'D2'},
                {header: {title: 'Dynamic 1'}, data: 'D3'},
                {header: {title: 'Dynamic 1'}, data: 'D4'},
                {header: {title: 'Dynamic 2'}, data: 'D5'},
                {header: {title: 'Dynamic 3'}, data: 'D6'},
                {header: {title: 'Dynamic 4'}, data: 'D7'},

            ],
        });


    }


    changedItems($event: RtTableMovingModel) {
        // this is the result of the table moving changes
    }

    endEdited($event: RtTableMovingModel) {
        // this is the result of the table moving changes
    }
}

```

