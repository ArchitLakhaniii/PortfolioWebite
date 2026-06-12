// ============================================================
// PORTFOLIO CONTENT — edit this file to update the whole site.
// Every section of the site reads from the objects below.
// ============================================================

export const profile = {
  name: "Archit Lakhani",
  firstName: "Archit",
  lastName: "Lakhani",
  initials: "AL",
  tagline: "I build AI-powered products, agentic systems, iOS apps, and backend infrastructure that turn messy real-world problems into fast, useful software.",
  role: "AI / Product Engineer",
  eyebrow: "Georgia Tech · Computer Science",
  location: "Atlanta, GA",
  email: "alakhani41@gatech.edu",
  resumeUrl: "/resume.pdf", // drop your resume at public/resume.pdf
  availability: "Open to Summer 2026 internships & collaborations",
  links: {
    github: "https://github.com/ArchitLakhaniii",
    linkedin: "https://linkedin.com/in/architlakhani",
  },
  about: [
    "I'm a Computer Science student at Georgia Tech focused on building practical software products across AI, agentic systems, mobile development, backend systems, and data science.",
    "My work spans SwiftUI/Firebase iOS apps, AI-powered code analysis tools, LLM pipelines, ML forecasting systems, campus marketplaces, and computer-vision safety navigation research.",
    "I've interned at Reliance Jio (ML engineering), the National University of Singapore (AI & NLP research), and Emkay Global (quantitative finance), and cofounded two startups — one funded with AED 28,000 by the UAE government.",
  ],
};

export const stats = [
  { value: "4.00", label: "GPA · Georgia Tech CS" },
  { value: "10+", label: "Products & systems shipped" },
  { value: "2×", label: "Startups cofounded" },
  { value: "AED 28K", label: "Government funding secured" },
];

export type Project = {
  id: string;
  title: string;
  role: string;
  description: string;
  tags: string[];
  categories: ("ai" | "ios" | "backend" | "web" | "startup" | "research")[];
  featured: boolean;
  highlight?: string; // small badge, e.g. award or metric
  github?: string;
  link?: string;
};

