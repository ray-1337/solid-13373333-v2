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
};

export interface ProjectConsonant {
  name: string;
  projects: Array<Record<"title" | "description" | "image", string> & ExtendedProjectConsonant>;
};