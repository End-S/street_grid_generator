import { Grid, IGridPoint } from '../navigation/grid';
import { Street } from '../locations/street.class';
import { randomArrayChoice } from '../utils/randomNumberGenerator';
import { Direction, IDirection } from '../navigation/directions';
export class StreetGridGenerator {
  private static streetGrid: Grid;
  private static unallocatedStreets: Street[];

  public static createGrid (gridSize: number, streets: Street[]) {
    this.streetGrid = new Grid(gridSize);
    this.unallocatedStreets = streets;

    const setPositions = (street: Street, availablePoints: IGridPoint[], isStartingPoint: boolean, allowedDirections: IDirection[]) => {

      if (isStartingPoint) {
        let gridCenter = Math.floor(this.streetGrid.gridSize / 2);
        this.streetGrid.assignToGrid({ x: gridCenter, y: gridCenter }, street, allowedDirections);
      } else {
        // pick point at random from list of availablePoints
        const randomPoint: { x: number, y: number } = availablePoints[ randomArrayChoice(availablePoints.length) ];
        this.streetGrid.assignToGrid(
          randomPoint,
          street,
          allowedDirections);
      }
      let nextAllowDirections = Direction.neighbouringDirections(street.direction);
      let nextAvailablePoints = this.streetGrid.getPointsWithAvaliableJoins(street,
        Direction.neighbouringDirections(street.direction));
      while (nextAvailablePoints.length > 0 && this.unallocatedStreets.length > 0) {
        setPositions(
          this.unallocatedStreets.shift(),
          nextAvailablePoints,
          false,
          nextAllowDirections);
        nextAvailablePoints = this.streetGrid.getPointsWithAvaliableJoins(street, nextAllowDirections);
      }
      return;
    };

    setPositions(this.unallocatedStreets.shift(),
      [], true, Direction.possibleDirections);
    return this.streetGrid;
  }

}
