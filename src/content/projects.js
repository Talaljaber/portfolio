// src/content/projects.js

export const projects = [
  {
    id: 'dinelink',
    title: 'DineLink – AI Restaurant Management Platform',
    shortDescription: 'AI-powered restaurant management startup — Winner of Falling Walls Lab Jordan 2025',
    description: 'Designed and validated an AI-powered restaurant management platform. Won 1st place at Falling Walls Jordan 2025 among 50+ innovators and represented Jordan at the Global Finals in Berlin.',
    technologies: ['Next.js', 'Tailwind CSS', 'PostgreSQL', 'Python', 'Spring Boot'],
    category: 'Startup',
    status: 'Active',
    year: '2025',
    role: 'Founder & CTO',
    link: 'https://dinelink.org',
    featured: true,
    priority: 1
  },
  
  {
    id: 'onesalt',
    title: 'OneSalt – E-Commerce Platform',
    shortDescription: 'Full-stack e-commerce site for a Jordanian clothing brand',
    description: 'Delivered a complete e-commerce website handling the full development lifecycle from frontend and backend to database design and deployment. Built with React.js, Node.js, and PostgreSQL.',
    technologies: ['React.js', 'Node.js', 'PostgreSQL', 'Vite', 'Tailwind CSS'],
    category: 'E-Commerce',
    status: 'Deployed',
    year: 'Aug 2025',
    role: 'Full-Stack Developer',
    link: 'https://wearonesalt.com',
    featured: true,
    priority: 2
  },

  {
    id: 'medmodelle',
    title: 'MedModelle – E-Commerce Platform',
    shortDescription: 'Full-stack e-commerce website for a Jordan-based medical models client',
    description: 'Delivered a complete e-commerce website using Next.js, NestJS, and PostgreSQL. Included product management, database design, API development, and production deployment.',
    technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'Tailwind CSS'],
    category: 'E-Commerce',
    status: 'Deployed',
    year: 'Apr 2026',
    role: 'Full-Stack Developer',
    link: 'https://medmodelle.com',
    featured: true,
    priority: 3
  },

  {
    id: 'hydrosense',
    title: 'HydroSense Jordan – IoT Water Monitoring',
    shortDescription: 'IoT-based water quality monitoring with ML-powered data analysis',
    description: 'Leading development of an IoT-based water monitoring solution. Designed a shared hub architecture to reduce hardware costs. Working on an ML model and signal processing pipeline for water-quality insight generation.',
    technologies: ['Python', 'Machine Learning', 'Signal Processing', 'IoT', 'FastAPI'],
    category: 'IoT / ML',
    status: 'In Progress',
    year: '2026',
    role: 'Team Leader & ML Developer',
    link: null,
    featured: true,
    priority: 4
  },

  {
    id: 'har-system',
    title: 'Human Activity Recognition System',
    shortDescription: 'ML system classifying human activities from IMU sensor data',
    description: 'Built a full-stack Human Activity Recognition system using a trained SVM model on accelerometer/gyroscope data. FastAPI backend with signal processing pipeline; React + Tailwind dashboard with FFT visualizations and drag-and-drop upload.',
    technologies: ['Python', 'FastAPI', 'SVM', 'React.js', 'Tailwind CSS', 'FFT', 'Signal Processing'],
    category: 'ML / Full-Stack',
    status: 'Completed',
    year: '2026',
    role: 'ML & Full-Stack Developer',
    link: 'https://github.com/talaljaber',
    featured: true,
    priority: 5
  },

  {
    id: 'driver-monitoring',
    title: 'Driver Monitoring System',
    shortDescription: 'Real-time drowsiness & distraction detection using MediaPipe',
    description: 'Real-time safety application using Python and MediaPipe to monitor driver alertness. Detects fatigue via Eye Aspect Ratio (EAR), Mouth Aspect Ratio (MAR), and Head Pose Estimation. Modular architecture with calibration logic and unit testing suite.',
    technologies: ['Python', 'MediaPipe', 'OpenCV', 'Signal Processing'],
    category: 'Computer Vision',
    status: 'Completed',
    year: 'Dec 2025',
    role: 'Developer',
    link: 'https://github.com/talaljaber',
    featured: true,
    priority: 6
  },

  {
    id: 'gju-solar',
    title: 'GJU Solar Energy Visualization',
    shortDescription: 'Real-time dashboard for solar panel energy and CO₂ savings at GJU',
    description: 'Developing a real-time visualization dashboard for solar panel energy generation and CO₂ savings at the German Jordanian University. Implementing algorithms for power calculation and CO₂ estimation from live solar data.',
    technologies: ['React.js', 'Data Visualization', 'Algorithms', 'Dashboard'],
    category: 'Dashboard',
    status: 'In Progress',
    year: 'Feb 2026',
    role: 'Algorithm & Dashboard Developer',
    link: null,
    featured: false,
    priority: 7
  },

  {
    id: 'barbershop',
    title: 'Haitham Haddad Barbershop Platform',
    shortDescription: 'Full-stack appointment booking platform for a local barbershop',
    description: 'Developing a full-stack appointment platform using Next.js, Tailwind CSS, and PostgreSQL. Backend logic via Next.js API routes for booking management. Responsive, mobile-optimized design.',
    technologies: ['Next.js', 'Tailwind CSS', 'PostgreSQL'],
    category: 'Full-Stack',
    status: 'In Progress',
    year: '2026',
    role: 'Full-Stack Developer',
    link: null,
    featured: false,
    priority: 8
  },

  {
    id: 'just-cook',
    title: 'Just Cook – Restaurant Ordering System',
    shortDescription: 'Browser-based ordering system with Google Sheets backend',
    description: 'Innovative restaurant ordering system using Google Sheets as a backend database. Features real-time order tracking, admin dashboard, and order management tools — no app download required.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Google Sheets API'],
    category: 'Restaurant Tech',
    status: 'Deployed',
    year: '2025',
    role: 'Full-Stack Developer',
    link: 'https://justcook1.netlify.app',
    featured: false,
    priority: 9
  }
]

// Utility functions
export function getFeaturedProjects() {
  return projects
    .filter(project => project.featured)
    .sort((a, b) => a.priority - b.priority)
}

export function getProjectById(id) {
  return projects.find(project => project.id === id)
}

export function getProjectsByCategory(category) {
  if (category === 'all') return projects
  return projects.filter(project => project.category === category)
}

export function getProjectCategories() {
  return [...new Set(projects.map(project => project.category))]
}

export function getProjectTags() {
  const allTags = projects.reduce((tags, project) => {
    return tags.concat(project.technologies)
  }, [])
  return [...new Set(allTags)].sort()
}

export function searchProjects(query) {
  const searchTerm = query.toLowerCase()
  return projects.filter(project => 
    project.title.toLowerCase().includes(searchTerm) ||
    project.description.toLowerCase().includes(searchTerm) ||
    project.technologies.some(tech => tech.toLowerCase().includes(searchTerm))
  )
}