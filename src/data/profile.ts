// ============================================================
// PORTFOLIO CONTENT — edit this file to update the whole site.
// Every section of the site reads from the objects below.
// Facts are synced to public/resume.pdf (last sync: Sept 2026).
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
  timeZone: "America/New_York", // drives the live clock in the hero
  coordinates: "33.749° N, 84.388° W",
  email: "alakhani41@gatech.edu",
  resumeUrl: "/resume.pdf", // drop your resume at public/resume.pdf
  availability: "Open to internships & research collaborations",
  links: {
    github: "https://github.com/ArchitLakhaniii",
    linkedin: "https://linkedin.com/in/architlakhani",
  },
  about: [
    "I'm a Computer Science student at Georgia Tech focused on building practical software products across AI, agentic systems, mobile development, backend systems, and data science.",
    "From May to August 2026 I was an AI Research Intern at MBZUAI & GenBio AI, where I built a 4-agent Python ML workflow with Claude and OpenClaw that outperformed baseline agents by 9% across 76 BioXArena biomedical tasks. Now I'm a Teaching Assistant for Georgia Tech's Java / object-oriented programming course and Tech Lead of a 20-member iOS team at the GT iOS Club.",
    "My work also spans SwiftUI/Firebase iOS apps, AI-powered code analysis tools, LLM pipelines, ML forecasting systems, campus marketplaces, and computer-vision safety navigation research.",
    "I've interned at MBZUAI & GenBio AI (agentic AI research), Reliance Jio (ML engineering), the National University of Singapore (AI & NLP research), and Emkay Global (data analytics), and cofounded two startups — one funded with AED 28,000 by the UAE government.",
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
    role: "Senior iOS Developer / Tech Lead · GT iOS Club",
    description:
      "A social adventure app where users complete real-world quests, collaborate with friends, and share challenges through posts, photos, comments, and reactions. Shipped to 100+ testers with 6+ SwiftUI + Firebase features.",
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
      "LLM pipeline translating natural language into SQL for structured-data retrieval. Fine-tuning with Hugging Face Transformers and LangChain raised translation accuracy by 8%; an end-to-end LangChain + Ollama + SQL pipeline cut query-generation time by 50% and improved downstream retrieval accuracy by 60%.",
    tags: ["Python", "LangChain", "Hugging Face", "Ollama", "SQL", "NLP"],
    categories: ["ai", "backend"],
    featured: true,
    highlight: "+60% retrieval accuracy",
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
      "Real-time campus buyer-seller matching. A React/TypeScript + FastAPI platform turns natural-language requests into structured JSON with Gemini and stores listings in MongoDB; a Random Forest classifier trained on 400+ synthetically generated examples predicts the best seller matches.",
    tags: ["React", "TypeScript", "Python", "FastAPI", "MongoDB", "scikit-learn", "Gemini"],
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
      "Churn-model experimentation across 6+ ML approaches — ANN, CNN, RNN, regression, clustering, and decision trees — on telecom data, forecasting churn up to 1.5 years ahead, plus NLP and computer-vision apps with Amazon Lex and Rekognition.",
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
  {
    id: "cultfit-meal-planner",
    title: "CULTFIT Meal-Planner",
    role: "Product Design Intern · JuniorMBA",
    description:
      "Meal-planning app prototype in partnership with CULTFIT India. Designed Concierge, Wizard of Oz, and Piecemeal MVPs with a custom GUI and homepage applying user-centered design principles.",
    tags: ["UI/UX", "MVP Prototyping", "Product Design"],
    categories: ["web", "startup"],
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
    company: "GT iOS Club",
    role: "Senior iOS Developer / Tech Lead",
    date: "Jan 2026 – Present",
    location: "Atlanta, GA",
    bullets: [
      "Delivered SideQuest to 100+ testers by shipping 6+ SwiftUI + Firebase features spanning quests, feeds, profiles, uploads, reactions, and persistent user flows.",
      "Selected to lead a 20-member iOS team for Fall 2026, overseeing architecture, sprint planning, code reviews, Git workflows, and end-to-end feature delivery.",
      "Led a team project that won the club's Demo Day Pitch Competition with BirthdayPal.",
    ],
  },
  {
    company: "Georgia Tech · College of Computing",
    role: "Teaching Assistant · CS 1331 (OOP in Java)",
    date: "Jan 2026 – Present",
    location: "Atlanta, GA",
    bullets: [
      "Supported 300+ students in Java and object-oriented programming by leading recitations and office hours on generics, inheritance, polymorphism, file I/O, exceptions, and debugging.",
      "Resolved 50+ unique Java implementation errors weekly by debugging student code and tracing failures across inheritance, generics, file I/O, and object-oriented design.",
    ],
  },
  {
    company: "MBZUAI & GenBio AI",
    role: "AI Research Intern",
    date: "May – Aug 2026",
    location: "Hybrid · Atlanta, GA",
    bullets: [
      "Outperformed baseline agents by 9% across 76 BioXArena tasks by creating a 4-agent Python ML workflow with Claude and OpenClaw for iterative experimentation.",
      "Raised task performance by up to 30% through a 3-round evaluation pipeline combining cross-validation, feature engineering, leakage detection, and automated debugging.",
      "Enabled cross-task ML strategy retrieval through a 3,662-dimensional TF-IDF system that ranked task similarity and surfaced prior approaches for new biomedical datasets.",
    ],
  },
  {
    company: "Georgia Tech · Sabra Lab",
    role: "Undergraduate Researcher",
    date: "Jan – May 2026",
    location: "Atlanta, GA",
    bullets: [
      "Researched autonomous BlueBoat navigation using monocular depth estimation for obstacle awareness.",
      "Evaluated 4+ SLAM / depth models — Apple Depth Pro, MiDaS, ORB-SLAM2, and ZoeDepth — for Raspberry Pi 5 deployment.",
      "Supported a real-time perception pipeline with YOLOv10, EKF sonar localization, and GTRI field tests every 1–2 weeks.",
    ],
  },
  {
    company: "Emkay Global Financial Services",
    role: "Data Analytics Intern",
    date: "Jun – Jul 2025",
    location: "Mumbai, India",
    bullets: [
      "Improved delta correlation accuracy by 30% across 4+ equity markets by processing Bloomberg derivatives data with Python, pandas, and NumPy.",
      "Enabled real-time derivatives analysis by applying statistical and time-series techniques to Bloomberg data for pricing, volatility, and cross-market relationships.",
    ],
  },
  {
    company: "Reliance Jio",
    role: "Machine Learning Intern",
    date: "Jul – Aug 2024",
    location: "Remote",
    bullets: [
      "Raised Text-to-SQL translation accuracy by 8% through LLM fine-tuning with Hugging Face Transformers and LangChain, improving structured-data retrieval from complex databases.",
      "Cut query-generation time by 50% and improved downstream retrieval accuracy by 60% by integrating LangChain, Ollama, SQL, and Python into an end-to-end NLP pipeline.",
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
      "Expanded churn-model experimentation across 6+ ML approaches, comparing ANN, CNN, RNN, regression, clustering, and decision-tree methods for telecommunications datasets.",
      "Extended churn forecasting horizons to 1.5 years while deploying NLP and computer-vision applications with AWS Amazon Lex and Rekognition.",
    ],
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Languages",
    items: ["Python", "Java", "C++", "TypeScript", "JavaScript", "SQL", "Swift"],
  },
  {
    group: "Frameworks & Libraries",
    items: ["React", "Next.js", "Node.js", "FastAPI", "Flask", "SwiftUI", "PyTorch", "scikit-learn", "LangChain", "Hugging Face"],
  },
  {
    group: "Tools & Data",
    items: ["Git", "GitHub", "Firebase", "MongoDB", "SQLite", "Prisma", "pandas", "NumPy", "OpenCV", "Ollama"],
  },
  {
    group: "AI Tooling",
    items: ["Claude", "OpenClaw", "MCP", "Gemini", "Mastra", "Amazon Lex", "Rekognition"],
  },
  {
    group: "Concepts",
    items: [
      "Data Structures & Algorithms",
      "OOP",
      "REST APIs",
      "Backend Development",
      "Databases",
      "Debugging",
      "ML Pipelines",
      "Model Evaluation",
      "Feature Engineering",
      "Cross-Validation",
      "Agentic AI",
      "NLP",
      "Computer Vision",
    ],
  },
  {
    group: "Certifications",
    items: [
      "Harvard · CS50P: Python",
      "Harvard · CS50AI: Artificial Intelligence",
      "Anthropic · Advanced MCP",
      "Anthropic · Claude Code in Action",
      "Harvard · CS50x",
      "IBM · What is Data Science?",
    ],
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
    title: "Tech Lead · GT iOS Club",
    detail: "Selected to lead a 20-member iOS team for Fall 2026 — architecture, sprint planning, code reviews, and end-to-end delivery.",
    tag: "Leadership",
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
    title: "AI Research Intern · MBZUAI & GenBio AI",
    detail: "Built a 4-agent ML workflow with Claude and OpenClaw that outperformed baseline agents by 9% across 76 BioXArena tasks.",
    tag: "Research",
  },
  {
    title: "Published: Securing Machine Learning",
    detail: "Understanding Adversarial Attacks and Bias Mitigation (Sept 2024) — adversarial vulnerabilities and bias in ML systems.",
    tag: "Research",
  },
  {
    title: "Published: EunoKinetiX Operational Efficiency",
    detail: "Analyzed feasibility, efficiency gains, and societal impact of fleet optimization.",
    tag: "Research",
  },
  {
    title: "UAE National Chess Team · Top 0.01% on Chess.com",
    detail: "Represented the UAE Chess Team twice at the CISCE National Games; top 0.01% of players on Chess.com across multiple time controls, with a 2000 Elo rating.",
    tag: "Chess",
  },
];

