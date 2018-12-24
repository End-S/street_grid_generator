import { IGridPoint } from './grid';

export enum IDirection {
  north = 'N',
  east = 'E',
  south = 'S',
  west = 'W'
}

export class Direction {

  public static possibleDirections: IDirection[] = [
    IDirection.north, IDirection.east,
    IDirection.south, IDirection.west];

  public static moveGridPointInDirection (
    gridPoint: IGridPoint,
    steps: number,
    direction: IDirection): IGridPoint {
    let newGridPoint: IGridPoint = null;
    switch (direction) {
      case IDirection.north:
        newGridPoint = this.moveGridPointNorth(gridPoint, steps);
        break;
      case IDirection.east:
        newGridPoint = this.moveGridPointEast(gridPoint, steps);
        break;
      case IDirection.south:
        newGridPoint = this.moveGridPointSouth(gridPoint, steps);
        break;
      case IDirection.west:
        newGridPoint = this.moveGridPointWest(gridPoint, steps);
        break;
      default:
        break;
    }
    return newGridPoint;
  }

  public static neighbouringDirections (direction: IDirection): IDirection[] {
    let neighbourDirections: IDirection[];
    switch (direction) {
      case IDirection.north:
        neighbourDirections = [IDirection.east, IDirection.west];
        break;
      case IDirection.east:
        neighbourDirections = [IDirection.north, IDirection.south];
        break;
      case IDirection.south:
        neighbourDirections = [IDirection.east, IDirection.west];
        break;
      case IDirection.west:
        neighbourDirections = [IDirection.north, IDirection.south];
        break;
      default:
        break;
    }
    return neighbourDirections;
  }

  private static moveGridPointNorth (gridPoint: IGridPoint, steps: number): IGridPoint {
    return { x: gridPoint.x, y: gridPoint.y - steps };
  }

  private static moveGridPointEast (gridPoint: IGridPoint, steps: number): IGridPoint {
    return { x: gridPoint.x + steps, y: gridPoint.y };
  }

  private static moveGridPointSouth (gridPoint: IGridPoint, steps: number): IGridPoint {
    return { x: gridPoint.x, y: gridPoint.y + steps };
  }

  private static moveGridPointWest (gridPoint: IGridPoint, steps: number): IGridPoint {
    return { x: gridPoint.x - steps, y: gridPoint.y };
  }
}
