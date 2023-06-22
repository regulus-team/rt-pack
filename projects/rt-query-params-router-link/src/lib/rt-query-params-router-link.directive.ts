import {Directive, ElementRef, HostListener, Inject, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute, NavigationEnd, QueryParamsHandling, Router} from '@angular/router';
import {WINDOW} from 'rt-platform';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';

@Directive({
  selector: '[rtQueryParamsRouterLink]',
})
export class RtQueryParamsRouterLinkDirective implements OnInit, OnDestroy {
  @Input() link: string | string[];
  @Input() linkQueryParams: any;
  @Input() linkQueryParamsHandling: QueryParamsHandling = 'merge';
  @Input() linkIsActive = true;
  @Input() classActiveLink: string;


  currentLink = false;

  private subscription = new Subscription();

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject(WINDOW) private window: Window,
  ) {
  }

  @HostListener('click', ['$event'])
  onClick($event: MouseEvent): void {
    if (!this.linkIsActive) {
      return;
    }

    // Open link in new tab if clicked with ctrl or cmd.
    if ($event.ctrlKey || $event.metaKey) {
      $event.preventDefault();
      $event.stopPropagation();
      this.window.open(this.getStringifyUrl(), '_blank');
    } else {
      this.router.navigate(this.getLinkList(), {
        queryParams: this.linkQueryParams,
        queryParamsHandling: this.linkQueryParamsHandling,
      });
    }
  }

  ngOnInit(): void {
    if (this.router.url === this.getStringifyUrl()) {
      this.currentLink = true;
      this.renderer.addClass(this.el.nativeElement, this.classActiveLink);

    } else {
      this.currentLink = false;
      this.renderer.removeClass(this.el.nativeElement, this.classActiveLink);
    }

    this.subscription.add(
      this.router.events.pipe(filter((route): route is NavigationEnd => route instanceof NavigationEnd)).subscribe(v => {
        if (v.url === this.getStringifyUrl()) {
          this.currentLink = true;
          this.renderer.addClass(this.el.nativeElement, this.classActiveLink);
        } else {
          this.currentLink = false;
          this.renderer.removeClass(this.el.nativeElement, this.classActiveLink);
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private getLinkList(): string[] {
    if (!Array.isArray(this.link)) {
      return [this.link];
    }

    return this.link;
  }

  private getStringifyUrl(): string {
    const oldQueryParams = this.activatedRoute.snapshot.queryParams;
    const mergedQueryParams = {
      ...oldQueryParams,
      ...this.linkQueryParams,
    };
    let url: string = this.getLinkList().join('/');
    if (mergedQueryParams) {
      url += '?';

      for (const param of Object.keys(mergedQueryParams)) {
        if (typeof mergedQueryParams[param] === 'object') {
          for (const arr of mergedQueryParams[param]) {
            url += `${param}=${arr}&`;
          }
        } else {
          url += `${param}=${mergedQueryParams[param]}&`;
        }
      }
      url = url.slice(0, url.length - 1);
    }

    return url;
  }
}
