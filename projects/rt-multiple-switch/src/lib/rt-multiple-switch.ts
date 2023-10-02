import {
  Directive,
  DoCheck,
  Host,
  Input,
  isDevMode,
  OnInit,
  Optional,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import {isEqual, partition} from 'lodash';

/**
 * The action to be applied to the view.
 */
interface RequiredAction {
  /** Defines whether the view should be inserted or removed. */
  action: 'insert' | 'remove' | 'clear';

  /** The key of the case to be inserted or removed; used for extraction related TemplateRef. */
  itemKey?: string;

  /** The index of the view to be inserted or removed. */
  index?: number;
}

@Directive({
  selector: '[rtMultipleSwitch]',
  standalone: true,
})
export class RtMultipleSwitchDirective implements DoCheck {
  /**
   * Stores the list of properties to be matched against the switch cases.
   * Safe value (always array of strings).
   */
  private providedProperties: string[] = [];

  /**
   * The number of directives.
   * Incremented on each case directive constructor call.
   */
  private caseCount = 0;

  /**
   * The number of directive TemplateRefs.
   * Incremented on each case directive `OnInit` call.
   * As the `OnInit` is called after the constructor call,
   * we can be sure that all the views are available when `caseCount` is equal to `viewCount`.
   */
  private viewCount = 0;

  /**
   * The relation between the case directive property and its template.
   */
  private availableTemplateRefs: Record<string, TemplateRef<Record<any, any>>> = {};

  /**
   * The list of keys of the currently rendered cases.
   */
  private currentlyRenderedCases: string[] = [];

  /**
   * Stores the last child view container.
   * Used to insert the view at the specified index.
   * As the `ViewContainerRef` methods insert elements on the same level, we need to store the last child view container.
   * Call the `insert` method on the [ngSwitch] view container actually places elements after it.
   * So take the last child, call `createEmbeddedView` on it, it will be inserted after the last child.
   * As all the children are inside the [ngSwitch] view container, the view will be inserted into [ngSwitch].
   */
  private lastChildViewContainer: ViewContainerRef;

  /**
   * Returns the list of properties to be matched against the switch cases.
   */
  get rtMultipleSwitch(): string[] {
    return this.providedProperties;
  }

  /**
   * Stores the list of properties to be matched against the switch cases.
   */
  @Input() set rtMultipleSwitch(propertyList: Array<string | number>) {
    // The property-template relation is stored as Object (each key is always string). So converted to string provided list.
    this.providedProperties = Array.isArray(propertyList) ? propertyList.map(property => String(property)) : [];
  }

  /**
   * Increments the `caseCount` value.
   */
  public addCase(): void {
    this.caseCount++;
  }

  /**
   * Adds the provided template to the `availableTemplateRefs` list.
   * Call the `updateEmbeddedView` method if all the views are available.
   */
  public addView(key: string, templateRef: TemplateRef<Record<any, any>>, viewContainerRef: ViewContainerRef): void {
    // Store the template in the `availableTemplateRefs` list.
    this.availableTemplateRefs[key] = templateRef;

    // Increment the `viewCount` value to see whether all template refs are received.
    this.viewCount++;

    // If all the views are available, then the current one is the last.
    if (this.caseCount === this.viewCount) {
      // Store the last child view container.
      this.lastChildViewContainer = viewContainerRef;

      // Update the view states.
      this.updateEmbeddedView();
    }
  }

  /**
   * Checks whether all the views are available and updates the view states if so.
   */
  ngDoCheck(): void {
    // If all the views are available, update the view states.
    if (this.caseCount === this.viewCount) {
      this.updateEmbeddedView();
    }
  }

  /**
   * Updates the view states by creating and removing the views.
   */
  private updateEmbeddedView(): void {
    // Split the provided properties into two arrays: the first one contains the keys of the templates that are available,
    // the second one contains the keys of the templates that are not available (not provided in [rtMultipleSwitchCase]).
    const [templateExists, templateNotProvided] = partition(this.rtMultipleSwitch, item =>
      Object.getOwnPropertyDescriptor(this.availableTemplateRefs, item),
    );

    // Notify developer if some templates are not provided.
    if (templateNotProvided.length && isDevMode()) {
      console.warn(
        `The templates for the provided keys: [${templateNotProvided.join(', ')}] are not available.` +
          `They will be skipped. Check whether the related [rtMultipleSwitchCase] directives are provided.`,
      );
    }

    // If the currently rendered cases are equal to the provided properties, do nothing.
    if (!isEqual(this.currentlyRenderedCases, this.rtMultipleSwitch)) {
      // Define the list of actions to be applied to the current view to get the expected view.
      const actions = this.defineTransformActions(this.currentlyRenderedCases, templateExists);

      // Apply the actions to the view.
      this.applyActions(actions);
    }
  }

  /**
   * Applies the provided actions to the view.
   */
  private applyActions(actions: RequiredAction[]): void {
    for (const action of actions) {
      if (action.action === 'insert') {
        // Add the view to the container at the specified index and store the case key in the `currentlyRenderedCases` array.
        this.lastChildViewContainer.createEmbeddedView(this.availableTemplateRefs[action.itemKey], null, action.index);
        this.currentlyRenderedCases.splice(action.index, 0, action.itemKey);
      } else if (action.action === 'remove') {
        // Remove the view from the container at the specified index and remove the case key from the `currentlyRenderedCases` array.
        this.lastChildViewContainer.remove(action.index);
        this.currentlyRenderedCases.splice(action.index, 1);
      } else {
        // Clear the view and the `currentlyRenderedCases` array.
        this.lastChildViewContainer.clear();
        this.currentlyRenderedCases = [];
      }
    }
  }

  /**
   * Calculates the simplified (substitution action is not included) Levenshtein distance between two arrays.
   * @see https://en.wikipedia.org/wiki/Levenshtein_distance
   */
  private simplifiedLevenshteinDistance(sourceArray: string[], targetArray: string[]): number[][] {
    const editDistance: number[][] = [];

    for (let i = 0; i <= sourceArray.length; i++) {
      editDistance[i] = [i];
    }

    for (let j = 0; j <= targetArray.length; j++) {
      editDistance[0][j] = j;
    }

    for (let i = 1; i <= sourceArray.length; i++) {
      for (let j = 1; j <= targetArray.length; j++) {
        if (sourceArray[i - 1] === targetArray[j - 1]) {
          editDistance[i][j] = editDistance[i - 1][j - 1];
        } else {
          editDistance[i][j] = Math.min(
            editDistance[i - 1][j] + 1, // Deletion
            editDistance[i][j - 1] + 1, // Insertion
          );
        }
      }
    }

    return editDistance;
  }

  /**
   * Defines the list of actions to be applied to the source array to get the target array.
   * Available actions: insert, remove.
   * Used to optimize the number of DOM manipulations.
   */
  private defineTransformActions(sourceArray: string[], targetArray: string[]): RequiredAction[] {
    const sourceArrayLength = sourceArray.length;
    if (!sourceArrayLength) {
      // If the source array is empty, all the items should be inserted.
      return targetArray.map((itemKey, index) => ({action: 'insert', itemKey, index}));
    }

    // Calculate the simplified Levenshtein distance between the source and target arrays.
    const differenceMap = this.simplifiedLevenshteinDistance(sourceArray, targetArray);
    const targetArrayLength = targetArray.length;

    // Extract the edit distance from the difference map.
    const editDistance: number = differenceMap[sourceArrayLength][targetArrayLength];

    // We may call `clear` to remove all elements instead of removing them one by one.
    // Calculate the cost of this operation, where 2 - cost of the clear operation, 1 - cost of the insert operation.
    const fullRemoveAndInsertCost = 2 + targetArrayLength;

    // If the cost of the clear operation is less than the edit distance, clear the view and insert all the items.
    if (editDistance > fullRemoveAndInsertCost) {
      return [{action: 'clear'}, ...targetArray.map((itemKey, index) => ({action: 'insert', itemKey, index} as RequiredAction))];
    }

    // Assign the indexes to start from the end of the arrays.
    let i = sourceArrayLength;
    let j = targetArrayLength;

    // The list of actions to be applied to the source array to get the target array.
    const actionsToApply: RequiredAction[] = [];

    while (i > 0 || j > 0) {
      if (i > 0 && differenceMap[i][j] === differenceMap[i - 1][j] + 1) {
        // Removal is cheaper than insertion: add the remove action.
        actionsToApply.push({action: 'remove', itemKey: sourceArray[i - 1], index: i - 1});
        i--;
      } else if (j > 0 && differenceMap[i][j] === differenceMap[i][j - 1] + 1) {
        // Insertion is cheaper than removal: add the insert action.
        actionsToApply.push({action: 'insert', itemKey: targetArray[j - 1], index: i});
        j--;
      } else {
        // The current items are equal: move to the previous items.
        i--;
        j--;
      }
    }

    return actionsToApply;
  }
}

@Directive({
  selector: '[rtMultipleSwitchCase]',
  standalone: true,
})
export class RtMultipleSwitchCaseDirective implements OnInit {
  /**
   * The value to be matched against the switch cases.
   * It will be stored as object key (converted to string), so restrict providing non-string values.
   */
  @Input() rtMultipleSwitchCase: string;

  constructor(
    private templateRef: TemplateRef<Record<any, any>>,
    private viewContainerRef: ViewContainerRef,
    @Optional() @Host() private ngSwitch: RtMultipleSwitchDirective,
  ) {
    if (!ngSwitch) {
      throw new Error(`[rtMultipleSwitchCase] must be used with a parent [rtMultipleSwitch] directive.`);
    } else {
      // Let the parent switch know about the new case.
      ngSwitch.addCase();
    }
  }

  ngOnInit(): void {
    // Save the template reference in the parent switch.
    this.ngSwitch.addView(this.rtMultipleSwitchCase, this.templateRef, this.viewContainerRef);
  }
}
