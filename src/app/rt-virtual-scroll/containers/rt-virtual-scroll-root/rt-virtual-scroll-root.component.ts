import {Component} from '@angular/core';
import {
    RtVirtualScrollDataSource,
} from '../../../../../projects/rt-virtual-scroll/src/lib/rt-virtual-scroll-data-source';
import {RtVirtualScrollService} from '../../rt-virtual-scroll.service';
import {delay, map} from 'rxjs/operators';
import {Breed} from '../../symbols';

@Component({
    selector: 'app-rt-virtual-scroll-root',
    templateUrl: './rt-virtual-scroll-root.component.html',
    styleUrls: ['./rt-virtual-scroll-root.component.scss'],
})
export class RtVirtualScrollRootComponent {

    ds = new RtVirtualScrollDataSource<Breed>(25);

    constructor(private service: RtVirtualScrollService) {
        this.ds.triggerPageChange.subscribe(data => {
            this.ds.appendItems(
                this.service.getListData(data?.nextApi || 'https://catfact.ninja/breeds').pipe(map(v => {
                    return {
                        data: v.data,
                        total: v.total,
                        nextPageUrl: v.next_page_url,
                    };
                }), delay(500)),
                data?.page,
            );
        });
    }

}



