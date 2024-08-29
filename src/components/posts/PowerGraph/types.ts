// types.ts

export interface Coordinate {
  x: number;
  y: number;
}

export interface PowerCurveGraphProps {
  data: Coordinate[];
  ftp: number;
}
