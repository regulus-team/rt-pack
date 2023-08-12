import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, first, Observable, Subject, Subscription} from 'rxjs';

export class RtVirtualScrollDataSource<T> extends DataSource<T | undefined> {

    public triggerPageChange: Subject<number> = new BehaviorSubject<number>(null);
    private _pageSize = 10;
    private _length = 100000;
    private _cachedData = Array.from<T>({length: this._length});
    private _fetchedPages = new Set<number>();
    private _dataStream: BehaviorSubject<(T | undefined)[]> = new BehaviorSubject<(T | undefined)[]>([]);
    private readonly _subscription = new Subscription();

    constructor(data: Observable<(T | undefined)[]>, pageSize = 10, length = 100) {
        super();
        this._pageSize = pageSize;
        this._length = length;
        this._cachedData = Array.from<T>({length: this._length});
        this._dataStream.next(this._cachedData);
        this.mergeDate(data, 0);
    }


    connect(collectionViewer: CollectionViewer): Observable<(T | undefined)[]> {

        this._subscription.add(collectionViewer.viewChange
            .subscribe((range) => {
                const startPage = this._getPageForIndex(range.start);
                const endPage = this._getPageForIndex(range.end - 1);
                for (let i = startPage; i <= endPage; i++) {
                    this._fetchPage(i);
                }

            }),
        );

        return this._dataStream;
    }

    disconnect(): void {
        this._subscription.unsubscribe();
    }

    appendItems(data: Observable<T[]>, page: number) {
        if (page > 0) {
            this.mergeDate(data, page);
        }
    }

    setData(data: Observable<T[]>) {
        data.pipe(first()).subscribe({
            next: (v) => this._dataStream.next(v),
        });
    }

    private mergeDate(data: Observable<T[]>, page: number) {
        data.pipe(first()).subscribe({
            next: (v) => {
                this._cachedData.splice(
                    page * this._pageSize,
                    this._pageSize,
                    ...v,
                );
                this._dataStream.next(this._cachedData);
            },
        });
    }

    private _getPageForIndex(index: number): number {
        return Math.floor(index / this._pageSize);
    }

    private _fetchPage(page: number) {
        if (this._fetchedPages.has(page)) {
            return;
        }
        this._fetchedPages.add(page);
        this.triggerPageChange.next(page);

    }
}
