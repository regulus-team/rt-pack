import {AriaDescriber, FocusMonitor} from '@angular/cdk/a11y';
import {Directionality} from '@angular/cdk/bidi';
import {Overlay, ScrollDispatcher} from '@angular/cdk/overlay';
import {Platform} from '@angular/cdk/platform';
import {DOCUMENT} from '@angular/common';
import {
  Directive,
  ElementRef,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Optional,
  ViewContainerRef,
} from '@angular/core';
import {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MAT_TOOLTIP_SCROLL_STRATEGY,
  MatTooltip,
  MatTooltipDefaultOptions,
} from '@angular/material/tooltip';
import {CSSFont, RtDefineStrokeWidthService} from 'rt-define-stroke-width';
import {WINDOW} from 'rt-platform';
import {Observable, Subscription} from 'rxjs';

@Directive({
  selector: '[rtOverflowTooltip]',
})
export class RtOverflowTooltipDirective extends MatTooltip implements OnInit, OnDestroy {
  /** The message to be displayed in the tooltip if the element has not enough space. */
  @Input() rtOverflowTooltip: string;
  /** Host element of the directive. */
  protected hostElement: HTMLElement;
  /** Text content of the host element. */
  protected hostElementText: string;
  /** CSS rules applied to the host element. */
  protected computedStyle: CSSStyleDeclaration;
  /** Font CSS style rule applied to the host element. */
  protected fontString: CSSFont;
  /** Letter spacing CSS style rule applied to the host element. */
  protected letterSpacing: string;
  protected paddingLeft: string;
  protected paddingRight: string;
  protected borderLeft: string;
  protected borderRight: string;
  /** Component subscriptions. Will be unsubscribed on destroy. */
  private readonly subscription = new Subscription();
  /** Global window object. */
  private window: Window;

  constructor(
    _overlay: Overlay,
    _elementRef: ElementRef,
    _scrollDispatcher: ScrollDispatcher,
    _viewContainerRef: ViewContainerRef,
    _ngZone: NgZone,
    _platform: Platform,
    _ariaDescriber: AriaDescriber,
    _focusMonitor: FocusMonitor,
    @Inject(MAT_TOOLTIP_SCROLL_STRATEGY) _scrollStrategy: unknown,
    @Optional() _dir: Directionality,
    @Optional() @Inject(MAT_TOOLTIP_DEFAULT_OPTIONS)
      _defaultOptions: MatTooltipDefaultOptions,
    @Optional() @Inject(DOCUMENT) _document: Document,
    private rtDefineStrokeWidth: RtDefineStrokeWidthService,
    @Optional() @Inject(WINDOW) _window: Window,
  ) {
    super(
      _overlay,
      _elementRef,
      _scrollDispatcher,
      _viewContainerRef,
      _ngZone,
      _platform,
      _ariaDescriber,
      _focusMonitor,
      _scrollStrategy,
      _dir,
      _defaultOptions,
      _document,
    );
    // Assign host element.
    this.hostElement = _elementRef.nativeElement;

    // Assign global window object.
    this.window = _window;
  }

  ngOnInit(): void {

    // Apply provided tooltip text to the element.
    this.message = this.rtOverflowTooltip;

    // Subscribe to resize event on the host element and update tooltip display logic.
    this.subscription.add(
      this.observeHostElementResize().subscribe(() => this.updateElementDisplayLogic()),
    );
  }

  public updateElementDisplayLogic(): void {
    this.updateElementProperties();

    // Calculate the width of the spaces with the applied letter spacing rule.
    const letterSpacingAmendment = this.hostElement.innerText.length * parseFloat(this.letterSpacing);

    // Calculate the width of the text content with the applied font rule without actual rendering it.
    const calculatedStringWidth = this.rtDefineStrokeWidth.getTextWidth(this.hostElement.innerText, this.fontString);
    const calculatedContentWidth = calculatedStringWidth + letterSpacingAmendment;


    const area = parseFloat(this.borderLeft) + parseFloat(this.borderRight) + parseFloat(this.paddingLeft) + parseFloat(this.paddingRight);

    // Calculate the actual width of the host element.
    const actualContentWidth = this.hostElement.getBoundingClientRect().width - 3 - area;

    // Disable tooltip if the text content is not overflowing (all the content is on the page, so no need to show tooltip).
    this.disabled = calculatedContentWidth <= actualContentWidth;

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Observe resize event on the provided element.
   */
  protected observeHostElementResize(): Observable<ResizeObserverEntry[]> {
    return new Observable(subscriber => {
      const resizeObserver = new ResizeObserver(entries => {
        subscriber.next(entries);
      });

      resizeObserver.observe(this.hostElement);
      return () => {
        resizeObserver.unobserve(this.hostElement);
      };
    });
  }

  /**
   * Update local variables with the current state of the host element.
   */
  protected updateElementProperties(): void {
    this.hostElementText = this.hostElement.innerText;
    this.computedStyle = this.window.getComputedStyle(this.hostElement);
    this.fontString = this.computedStyle.getPropertyValue('font');
    this.letterSpacing = this.computedStyle.getPropertyValue('letter-spacing');
    this.paddingLeft = this.computedStyle.getPropertyValue('padding-left');
    this.paddingRight = this.computedStyle.getPropertyValue('padding-right');
    this.borderLeft = this.computedStyle.getPropertyValue('border-left');
    this.borderRight = this.computedStyle.getPropertyValue('border-right');
  }
}
