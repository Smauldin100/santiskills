// Personal dashboard data

// Skills data with categories
export const skillsData = [
  { name: 'React', level: 90, category: 'Frontend' },
  { name: 'JavaScript', level: 85, category: 'Frontend' },
  { name: 'HTML/CSS', level: 92, category: 'Frontend' },
  { name: 'Node.js', level: 80, category: 'Backend' },
  { name: 'Python', level: 75, category: 'Backend' },
  { name: 'SQL', level: 85, category: 'Database' },
  { name: 'MongoDB', level: 78, category: 'Database' },
  { name: 'Git', level: 88, category: 'Tools' },
  { name: 'Docker', level: 70, category: 'DevOps' },
  { name: 'AWS', level: 65, category: 'Cloud' },
];

// Projects data with descriptions and links
export const projectsData = [
  {
    name: 'E-commerce Platform',
    completion: 100,
    description: 'Full-stack e-commerce platform with payment integration',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    link: 'https://github.com/smauldin100/ecommerce-platform',
    image: 'ecommerce.jpg',
  },
  {
    name: 'Portfolio Website',
    completion: 100,
    description: 'Personal portfolio showcasing projects and skills',
    technologies: ['React', 'CSS', 'JavaScript'],
    link: 'https://github.com/smauldin100/portfolio',
    image: 'portfolio.jpg',
  },
  {
    name: 'Task Manager App',
    completion: 90,
    description: 'Task management application with drag and drop interface',
    technologies: ['React', 'Redux', 'Node.js'],
    link: 'https://github.com/smauldin100/task-manager',
    image: 'taskmanager.jpg',
  },
  {
    name: 'Weather Dashboard',
    completion: 85,
    description: 'Weather forecast application using external APIs',
    technologies: ['JavaScript', 'API Integration', 'CSS'],
    link: 'https://github.com/smauldin100/weather-app',
    image: 'weather.jpg',
  },
  {
    name: 'Chat Application',
    completion: 75,
    description: 'Real-time chat application with authentication',
    technologies: ['React', 'Socket.io', 'Express', 'MongoDB'],
    link: 'https://github.com/smauldin100/chat-app',
    image: 'chat.jpg',
  },
];

// Education history
export const educationData = [
  {
    institution: 'Georgia Tech',
    degree: 'M.S. in Computer Science',
    year: '2020-2022',
    gpa: '3.8/4.0',
    courses: ['Advanced Algorithms', 'Machine Learning', 'Web Development'],
  },
  {
    institution: 'University of Georgia',
    degree: 'B.S. in Computer Science',
    year: '2016-2020',
    gpa: '3.7/4.0',
    courses: ['Data Structures', 'Database Systems', 'Software Engineering'],
  },
];

// Work experience
export const experienceData = [
  {
    company: 'Tech Solutions Inc.',
    position: 'Senior Software Engineer',
    duration: 'Jan 2022 - Present',
    description:
      'Leading a team of developers to create responsive web applications.',
    achievements: [
      'Increased application performance by 40%',
      'Implemented CI/CD pipelines',
      'Led migration to microservices architecture',
    ],
  },
  {
    company: 'DataCorp',
    position: 'Software Developer',
    duration: 'June 2020 - Dec 2021',
    description: 'Developed and maintained full-stack web applications.',
    achievements: [
      'Created RESTful APIs for mobile applications',
      'Optimized database queries reducing load times by 30%',
      'Implemented unit and integration testing',
    ],
  },
  {
    company: 'WebTech Startups',
    position: 'Junior Developer',
    duration: 'May 2019 - May 2020',
    description: 'Assisted in developing web applications for clients.',
    achievements: [
      'Developed responsive UI components',
      'Collaborated in an agile team environment',
      'Contributed to open source projects',
    ],
  },
];

// Certifications
export const certificationsData = [
  {
    name: 'AWS Certified Developer',
    issuer: 'Amazon Web Services',
    date: 'Dec 2022',
    expiry: 'Dec 2025',
    credentialID: 'AWS-DEV-12345',
  },
  {
    name: 'Professional Scrum Master I',
    issuer: 'Scrum.org',
    date: 'Mar 2021',
    expiry: 'No Expiration',
    credentialID: 'PSM-I-54321',
  },
  {
    name: 'MongoDB Certified Developer',
    issuer: 'MongoDB University',
    date: 'July 2021',
    expiry: 'July 2024',
    credentialID: 'MCD-98765',
  },
];

