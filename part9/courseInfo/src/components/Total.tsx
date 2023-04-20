import { CoursePartBase } from "../types"

function Total({ courseParts }: { courseParts: CoursePartBase[] }) {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce(
        (carry: number, part: { exerciseCount: number }) =>
          carry + part.exerciseCount, 0)}
    </p>
  )
}

export default Total