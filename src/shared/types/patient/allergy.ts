import type { AllergySeverity } from './enums';

export type Allergy = {
  substance: string;
  reaction: string;
  severity: AllergySeverity;
};
