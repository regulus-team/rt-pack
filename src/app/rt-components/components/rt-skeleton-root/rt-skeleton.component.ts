import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

import {BehaviorSubject, interval} from 'rxjs';
import {take} from 'rxjs/operators';

interface MockDataModel {
  name: {
    first_name: string;
  };
  age: number;
  address: string;
  phone: string;
}

@Component({
  selector: 'rt-skeleton',
  templateUrl: './rt-skeleton.component.html',
  styleUrls: ['./rt-skeleton.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RtSkeletonComponent implements OnInit {
  loadingReadme$ = new BehaviorSubject<boolean>(true);

  readme = '';
  items$: BehaviorSubject<MockDataModel[]> = new BehaviorSubject<MockDataModel[]>([]);
  item$: BehaviorSubject<MockDataModel> = new BehaviorSubject<MockDataModel>(null);
  inProgress$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  items: MockDataModel[] = [
    {
      address: '1234 Main St',
      age: 25,
      name: {
        first_name: 'John Smith',
      },
      phone: '555-555-5555',
    },
    {
      address: '57 Main St',
      age: 29,
      name: {
        first_name: 'Mary Smith',
      },
      phone: '777-777-7777',
    },
  ];


  ngOnInit(): void {
    this.readMarkdownFile();
    this.items$.next(this.items);
    this.item$.next(this.items[0]);

    interval(2000).pipe(take(1)).subscribe(() => {
      this.inProgress$.next(!this.inProgress$.value);
      this.items$.next(this.items);
      this.item$.next(this.items[0]);
    });
  }

  readMarkdownFile() {
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      this.loadingReadme$.next(false);
      this.readme = fileReader.result as string;
    };

    const filePath = '/assets/rt-skeleton/README.md';

    fetch(filePath)
      .then(response => response.text())
      .then(text => {
        const blob = new Blob([text], {type: 'text/plain'});

        fileReader.readAsText(blob);
      });
  }

}