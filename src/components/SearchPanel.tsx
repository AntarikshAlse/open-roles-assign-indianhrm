import React from "react";

interface SearchPanelProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  department: string;
  setDepartment: React.Dispatch<React.SetStateAction<string>>;
  status: string;
  departments: string[];
}
const SearchPanel = ({
  query,
  setQuery,
  department,
  setDepartment,
  status,
  departments,
}: SearchPanelProps) => {
  return (
    <div className="mx-4 sm:m-0 flex-col sm:flex sm:flex-row sm:gap-4">
      <label className="field">
        <span>Search</span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Title or location"
          aria-label="Search roles by title or location"
        />
      </label>

      <label className="field">
        <span>Department</span>
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          aria-label="Filter by department"
          disabled={status !== "success" || departments.length <= 1}
        >
          {departments.map((d) => (
            <option key={d} value={d}>
              {d === "all" ? "All departments" : d}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default SearchPanel;
