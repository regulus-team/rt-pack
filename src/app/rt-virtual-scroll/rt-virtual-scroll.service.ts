import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BreedList} from './symbols';
import {Observable} from 'rxjs';

@Injectable()
export class RtVirtualScrollService {

    constructor(private http: HttpClient) {
    }

    getListData(api: string): Observable<BreedList> {

        return this.http.get<BreedList>(api);
    }
}
