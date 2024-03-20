import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, combineLatest, mergeMap, of, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map, startWith, tap } from 'rxjs/operators';
/**
 * Progress statuses for any async operations, like loading, calculations, etc.
 * May be used to display load state without creating a lot of variables.
 */
export var PROGRESS_STATUSES;
(function (PROGRESS_STATUSES) {
    /** Display that process were not started yet. */
    PROGRESS_STATUSES["NOT_INITIALIZED"] = "not_initialized";
    /** Display that process started, but not finished yet. */
    PROGRESS_STATUSES["IN_PROGRESS"] = "in_progress";
    /** Display that process started, and finished successfully. */
    PROGRESS_STATUSES["SUCCEED"] = "finished";
    /** Display that process started, but were interrupted by unexpected error. */
    PROGRESS_STATUSES["INTERRUPTED"] = "interrupted";
})(PROGRESS_STATUSES || (PROGRESS_STATUSES = {}));
export class RtVirtualScrollDataSource extends DataSource {
    http;
    cd;
    defaultKeys = {
        data: null,
        totalCount: null,
        page: null,
    };
    _subscription = new Subscription();
    _subscriptionHttp = new Subscription();
    _collectionViewer$ = new BehaviorSubject({ start: null, end: null });
    _pageSize;
    _cachedData;
    _fetchedPages = new Set();
    _dataStream = new BehaviorSubject([]);
    request;
    isDefaultLength = true;
    _api;
    _params;
    _isRemoveEmptyParams = false;
    constructor(http, cd, pageSize, length = 0) {
        super();
        this.http = http;
        this.cd = cd;
        this._pageSize = pageSize;
        this._length = length;
    }
    _progressStatus = PROGRESS_STATUSES.NOT_INITIALIZED;
    get progressStatus() {
        return this._progressStatus;
    }
    _length = 100;
    get length() {
        return this._length;
    }
    connect(collectionViewer) {
        this._subscription.add(collectionViewer.viewChange.subscribe({ next: range => this._collectionViewer$.next(range) }));
        return this._dataStream;
    }
    disconnect() {
        this._subscription.unsubscribe();
        this._subscriptionHttp.unsubscribe();
    }
    setApi(api, params) {
        this._api = api;
        this._params = params;
        this._subscriptionHttp.unsubscribe();
        this._subscriptionHttp = new Subscription();
        this._fetchedPages.clear();
        this._cachedData = Array.from({ length: this._pageSize });
        this._dataStream.next(this._cachedData);
        this._collectionViewer$.next({ start: 0, end: 0 });
        this.request = this.http.get(api, { params: this._isRemoveEmptyParams ? this.removeEmptyParams(this._params) : this._params });
        return this;
    }
    isRemoveEmptyParams(value = true) {
        this._isRemoveEmptyParams = value;
        return this;
    }
    setDefaultKeys(data, totalCount, page) {
        this.defaultKeys.data = data;
        this.defaultKeys.totalCount = totalCount;
        this.defaultKeys.page = page;
        return this;
    }
    load() {
        this.isDefaultLength = true;
        this._subscriptionHttp.add(this._collectionViewer$.asObservable()
            .pipe(startWith({ start: 0, end: this._pageSize }), 
        // Calculate the page index for the given start/end range.
        mergeMap(range => {
            const startPage = this._getPageForIndex(range.start);
            const endPage = this._getPageForIndex(range.end - 1);
            // Generate an array of page numbers from startPage to endPage.
            const pagesArray = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
            // Use of to emit each page in the array one by one.
            return of(...pagesArray).pipe(
            // Map to the {page, range} object.
            map(page => ({ page, range })));
        }), 
        // Only if the page has changed and page is not exist in set.
        filter((data) => !this._fetchedPages.has(data.page)), 
        // Fetch the new page.
        tap(data => this._fetchPage(data.page)), map(data => ({ page: data.page, range: data.range })), distinctUntilChanged((prev, curr) => prev.page === curr.page), mergeMap(view => {
            const nextApi = this.getNextApi(view.page);
            if (!nextApi) {
                return of([null, null]);
            }
            this._api = nextApi;
            this.request = this.http.get(this._api, { params: this._isRemoveEmptyParams ? this.removeEmptyParams(this._params) : this._params });
            this._progressStatus = PROGRESS_STATUSES.IN_PROGRESS;
            this.cd.detectChanges();
            return combineLatest([
                this.request.pipe(map(data => ({
                    data: data[this.defaultKeys.data],
                    total: data[this.defaultKeys.totalCount],
                }))),
                of(view),
            ]);
        }), filter(([data]) => !!data))
            .subscribe({
            next: ([data, range]) => {
                this._length = data.total;
                this._progressStatus = PROGRESS_STATUSES.SUCCEED;
                if (this.isDefaultLength) {
                    this._cachedData = Array.from({ length: this._length });
                    this.isDefaultLength = false;
                }
                this._cachedData.splice(range.page * this._pageSize, this._pageSize, ...data.data);
                this._dataStream.next(this._cachedData);
                this.cd.detectChanges();
            },
            error: () => this._progressStatus = PROGRESS_STATUSES.INTERRUPTED,
        }));
    }
    getNextApi(page) {
        const existPage = this._api.includes(this.defaultKeys.page);
        let modifiedApi = this._api;
        if (page) {
            if (existPage) {
                const regex = new RegExp(`${this.defaultKeys.page}=\\d+`);
                modifiedApi = this._api.replace(regex, `${this.defaultKeys.page}=${page + 1}`);
            }
            else {
                this._params = { ...this._params, page: page + 1 };
            }
        }
        return modifiedApi;
    }
    removeEmptyParams(params) {
        if (!params) {
            return params;
        }
        return Object.fromEntries(Object.entries(params).filter(([, value]) => value !== null && value !== undefined && value !== ''));
    }
    _getPageForIndex(index) {
        return Math.floor(index / this._pageSize);
    }
    _fetchPage(page) {
        this._fetchedPages.add(page);
    }
}
//# sourceMappingURL=rt-virtual-scroll-data-source.js.map