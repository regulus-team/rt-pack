import {Component} from '@angular/core';
import {BehaviorSubject, delay, of} from 'rxjs';
import {
    RtVirtualScrollDataSource,
} from '../../../../../projects/rt-virtual-scroll/src/lib/rt-virtual-scroll-data-source';

@Component({
    selector: 'app-rt-virtual-scroll-root',
    templateUrl: './rt-virtual-scroll-root.component.html',
    styleUrls: ['./rt-virtual-scroll-root.component.scss'],
})
export class RtVirtualScrollRootComponent {
    testData$ = new BehaviorSubject<string[]>(Array.from({length: 20}).map((_, i) => `Item #${i}`));
    ds = new RtVirtualScrollDataSource(this.testData$, 20, 100);

    constructor() {
        this.ds.triggerPageChange.subscribe(page => {
            this.ds.appendItems(
                of(Array.from({length: 20}).map((_, i) => `Item #${page * 20 + i}`))
                    .pipe(delay(1000)),
                page,
            );
        });
    }

}



