import type { Service } from '../types';
import { consultation } from './consultation';
import { integration } from './integration';

export const SERVICES: readonly Service[] = [consultation, integration];

export const serviceById = (id: string): Service | undefined => SERVICES.find((s) => s.id === id);