// Personal information
export const personalInfo = {
  name: 'Santiago Mauldin (Santi)',
  email: 'smauldin100@gmail.com',
  location: 'United States (Currently under house arrest)',
  languages: ['English', 'Spanish'],
  status: 'In a relationship with Paige (since Jan 1, 2024)',
  summary: `Driven, creative, and highly resourceful with a passion for technology, AI development, gaming, and financial freedom. You excel at fast troubleshooting, innovative thinking, and optimizing systems for efficiency. Despite current life constraints (house arrest and mental health struggles), you continue to push forward with impactful personal projects aimed at financial independence and personal growth.`,
  technicalSkills: [
    'Node.js',
    'Express.js',
    'React',
    'Tailwind CSS',
    'MongoDB',
    'Supabase',
    'GitHub',
    'Azure',
    'Visual Studio Code',
    'Project IDX',
    'MongoDB',
    'Supabase',
    'SQLite',
    'OneDrive Storage',
    'API-Infinite',
    'QuantumInvestAI',
    'Santiskills Dashboard',
    'Warzone 3 performance tuning',
    'ReWASD configuration',
    'Elite Series 2 controller setups',
    'Stable Diffusion',
    'Local LLM setups',
    'Cricut Maker 3 for design projects',
  ],
  appProjects: [
    {
      name: 'Santiskills Dashboard (Flagship Project)',
      goal: 'All-in-one AI-powered personal management tool',
      features: [
        'AI Chatbot and Task Automation',
        'Financial & Expense Tracking',
        'Planner, Calendar Integration',
        'Email Management',
        'Social Media Management & Analytics (Integrated with TikTok API)',
        'Data Storage and Retrieval (ChatGPT Memory Integration)',
        'Income Generation Modules',
        'Progress Dashboard with a TikTok-like "For You" Page for updates',
      ],
      technologies: [
        'React',
        'Tailwind CSS',
        'Node.js',
        'MongoDB',
        'Supabase',
        'OpenAI API',
      ],
    },
    {
      name: 'QuantumInvestAI (Fintech Project)',
      goal: 'AI-powered investment and financial advisory tool',
      features: [
        'Investment Analysis (Stocks, Crypto, Forex)',
        'Mock Trading Capabilities',
        'AI Chatbot for Financial Decision-Making',
        'Automated Investment Actions',
        'Financial Market Trend Tracking',
      ],
      technologies: ['Node.js', 'AI APIs', 'Supabase', 'React'],
    },
    {
      name: 'API-Infinite (Social Media Automation Tool)',
      goal: 'Manage and automate social media platforms efficiently',
      features: [
        'Comment Notifications & Automated Replies',
        'Video Scheduling & Performance Analysis',
        'Social Media API Integrations (Primarily TikTok)',
        'Advanced Insights & Content Suggestions',
      ],
      technologies: ['Supabase', 'Node.js', 'React', 'Visual Studio Code'],
    },
  ],
  income: {
    current: 'Limited due to house arrest',
    goal: {
      targetLaunch: 'Within 6-12 months',
      monetization: [
        'Subscription-based model ($5-15 monthly tiers)',
        'In-app purchases for advanced financial tools',
        'Affiliate partnerships and API access licensing',
      ],
      projectedFirstYear: '$15,000 - $50,000 based on user growth',
    },
  },
  gaming: {
    rig: 'Acer Nitro V ANV15-51-51H9 (Intel Core i5-13420H, RTX 4050, 16GB RAM, 512GB SSD + Additional SSD)',
    controller: 'Xbox Elite Series 2 (Configured via ReWASD for optimized aim)',
    primaryGame:
      'Call of Duty Warzone 3 (240Hz Sceptre Monitor, aiming for low latency and maximum FPS)',
    streaming:
      'Considering TikTok Live integration for gaming content and clips',
  },
  personalGoals: [
    'Achieve financial freedom through app-based passive income',
    'Improve mental health and emotional stability by focusing on productivity',
    'Expand into streaming and content creation for additional revenue',
    'Maintain strong personal relationships despite current life challenges',
  ],
};

// Skills growth over time (for timeline chart)
export const skillsGrowthData = [
  { year: 2019, React: 50, JavaScript: 60, 'Node.js': 40, Python: 30 },
  { year: 2020, React: 65, JavaScript: 70, 'Node.js': 55, Python: 45 },
  { year: 2021, React: 75, JavaScript: 80, 'Node.js': 65, Python: 60 },
  { year: 2022, React: 85, JavaScript: 85, 'Node.js': 75, Python: 70 },
  { year: 2023, React: 90, JavaScript: 85, 'Node.js': 80, Python: 75 },
];

// Monthly coding activity (for heatmap)
export const codingActivityData = {
  2023: {
    1: [
      4, 5, 2, 8, 9, 3, 5, 6, 7, 4, 5, 8, 9, 5, 3, 4, 5, 7, 8, 9, 5, 4, 3, 5, 6,
      7, 8, 5, 4, 3, 5,
    ],
    2: [
      5, 6, 7, 8, 9, 5, 3, 4, 5, 6, 7, 8, 5, 4, 3, 5, 6, 7, 8, 5, 4, 3, 5, 6, 7,
      8, 5,
    ],
    3: [
      3, 4, 5, 6, 7, 8, 5, 4, 3, 5, 6, 7, 8, 5, 4, 3, 5, 6, 7, 8, 5, 4, 3, 5, 6,
      7, 8, 5, 4, 3, 5,
    ],
    // months 4-12 would continue similarly
  },
};

// Languages usage percentage
export const languageUsageData = [
  { name: 'JavaScript', value: 40 },
  { name: 'Python', value: 25 },
  { name: 'HTML/CSS', value: 15 },
  { name: 'SQL', value: 10 },
  { name: 'Other', value: 10 },
];