export const projects: Project[] = [
  {
    id: "gitgood",
    title: "GitGood",
    role: "Full-Stack / AI Agent Developer",
    description:
      "AI-powered GitHub repository analyzer and tutorial generator. A 6-step Mastra agent pipeline analyzes architecture, identifies core abstractions, maps relationships, and generates beginner-friendly tutorials for any codebase.",
    tags: ["Next.js", "TypeScript", "Mastra", "AI Agents", "LLMs"],
    categories: ["ai", "web"],
    featured: true,
    github: "https://github.com/ArchitLakhaniii",
  },
  {
    id: "sidequest",
    title: "SideQuest",
    role: "Senior iOS Developer · GT iOS Club",
    description:
      "A social adventure app where users complete real-world quests, collaborate with friends, and share challenges through posts, photos, comments, and reactions. Full SwiftUI + Firebase stack.",
    tags: ["Swift", "SwiftUI", "Firebase", "Firestore", "Kingfisher"],
    categories: ["ios"],
    featured: true,
    github: "https://github.com/ArchitLakhaniii",
  },
  {
    id: "tastecast",
    title: "TasteCast",
    role: "Cofounder + Technical Builder",
    description:
      "AI-powered demand forecasting and inventory optimization for independent restaurants. Predicts daily item demand, plans inventory, reduces food waste, and prevents stockouts with data-driven forecasts.",
    tags: ["Python", "pandas", "scikit-learn", "Forecasting", "ML"],
    categories: ["ai", "backend", "startup"],
    featured: true,
    github: "https://github.com/ArchitLakhaniii",
  },
  {
    id: "text-to-sql",
    title: "Jio Text-to-SQL LLM",
    role: "ML Intern · Reliance Jio",
    description:
      "LLM pipeline converting natural language into SQL queries with structured database results. Improved query generation speed by 50% and accuracy by ~60% across internal workloads.",
    tags: ["Python", "LangChain", "Hugging Face", "Ollama", "SQL", "NLP"],
    categories: ["ai", "backend"],
    featured: true,
    highlight: "+60% accuracy",
  },
  {
    id: "eunokinetix",
    title: "EunoKinetix",
    role: "Cofounder",
    description:
      "AI fleet optimization system using Dijkstra's algorithm to reduce idle routes and fuel usage. Secured AED 28,000 in UAE government funding and reached Top 3 among UAE entrepreneurship projects.",
    tags: ["Python", "Graph Algorithms", "Route Optimization"],
    categories: ["ai", "startup"],
    featured: true,
    highlight: "AED 28K funded · Top 3 UAE",
  },
  {
    id: "flashfind",
    title: "FlashFind",
    role: "Full-Stack / ML Developer",
    description:
      "AI-powered campus marketplace. Students post natural-language Flash Requests — Gemini plus a custom Random Forest classifier Smart-Pings nearby students most likely to have the item.",
    tags: ["Python", "FastAPI", "MongoDB", "Gemini", "React", "Tailwind"],
    categories: ["ai", "web", "backend", "startup"],
    featured: true,
    github: "https://github.com/ArchitLakhaniii",
  },
  {
    id: "birthdaypal",
    title: "BirthdayPal",
    role: "iOS Developer / Team Lead Contributor",
    description:
      "SwiftUI iOS app for birthday tracking with AI-generated personalized messages. Won the GT iOS Club Demo Day Pitch Competition.",
    tags: ["Swift", "SwiftUI", "iOS", "AI Content"],
    categories: ["ios", "ai"],
    featured: false,
    highlight: "Demo Day Winner",
  },
  {
    id: "blueboat-research",
    title: "Autonomous BlueBoat Navigation",
    role: "Undergraduate Researcher · Sabra Lab",
    description:
      "Computer-vision-based safety navigation systems for autonomous surface vehicles. Contributing to perception and safer navigation research at Georgia Tech's Sabra Lab.",
    tags: ["Computer Vision", "AI Safety", "Research"],
    categories: ["research", "ai"],
    featured: false,
  },
  {
    id: "nus-ml-nlp",
    title: "AI / NLP Predictive Models",
    role: "AI & NLP Intern · NUS",
    description:
      "ML and NLP projects: predictive analytics, chatbot development (Amazon Lex), face recognition (Amazon Rekognition), and telecom churn prediction up to 1.5 years ahead.",
    tags: ["Python", "ANN", "CNN", "Amazon Lex", "Rekognition"],
    categories: ["ai", "research"],
    featured: false,
  },
  {
    id: "luvumom",
    title: "LuvUMom",
    role: "Founder",
    description:
      "Breast cancer screening app on a 1+1 social impact model: every paid screening subsidizes a free screening for a domestic helper. Preventive healthcare equity by design.",
    tags: ["Product Design", "Health Tech", "Social Impact"],
    categories: ["startup"],
    featured: false,
  },
];

export type Experience = {
  company: string;
  role: string;
  date: string;
  location: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    company: "Georgia Tech · College of Computing",
    role: "CS 1331 Teaching Assistant (OOP in Java)",
    date: "Jan 2026 – Present",
    location: "Atlanta, GA",
    bullets: [
      "Teaching object-oriented programming in Java to Georgia Tech undergraduates.",
      "Lead recitations, grade projects, and mentor students through core OOP design concepts.",
    ],
  },
  {
    company: "Georgia Tech · Sabra Lab",
    role: "Undergraduate Researcher",
    date: "Jan 2026 – Present",
    location: "Atlanta, GA",
    bullets: [
      "Developing computer-vision-based safety navigation for autonomous BlueBoat systems.",
      "Contributing to perception pipelines and safer navigation algorithms.",
    ],
  },
  {
    company: "GT iOS Club",
    role: "Senior Developer",
    date: "Jan 2026 – Present",
    location: "Atlanta, GA",
    bullets: [
      "Building SideQuest, a social adventure iOS app, leading core SwiftUI + Firebase features across quests, feeds, profiles, and leaderboards.",
      "Won the club's Demo Day Pitch Competition with BirthdayPal.",
    ],
  },
  {
    company: "Emkay Global Financial Services",
    role: "Finance & Data Analytics Intern",
    date: "Jul 2025",
    location: "Mumbai, India",
    bullets: [
      "Quantitative analysis on equity markets using Python and Bloomberg Terminal.",
      "Studied correlations between cash, futures, and option deltas; practiced delta-neutral hedging, put-call parity, and volatility spreads.",
    ],
  },
  {
    company: "Reliance Jio",
    role: "Machine Learning Intern",
    date: "Jul – Aug 2024",
    location: "Remote",
    bullets: [
      "Built a Text-to-SQL LLM pipeline translating natural language into SQL with LangChain, Hugging Face, Ollama, and Python.",
      "Improved query generation speed by 50% and accuracy by ~60%.",
    ],
  },
  {
    company: "JuniorMBA / Cleverharvey",
    role: "Product Design Intern",
    date: "Jul – Aug 2023",
    location: "Dubai, UAE",
    bullets: [
      "Designed MVP models (Concierge, Wizard of Oz, Piecemeal) for early-stage product validation.",
      "Partnered with CULTFIT India on a meal-planning app GUI and homepage.",
    ],
  },
  {
    company: "National University of Singapore",
    role: "AI & NLP Intern",
    date: "Jun – Jul 2023",
    location: "Singapore",
    bullets: [
      "Implemented ANN, CNN, RNN, regression, clustering, and decision tree models.",
      "Built chatbots with Amazon Lex and face recognition with Amazon Rekognition; modeled telecom churn up to 1.5 years ahead.",
    ],
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Languages",
    items: ["Python", "Java", "Swift", "TypeScript", "C++", "C", "SQL", "HTML/CSS"],
  },
  {
    group: "AI / ML",
    items: ["LangChain", "Hugging Face", "Ollama", "scikit-learn", "pandas", "Gemini", "LLM Pipelines", "Computer Vision", "NLP", "Forecasting"],
  },
  {
    group: "Web & Backend",
    items: ["Next.js", "React", "Tailwind CSS", "FastAPI", "Flask", "Spring Boot", "MongoDB", "REST APIs"],
  },
  {
    group: "iOS & Mobile",
    items: ["SwiftUI", "Firebase", "Firestore", "Firebase Auth", "Firebase Storage", "Kingfisher"],
  },
  {
    group: "ML Techniques",
    items: ["Random Forests", "Neural Networks", "Regression", "Clustering", "Agentic Systems"],
  },
  {
    group: "Tools",
    items: ["Git/GitHub", "Vercel", "Jupyter", "Bloomberg Terminal", "Mastra", "Firebase Console"],
  },
];

