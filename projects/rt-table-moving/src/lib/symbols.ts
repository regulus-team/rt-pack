import {ValidatorFn} from '@angular/forms';
import {Modify} from './types';

export interface RtTableMovingModel {
  dynamicData?: RtTableMovingDataModel[];
  staticData?: RtTableMovingDataModel[];
}

export interface RtTableMovingDataModel {
  header: RtTableMovingHeaderModel;
  data: any;
  isEditable?: boolean;
  validators?: ValidatorFn[];
  errorMessages?: { [name: string]: string };
  whiteSpace?: 'nowrap' | 'pre';
  tooltip?: string;
}


export interface RtTableGroupedDataModel {
  header: RtTableMovingHeaderModel;
  data: Modify<any, {
    value: any;
    isEditable?: boolean;
    validators?: ValidatorFn[];
    errorMessages?: { [name: string]: string };
    currentValidationMessage?: string;
    whiteSpace: 'nowrap' | 'pre';
    tooltip?: string;
  }[]>;

}

export interface RtTableMovingHeaderModel {
  title: string;
  subTitle?: string;
  width?: number;
  isRemovable?: boolean;
}


export interface RtTableMovingItemModel {
  value: any;
  isEditable?: boolean;
  validators?: ValidatorFn[];
  errorMessages?: { [name: string]: string };
}

export interface RtTableMovingChangedData {
  fullData: {
    dynamicData?: RtTableGroupedDataModel[];
    staticData?: RtTableGroupedDataModel[];
  };
  changedData: {
    typeData: 'dynamic' | 'static';
    typeChange: 'remove' | 'edit';
    value?: any;
    groupIndex: number;
    itemIndex?: number;
  };
}

export type groupType = 'static' | 'dynamic';

export interface RtTableSelectedData {
  group: groupType;
  itemIndex: number;
  groupIndex: number;
  data: RtTableMovingItemModel;
}
