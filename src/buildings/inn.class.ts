import { Building, IBuilding } from './building.abstract';
import { LocationTypes } from '../locations/location.abstract';

export class Inn extends Building {
  type = LocationTypes.inn;
  public configuration: IInn;

  constructor (configuration: IInn) {
    super();
    this.configuration = configuration;
  }

}

export interface IInn extends IBuilding {

}