export type Achievement = {
  title: string;
  detail: string;
  tag: string;
};

export const achievements: Achievement[] = [
  {
    title: "AED 28,000 UAE Government Funding",
    detail: "Secured funding for EunoKinetix; Top 3 among UAE entrepreneurship projects.",
    tag: "Startup",
  },
  {
    title: "GT iOS Club Demo Day Winner",
    detail: "Won the pitch competition with BirthdayPal, an AI-powered SwiftUI app.",
    tag: "Award",
  },
  {
    title: "4.00 GPA · Georgia Tech CS",
    detail: "B.S. Computer Science, College of Computing · expected Dec 2028.",
    tag: "Academic",
  },
  {
    title: "Published: Securing Machine Learning Systems",
    detail: "Research on adversarial attacks, bias mitigation, and ML vulnerabilities.",
    tag: "Research",
  },
  {
    title: "Published: EunoKinetiX Operational Efficiency",
    detail: "Analyzed feasibility, efficiency gains, and societal impact of fleet optimization.",
    tag: "Research",
  },
  {
    title: "UAE National Chess Team · 350+ Coaching Hours",
    detail: "Represented UAE twice at CISCE National Games; coached juniors and differently-abled players.",
    tag: "Leadership",
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

// ============================================================
// CINEMATIC SHOWCASE SCENES
// Each scene is one pinned, scroll-driven chapter on the site.
// Wording is reused from `projects` / `experience` above —
// edit those for content, edit here for scene presentation.
// Scene ids reuse project ids where they cover the same work,
// so the "More work" index can exclude them automatically.
// ============================================================

export type SceneMetric = { value: string; label: string };

export type Scene = {
  id: string;
  kind: "project" | "role";
  kicker: string; // short chapter label, e.g. "AI Agents"
  title: string;
  subtitle: string; // role / position line
  summary: string;
  metrics?: SceneMetric[];
  tags: string[];
  hue: number; // 0–360, drives the scene's accent color
  image?: string; // optional /public path; falls back to the typographic cover
  github?: string;
};

export const scenes: Scene[] = [
  {
    id: "gitgood",
    kind: "project",
    kicker: "AI Agents",
    title: "GitGood",
    subtitle: "Full-Stack / AI Agent Developer",
    summary:
      "AI-powered GitHub repository analyzer and tutorial generator. A 6-step Mastra agent pipeline analyzes architecture, identifies core abstractions, maps relationships, and generates beginner-friendly tutorials for any codebase.",
    tags: ["Next.js", "TypeScript", "Mastra", "AI Agents", "LLMs"],
    hue: 235,
    github: "https://github.com/ArchitLakhaniii",
  },
  {
    id: "sidequest",
    kind: "project",
    kicker: "iOS",
    title: "SideQuest",
    subtitle: "Senior iOS Developer · GT iOS Club",
    summary:
      "A social adventure app where users complete real-world quests, collaborate with friends, and share challenges through posts, photos, comments, and reactions. Full SwiftUI + Firebase stack.",
    tags: ["Swift", "SwiftUI", "Firebase", "Firestore", "Kingfisher"],
    hue: 160,
    github: "https://github.com/ArchitLakhaniii",
  },
  {
    id: "tastecast",
    kind: "project",
    kicker: "Startup",
    title: "TasteCast",
    subtitle: "Cofounder + Technical Builder",
    summary:
      "AI-powered demand forecasting and inventory optimization for independent restaurants. Predicts daily item demand, plans inventory, reduces food waste, and prevents stockouts with data-driven forecasts.",
    tags: ["Python", "pandas", "scikit-learn", "Forecasting", "ML"],
    hue: 25,
    github: "https://github.com/ArchitLakhaniii",
  },
  {
    id: "text-to-sql",
    kind: "project",
    kicker: "ML Engineering",
    title: "Jio Text-to-SQL LLM",
    subtitle: "ML Intern · Reliance Jio",
    summary:
      "LLM pipeline converting natural language into SQL queries with structured database results. Improved query generation speed by 50% and accuracy by ~60% across internal workloads.",
    metrics: [
      { value: "+50%", label: "Query generation speed" },
      { value: "~60%", label: "Accuracy improvement" },
    ],
    tags: ["Python", "LangChain", "Hugging Face", "Ollama", "SQL", "NLP"],
    hue: 280,
  },
  {
    id: "eunokinetix",
    kind: "project",
    kicker: "Founder",
    title: "EunoKinetix",
    subtitle: "Cofounder",
    summary:
      "AI fleet optimization system using Dijkstra's algorithm to reduce idle routes and fuel usage. Secured AED 28,000 in UAE government funding and reached Top 3 among UAE entrepreneurship projects.",
    metrics: [
      { value: "AED 28K", label: "UAE government funding" },
      { value: "Top 3", label: "UAE entrepreneurship projects" },
    ],
    tags: ["Python", "Graph Algorithms", "Route Optimization"],
    hue: 205,
  },
  {
    id: "flashfind",
    kind: "project",
    kicker: "Full-Stack ML",
    title: "FlashFind",
    subtitle: "Full-Stack / ML Developer",
    summary:
      "AI-powered campus marketplace. Students post natural-language Flash Requests — Gemini plus a custom Random Forest classifier Smart-Pings nearby students most likely to have the item.",
    tags: ["Python", "FastAPI", "MongoDB", "Gemini", "React", "Tailwind"],
    hue: 330,
    github: "https://github.com/ArchitLakhaniii",
  },
  {
    id: "cs1331-ta",
    kind: "role",
    kicker: "Teaching",
    title: "CS 1331 Teaching Assistant",
    subtitle: "Georgia Tech · College of Computing",
    summary:
      "Teaching object-oriented programming in Java to Georgia Tech undergraduates. Lead recitations, grade projects, and mentor students through core OOP design concepts.",
    tags: ["Java", "OOP", "Mentorship"],
    hue: 45,
  },
  {
    id: "gt-ios-club",
    kind: "role",
    kicker: "iOS Engineering",
    title: "GT iOS Club",
    subtitle: "Senior Developer",
    summary:
      "Building SideQuest, a social adventure iOS app, leading core SwiftUI + Firebase features across quests, feeds, profiles, and leaderboards. Won the club's Demo Day Pitch Competition with BirthdayPal.",
    metrics: [{ value: "Winner", label: "Demo Day Pitch Competition" }],
    tags: ["SwiftUI", "Firebase", "Leadership"],
    hue: 145,
  },
  {
    id: "blueboat-research",
    kind: "role",
    kicker: "Research",
    title: "Autonomous BlueBoat Navigation",
    subtitle: "Undergraduate Researcher · Sabra Lab",
    summary:
      "Computer-vision-based safety navigation systems for autonomous surface vehicles. Contributing to perception and safer navigation research at Georgia Tech's Sabra Lab.",
    tags: ["Computer Vision", "AI Safety", "Research"],
    hue: 190,
  },
];
