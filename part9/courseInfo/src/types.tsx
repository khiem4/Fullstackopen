export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
  kind: "description"
}

interface CoursePartBasic extends CoursePartBase {
  description?: string;
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartBase {
  description?: string;
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartBase {
  name: string,
  exerciseCount: number,
  description: string,
  requirements: string[],
  kind: "special"
}


export type CoursePart =
  CoursePartBasic |
  CoursePartGroup |
  CoursePartBackground |
  CoursePartDescription |
  CoursePartSpecial;
