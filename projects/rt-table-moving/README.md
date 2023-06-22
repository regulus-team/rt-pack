### RT_TABLE_MOVING

```html
  <rt-table-moving [data]="tableData$ | async" (changedData)="changedItems($event)" [dynamicItemsOnPage]="3"></rt-table-moving>
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
}

```
