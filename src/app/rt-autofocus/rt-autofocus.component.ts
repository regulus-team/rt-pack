import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BehaviorSubject} from 'rxjs';
import {MarkdownModule} from 'ngx-markdown';

@Component({
  selector: 'app-rt-autofocus',
  standalone: true,
  imports: [CommonModule, MarkdownModule],
  templateUrl: './rt-autofocus.component.html',
  styleUrls: ['./rt-autofocus.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RtAutofocusComponent implements OnInit {
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

    const filePath = '/assets/rt-auto-focus/README.md';

    fetch(filePath)
        .then(response => response.text())
        .then(text => {
          const blob = new Blob([text], {type: 'text/plain'});

          fileReader.readAsText(blob);
        });
  }
}
