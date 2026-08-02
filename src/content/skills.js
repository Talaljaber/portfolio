// Skills, narrowed to what a software engineering role actually asks for.
// The previous taxonomy carried ~90 entries across three tiers, including
// process vocabulary ("MVP scoping", "requirement analysis") that read as
// padding next to the concrete technologies. Nothing invented was added.

export const skillGroups = [
  {
    id: 'languages',
    label: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'Java', 'SQL', 'C', 'C++'],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    items: ['React', 'Next.js', 'React Native', 'Tailwind CSS', 'Responsive web development'],
  },
  {
    id: 'backend',
    label: 'Backend',
    items: ['Node.js', 'NestJS', 'FastAPI', 'Next.js API routes', 'REST APIs'],
  },
  {
    id: 'databases',
    label: 'Databases',
    items: ['PostgreSQL', 'MySQL', 'Supabase', 'Relational data modelling'],
  },
  {
    id: 'engineering',
    label: 'Software Engineering',
    items: [
      'Object-Oriented Programming',
      'Data Structures',
      'Algorithms',
      'Clean code',
      'Modular architecture',
      'Software design patterns',
      'System design',
      'API design',
      'Database design',
      'Testing',
      'Debugging',
      'Authentication',
      'Authorization',
      'Input validation',
    ],
  },
  {
    id: 'tooling',
    label: 'Tools & Deployment',
    items: ['Git', 'GitHub', 'GitHub Actions', 'Docker', 'AWS', 'Netlify', 'Linux'],
  },
  {
    id: 'additional',
    label: 'Additional',
    items: [
      'VS Code Extension API',
      'CLI development',
      'Static analysis',
      'OpenCV',
      'MediaPipe',
      'SVM classification',
      'Signal processing',
    ],
  },
]

export const languages = [
  { name: 'Arabic', level: 'Native' },
  { name: 'English', level: 'Fluent, C1 certified' },
  { name: 'German', level: 'B1' },
]
