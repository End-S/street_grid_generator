export function simpleRandomNumber (): number {
  return Math.round(Math.random() * 1e2) / 1e2;
}

export function randomArrayChoice (arrayLength: number): number {
  return Math.floor(Math.random() * arrayLength);
}

export function randomNumberInRange (maxNotIncluding: number, minIncluding: number): number {
  return Math.round(Math.random() * (maxNotIncluding - minIncluding) + minIncluding);
}
