import { Entry } from "../types";

function EntryDetails({ entry }: { entry: Entry }) {
  switch (entry.type) {
    case "Hospital":
      return (
        <div>
          <p>{entry.discharge.date}</p>
          <p>{entry.discharge.criteria}</p>
        </div>
      )
    case "HealthCheck":
      return (
        <div>
          <p>Health check rating: {entry.healthCheckRating}</p>
        </div>
      )
    case "OccupationalHealthcare":
      return (
        <div>
          <p>Employer Name: {entry.employerName}</p>
          <p>{entry.sickLeave?.startDate}</p>
          <p>{entry.sickLeave?.endDate}</p>
        </div>
      )
    default:
      const exhaustiveCheck: never = entry;
      return exhaustiveCheck;
  }
}

export default EntryDetails