
export interface Country{
  area: number;
  capital: string[];
  cca2: string;
  flag: string;
  flagsvg: string;
  name: string;
  nativeNameSpa:string;
  population: number;
  region: string;
  spaName: string;
  subRegion:string;
}

export type Region =
  | 'africa'
  | 'americas'
  | 'asia'
  | 'europe'
  | 'oceania'
  | 'antarctica';

