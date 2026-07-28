import { useEffect, useState, useCallback } from "react";
import type { Job, RawJob } from "./types";
import { MOCK_JOBS } from "./mockJobs";

const ENDPOINT = "https://www.indianhrm.com/api/public/careers/indianhrm/jobs";

// Add ?forceError=1 to the URL to see the real error state without killing
// your network — useful since the fallback below hides fetch failures.
const FORCE_ERROR = new URLSearchParams(window.location.search).has("forceError");

// The real endpoint's exact field names aren't documented publicly, so this
// normalizer accepts a few likely variants instead of assuming one shape.
function normalizeJob(raw: RawJob, index: number): Job {
  return {
    id: String(raw.id ?? raw._id ?? raw.jobId ?? index),
    title: raw.title ?? raw.jobTitle ?? "Untitled role",
    department: raw.department ?? raw.departmentName ?? raw.team ?? "General",
    location: raw.location ?? raw.jobLocation ?? raw.city ?? "Not specified",
    employmentType: raw.employmentType ?? raw.type,
    url: raw.applyUrl ?? raw.url ?? raw.link,
  };
}

function extractList(payload: unknown): RawJob[] {
  if (Array.isArray(payload)) return payload as RawJob[];
  if (payload && typeof payload === "object") {
    const obj = payload as Record<string, unknown>;
    for (const key of ["jobs", "data", "results", "items"]) {
      if (Array.isArray(obj[key])) return obj[key] as RawJob[];
    }
  }
  return [];
}

interface UseJobsResult {
  jobs: Job[];
  status: "loading" | "error" | "success";
  errorMessage: string | null;
  usingMockData: boolean;
  retry: () => void;
}

export function useJobs(): UseJobsResult {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [status, setStatus] = useState<"loading" | "error" | "success">("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [usingMockData, setUsingMockData] = useState(false);
  const [attempt, setAttempt] = useState(0);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    setErrorMessage(null);
    setUsingMockData(false);

    const load = async () => {
      if (FORCE_ERROR) {
        throw new Error("Forced error for testing (?forceError=1)");
      }
      const res = await fetch(ENDPOINT);
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      return res.json();
    };

    load()
      .then((payload) => {
        if (cancelled) return;
        const normalized = extractList(payload).map(normalizeJob);
        setJobs(normalized);
        setStatus("success");
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        if (FORCE_ERROR) {
          setErrorMessage(err instanceof Error ? err.message : "Unknown error");
          setStatus("error");
          return;
        }
        console.log("result error", err);
        // Live endpoint unreachable (blocked/down) — fall back to mock data
        // of the same shape so the UI still works end to end.
        setJobs(MOCK_JOBS.map(normalizeJob));
        setUsingMockData(true);
        setStatus("success");
      });

    return () => {
      cancelled = true;
    };
  }, [attempt]);

  return { jobs, status, errorMessage, usingMockData, retry };
}
