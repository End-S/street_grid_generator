import { Location, ILocation } from '../locations/location.abstract';

export abstract class Building extends Location {
  public abstract configuration: IBuilding;
}

export interface IBuilding extends ILocation {
  address: IAddress;
}

export interface IAddress {
  building: string;
  street: string;
  region: string;
  postCode: string;
}
