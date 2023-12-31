import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MarkdownModule} from 'ngx-markdown';
import {BehaviorSubject} from 'rxjs';
import {RtOverflowTooltipModule} from 'rt-overflow-tooltip';

@Component({
  selector: 'app-rt-overflow-tooltip',
  standalone: true,
  imports: [CommonModule, MarkdownModule, RtOverflowTooltipModule],
  templateUrl: './rt-overflow-tooltip.component.html',
  styleUrls: ['./rt-overflow-tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RtOverflowTooltipComponent implements OnInit {
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

    const filePath = '/assets/rt-overflow-tooltip/README.md';

    fetch(filePath)
        .then(response => response.text())
        .then(text => {
          const blob = new Blob([text], {type: 'text/plain'});

          fileReader.readAsText(blob);
        });
  }
}
