import { CoursePart } from "../types"
import Part from "./Part"

function Content({ parts }: { parts: CoursePart[] }) {
  return (
    <div>
      {parts.map((part, index) => (
        <div key={index}>
          <Part part={part} />
        </div>
      ))}
    </div>

  )
}

export default Content