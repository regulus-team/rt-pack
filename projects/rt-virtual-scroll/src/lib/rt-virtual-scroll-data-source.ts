import {CollectionViewer, DataSource, ListRange} from '@angular/cdk/collections';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, combineLatest, mergeMap, Observable, of, Subscription} from 'rxjs';
import {distinctUntilChanged, filter, map, tap} from 'rxjs/operators';

export class RtVirtualScrollDataSource<ListType, ResponseType = any> extends DataSource<ListType | undefined> {

    defaultKeys: {
        data: keyof ResponseType | null;
        totalCount: keyof ResponseType | null;
        page: string | null;
    } = {
        data: null,
        totalCount: null,
        page: null,
    };

    private readonly _subscription = new Subscription();
    private _subscriptionHttp = new Subscription();
    private _collectionViewer$ = new BehaviorSubject<ListRange>({start: null, end: null});

    private readonly _pageSize: number;
    private _cachedData: ListType[];
    private _fetchedPages = new Set<number>();
    private _dataStream: BehaviorSubject<(ListType | undefined)[]> = new BehaviorSubject<(ListType | undefined)[]>([]);
    private request: Observable<unknown>;
    private isDefaultLength = true;
    private _api: string;
    private _params: any;
    private _isRemoveEmptyParams = false;

    constructor(private http: HttpClient, pageSize: number, length = 0) {
        super();
        this._pageSize = pageSize;
        this._length = length;
    }

    private _length = 100;

    get length(): number {
        return this._length;
    }


    connect(collectionViewer: CollectionViewer): Observable<(ListType | undefined)[]> {
        this._subscription.add(
            collectionViewer.viewChange.subscribe({next: range => this._collectionViewer$.next(range)}),
        );
        return this._dataStream;
    }

    disconnect(): void {
        this._subscription.unsubscribe();
        this._subscriptionHttp.unsubscribe();
    }

    setApi(api: string, params?: unknown): RtVirtualScrollDataSource<ListType, ResponseType> {
        this._api = api;


        this._params = params;
        this._subscriptionHttp.unsubscribe();
        this._subscriptionHttp = new Subscription();
        this._fetchedPages.clear();
        this._cachedData = Array.from({length: this._pageSize});
        this._dataStream.next(this._cachedData);
        this._collectionViewer$.next({start: 0, end: 0});

        this.request = this.http.get(api, {params: this._isRemoveEmptyParams ? this.removeEmptyParams(this._params) : this._params});
        return this;
    }

    isRemoveEmptyParams(value = true): RtVirtualScrollDataSource<ListType, ResponseType> {
        this._isRemoveEmptyParams = value;
        return this;
    }

    setDefaultKeys(
        data: keyof ResponseType,
        totalCount: keyof ResponseType,
        page: string,
    ): RtVirtualScrollDataSource<ListType, ResponseType> {
        this.defaultKeys.data = data;
        this.defaultKeys.totalCount = totalCount;
        this.defaultKeys.page = page;
        return this;
    }

    load(): void {
        this.isDefaultLength = true;
        this._subscriptionHttp.add(
            this._collectionViewer$.asObservable()
                .pipe(
                    // Calculate the page index for the given start/end range.
                    map(range => {
                        const startPage = this._getPageForIndex(range.start);
                        const endPage = this._getPageForIndex(range.end - 1);
                        let page = 0;
                        for (let i = startPage; i <= endPage; i++) {
                            page = i;
                        }
                        return {page, range};
                    }),

                    // Only if the page has changed and page is not exist in set.
                    filter((data) => !this._fetchedPages.has(data.page)),

                    // Fetch the new page.
                    tap(data => this._fetchPage(data.page)),

                    map(data => ({page: data.page, range: data.range})),

                    distinctUntilChanged((prev, curr) => prev.page === curr.page),

                    mergeMap(view => {

                        const nextApi = this.getNextApi(view.page);

                        if (!nextApi) {
                            return of([null, null]);
                        }


                        this._api = nextApi;
                        this.request = this.http.get(
                            this._api,
                            {params: this._isRemoveEmptyParams ? this.removeEmptyParams(this._params) : this._params},
                        );

                        return combineLatest([
                                this.request.pipe(map(data => ({
                                    data: data[this.defaultKeys.data],
                                    total: data[this.defaultKeys.totalCount],
                                }))),
                                of(view),
                            ],
                        );
                    }),

                    filter(([data]) => !!data),
                )
                .subscribe(([data, range]) => {
                        this._length = data.total;

                        if (this.isDefaultLength) {
                            this._cachedData = Array.from<ListType>({length: this._length});
                            this.isDefaultLength = false;
                        }

                        this._cachedData.splice(
                            range.page * this._pageSize,
                            this._pageSize,
                            ...data.data,
                        );

                        this._dataStream.next(this._cachedData);
                    },
                ),
        );

    }

    private getNextApi(page: number): string {
        const existPage = this._api.includes(this.defaultKeys.page);
        let modifiedApi = this._api;
        if (page) {
            if (existPage) {
                const regex = new RegExp(`${this.defaultKeys.page}=\\d+`);
                modifiedApi = this._api.replace(regex, `${this.defaultKeys.page}=${page + 1}`);
            } else {
                this._params = {...this._params, page: page + 1};
            }
        }

        return modifiedApi;
    }

    private removeEmptyParams(params: any): any {
        if (!params) {
            return params;
        }
        return Object.fromEntries(
            Object.entries(params).filter(
                ([, value]) => value !== null && value !== undefined && value !== '',
            ),
        );
    }

    private _getPageForIndex(index: number): number {
        return Math.floor(index / this._pageSize);
    }

    private _fetchPage(page: number) {
        this._fetchedPages.add(page);
    }
}
