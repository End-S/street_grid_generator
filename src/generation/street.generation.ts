import { Street } from '../locations/street.class';
import { streetNames } from './data-sets/street-names';
import { randomArrayChoice } from '../utils/randomNumberGenerator';

export class StreetGenerator {
  private static streets: Street[] = [];

  public static generateStreets (count: number) {
    // clear current streets
    this.streets = [];
    for (let i = 0; i < count; i++) {
      const name: string = streetNames[ randomArrayChoice(streetNames.length) ];
      this.streets.push(
        new Street({
          name
        })
      );
    }
    return this.streets;
  }
}
