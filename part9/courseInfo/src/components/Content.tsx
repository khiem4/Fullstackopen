import { Course } from "../types"

function Content({ name, exerciseCount }: Course) {
  return (
    <p>{name} {exerciseCount}</p>
  )
}

export default Content