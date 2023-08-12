import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-rt-query-params-router-link',
    templateUrl: './rt-query-params-router-link.component.html',
    styleUrls: ['./rt-query-params-router-link.component.scss'],
})
export class RtQueryParamsRouterLinkComponent implements OnInit {
    loadingReadme$ = new BehaviorSubject<boolean>(true);
    readme = '';

    constructor(private cd: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.readMarkdownFile();
    }

    readMarkdownFile(): void {
        const fileReader = new FileReader();

        fileReader.onload = (e) => {
            this.loadingReadme$.next(false);
            this.readme = fileReader.result as string;
            this.cd.detectChanges();
        };

        const filePath = '/assets/rt-query-params-router-link/README.md';

        fetch(filePath)
            .then(response => response.text())
            .then(text => {
                const blob = new Blob([text], {type: 'text/plain'});

                fileReader.readAsText(blob);
            });
    }

}
