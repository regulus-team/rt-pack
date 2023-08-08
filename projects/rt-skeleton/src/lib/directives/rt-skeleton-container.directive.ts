import {Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2, TemplateRef, ViewContainerRef} from '@angular/core';
import {BehaviorSubject, distinctUntilChanged, filter, first, Subscription, switchMap} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {RtSkeletonService} from '../services/rt-skeleton.service';
import {addPlaceholderForRtSkeleton} from '../utils/rt-skeleton.utils';

@Directive({
  selector: '[rtSkeletonContainer]',
})
export class RtSkeletonContainerDirective implements OnInit, OnDestroy {
  @Input() iterations = 1;
  skeletonTemplate?: TemplateRef<any>;
  while$ = new BehaviorSubject<boolean>(true);

  public ngForTrigger$ = new BehaviorSubject<boolean>(false);
  public updateViewSkeletonFromPlaceholder$ = new BehaviorSubject<void>(null);

  private updateViewSkeleton$ = new BehaviorSubject<boolean>(false);
  private readonly subscription = new Subscription();

  constructor(private el: ElementRef, private renderer: Renderer2, private service: RtSkeletonService) {
  }

  private _uuid = Math.random().toString(36).substring(2) + Date.now().toString(36);

  get uuid(): string {
    return this._uuid;
  }

  @Input({required: true}) set while(value: boolean | null) {
    this.while$.next(!!value);

    if (!this.skeletonTemplate) {
      this.updateViewSkeleton$.next(!value);
    }
  }

  buildTemplate(viewContent: ViewContainerRef): void {
    if (this.skeletonTemplate) {
      viewContent.clear();
      for (let i = 0; i < this.iterations; i++) {
        const template = this.skeletonTemplate.createEmbeddedView({$implicit: null, index: i});

        template.rootNodes.forEach((node) => {
          this.applyDirectives(node);
          node.querySelectorAll('[rtSkeletonPlaceholder]').forEach((element: HTMLElement) => {
            this.renderer.setStyle(element, 'pointer-events', 'none');

            // Take the attributes from the template
            const width = element.getAttribute('widthskeleton');
            const height = element.getAttribute('heightskeleton');
            const radius = element.getAttribute('radiusplaceholder');
            const left = element.getAttribute('leftskeleton');
            addPlaceholderForRtSkeleton(
              element,
              this.renderer,
              radius || '5px',
              left || '0',
              width || '100%',
              height || '100%',
            );
          });

        });


        const elementRef = template.rootNodes[0];
        this.service.addContainerTemplates(this.uuid, elementRef);
      }
    }
  }

  showTemplate(): void {
    for (const el of this.service.getContainersTemplates(this.uuid)) {
      const element = this.el.nativeElement;
      this.renderer.appendChild(element, el);

      const containers = element.querySelectorAll('[rtSkeletonPlaceholderContainer]');
      containers.forEach((placeholder: HTMLElement) => {
        this.renderer.setStyle(placeholder, 'display', 'flex');
      });
    }
  }

  hideTemplate(): void {
    if (this.skeletonTemplate) {
      const containers = this.el.nativeElement.querySelectorAll('[rtSkeletonPlaceholderContainer]');
      containers.forEach((element: HTMLElement) => {
        this.renderer.setStyle(element, 'display', 'none');
      });

      const elements = this.el.nativeElement.querySelectorAll('[rtSkeletonSegmentTemplate]');
      elements.forEach((element: HTMLElement) => {
        element.remove();
      });
    }
  }


  applyDirectives(element: HTMLElement): void {
    this.renderer.setAttribute(element, 'rtSkeletonSegmentTemplate', '');
    element.querySelectorAll('[rtSkeletonPlaceholder]').forEach((placeholder) => {
      const margin = placeholder.getAttribute('marginskeleton');
      if (margin) {
        this.renderer.setStyle(placeholder, 'margin', margin);
      }
      this.renderer.setStyle(placeholder, 'position', 'relative');
    });
  }

  updateViewSkeleton(update: boolean): void {
    this.updateViewSkeleton$.next(update);
  }

  ngOnInit(): void {

    this.subscription.add(
      this.updateViewSkeletonFromPlaceholder$
        .pipe(
          debounceTime(0),
          switchMap(() => this.updateViewSkeleton$.pipe(distinctUntilChanged()))
        )

        .subscribe((v) => {
          this._updateViewSkeleton(v);
        }),
    );

  }

  ngOnDestroy(): void {
    this.service.removePlaceholderDirectivesAll(this.uuid);
    this.service.removeContainersTemplatesAll(this.uuid);
    this.subscription.unsubscribe();
  }


  private _updateViewSkeleton(update: boolean): void {
    if (!update) {
      for (const placeholder of this.service.getPlaceholderDirectives(this.uuid)) {
        placeholder.showSkeleton();
      }
      this.showTemplate();
    } else {
      for (const placeholder of this.service.getPlaceholderDirectives(this.uuid)) {
        placeholder.hideSkeleton();
      }
      this.hideTemplate();
    }
    this.ngForTrigger$.next(update);
  }


}
