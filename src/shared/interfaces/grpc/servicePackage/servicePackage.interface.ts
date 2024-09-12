// Represents the ID of a ServicePackagePrice
export interface ServicePackagePriceId {
  id: number;
}

export enum DurationType {
  DAY = 'day',
  MONTH = 'month',
  YEAR = 'year',
}

// Represents a detailed ServicePackagePrice object
export interface IServicePackagePrice {
  id: number;
  price: number;
  servicePackageName: string;
  duration: number;
  durationType: DurationType;
}

// Represents a list of ServicePackagePriceId objects
export interface ServicePackagePriceListIds {
  servicePackagePriceListIds: ServicePackagePriceId[];
}

// Represents a list of ServicePackagePrice objects
export interface ServicePackagePriceList {
  servicePackagePriceList: IServicePackagePrice[];
}
