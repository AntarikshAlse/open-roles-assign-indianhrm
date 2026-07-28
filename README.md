# Open Roles Widget:

Tech: React + Typescript, Vite, Tanstack Query, Tailwind Css
Formatter: Oxlint
Bundler: Vite

Structure:

├── src
│ ├── components
│ │ ├── JobCard.tsx
│ │ └── SearchPanel.tsx
│ ├── utils
│ │ ├── mockJobs.ts
│ │ ├── types.ts
│ │ ├── useJob.tsx
│ │ └── useJobs.ts
│ ├── App.css
│ ├── App.tsx
│ ├── Providers.tsx
│ ├── index.css
│ └── main.tsx
├── .gitignore
├── .oxlintrc.json
├── README.md
├── index.html
├── package.json
├── pnpm-lock.yaml
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts

Approach:

- useJobs hooks to fetch job list, and maintain all states
- Mock Jobs for sample jobs display.
- Error, loading states handled with tanstack query useQuery method
- SearchPanel for search fields
- Derived states in App by using filtered use both search & department in one pass.
