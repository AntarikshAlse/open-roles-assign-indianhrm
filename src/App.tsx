import { useMemo, useState } from "react";
import "./App.css";
import useJob from "./utils/useJob";
import SearchPanel from "./components/SearchPanel";
import JobCard from "./components/JobCard";

function App() {
  const { mockJobs, isLoading, error } = useJob();
  const [department, setDepartment] = useState("all");
  const [search, setSearch] = useState("");

  const departments = useMemo(() => {
    const set = new Set(mockJobs.map((j) => j.department));
    return ["all", ...Array.from(set).sort()];
  }, [mockJobs]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return mockJobs.filter((j) => {
      const matchesQuery =
        q.length === 0 ||
        j.title.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q);
      const matchesDept = department === "all" || j.department === department;
      return matchesQuery && matchesDept;
    });
  }, [mockJobs, search, department]);

  if (error) {
    return (
      <div className="error" aria-live="polite">
        Error: {error.message}
      </div>
    );
  }
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
            <ul className="job-list" aria-label="Loading roles">
              {Array.from({ length: 4 }).map((_, i) => (
                <li key={i} className="job-card skeleton" aria-hidden="true">
                  <div className="skeleton-line skeleton-title" />
                  <div className="skeleton-line skeleton-meta" />
                </li>
              ))}
            </ul>
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