// ============================================================
// HIGHLIGHT TICKER — the two marquee rows under the hero.
// Every item restates a fact from elsewhere in this file.
// ============================================================
export const ticker = {
  primary: [
    "Georgia Tech CS · 4.00 GPA",
    "AI Research · MBZUAI & GenBio AI",
    "Tech Lead · GT iOS Club",
    "ML Engineering · Reliance Jio",
    "AI & NLP Research · NUS",
    "AED 28K UAE Government Funding",
    "UAE National Chess Team",
  ],
  secondary: [
    "Agentic AI",
    "LLM Pipelines",
    "iOS · SwiftUI",
    "Backend Systems",
    "Computer Vision",
    "ML Forecasting",
    "Startup Cofounder",
    "Researcher",
  ],
};

// Featured callout at the top of the Recognition section.
export const spotlight = {
  value: "AED 28K",
  label: "UAE Government Funding",
  detail:
    "Awarded to EunoKinetix, the AI fleet-optimization startup I cofounded — Top 3 among UAE entrepreneurship projects.",
  watermark: "UAE",
};

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

/** Desktop scroll transition from a scene's title into its case study. */
export type SceneReveal =
  | "zoom"
  | "split"
  | "flip"
  | "blinds"
  | "scan"
  | "iris"
  | "tiles"
  | "slide"
  | "stack"
  | "decode";

