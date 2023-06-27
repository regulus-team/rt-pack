import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BehaviorSubject, of} from 'rxjs';
import {RtTableMovingChangedData} from '../../../../../projects/rt-table-moving/src/lib/symbols';

@Component({
  selector: 'app-rt-table-moving',
  templateUrl: './rt-table-moving.component.html',
  styleUrls: ['./rt-table-moving.component.scss'],
})
export class RtTableMovingComponent implements OnInit {
  loadingReadme$ = new BehaviorSubject<boolean>(true);
  readme = '';
  tableData$ = of({
    staticData: [
      {
        header: {title: 'Static', subTitle: 'items', width: 300, isRemovable: true},
        data: 'Static data 1',
        isEditable: true,
      },
      {header: {title: 'Static'}, data: 'Static data 1'},
      {header: {title: 'Static'}, data: 'Static data 2'},
    ],
    dynamicData:
      [
        {
          header: {title: 'Column 1', isRemovable: true},
          data: 'This is a very long text, to demonstrate rt-overflow-tooltip! You only need to move the cursor to see the text that does not fit in the cell.',
          isEditable: true,
        },
        {header: {title: 'Column 1', isRemovable: true}, data: 'Dynamic data 2'},
        {header: {title: 'Column 1'}, data: 'Dynamic data 3'},

        {header: {title: 'Column 2', isRemovable: true}, data: 'Dynamic data 4'},
        {header: {title: 'Column 2'}, data: 'Dynamic data 5'},
        {header: {title: 'Column 2'}, data: 'Dynamic data 6'},

        {header: {title: 'Column 3'}, data: 'Dynamic data 7'},
        {header: {title: 'Column 3'}, data: 'Dynamic data 8'},
        {header: {title: 'Column 3'}, data: 'Dynamic data 9'},
      ],
  });

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

    const filePath = '/assets/rt-table-moving/README.md';

    fetch(filePath)
      .then(response => response.text())
      .then(text => {
        const blob = new Blob([text], {type: 'text/plain'});

        fileReader.readAsText(blob);
      });
  }

  changedItems($event: RtTableMovingChangedData) {
    console.log($event);
  }

  endEdited($event: RtTableMovingChangedData) {
    console.log($event);
  }
}
