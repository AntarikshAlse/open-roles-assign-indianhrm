import { useMemo, useState } from "react";
import "./App.css";
import useJob from "./utils/useJob";
import SearchPanel from "./components/SearchPanel";
import JobCard from "./components/JobCard";

function App() {
  const { mockJobs: jobs, isLoading, error, isError, refetch } = useJob();
  const [department, setDepartment] = useState("all");
  const [search, setSearch] = useState("");

  const departments = useMemo(() => {
    const set = new Set(jobs.map((j) => j.department));
    return ["all", ...Array.from(set).sort()];
  }, [jobs]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return jobs.filter((j) => {
      const matchesQuery =
        q.length === 0 ||
        j.title.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q);
      const matchesDept = department === "all" || j.department === department;
      return matchesQuery && matchesDept;
    });
  }, [jobs, search, department]);

  return (
    <main className="max-w-md mx-auto flex flex-col gap-4">
      <h1 className="font-semibold text-lg">Open Roles</h1>
      <SearchPanel
        query={search}
        setQuery={setSearch}
        department={department}
        setDepartment={setDepartment}
        status={isLoading ? "loading" : "success"}
        departments={departments}
      />

      <div>
        <div aria-live="polite">
          {isLoading && (
            <ul
              className="list-none m-0 p-0 space-y-4 mx-4 sm:mx-auto"
              aria-label="Loading roles"
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <li key={i} className="" aria-hidden="true">
                  <div className="w-full h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="w-full h-2.5 bg-gray-200 rounded animate-pulse" />
                </li>
              ))}
            </ul>
          )}

          {isError && (
            <div className="flex flex-col justify-center items-center gap-2 border-2 border-blue-50 bg-white rounded-md p-4">
              <p>Failed to load roles</p>
              <button
                type="button"
                className="cursor-pointer button border-2  border-blue-300 bg-white rounded-md p-2 flex flex-col justify-between gap-12 flex-wrap"
                onClick={() => {
                  setSearch("");
                  setDepartment("all");
                  refetch();
                }}
              >
                Try again
              </button>
            </div>
          )}
          {!isLoading && !error && filtered.length === 0 && (
            <div className="flex flex-col justify-center items-center gap-2 border-2 border-blue-50 bg-white rounded-md p-4">
              <p>No roles match your search.</p>
              <div>
                {(search || department !== "all") && (
                  <button
                    type="button"
                    className="button border-2  border-blue-300 bg-white rounded-md p-2 flex flex-col justify-between gap-12 flex-wrap"
                    onClick={() => {
                      setSearch("");
                      setDepartment("all");
                    }}
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        <ul className="list-none m-0 p-0 space-y-4 mx-4 sm:mx-auto">
          {!isLoading &&
            !error &&
            filtered.map((job) => (
              <div key={job.id} className="">
                <JobCard job={job} />
              </div>
            ))}
        </ul>
      </div>
    </main>
  );
}

export default App;
