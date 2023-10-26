export type Link = {
  url: string | null;
  text: string | null | undefined;
};

export enum LinkType {
  GOAL = 'goal',
  QUESTION = 'question',
  METRIC = 'metric'
};

export type FileLink = {
  type: LinkType;
  file: string;
  links: Link[];
};

