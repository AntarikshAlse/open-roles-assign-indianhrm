import type { RawJob } from "./types";

// Same shape the live endpoint is expected to return, for use when the
// network is blocked or the API is down.
export const MOCK_JOBS: RawJob[] = [
  {
    id: "1",
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Bengaluru, India",
    employmentType: "Full-time",
    applyUrl: "https://example.com/careers/senior-frontend-engineer",
  },
  {
    id: "2",
    title: "Full-Stack Engineer (Node/React)",
    department: "Engineering",
    location: "Remote (India)",
    employmentType: "Full-time",
    applyUrl: "https://example.com/careers/full-stack-engineer",
  },
  {
    id: "3",
    title: "Product Designer",
    department: "Design",
    location: "Pune, India",
    employmentType: "Full-time",
    applyUrl: "https://example.com/careers/product-designer",
  },
  {
    id: "4",
    title: "QA Automation Engineer",
    department: "Engineering",
    location: "Hyderabad, India",
    employmentType: "Contract",
    applyUrl: "https://example.com/careers/qa-automation-engineer",
  },
  {
    id: "5",
    title: "Talent Acquisition Partner",
    department: "People",
    location: "Mumbai, India",
    employmentType: "Full-time",
    applyUrl: "https://example.com/careers/talent-acquisition-partner",
  },
  {
    id: "6",
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Remote (India)",
    employmentType: "Full-time",
    applyUrl: "https://example.com/careers/customer-success-manager",
  },
  {
    id: "7",
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Bengaluru, India",
    employmentType: "Full-time",
    applyUrl: "https://example.com/careers/devops-engineer",
  },
  {
    id: "8",
    title: "Content Marketing Lead",
    department: "Marketing",
    location: "Delhi, India",
    employmentType: "Full-time",
    applyUrl: "https://example.com/careers/content-marketing-lead",
  },
];
