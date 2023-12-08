import {CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {CommonModule} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MarkdownModule} from 'ngx-markdown';
import {BehaviorSubject} from 'rxjs';
import {RtVirtualScrollDataSource} from '../../../projects/rt-virtual-scroll/src/lib/rt-virtual-scroll-data-source';
import {Breed, BreedList} from './symbols';

@Component({
  selector: 'app-rt-virtual-scroll',
  standalone: true,
  imports: [CommonModule, CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport, MarkdownModule, MatProgressSpinnerModule, MatProgressSpinnerModule],
  templateUrl: './rt-virtual-scroll.component.html',
  styleUrls: ['./rt-virtual-scroll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RtVirtualScrollComponent implements OnInit {

  loadingReadme$ = new BehaviorSubject<boolean>(true);
  readme = '';
  ds: RtVirtualScrollDataSource<Breed, BreedList>;

  constructor(private http: HttpClient, private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.readMarkdownFile();

    this.ds = new RtVirtualScrollDataSource<Breed, BreedList>(this.http, this.cd, 25);
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



