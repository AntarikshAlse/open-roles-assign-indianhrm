export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  employmentType?: string;
  url?: string;
}

// Raw shape guesses from the public endpoint — normalized in normalizeJob.
export interface RawJob {
  id?: string | number;
  _id?: string;
  jobId?: string | number;
  title?: string;
  jobTitle?: string;
  department?: string;
  departmentName?: string;
  team?: string;
  location?: string;
  jobLocation?: string;
  city?: string;
  employmentType?: string;
  type?: string;
  applyUrl?: string;
  url?: string;
  link?: string;
}
