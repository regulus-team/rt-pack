import {ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DateTime} from 'luxon';
import {RtCarouselService} from 'rt-tab-carousel';
import {BehaviorSubject, combineLatest, Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

/**
 * Describes interface for mocked like a backend data.
 */
interface LikeAvailableClasses {
  /** Unique class identifier. */
  id: string;

  /** Date of the class. */
  date: Date;
}

/**
 * Describes interface for displaying a date picker for a classroom.
 */
export interface DateNavigationInfo {
  /** The type of date navigation item. */
  type: 'caption' | 'date';

  /** The date to display. */
  date: Date;

  /** Related calendar event ID. */
  id?: string;
}

@Component({
  selector: 'rt-tab-carousel-directive-example',
  templateUrl: './rt-carousel-root.component.html',
  styleUrls: ['./rt-carousel-root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RtCarouselRootComponent implements OnInit {
  @ViewChild('dateNav') dateNav: ElementRef<HTMLElement>;

  loadingReadme$ = new BehaviorSubject<boolean>(true);
  readme = '';


  public dateLastMonth$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public currentYear$: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  public navigationItems$: Observable<DateNavigationInfo[]>;
  private readonly subscription = new Subscription();
  private availableDates$: BehaviorSubject<LikeAvailableClasses[]> = new BehaviorSubject([
    {id: '3', date: DateTime.fromJSDate(new Date()).plus({days: 365}).toJSDate()},
    {id: '4', date: DateTime.fromJSDate(new Date()).plus({days: 400}).toJSDate()},
    {id: '5', date: DateTime.fromJSDate(new Date()).plus({days: 430}).toJSDate()},
    {id: '6', date: DateTime.fromJSDate(new Date()).plus({days: 550}).toJSDate()},
    {id: '7', date: DateTime.fromJSDate(new Date()).plus({days: 700}).toJSDate()},
    {id: '8', date: DateTime.fromJSDate(new Date()).plus({days: 740}).toJSDate()},
    {id: '9', date: DateTime.fromJSDate(new Date()).plus({days: 800}).toJSDate()},
    {id: '10', date: DateTime.fromJSDate(new Date()).plus({days: 900}).toJSDate()},
    {id: '11', date: DateTime.fromJSDate(new Date()).plus({days: 930}).toJSDate()},
    {id: '12', date: DateTime.fromJSDate(new Date()).plus({days: 1000}).toJSDate()},
    {id: '13', date: DateTime.fromJSDate(new Date()).plus({days: 1010}).toJSDate()},
    {id: '14', date: DateTime.fromJSDate(new Date()).plus({days: 1100}).toJSDate()},
    {id: '15', date: DateTime.fromJSDate(new Date()).plus({days: 1120}).toJSDate()},
    {id: '16', date: DateTime.fromJSDate(new Date()).plus({days: 1130}).toJSDate()},
    {id: '17', date: DateTime.fromJSDate(new Date()).plus({days: 1200}).toJSDate()},
    {id: '18', date: DateTime.fromJSDate(new Date()).plus({days: 1300}).toJSDate()},
    {id: '19', date: DateTime.fromJSDate(new Date()).plus({days: 1340}).toJSDate()},
    {id: '20', date: DateTime.fromJSDate(new Date()).plus({days: 1350}).toJSDate()},
    {id: '21', date: DateTime.fromJSDate(new Date()).plus({days: 1400}).toJSDate()},
    {id: '22', date: DateTime.fromJSDate(new Date()).plus({days: 1450}).toJSDate()},
    {id: '23', date: DateTime.fromJSDate(new Date()).plus({days: 1500}).toJSDate()},
    {id: '24', date: DateTime.fromJSDate(new Date()).plus({days: 1553}).toJSDate()},
    {id: '25', date: DateTime.fromJSDate(new Date()).plus({days: 1599}).toJSDate()},
  ]);

  constructor(public rtCarouselService: RtCarouselService) {
  }

  ngOnInit(): void {
    this.readMarkdownFile();
    this.navigationItems$ = this.availableDates$.pipe(
      // Sort dates from oldest to newest.
      map(dates => dates.sort((a, b) => a.date.getTime() - b.date.getTime())),

      // Add caption before each month group.
      map(availableDates => {
        const dateNavigationInfo: DateNavigationInfo[] = [];
        let previousMonth = -1;
        for (const classDate of availableDates) {
          if (previousMonth !== classDate.date.getMonth()) {
            previousMonth = classDate.date.getMonth();
            dateNavigationInfo.push({
              type: 'caption',
              date: classDate.date,
            });
          }
          dateNavigationInfo.push({
            type: 'date',
            date: classDate.date,
            id: classDate.id,
          });
        }
        return dateNavigationInfo;
      }),
    );

    this.subscription.add(
      combineLatest([this.rtCarouselService.lastVisibleIndex('dates-carousel'), this.navigationItems$]).subscribe({
        next: ([carousel, items]) => {
          const item = items[carousel];
          if (item) {
            this.dateLastMonth$.next(item.date.toLocaleString('en', {month: 'short'}));
            this.currentYear$.next(item.date.getFullYear());
          }
        },
      }),
    );
  }

  trackById(index: number, item: DateNavigationInfo): string {
    return item.id;
  }

  addTab(): void {
    const dates = this.availableDates$.value;
    this.availableDates$.next([
      ...this.availableDates$.value,
      {
        id: dates[dates.length - 1].id + 1,
        date: DateTime.fromJSDate(dates[dates.length - 1].date)
          .plus({days: dates.length})
          .toJSDate(),
      },
    ]);
  }


  setScrollStep(value) {
    this.rtCarouselService.setScrollStep('dates-carousel', +value);
  }

  readMarkdownFile() {
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      this.loadingReadme$.next(false);
      this.readme = fileReader.result as string;
    };

    const filePath = '/assets/rt-tab-carousel/README.md';

    fetch(filePath)
      .then(response => response.text())
      .then(text => {
        const blob = new Blob([text], {type: 'text/plain'});

        fileReader.readAsText(blob);
      });
  }
}
