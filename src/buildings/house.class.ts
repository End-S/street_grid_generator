import { Building, IBuilding } from './building.abstract';
import { LocationTypes } from '../locations/location.abstract';

export class House extends Building {
  type = LocationTypes.house;
  public configuration: IHouse;

  constructor (configuration: IHouse) {
    super();
    this.configuration = configuration;
  }

}

export interface IHouse extends IBuilding {

}
