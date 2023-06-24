import {Modify} from './types';

export interface RtTableMovingModel {
  dynamicData?: RtTableMovingDataModel[];
  staticData?: RtTableMovingDataModel[];
}

export interface RtTableMovingDataModel {
  header: RtTableMovingHeaderModel;
  data: any;
  isEditable?: boolean;
}


export interface RtTableGroupedDataModel {
  header: RtTableMovingHeaderModel;
  data: Modify<any, { value: any; isEditable?: boolean }[]>;
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
}

export interface RtTableMovingChangedData {
  fullData: {
    dynamicData?:  RtTableGroupedDataModel[];
    staticData?:  RtTableGroupedDataModel[];
  };
  changedData: {
    typeData: 'dynamic' | 'static';
    typeChange: 'remove' | 'edit';
    value?: any;
    groupIndex: number;
    itemIndex?: number;
  };
}
