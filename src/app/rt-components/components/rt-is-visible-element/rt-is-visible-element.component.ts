import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

interface user {
  name: string;
}

@Component({
  selector: 'app-rt-is-visible-element',
  templateUrl: './rt-is-visible-element.component.html',
  styleUrls: ['./rt-is-visible-element.component.scss'],
})
export class RtIsVisibleElementComponent implements OnInit {
  loadingReadme$ = new BehaviorSubject<boolean>(true);
  readme = '';

  consoleDict = {};
  users: user[] = [
    {name: 'user1'},
    {name: 'user2'},
    {name: 'user3'},
    {name: 'user4'},
    {name: 'user5'},
    {name: 'user6'},
    {name: 'user7'},
    {name: 'user8'},
    {name: 'user9'},
    {name: 'user10'},
    {name: 'user11'},
    {name: 'user12'},
    {name: 'user13'},
    {name: 'user14'},
    {name: 'user15'},
    {name: 'user16'},
    {name: 'user17'},
    {name: 'user18'},
    {name: 'user19'},
    {name: 'user20'},
  ];

  isIntersecting($event: boolean, index: number) {
    this.consoleDict[index] = $event;
  }

  ngOnInit(): void {
    this.readMarkdownFile();
  }

  readMarkdownFile(): void {
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      this.loadingReadme$.next(false);
      this.readme = fileReader.result as string;
    };

    const filePath = '/assets/rt-is-visible-element/README.md';

    fetch(filePath)
      .then(response => response.text())
      .then(text => {
        const blob = new Blob([text], {type: 'text/plain'});

        fileReader.readAsText(blob);
      });
  }
}
