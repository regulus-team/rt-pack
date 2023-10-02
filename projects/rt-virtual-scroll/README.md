# RtVirtualScroll

![](/projects/rt-virtual-scroll/rtVirtualScroll.gif)

# Install

```bash
npm i rt-virtual-scroll
```

```bash
yarn add rt-virtual-scroll
```

# Usages
```ts

```html
<cdk-virtual-scroll-viewport itemSize="50" class="example-viewport">
    <div *cdkVirtualFor="let item of ds" class="example-item">
        <div class="item" *ngIf="item; else loading">
            {{item.breed}}
        </div>
        <ng-template #loading>
            <div class="loading-shim">
                <mat-progress-spinner mode="indeterminate" diameter="15"></mat-progress-spinner>
            </div>
        </ng-template>
    </div>
</cdk-virtual-scroll-viewport>
```

```ts
import {Component, OnInit} from '@angular/core';
import {
    RtVirtualScrollDataSource,
} from '../../../../../projects/rt-virtual-scroll/src/lib/rt-virtual-scroll-data-source';
import {Breed, BreedList} from '../../symbols';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-rt-virtual-scroll-root',
    templateUrl: './rt-virtual-scroll-root.component.html',
    styleUrls: ['./rt-virtual-scroll-root.component.scss'],
})
export class RtVirtualScrollRootComponent implements OnInit {

    ds: RtVirtualScrollDataSource<Breed, BreedList>;

    constructor(private http: HttpClient) {
    }

    ngOnInit(): void {
        this.ds = new RtVirtualScrollDataSource<Breed, BreedList>(this.http, 25);
        this.ds.setApi('https://catfact.ninja/breeds')
            .isRemoveEmptyParams()
            .setDefaultKeys('data', 'total', 'page')
            .load();
    }
}
```

