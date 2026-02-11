export interface Hook {
  id: string;
  name: string;
  category: string;
  description: string;
  repoUrl: string;
  stars?: number;
  author?: string;
  tags?: string[];
}

export type CategoryColor = {
  [key: string]: string;
};
