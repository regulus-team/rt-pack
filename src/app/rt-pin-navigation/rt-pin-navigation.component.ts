import {HttpClient} from '@angular/common/http';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MarkdownModule} from 'ngx-markdown';
import {RtPinNavigationDirective} from 'rt-pin-navigation';
import {BehaviorSubject} from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-rt-pin-navigation',
  templateUrl: './rt-pin-navigation.component.html',
  imports: [
    RtPinNavigationDirective,
    RtPinNavigationDirective,
    MarkdownModule,
  ],
  styleUrls: ['./rt-pin-navigation.component.scss'],
})
export class RtPinNavigationComponent implements OnInit {

  loadingReadme$ = new BehaviorSubject<boolean>(true);
  readme = '';


  constructor(private http: HttpClient, private cd: ChangeDetectorRef) {
  }


  ngOnInit(): void {
    this.readMarkdownFile();

  }

  readMarkdownFile() {
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      this.loadingReadme$.next(false);
      this.readme = fileReader.result as string;
      this.cd.detectChanges();
    };

    const filePath = '/assets/rt-pin-navigation/README.md';

    fetch(filePath)
      .then(response => response.text())
      .then(text => {
        const blob = new Blob([text], {type: 'text/plain'});

        fileReader.readAsText(blob);
      });
  }
}
