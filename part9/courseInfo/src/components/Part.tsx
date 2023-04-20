import { CoursePart } from "../types";

function Part({ part }: { part: CoursePart }) {
  switch (part.kind) {
    case 'basic':
      return (
        <>
          <h2>{part.name} {part.exerciseCount}</h2>
          <p>{part.description}</p>
        </>
      )
    case 'description':
      return (
        <>
          <h2>{part.name} {part.exerciseCount}</h2>
          <p>{part.description}</p>
        </>
      )
    case 'group':
      return (
        <>
          <p>{part.name} {part.exerciseCount}</p>
          <p>project exercises {part.groupProjectCount}</p>
        </>
      )
    case 'background':
      return (
        <>
          <h2>{part.name} {part.exerciseCount}</h2>
          <p>{part.description}</p>
          <p>{part.backgroundMaterial}</p>
        </>
      )
    case 'special':
      return (
        <>
          <h2>{part.name} {part.exerciseCount}</h2>
          <p>{part.description}</p>
          <p>{part.requirements}</p>
        </>
      )
    default:
      return assertNever(part);
  }
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default Part