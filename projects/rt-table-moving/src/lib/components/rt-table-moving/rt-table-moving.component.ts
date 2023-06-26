import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {
  RtTableGroupedDataModel,
  RtTableMovingChangedData,
  RtTableMovingItemModel,
  RtTableMovingModel,
} from '../../symbols';


@Component({
  selector: 'rt-table-moving',
  templateUrl: './rt-table-moving.component.html',
  styleUrls: ['./rt-table-moving.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RtTableMovingComponent implements OnInit, OnDestroy {
  @Output() changedData: EventEmitter<RtTableMovingChangedData> = new EventEmitter<RtTableMovingChangedData>();
  @Output() endEditing: EventEmitter<RtTableMovingChangedData> = new EventEmitter<RtTableMovingChangedData>();

  public readonly singleItemInput = new FormControl();
  public itemOnEdit: number;
  public groupIndex: number;
  public groupOnEdit: 'static' | 'dynamic' | 'endEdited';
  public maxCountVisibleDynamicColumns = 0;

  /** Currently displayed first class number in the table. */
  public firstClassNumber = 1;

  /** Currently displayed last class number in the table. */
  public lastClassNumber = 4;

  public staticItems: RtTableGroupedDataModel[] = [];
  public dynamicData: RtTableGroupedDataModel[] = [];
  public columnsNumberInView = [1, 2, 3, 4];

  private subscription = new Subscription();

  @Input() set dynamicItemsOnPage(value: number) {
    if (this.dynamicData.length < value) {
      this.itemsOnPage = this.dynamicData.length;
    } else {
      this.itemsOnPage = value;
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

  @Input({required: true}) set data(value: RtTableMovingModel) {
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
          staticData[header.title].data.push({value: data, isEditable: item.isEditable});
        } else {
          staticData[header.title] = {header, data: [{value: data, isEditable: item.isEditable}]};
        }
      });

      this.staticItems = Object.values(staticData);
    }

    if (value?.dynamicData) {

      const dynamicData: any = {};
      value.dynamicData.forEach(item => {
        const header = item.header;
        const data = item.data;

        if (dynamicData[header.title]) {
          dynamicData[header.title].data.push({value: data, isEditable: item.isEditable});
        } else {
          dynamicData[header.title] = {header, data: [{value: data, isEditable: item.isEditable}]};
        }
      });

      this.dynamicData = Object.values(dynamicData);
      this.maxCountVisibleDynamicColumns = this.dynamicData.length;

      if (this.dynamicData?.length < this.itemsOnPage || !this._itemsOnPage) {
        this.itemsOnPage = this.dynamicData?.length || 0;
      }
    }
  }

  ngOnInit(): void {
    this.subscription.add(
      this.singleItemInput.valueChanges
        .pipe(
          map(form => [form, this.itemOnEdit, this.groupIndex, this.groupOnEdit]),
        )
        .subscribe(([input, itemId, groupIndex, groupType]) => {
          if (groupType === 'static') {
            this.staticItems[groupIndex].data[itemId].value = input;
          } else {
            this.dynamicData[groupIndex].data[itemId].value = input;
          }


          this.changedData.emit({
            fullData: {
              staticData: this.staticItems,
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  public updateClassesInView(): void {
    // Fill array with actual classes numbers.
    this.columnsNumberInView = Array.from({length: this.lastClassNumber - this.firstClassNumber + 1}, (v, k) =>
      k + this.firstClassNumber,
    );

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

    this.endEditing.emit({
      fullData: {
        staticData: this.staticItems,
        dynamicData: this.dynamicData,
      },
      changedData: {
        typeData: group,
        typeChange: 'edit',
        value: data.value,
        groupIndex,
        itemIndex: itemIndex,
      },
    });
    this.markItemForEdit(null, group, null, null);
  }

  public markItemForEdit(data: RtTableMovingItemModel, group: 'static' | 'dynamic' | 'endEdited', itemIndex: number, groupIndex: number): void {
    if (data && !data?.isEditable) {
      return;
    }

    this.groupOnEdit = group;
    this.itemOnEdit = itemIndex;
    this.groupIndex = groupIndex;
    this.singleItemInput.setValue(data?.value || '', {emitEvent: false});
  }

  deleteColumn(groupType: 'dynamic' | 'static', groupIndex: number): void {
    if (groupType === 'static') {
      this.staticItems.splice(groupIndex, 1);
    } else {
      this.dynamicData.splice(groupIndex, 1);
    }

    this.changedData.emit({
      fullData: {
        staticData: this.staticItems,
        dynamicData: this.dynamicData,
      },
      changedData: {
        typeData: groupType,
        typeChange: 'remove',
        groupIndex,
      },
    });
  }
}
