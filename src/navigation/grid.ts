import { Street } from '../locations/street.class';
import { IDirection, Direction } from './directions';
import { randomArrayChoice, randomNumberInRange } from '../utils/randomNumberGenerator';
export class Grid {
  grid: Street[][];
  // squared
  gridSize: number = 0;

  constructor (gridSize: number) {
    this.gridSize = gridSize;

    this.grid = Array.apply(null, Array(this.gridSize)).map((): null => null);

    // init the grid matrix
    for (let i = 0; i < gridSize; i++) {
      this.grid[ i ] = Array.apply(null, Array(this.gridSize)).map((): null => null);
    }
  }

  assignToGrid (gridStartPoint: IGridPoint, street: Street, allowedDirections: IDirection[]): void {
    if (this.gridPointIsWithinBounds(gridStartPoint)) {
      // check avaliable directions
      const avaliableDirections: IDirection[] = this.getAvaliableDirections(gridStartPoint, allowedDirections);
      // choose random directions
      const chosenDirection: IDirection = avaliableDirections[ randomArrayChoice(avaliableDirections.length) ];
      street.direction = chosenDirection;
      // find max steps possible in directon
      const maxSteps = this.findMaximumStepsInDirection(gridStartPoint, chosenDirection);
      // choose random steps
      const steps = randomNumberInRange(maxSteps, 1);
      // plot street onto each grid point for each step
      this.plotStreetToGrid(street, gridStartPoint, steps, chosenDirection);
    }
  }

  getStreetAtLocation (gridPoint: IGridPoint): Street | null {
    if (this.gridPointIsWithinBounds(gridPoint)) {
      // console.table(this.grid);
      return this.grid[ gridPoint.y ][ gridPoint.x ];
    }
    return null;
  }

  getAvaliableDirections (startPoint: IGridPoint,
    allowedDirections: IDirection[] = Direction.possibleDirections): IDirection[] {
    let avaliableDirections: IDirection[] = [];
    let newGridPoint: IGridPoint;
    // loop over all direction
    allowedDirections.forEach(direction => {
      newGridPoint = Direction.moveGridPointInDirection(startPoint, 1, direction);
      if (!this.getStreetAtLocation(newGridPoint)
        && this.gridPointIsWithinBounds(newGridPoint)
        && this.neighbouringPointsAreEmpty(newGridPoint, direction)) {
        avaliableDirections.push(direction);
      }
    });
    return avaliableDirections.filter(direction => allowedDirections.includes(direction));
  }

  neighbouringPointsAreEmpty (gridPoint: IGridPoint, direction: IDirection): boolean {
    const neighbourDirections = Direction.neighbouringDirections(direction);
    for (let i = 0; i < neighbourDirections.length; i++) {
      let neighbourGridPoint = Direction.moveGridPointInDirection(gridPoint, 1, neighbourDirections[i]);
      if (this.getStreetAtLocation(neighbourGridPoint)) {
        return false;
      }
    }
    return true;
  }

  getPointsWithAvaliableJoins (street: Street, allowedDirections: IDirection[]) {
    let joiningPoints: IGridPoint[] = [];
    street.gridPoints.forEach(gridPoint => {
      if (this.getAvaliableDirections(gridPoint, allowedDirections).length) {
        joiningPoints.push(gridPoint);
      }
    });
    return joiningPoints;
  }

  findMaximumStepsInDirection (gridPoint: IGridPoint, direction: IDirection): number {
    let gridContents = null;
    let steps = 0;
    let newGridPoint = gridPoint;
    while (!gridContents) {
      newGridPoint = Direction.moveGridPointInDirection(gridPoint, steps + 1, direction);
      gridContents = this.getStreetAtLocation(newGridPoint);
      if (this.gridPointIsWithinBounds(newGridPoint) &&
        this.neighbouringPointsAreEmpty(newGridPoint, direction)) {
        steps++;
      } else {
        break;
      }
    }
    return steps;
  }

  plotStreetToGrid (street: Street, startPoint: IGridPoint, steps: number, direction: IDirection) {
    // this.assignToGridPoint(Direction.moveGridPointInDirection(startPoint, 1, direction), street);
    for (let i = 1; i <= steps; i++) {
      this.assignToGridPoint(
        Direction.moveGridPointInDirection(startPoint, i, direction),
        street);
    }
  }

  assignToGridPoint (gridPoint: IGridPoint, street: Street) {
    street.gridPoints.push(gridPoint);
    // y then x for 2d array
    this.grid[ gridPoint.y ][ gridPoint.x ] = street;
  }

  private gridPointIsWithinBounds (gridPoint: IGridPoint) {
    if (gridPoint) {
      return ((this.pointIsWithinBounds(gridPoint.x))
        && (this.pointIsWithinBounds(gridPoint.y)));
    } else {
      return false;
    }
  }

  private pointIsWithinBounds (point: number) {
    return (point >= 0 && point < this.gridSize);
  }
}

export interface IGridPoint {
  x: number;
  y: number;
}
