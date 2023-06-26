# Rt table moving

### About
- Version 1.0.5 - Add endEdited output
- Version 1.0.6 - Rename output from endEdited to endEditing


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
| dynamicItemsOnPage | input  | number                   | Number of visible columns     |
| data               | input  | RtTableMovingModel       |                               |
| changedData        | output | RtTableMovingChangedData | If remove column or edit item |
| endEdited          | output | RtTableMovingChangedData | End edit item                 |

### If you want to reproduce the following table

| Static [subTitle] | [x] Dynamic   |
|-------------------|---------------|
| S1                | D1 (editable) |
| S2                | D2            |
| S3                | D3            |

### Then the data will be as follows

```Table data: ```

```ts
{
  staticData: [
    {header: {title: 'Static', subTitle: 'subTitle'}, data: 'S1'},
    {header: {title: 'Static', subTitle: 'subTitle'}, data: 'S2'},
    {header: {title: 'Static', subTitle: 'subTitle'}, data: 'S3'},
  ],
    dynamicData:
  [
    {header: {title: 'Dynamic', isRemovable: true}, data: 'D1', isEditable: true},
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

