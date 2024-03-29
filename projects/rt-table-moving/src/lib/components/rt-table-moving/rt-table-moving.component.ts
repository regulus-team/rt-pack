import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
}                                                                       from '@angular/core';
import { FormControl }                                                  from '@angular/forms';
import { BehaviorSubject, combineLatest, startWith, Subscription, tap } from 'rxjs';
import { map }                                                          from 'rxjs/operators';
import { FADE_IN, FADE_OUT }                                            from '../../animations';
import {
  RtTableGroupedDataModel,
  RtTableMovingChangedData,
  RtTableMovingItemModel,
  RtTableMovingModel,
  RtTableSelectedData,
}                                                                       from '../../symbols';


@Component({
  selector: 'rt-table-moving',
  templateUrl: './rt-table-moving.component.html',
  styleUrls: ['./rt-table-moving.component.scss'],
  animations: [FADE_IN, FADE_OUT],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RtTableMovingComponent implements OnInit, OnDestroy, AfterViewInit {
  @Output() changedData: EventEmitter<RtTableMovingChangedData> = new EventEmitter<RtTableMovingChangedData>();
  @Output() endEditing: EventEmitter<RtTableMovingChangedData> = new EventEmitter<RtTableMovingChangedData>();
  @Output() isValid: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() isClick: EventEmitter<RtTableSelectedData> = new EventEmitter();

  @Input() hideControls = false;
  @Input() matTooltipClass = [];
  @Input() isSyncHeightColumns = false;

  @ViewChildren('dynamicColumns') dynamicColumns: QueryList<ElementRef>;
  @ViewChildren('staticColumns') staticColumns: QueryList<ElementRef>;

  resize$ = new BehaviorSubject(null);
  public readonly singleItemInput = new FormControl();
  public heightColumns: number[] = [];
  public itemOnEdit: number;
  public groupIndex: number;
  public groupOnEdit: 'static' | 'dynamic' | 'endEdited';
  public maxCountVisibleDynamicColumns = 0;
  /** Currently displayed first class number in the table. */
  public firstClassNumber = 1;
  /** Currently displayed last class number in the table. */
  public lastClassNumber = 4;
  public staticData: RtTableGroupedDataModel[] = [];
  public dynamicData: RtTableGroupedDataModel[] = [];
  public columnsNumberInView = [1, 2, 3, 4];
  private subscription = new Subscription();

  constructor(private cd: ChangeDetectorRef) {
    if (this.autoHideControls === undefined) {
      this.autoHideControls = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.resize$.next(event);
  }

  private _autoHideControls: boolean;

  get autoHideControls(): boolean {
    return this._autoHideControls;
  }

  @Input() set autoHideControls(value: boolean) {
    if (value) {
      this.hideControls = true;
    }
    this._autoHideControls = value;
  }

  private _dynamicItemsOnPage: number;

  @Input() set dynamicItemsOnPage(value: number) {
    this._dynamicItemsOnPage = value;
    this.maxCountVisibleDynamicColumns = this.dynamicData.length;
    if (this.dynamicData.length < value) {
      this.itemsOnPage = this.dynamicData.length;
    } else {
      this.itemsOnPage = value;
    }
  }

  private _data: RtTableMovingModel;

  @Input({required: true}) set data(value: RtTableMovingModel) {
    this._data = value;
    this.itemsOnPage = this._dynamicItemsOnPage;
    if (!value) {
      return;
    }

    if (!value?.dynamicData) {
      this.itemsOnPage = 0;
    }


    if (value.staticData) {
      const staticData: any = {};
      value.staticData.forEach(item => {
        const header = item.header;
        const data = item.data;

        if (staticData[header.title]) {
          staticData[header.title].data.push({
            value: data,
            isEditable: item.isEditable,
            validators: item.validators,
            errorMessages: item.errorMessages,
            whiteSpace: item.whiteSpace || 'nowrap',
            isClickable: item.isClickable || item.isEditable,
            tooltip: item.tooltip,
          });
        } else {
          staticData[header.title] = {
            header,
            data: [{
              value: data,
              isEditable: item.isEditable,
              validators: item.validators,
              errorMessages: item.errorMessages,
              whiteSpace: item.whiteSpace || 'nowrap',
              isClickable: item.isClickable || item.isEditable,
              tooltip: item.tooltip,
            }],
          };
        }
      });

      this.staticData = Object.values(staticData);
    }

    if (value?.dynamicData) {

      const dynamicData: any = {};
      value.dynamicData.forEach(item => {
        const header = item.header;
        const data = item.data;

        if (dynamicData[header.title]) {
          dynamicData[header.title].data.push({
            value: data,
            isEditable: item.isEditable,
            validators: item.validators,
            errorMessages: item.errorMessages,
            whiteSpace: item.whiteSpace || 'nowrap',
            isClickable: item.isClickable || item.isEditable,
            tooltip: item.tooltip,
          });
        } else {
          dynamicData[header.title] = {
            header,
            data: [{
              value: data,
              isEditable: item.isEditable,
              validators: item.validators,
              errorMessages: item.errorMessages,
              whiteSpace: item.whiteSpace || 'nowrap',
              isClickable: item.isClickable || item.isEditable,
              tooltip: item.tooltip,
            }],
          };
        }
      });

      this.dynamicData = Object.values(dynamicData);
      this.maxCountVisibleDynamicColumns = this.dynamicData.length;

      if (this.dynamicData?.length < this.itemsOnPage || !this._itemsOnPage) {
        this.itemsOnPage = this.dynamicData?.length || 0;
      }
    }

  }

  /** Number of classes that should be displayed on page (defines by window width). */
  private _itemsOnPage;

  /** Provide number of classes that should be displayed on page. */
  get itemsOnPage(): number {
    return this._itemsOnPage;
  }

  /** Calculate number of classes that should be displayed on page. */
  set itemsOnPage(itemsNum: number) {
    this._itemsOnPage = itemsNum;
    // Current first item number could be kept as it won't exceed the limit.
    if (this.firstClassNumber + itemsNum - 1 < this.maxCountVisibleDynamicColumns) {
      this.lastClassNumber = this.firstClassNumber + itemsNum - 1;
      // Number of classes is too small to even fill the table => display all columns from the beginning.
    } else if (itemsNum > this.maxCountVisibleDynamicColumns) {
      this.firstClassNumber = 1;
      this.lastClassNumber = itemsNum;
      // All items can not be displayed, as well as first number can not be kept => shift first number back.
    } else {
      this.lastClassNumber = this.maxCountVisibleDynamicColumns;
      this.firstClassNumber = this.lastClassNumber - itemsNum + 1;
    }

    // Update classes in current view.
    this.updateClassesInView();
  }

  trackByFn(index: number, item: RtTableGroupedDataModel['data']): string {
    return `${index}-${this.lastClassNumber}`;
  }

  ngOnInit(): void {
    this.subscription.add(
      this.singleItemInput.valueChanges
          .pipe(
            map(form => [form, this.itemOnEdit, this.groupIndex, this.groupOnEdit]),
          )
          .subscribe(([input, itemId, groupIndex, groupType]) => {
            if (groupType === 'static') {
              this.staticData[groupIndex].data[itemId].value = input;
              if (this.singleItemInput.errors) {
                const errorName = Object.keys(this.singleItemInput.errors)[0];
                this.staticData[groupIndex]
                  .data[itemId].currentValidationMessage = this.staticData[groupIndex].data[itemId].errorMessages[errorName];
              } else {
                this.staticData[groupIndex]
                  .data[itemId].currentValidationMessage = '';
              }
            } else {
              this.dynamicData[groupIndex].data[itemId].value = input;
              if (this.singleItemInput.errors) {
                const errorName = Object.keys(this.singleItemInput.errors)[0];
                this.dynamicData[groupIndex]
                  .data[itemId].currentValidationMessage = this.dynamicData[groupIndex].data[itemId].errorMessages[errorName];
              } else {
                this.dynamicData[groupIndex]
                  .data[itemId].currentValidationMessage = '';
              }

            }


            this.changedData.emit({
              fullData: {
                staticData: this.staticData,
                dynamicData: this.dynamicData,
              },
              changedData: {
                typeData: groupType,
                typeChange: 'edit',
                value: input,
                groupIndex,
                itemIndex: itemId,
              },
            });
          }),
    );
  }

  public ngAfterViewInit() {
    this.syncHeightColumns();
  }

  syncHeightColumns(): void {


    if (this.isSyncHeightColumns) {

      this.subscription.add(
        combineLatest([this.dynamicColumns.changes, this.staticColumns.changes, this.resize$])
          .pipe(
            startWith([this.dynamicColumns, this.staticColumns]),
            tap(() => {
              this.heightColumns = [];
              this.cd.detectChanges();
            }),
          )
          .subscribe(() => {
            const tempHeights: number[][] = [];

            this.staticColumns.forEach((item) => {
              const itemIndex = +item.nativeElement.attributes.itemIndex.value;
              if (!tempHeights[itemIndex]) {
                tempHeights[itemIndex] = [];
              }
              tempHeights[itemIndex].push(item.nativeElement.offsetHeight);
            });

            this.dynamicColumns.forEach((item) => {
              const itemIndex = +item.nativeElement.attributes.itemIndex.value;
              if (!tempHeights[itemIndex]) {
                tempHeights[itemIndex] = [];
              }
              tempHeights[itemIndex].push(item.nativeElement.offsetHeight);
            });


            for (let i = 0; i < tempHeights.length; i++) {
              if (tempHeights[i]) {
                let maxNumber = Number.MIN_VALUE;
                tempHeights[i].forEach((height) => {
                  if (height > maxNumber) {
                    maxNumber = height;
                  }
                });
                this.heightColumns[i] = maxNumber;
              }
            }

            this.cd.detectChanges();

          }),
      );

    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  public updateClassesInView(): void {
    // Fill array with actual classes numbers.
    this.columnsNumberInView = Array.from({length: this.lastClassNumber - this.firstClassNumber + 1}, (v, k) =>
      k + this.firstClassNumber,
    );

    if (this.autoHideControls && this.firstClassNumber === 1) {
      this.hideControls = this.lastClassNumber >= this.maxCountVisibleDynamicColumns;
    }
  }

  public seeNextPart(): void {
    this.firstClassNumber = this.firstClassNumber + 1;
    this.lastClassNumber = this.firstClassNumber + this.itemsOnPage - 1;
    // Update classes in current view.
    this.updateClassesInView();
  }

  /**
   * Shift classes view to left by one item.
   */
  public seePreviousPart(): void {
    this.firstClassNumber = this.firstClassNumber - 1;
    this.lastClassNumber = this.firstClassNumber + this.itemsOnPage - 1;

    // Update classes in current view.
    this.updateClassesInView();
  }

  public blurInput(data: RtTableMovingItemModel, group: 'static' | 'dynamic', itemIndex: number, groupIndex: number): void {
    this.markItemForEdit(null, group, null, null);

    this.endEditing.emit({
      fullData: {
        staticData: this.staticData,
        dynamicData: this.dynamicData,
      },
      changedData: {
        typeData: group,
        typeChange: 'edit',
        value: data.value,
        groupIndex,
        itemIndex,
      },
    });


    this.isValid.next(this.isValidTable());

  }

  public markItemForEdit(data: RtTableMovingItemModel, group: 'static' | 'dynamic', itemIndex: number, groupIndex: number): void {
    if (!data?.isClickable) {
      return;
    }
    this.isClick.emit({group, itemIndex, groupIndex, data});

    if (data && !data?.isEditable) {
      return;
    }

    this.groupOnEdit = group;
    this.itemOnEdit = itemIndex;
    this.groupIndex = groupIndex;
    this.singleItemInput.setValidators(data?.validators || []);
    this.singleItemInput.setValue(data?.value || '', {emitEvent: false});


    if (this.singleItemInput.errors) {
      const errorName = Object.keys(this.singleItemInput.errors)[0];

      if (group === 'static') {
        this.staticData[groupIndex].data[itemIndex].currentValidationMessage = this.staticData[groupIndex].data[itemIndex].errorMessages[errorName];
      } else {
        this.dynamicData[groupIndex].data[itemIndex].currentValidationMessage = this.dynamicData[groupIndex].data[itemIndex].errorMessages[errorName];
      }
    }
  }

  deleteColumn(groupType: 'dynamic' | 'static', groupIndex: number): void {
    if (groupType === 'static') {
      this.staticData.splice(groupIndex, 1);
    } else {
      this.dynamicData.splice(groupIndex, 1);
    }

    this.changedData.emit({
      fullData: {
        staticData: this.staticData,
        dynamicData: this.dynamicData,
      },
      changedData: {
        typeData: groupType,
        typeChange: 'remove',
        groupIndex,
      },
    });

    this.dynamicItemsOnPage = this._dynamicItemsOnPage;
  }

  private isValidTable(): boolean {
    return this.staticData.every(group => group.data.every(item => !item.currentValidationMessage))
      && this.dynamicData.every(group => group.data.every(item => !item.currentValidationMessage));
  }


}