export type Scene = {
  id: string;
  kind: "project" | "role";
  kicker: string; // short chapter label, e.g. "AI Agents"
  title: string;
  subtitle: string; // role / position line
  summary: string;
  metrics?: SceneMetric[];
  tags: string[];
  hue: number; // 0–360; legacy, no longer used for color (single signal accent)
  reveal?: SceneReveal; // defaults to "zoom"; give each scene its own
  image?: string; // optional /public path; falls back to the typographic cover
  github?: string;
};

export const scenes: Scene[] = [
  {
    id: "mbzuai-genbio",
    kind: "role",
    kicker: "AI Research",
    title: "Biomedical AI Agents",
    subtitle: "AI Research Intern · MBZUAI & GenBio AI",
    summary:
      "A 4-agent Python ML workflow built with Claude and OpenClaw for iterative experimentation on BioXArena — outperforming baseline agents by 9% across 76 biomedical tasks, backed by a 3-round evaluation pipeline and a 3,662-dimensional TF-IDF system for cross-task strategy retrieval.",
    metrics: [
      { value: "+9%", label: "Over baseline agents · 76 tasks" },
      { value: "Up to 30%", label: "Task-performance gain" },
      { value: "3,662", label: "TF-IDF dimensions for strategy retrieval" },
    ],
    tags: ["Claude", "Agentic AI", "OpenClaw", "Biomedical ML"],
    hue: 265,
    reveal: "decode",
  },
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
    reveal: "split",
    github: "https://github.com/ArchitLakhaniii",
  },
  {
    id: "sidequest",
    kind: "project",
    kicker: "iOS",
    title: "SideQuest",
    subtitle: "Senior iOS Developer / Tech Lead · GT iOS Club",
    summary:
      "A social adventure app where users complete real-world quests, collaborate with friends, and share challenges through posts, photos, comments, and reactions. Shipped to 100+ testers with 6+ SwiftUI + Firebase features.",
    tags: ["Swift", "SwiftUI", "Firebase", "Firestore", "Kingfisher"],
    hue: 160,
    reveal: "flip",
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
    reveal: "blinds",
    github: "https://github.com/ArchitLakhaniii",
  },
  {
    id: "text-to-sql",
    kind: "project",
    kicker: "ML Engineering",
    title: "Jio Text-to-SQL LLM",
    subtitle: "ML Intern · Reliance Jio",
    summary:
      "LLM pipeline translating natural language into SQL for structured-data retrieval. Fine-tuning with Hugging Face Transformers and LangChain raised translation accuracy by 8%; an end-to-end LangChain + Ollama + SQL pipeline cut query-generation time by 50% and improved downstream retrieval accuracy by 60%.",
    metrics: [
      { value: "+8%", label: "Text-to-SQL translation accuracy" },
      { value: "−50%", label: "Query-generation time" },
      { value: "+60%", label: "Downstream retrieval accuracy" },
    ],
    tags: ["Python", "LangChain", "Hugging Face", "Ollama", "SQL", "NLP"],
    hue: 280,
    reveal: "scan",
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
    reveal: "iris",
  },
  {
    id: "flashfind",
    kind: "project",
    kicker: "Full-Stack ML",
    title: "FlashFind",
    subtitle: "Full-Stack / ML Developer",
    summary:
      "Real-time campus buyer-seller matching. A React/TypeScript + FastAPI platform turns natural-language requests into structured JSON with Gemini and stores listings in MongoDB; a Random Forest classifier trained on 400+ synthetically generated examples predicts the best seller matches.",
    metrics: [{ value: "400+", label: "Labeled training examples" }],
    tags: ["React", "TypeScript", "Python", "FastAPI", "MongoDB", "scikit-learn", "Gemini"],
    hue: 330,
    reveal: "tiles",
    github: "https://github.com/ArchitLakhaniii",
  },
  {
    id: "cs1331-ta",
    kind: "role",
    kicker: "Teaching",
    title: "CS 1331 Teaching Assistant",
    subtitle: "Georgia Tech · College of Computing",
    summary:
      "Supporting 300+ students in Java and object-oriented programming through recitations and office hours on generics, inheritance, polymorphism, file I/O, exceptions, and debugging — resolving 50+ unique implementation errors every week.",
    metrics: [
      { value: "300+", label: "Students supported" },
      { value: "50+", label: "Java errors resolved weekly" },
    ],
    tags: ["Java", "OOP", "Mentorship"],
    hue: 45,
    reveal: "slide",
  },
  {
    id: "gt-ios-club",
    kind: "role",
    kicker: "iOS Engineering",
    title: "GT iOS Club",
    subtitle: "Senior iOS Developer / Tech Lead",
    summary:
      "Shipped SideQuest to 100+ testers with 6+ SwiftUI + Firebase features spanning quests, feeds, profiles, uploads, and reactions — then selected to lead a 20-member iOS team for Fall 2026, owning architecture, sprint planning, code reviews, and Git workflows. Won the club's Demo Day Pitch Competition with BirthdayPal.",
    metrics: [
      { value: "100+", label: "SideQuest testers" },
      { value: "20", label: "Engineers led · Fall 2026" },
      { value: "Winner", label: "Demo Day Pitch Competition" },
    ],
    tags: ["SwiftUI", "Firebase", "Leadership"],
    hue: 145,
    reveal: "stack",
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
    reveal: "zoom",
  },
];
