// Skill taxonomy, transcribed verbatim from the CV.

export const skillTiers = [
  {
    id: 'main',
    title: 'Main Technical Focus',
    groups: [
      {
        label: 'Product & System Design',
        items: [
          'product discovery',
          'customer interviews',
          'requirement analysis',
          'MVP scoping',
          'feature prioritization',
          'technical roadmapping',
          'system architecture',
          'backend architecture',
          'database design',
          'relational data modeling',
          'API design',
          'API integration',
          'full-stack architecture',
        ],
      },
      {
        label: 'Full-Stack Web Development',
        items: [
          'Next.js',
          'React.js',
          'TypeScript',
          'JavaScript',
          'Node.js',
          'NestJS',
          'FastAPI',
          'REST APIs',
          'PostgreSQL',
          'MySQL',
          'Supabase',
          'authentication flows',
          'backend validation',
          'real-time data handling',
          'dashboard development',
          'responsive UI development',
        ],
      },
      {
        label: 'Developer Tools & Secure Development',
        items: [
          'VS Code Extension API',
          'CLI development',
          'TypeScript monorepos',
          'static analysis',
          'rule-based security detectors',
          'secret scanning',
          'frontend key exposure detection',
          'secure endpoint awareness',
          'environment-variable safety',
          'input validation awareness',
          'open-source workflows',
        ],
      },
      {
        label: 'AI-Assisted Engineering',
        items: [
          'LLMs and AI coding tools for prototyping',
          'debugging',
          'refactoring',
          'documentation',
          'architecture exploration',
          'faster product iteration',
        ],
      },
    ],
  },
  {
    id: 'applied',
    title: 'Applied Technical Knowledge',
    groups: [
      {
        label: 'AI, ML & Data',
        items: [
          'machine learning applications',
          'SVM classification',
          'feature extraction',
          'FFT analysis',
          'filtering',
          'window segmentation',
          'normalization',
          'signal processing pipelines',
          'IMU sensor-data processing',
          'activity recognition',
          'MediaPipe',
          'OpenCV',
          'real-time landmark detection',
        ],
      },
      {
        label: 'DevOps & Deployment',
        items: [
          'Git/GitHub',
          'GitHub Actions',
          'Docker',
          'Netlify',
          'AWS',
          'Hetzner',
          'Linux',
          'CI/CD pipeline management',
          'production deployment workflows',
          'npm package publishing',
          'VS Code Marketplace publishing',
          'Open VSX publishing',
        ],
      },
      {
        label: 'Networking & Systems',
        items: [
          'HTTP/HTTPS',
          'DNS',
          'TCP',
          'UDP',
          'WebSockets',
          'foundational network architecture',
          'Linux basics',
          'distributed systems communication',
        ],
      },
    ],
  },
  {
    id: 'foundations',
    title: 'Programming & CS Foundations',
    groups: [
      {
        label: 'Languages',
        items: ['TypeScript', 'JavaScript', 'Python', 'Java', 'C', 'C++', 'SQL', 'x86 Assembly'],
      },
      {
        label: 'Fundamentals',
        items: [
          'Object-Oriented Programming',
          'Data Structures',
          'Algorithms',
          'clean code principles',
          'modular architecture',
          'testing',
          'debugging',
          'software design patterns',
        ],
      },
      {
        label: 'Working Knowledge',
        items: [
          'Kubernetes basics',
          'Vue.js',
          'Vite',
          'Oracle APEX',
          'CI/CD optimization',
          'containerization concepts',
          'cloud infrastructure basics',
          'cybersecurity testing fundamentals',
          'German B1',
        ],
      },
    ],
  },
]

/** Flat list of every group, for the pages that do not split by tier. */
export const skillGroups = skillTiers.flatMap((tier) => tier.groups)

export const languages = [
  { name: 'Arabic', level: 'Native' },
  { name: 'English', level: 'Fluent, C1 certified' },
  { name: 'German', level: 'B1' },
]
