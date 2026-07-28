import React from "react";
import type { Job } from "../utils/types";

const JobCard = ({ job }: { job: Job }) => {
  return (
    <li className="border-2 border-blue-300 bg-white rounded-md p-2 flex flex-col justify-between gap-12 flex-wrap">
      <div className="job-card-main">
        <h2 className="text-base">{job.title}</h2>
        <p className="text-stone-400">
          {job.department} · {job.location}
          {job.employmentType ? ` · ${job.employmentType}` : ""}
        </p>
      </div>
    </li>
  );
};

export default JobCard;
