import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MarkdownModule} from 'ngx-markdown';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-rt-multiple-switch',
  templateUrl: './rt-multiple-switch.component.html',
  styleUrls: ['./rt-multiple-switch.component.scss'],
  standalone: true,
  imports: [
    MarkdownModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RtMultipleSwitchComponent  implements OnInit {
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

    const filePath = '/assets/rt-multiple-switch/README.md';

    fetch(filePath)
        .then(response => response.text())
        .then(text => {
          const blob = new Blob([text], {type: 'text/plain'});

          fileReader.readAsText(blob);
        });
  }
}
