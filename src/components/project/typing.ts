import type { SimpleIcon } from "simple-icons";

export enum IntermittentType {
  "Discontinued",
  "Paused",
  "Hiatus",
  "Under Construction",
  "Abandoned"
};

interface ExtendedProjectConsonant {
  tools: SimpleIcon[];
  intermittentType?: IntermittentType;
  url?: string;
  intermittentReason?: string;
};

export interface ProjectConsonant<T extends boolean = false> {
  name: string;
  projects: Array<(T extends true ? {type: string} : {}) & Record<"title" | "description" | "image", string> & ExtendedProjectConsonant>;
};