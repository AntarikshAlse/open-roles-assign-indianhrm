import { useQuery } from "@tanstack/react-query";
import type { Job, RawJob } from "./types";
import { useState } from "react";
import { MOCK_JOBS } from "./mockJobs";

export function normalizeJob(raw: RawJob, index: number): Job {
  return {
    id: String(raw.id ?? raw._id ?? raw.jobId ?? index),
    title: raw.title ?? raw.jobTitle ?? "Untitled role",
    department: raw.department ?? raw.departmentName ?? raw.team ?? "General",
    location: raw.location ?? raw.jobLocation ?? raw.city ?? "Not specified",
    employmentType: raw.employmentType ?? raw.type,
    url: raw.applyUrl ?? raw.url ?? raw.link,
  };
}

const useJob = () => {
  const { data, isLoading, error, isError, refetch } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      try {
        const res = await fetch(
          "https://www.indianhrm.com/api/public/careers/indianhrm/jobs",
        );
        if (!res.ok) throw new Error(`Server responded with ${res.status}`);
        const data = await res.json();

        const normalizedData = data.map(normalizeJob);
        return normalizedData;
      } catch (error) {
        console.error(error);
      }
    },
    retry: 5,
    enabled: false,
  });

  const mockJobs = MOCK_JOBS.map(normalizeJob);
  return {
    jobs: data || [],
    isLoading,
    error,
    mockJobs,
    isError,
    refetch,
  };
};

export default useJob;

// export type UseJobsResult = ReturnType<typeof useJobs>;
