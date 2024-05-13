import { Guide } from './guide.model';

export interface Language {
    id: number;
    language: string;
    guide: Guide[];
  }