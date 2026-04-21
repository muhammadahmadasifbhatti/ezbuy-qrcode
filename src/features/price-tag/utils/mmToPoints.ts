const MM_TO_POINTS = 2.8346;
const INCH_TO_POINTS = 72;

export function mmToPoints(mm: number): number {
  return mm * MM_TO_POINTS;
}

export function inchesToPoints(inches: number): number {
  return inches * INCH_TO_POINTS;
}
