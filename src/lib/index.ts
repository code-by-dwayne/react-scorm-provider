import { ScoContext, useScorm } from './ScormProvider';
import ScormProvider from './ScormProvider';
import withScorm from './withScorm';

export interface Score {
  value: number;
  min: number;
  max: number;
  status: string;
}

export { useScorm, ScoContext, ScormProvider, withScorm };
