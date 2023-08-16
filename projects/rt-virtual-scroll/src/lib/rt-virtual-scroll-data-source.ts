import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, first, Observable, Subject, Subscription} from 'rxjs';

export interface RtVirtualScrollDataSourceModel<T> {
    data: T[];
    total: number;
    nextPageUrl: string;
}

export class RtVirtualScrollDataSource<T> extends DataSource<T | undefined> {

    public triggerPageChange: Subject<{ page: number, nextApi: string }> = new BehaviorSubject<{
        page: number,
        nextApi: string
    }>(null);
    private _pageSize = 10;
    private _length = 100000;
    private _cachedData: T[];
    private _fetchedPages = new Set<number>();
    private _dataStream: BehaviorSubject<(T | undefined)[]> = new BehaviorSubject<(T | undefined)[]>([]);
    private _nextPageUrl: string;

    private readonly _subscription = new Subscription();

    constructor(pageSize = 10, length = 100) {
        super();
        this._pageSize = pageSize;
        this._length = length;


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

    appendItems(data: Observable<RtVirtualScrollDataSourceModel<T>>, page: number) {
        this.mergeDate(data, page);
    }

    resetData() {
        this._cachedData = Array.from<T>({length: 10});
        this._dataStream.next(this._cachedData);
    }

    private mergeDate(data: Observable<RtVirtualScrollDataSourceModel<T>>, page: number) {
        if (this._cachedData) {
            data.pipe(first()).subscribe({
                next: (v) => {
                    if (page === 0) {
                        this._length = v.total;
                        this._cachedData = Array.from<T>({length: this._length});
                    }
                    this._nextPageUrl = v.nextPageUrl;
                    this._cachedData.splice(
                        page * this._pageSize,
                        this._pageSize,
                        ...v.data,
                    );
                    this._dataStream.next(this._cachedData);
                },
            });
        } else {
            this._cachedData = Array.from<T>({length: 10});
            this._dataStream.next(this._cachedData);
        }
    }

    private _getPageForIndex(index: number): number {
        return Math.floor(index / this._pageSize);
    }

    private _fetchPage(page: number) {
        if (this._fetchedPages.has(page)) {
            return;
        }
        this._fetchedPages.add(page);
        this.triggerPageChange.next({page, nextApi: this._nextPageUrl});

    }
}
