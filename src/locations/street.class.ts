import { Location, LocationTypes, ILocation } from './location.abstract';
import { Building } from '../buildings/building.abstract';
import { IDirection } from '../navigation/directions';
import { IGridPoint } from '../navigation/grid';

export class Street extends Location {
  type = LocationTypes.street;

  // startPoint: IGridPoint;
  gridPoints: IGridPoint[] = [];
  direction: IDirection;
  // endPoint: IGridPoint;
  length: number; // should be decided by grid

  public configuration: IStreet;

  constructor(configuration: IStreet) {
    super();
    this.configuration = configuration;
  }

  public getStartPoint(): IGridPoint {
    return this.gridPoints[ 0 ];
  }

}

export interface IStreet extends ILocation {
  name: string
  buildings?: {
    north?: Building[],
    east?: Building[],
    south?: Building[],
    west?: Building[]
  }
}
