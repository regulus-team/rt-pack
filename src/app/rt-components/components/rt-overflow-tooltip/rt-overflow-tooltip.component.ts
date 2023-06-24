import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-rt-overflow-tooltip',
  templateUrl: './rt-overflow-tooltip.component.html',
  styleUrls: ['./rt-overflow-tooltip.component.scss']
})
export class RtOverflowTooltipComponent implements OnInit {
  loadingReadme$ = new BehaviorSubject<boolean>(true);
  readme = '';



  ngOnInit(): void {
    this.readMarkdownFile();
  }

  readMarkdownFile(): void {
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      this.loadingReadme$.next(false);
      this.readme = fileReader.result as string;
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
