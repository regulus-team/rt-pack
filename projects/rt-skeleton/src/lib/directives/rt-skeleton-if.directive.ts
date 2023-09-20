import {
    Directive,
    EmbeddedViewRef,
    Input,
    OnDestroy,
    OnInit,
    TemplateRef,
    ViewContainerRef,
    ɵstringify as stringify,
} from '@angular/core';
import {RtSkeletonContainerDirective} from './rt-skeleton-container.directive';
import {distinctUntilChanged, Subscription, tap} from 'rxjs';


@Directive({
    selector: '[rtSkeletonIf]',
})
export class RtSkeletonIfDirective<T = unknown> implements OnInit, OnDestroy {
    private _context: RtSkeletonIfContext<T> = new RtSkeletonIfContext<T>();
    private _thenTemplateRef: TemplateRef<RtSkeletonIfContext<T>> | null = null;
    private _elseTemplateRef: TemplateRef<RtSkeletonIfContext<T>> | null = null;
    private _thenViewRef: EmbeddedViewRef<RtSkeletonIfContext<T>> | null = null;
    private _elseViewRef: EmbeddedViewRef<RtSkeletonIfContext<T>> | null = null;
    private subscription = new Subscription();
    private subscriptionTrigger: Subscription;

    constructor(
        private templateRef: TemplateRef<RtSkeletonIfContext<T>>,
        private viewContainer: ViewContainerRef,
        private container: RtSkeletonContainerDirective,
    ) {
        this._thenTemplateRef = templateRef;
    }


    @Input() set rtSkeletonIf(condition: T) {
        this._context.$implicit = this._context.rtSkeletonIf = condition;

        if (this.subscriptionTrigger) {
            this.subscriptionTrigger.unsubscribe();
            this.subscriptionTrigger = null;
        }

        this.subscriptionTrigger = this.container.ngForTrigger$.pipe(distinctUntilChanged()).subscribe((show) => {
            if (!!condition) {
                this._updateView(show);
            } else if (show) {
                this.viewContainer.clear();
                if (this._elseTemplateRef) {

                    for (const placeholder of this.container.service.getPlaceholderDirectives(this.container.uuid)) {
                        placeholder.hideSkeleton();
                    }
                    this.container.hideTemplate();
                    this._elseViewRef = this.viewContainer.createEmbeddedView(this._elseTemplateRef, this._context);
                }
            }
        });

    }

    /**
     * A template to show if the condition expression evaluates to true.
     */
    @Input()
    set rtSkeletonIfThen(templateRef: TemplateRef<RtSkeletonIfContext<T>> | null) {
        assertTemplate('rtSkeletonIfThen', templateRef);
        this._thenTemplateRef = templateRef;
        this._thenViewRef = null;  // clear previous view if any.
        this._updateView(false);
    }

    /**
     * A template to show if the condition expression evaluates to false.
     */
    @Input()
    set rtSkeletonIfElse(templateRef: TemplateRef<RtSkeletonIfContext<T>> | null) {
        assertTemplate('rtSkeletonIfElse', templateRef);
        this._elseTemplateRef = templateRef;
        this._elseViewRef = null;  // clear previous view if any.


    }

    ngOnInit(): void {
        if (this.container) {
            this.container.skeletonTemplate = this.templateRef;
            this.container.buildTemplate(this.viewContainer);
        }

        this.subscription.add(
            this.container.while$
                .pipe(
                    tap((whileValue: boolean) => this.container.updateViewSkeleton(!whileValue)),
                ).subscribe(),
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    private _updateView(show: boolean): void {

        if (this._context.$implicit && show) {
            if (!this._thenViewRef) {
                this.viewContainer.clear();
                this._elseViewRef = null;
                if (this._thenTemplateRef) {
                    this._thenViewRef =
                        this.viewContainer.createEmbeddedView(this._thenTemplateRef, this._context);
                }
            }
        } else {
            if (!this._elseViewRef) {
                this.viewContainer.clear();
                this._thenViewRef = null;
            }

        }
    }
}

export class RtSkeletonIfContext<T = unknown> {
    public $implicit: T = null!;
    public rtSkeletonIf: T = null!;
}


function assertTemplate(property: string, templateRef: TemplateRef<any> | null): void {
    const isTemplateRefOrNull = !!(!templateRef || templateRef.createEmbeddedView);
    if (!isTemplateRefOrNull) {
        throw new Error(`${property} must be a TemplateRef, but received '${stringify(templateRef)}'.`);
    }
}
