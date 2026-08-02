// Projects. Descriptions and links transcribed from the CV
// (talal_jaber_cv_plain_text_with_links.txt); nothing here is invented.

export const projects = [
  {
    id: 'dinelink',
    title: 'DineLink – AI Restaurant Management Platform',
    shortDescription:
      'AI-powered restaurant management startup — Winner of Falling Walls Lab Jordan 2025',
    description:
      'Designed and validated an AI-powered restaurant management platform. Won 1st place at Falling Walls Jordan 2025 among 50+ innovators and represented Jordan at the Global Finals in Berlin.',
    points: [
      'Founded and led the development of an AI-powered restaurant management platform designed to help restaurants improve operations, decision-making, and efficiency.',
      'Conducted customer discovery interviews with 15+ local restaurant owners to validate real business pain points and define the platform’s core features.',
      'Designed the product roadmap, system architecture, and early prototype, leading the full lifecycle from market validation to technical execution.',
    ],
    technologies: ['Next.js', 'Tailwind CSS', 'PostgreSQL', 'Python', 'Spring Boot'],
    category: 'Startup',
    status: 'Active',
    year: '2025',
    role: 'Founder & CTO',
    link: 'https://dinelink.org',
    repo: null,
    featured: true,
    priority: 1,
  },

  {
    id: 'vibesafe',
    title: 'VibeSafe – Open-Source Security Developer Tool',
    shortDescription:
      'Pre-deploy safety scanner for AI-built applications, shipped as a VS Code extension and CLI',
    description:
      'Built an open-source pre-deploy safety scanner for AI-built or “vibe-coded” applications, released as both a VS Code extension and CLI tool.',
    points: [
      'Designed a TypeScript monorepo with a reusable scanner core, shared type system, CLI package, and VS Code extension package.',
      'Implemented rule-based static analysis detectors for hardcoded secrets, exposed frontend keys, missing authentication, missing validation, and insecure project configuration.',
      'Published the tool through npm, VS Code Marketplace, and Open VSX, with developer-focused repair plans, deploy-readiness scoring, and AI-ready fix prompts.',
    ],
    technologies: ['TypeScript', 'VS Code Extension API', 'CLI', 'Static Analysis', 'npm'],
    category: 'Developer Tools',
    status: 'Active',
    year: 'Jun 2026',
    role: 'Founder & Maintainer',
    link: 'https://marketplace.visualstudio.com/items?itemName=TalalJaber.vibeguard-scanner',
    repo: 'https://github.com/talaljaber/vibesafe',
    featured: true,
    priority: 2,
  },

  {
    id: 'eltizamati',
    title: 'Eltizamati – Fintech Mobile Application',
    shortDescription:
      'Bilingual fintech app for loans, Murabaha financing and credit cards — 5th place at the Rally Fintech Hackathon',
    description:
      'Led a bilingual fintech mobile application from initial idea to working product, owning product design, system architecture, technical planning, and implementation.',
    points: [
      'Led the project from initial idea to working product, owning product design, system architecture, technical planning, and implementation.',
      'Built a bilingual React Native and TypeScript application with clean architecture, Supabase, secure financial-data handling, offline demo mode, and a decimal-safe financial engine.',
      'Delivered features for tracking loans, Murabaha financing, and credit cards, helping the team secure 5th place at the Rally Fintech Hackathon.',
    ],
    technologies: ['React Native', 'TypeScript', 'Supabase', 'Clean Architecture'],
    category: 'Fintech / Mobile',
    status: 'Completed',
    year: 'Jul 2026',
    role: 'Product & Technical Lead',
    link: null,
    repo: 'https://github.com/talaljaber/eltizamati',
    featured: true,
    priority: 3,
  },

  {
    id: 'medmodelle',
    title: 'MedModelle – E-Commerce Platform',
    shortDescription: 'Full-stack e-commerce website for a Jordan-based medical models client',
    description:
      'Delivered a complete e-commerce website for a Jordan-based client, handling the full development lifecycle from frontend and backend implementation to database design and deployment.',
    points: [
      'Built the platform using Next.js, NestJS, and PostgreSQL, including product management, database structure, API development, and production deployment.',
      'Managed the project end-to-end, translating client requirements into a functional, scalable, and production-ready online store.',
    ],
    technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'Tailwind CSS'],
    category: 'E-Commerce',
    status: 'Deployed',
    year: 'Apr 2026',
    role: 'Full-Stack Developer',
    link: 'https://medmodelle.com',
    repo: null,
    featured: true,
    priority: 4,
  },

  {
    id: 'onesalt',
    title: 'OneSalt – E-Commerce Platform',
    shortDescription: 'Full-stack e-commerce site for a Jordanian clothing brand',
    description:
      'Delivered a complete e-commerce website for a Jordan-based client, handling the full development lifecycle from frontend and backend implementation to database design and deployment.',
    points: [
      'Built the platform using React.js, Node JS, and PostgreSQL, including product management, database structure, API development, and production deployment.',
      'Managed the project end-to-end, translating client requirements into a functional, scalable, and production-ready online store.',
    ],
    technologies: ['React.js', 'Node.js', 'PostgreSQL', 'Vite', 'Tailwind CSS'],
    category: 'E-Commerce',
    status: 'Deployed',
    year: 'Jul–Aug 2025',
    role: 'Full-Stack Developer',
    link: 'https://wearonesalt.com',
    repo: null,
    featured: true,
    priority: 5,
  },

  {
    id: 'hydrosense',
    title: 'HydroSense Jordan – IoT Water Monitoring',
    shortDescription: 'IoT-based water quality monitoring with ML-powered data analysis',
    description:
      'IoT-based water monitoring solution focused on cost-effective sensing, data processing, and real-time analysis.',
    points: [
      'Designed a shared hub architecture to reduce hardware costs and improve scalability across multiple sensing units.',
      'Working on the machine learning model and signal processing pipeline to improve data interpretation, sensor reliability, and water-quality insight generation.',
    ],
    technologies: ['Python', 'Machine Learning', 'Signal Processing', 'IoT', 'FastAPI'],
    category: 'IoT / ML',
    status: 'In Progress',
    year: 'Apr–May 2026',
    role: 'Team Leader & ML Developer',
    link: null,
    repo: null,
    featured: true,
    priority: 6,
  },

  {
    id: 'har-system',
    title: 'Human Activity Recognition System',
    shortDescription: 'ML system classifying human activities from IMU sensor data',
    description:
      'Built a full-stack Human Activity Recognition system that classifies human activities from accelerometer and gyroscope IMU sensor data using a trained SVM model.',
    points: [
      'Implemented a FastAPI backend with a signal processing pipeline for filtering, window segmentation, feature extraction, normalization, and activity prediction.',
      'Developed a React and Tailwind CSS dashboard with drag-and-drop file upload, real-time analysis, confidence scores, FFT visualizations, and responsive results pages.',
    ],
    technologies: ['Python', 'FastAPI', 'SVM', 'React.js', 'Tailwind CSS', 'FFT'],
    category: 'ML / Full-Stack',
    status: 'Completed',
    year: '2026',
    role: 'ML & Full-Stack Developer',
    link: null,
    repo: 'https://github.com/layandar/signals-and-systems',
    featured: true,
    priority: 7,
  },

  {
    id: 'driver-monitoring',
    title: 'Driver Monitoring System',
    shortDescription: 'Real-time drowsiness & distraction detection using MediaPipe',
    description:
      'Developed a real-time safety application using Python and MediaPipe to monitor driver alertness and prevent accidents by detecting fatigue and distraction.',
    points: [
      'Implemented signal processing to track Eye Aspect Ratio (EAR), Mouth Aspect Ratio (MAR), and Head Pose Estimation for high-accuracy drowsiness and yawn detection.',
    ],
    technologies: ['Python', 'MediaPipe', 'OpenCV', 'Signal Processing'],
    category: 'Computer Vision',
    status: 'Completed',
    year: 'Dec 2025',
    role: 'Developer',
    link: null,
    repo: 'https://github.com/Talaljaber/driving-monitor',
    featured: false,
    priority: 8,
  },

  {
    id: 'barbershop',
    title: 'Haitham Haddad Barbershop Platform',
    shortDescription: 'Full-stack appointment booking platform for a local barbershop',
    description:
      'Developing a full-stack appointment platform for a local barbershop in Jordan using Next.js and Tailwind CSS.',
    points: [
      'Implementing backend logic with Next.js API routes and PostgreSQL for booking management and data persistence.',
      'Designing a responsive, production-ready interface optimized for mobile users.',
    ],
    technologies: ['Next.js', 'Tailwind CSS', 'PostgreSQL'],
    category: 'Full-Stack',
    status: 'In Progress',
    year: '2026',
    role: 'Full-Stack Developer',
    link: 'https://haithamhaddad.netlify.app/',
    repo: null,
    featured: false,
    priority: 9,
  },

  {
    id: 'gju-solar',
    title: 'GJU Solar Energy Visualization',
    shortDescription: 'Real-time dashboard for solar panel energy and CO₂ savings at GJU',
    description:
      'Developing a real-time visualization dashboard for solar panel energy generation and estimated CO₂ savings at the German Jordanian University.',
    points: [
      'Implementing the algorithms required to calculate generated power and saved CO₂ in real time based on solar panel data.',
    ],
    technologies: ['React.js', 'Data Visualization', 'Algorithms', 'Dashboard'],
    category: 'Dashboard',
    status: 'In Progress',
    year: 'Feb–Apr 2026',
    role: 'Algorithm & Dashboard Developer',
    link: null,
    repo: null,
    featured: false,
    priority: 10,
  },

  {
    id: 'just-cook',
    title: 'Just Cook – Restaurant Ordering System',
    shortDescription: 'Browser-based ordering system with Google Sheets backend',
    description:
      'Innovative restaurant ordering system using Google Sheets as a backend database. Features real-time order tracking, admin dashboard, and order management tools — no app download required.',
    points: [],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Google Sheets API'],
    category: 'Restaurant Tech',
    status: 'Deployed',
    year: '2025',
    role: 'Full-Stack Developer',
    link: 'https://justcook1.netlify.app',
    repo: null,
    featured: false,
    priority: 11,
  },
]

export function getProjectById(id) {
  return projects.find((project) => project.id === id)
}

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured).sort((a, b) => a.priority - b.priority)
}

export function getProjectCategories() {
  return [...new Set(projects.map((project) => project.category))]
}
