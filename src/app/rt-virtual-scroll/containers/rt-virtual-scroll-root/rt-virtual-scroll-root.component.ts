import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {
    RtVirtualScrollDataSource,
} from '../../../../../projects/rt-virtual-scroll/src/lib/rt-virtual-scroll-data-source';
import {Breed, BreedList} from '../../symbols';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-rt-virtual-scroll-root',
    templateUrl: './rt-virtual-scroll-root.component.html',
    styleUrls: ['./rt-virtual-scroll-root.component.scss'],
})
export class RtVirtualScrollRootComponent implements OnInit {

    loadingReadme$ = new BehaviorSubject<boolean>(true);
    readme = '';
    ds: RtVirtualScrollDataSource<Breed, BreedList>;

    constructor(private http: HttpClient, private cd: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.readMarkdownFile();

        this.ds = new RtVirtualScrollDataSource<Breed, BreedList>(this.http, 25);
        this.ds.setApi('https://catfact.ninja/breeds')
            .isRemoveEmptyParams()
            .setDefaultKeys('data', 'total', 'page')
            .load();
    }


    readMarkdownFile(): void {
        const fileReader = new FileReader();

        fileReader.onload = (e) => {
            this.loadingReadme$.next(false);
            this.readme = fileReader.result as string;
            this.cd.detectChanges();
        };

        const filePath = '/assets/rt-virtual-scroll/README.md';

        fetch(filePath)
            .then(response => response.text())
            .then(text => {
                const blob = new Blob([text], {type: 'text/plain'});

                fileReader.readAsText(blob);
            });
    }
}



