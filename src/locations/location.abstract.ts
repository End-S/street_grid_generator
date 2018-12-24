export abstract class Location {
  public abstract configuration: ILocation;
  protected abstract type: string;
}

export interface ILocation {
}

export enum LocationTypes {
  house = 'house',
  inn = 'inn',
  street = 'street'
}
