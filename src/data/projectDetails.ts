// ============================================================
// PROJECT CASE-STUDY DETAILS
// Source of truth migrated from the legacy `project.html` PROJECTS
// object. Keyed by the SAME ids used in profile.ts (projects/scenes)
// so the homepage can link to /work/[id] directly.
//
// Rich HTML from the old `longDesc` / `appStructure` strings was
// converted into structured DetailBlock[] so it renders safely
// (no dangerouslySetInnerHTML). Inline emphasis is preserved with a
// tiny markdown subset: **bold** and `code`.
// Wording is preserved from project.html. No invented claims.
// ============================================================

export type DetailBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "code"; text: string };

export type Officers = {
  technicalLeaders?: string[];
  seniorDevelopers?: string[];
  seniorDesigner?: string;
};

export type ProjectResources = {
  website?: string;
  github?: string;
  youtube?: string;
  devpost?: string;
  demoVideo?: string;
  pdf?: string;
  notebook?: string;
  image?: string;
};

export type ProjectStats = {
  stars?: number;
  watchers?: number;
  forks?: number;
  funding_aed?: number;
};

export type ProjectDetail = {
  slug: string;
  title: string;
  role: string;
  desc: string;
  longDesc?: DetailBlock[];
  contributions?: string[];
  officers?: Officers;
  appStructure?: DetailBlock[];
  tags?: string[];
  extras?: string;
  resources?: ProjectResources;
  stats?: ProjectStats;
  // Schema-complete for future content (unused by current data):
  architecture?: DetailBlock[];
  naming?: DetailBlock[];
  viewModels?: DetailBlock[];
  gitWorkflow?: DetailBlock[];
  workflowSummary?: string;
};

export const projectDetails: Record<string, ProjectDetail> = {
  sidequest: {
    slug: "sidequest",
    title: "SideQuest",
    role: "Senior iOS Developer · GT iOS Club",
    desc: "Make traveling more fun by turning every place into an adventure you can explore, play, and remember! Built with a full SwiftUI + Firebase stack.",
    longDesc: [
      {
        type: "paragraph",
        text: "SideQuest is a social adventure iOS app built as the GT iOS Club Spring 2026 project. It encourages exploration by turning locations into quests users can complete, share, and collaborate on. The app emphasizes social interactions, shared experiences, and discoverability via a feed of user-generated quests and posts.",
      },
      {
        type: "paragraph",
        text: "Key product goals: make discovery of nearby activities effortless, encourage collaborative play through shared quests, and create a lightweight social layer focused on short-form achievements and photos.",
      },
    ],
    contributions: [
      "Built core SwiftUI + Firebase features across quests, feeds, profiles, collaboration, and leaderboards.",
      "Helped implement quest posting and collaborator flows.",
      "Worked on image uploads and Firestore-backed social features.",
      "Built and redesigned UI components such as ranking cards and profile/feed views.",
      "Integrated real-time social interactions such as comments, reactions, and collaborative quest posts.",
    ],
    officers: {
      technicalLeaders: ["Amber Verma", "Nithya Ravula"],
      seniorDevelopers: ["Artem Kim", "Brian Pan", "Archit Lakhani", "Aditya Jha"],
      seniorDesigner: "Janet Chang",
    },
    appStructure: [
      { type: "heading", text: "SideQuest — iOS Club Spring 2026 Project" },
      {
        type: "paragraph",
        text: "The SideQuest app is organized into shared code and feature-based folders.",
      },
      {
        type: "paragraph",
        text: "**Common** — The Common folder contains code used throughout the app. This includes models, reusable UI components, Firebase files, etc. This helps avoid duplication and keeps shared logic in one place.",
      },
      {
        type: "paragraph",
        text: "**Feature folders** — Each major part of the app has its own folder: Home, Profile, Feed. Each feature folder is divided into Views and ViewModels.",
      },
      {
        type: "code",
        text: "Home\n  Views\n  ViewModels\nFeed\n  Views\n  ViewModels\nProfile\n  Views\n  ViewModels",
      },
      { type: "paragraph", text: "This keeps features modular and easy to maintain." },
    ],
    resources: { demoVideo: "https://youtube.com/shorts/A0aAJUHVLow" },
    stats: { stars: 2, watchers: 0, forks: 0 },
  },

  tastecast: {
    slug: "tastecast",
    title: "TasteCast",
    role: "Cofounder + Technical Builder",
    desc: "TasteCast is an AI-powered demand forecasting and inventory optimization platform for small and independent restaurants. It helps restaurants predict daily item demand, plan inventory, reduce food waste, avoid stockouts, and make smarter prep or promotion decisions using data-driven forecasts.",
    longDesc: [
      {
        type: "paragraph",
        text: "TasteCast helps independent restaurants turn historical sales and transactional data into actionable forecasts and stocking recommendations. The product focuses on ease-of-use for small teams: daily demand predictions, clear actionable signals (BUY, OK, SURPLUS), and weekly advisories for prep and promotions.",
      },
      {
        type: "paragraph",
        text: "Designed to reduce food waste, avoid costly stockouts, and simplify planning for kitchens with limited staff and storage.",
      },
    ],
    contributions: [
      "Built the core forecasting MVP using Python, pandas, and scikit-learn.",
      "Implemented CSV data ingestion and feature engineering pipelines to clean and transform raw restaurant data.",
      "Built demand prediction models and inventory/stocking signals that output recommendations like BUY, OK, or SURPLUS and weekly advisories.",
      "Designed backend logic that translates forecast outputs into actionable recommendations for operators.",
    ],
    appStructure: [
      { type: "heading", text: "Tech stack & architecture (summary)" },
      {
        type: "paragraph",
        text: "High level: TasteCast ingests restaurant CSV data, canonicalizes it, runs per-store×menu-item forecasting, and translates forecasts into ingredient-level demand and inventory advisories.",
      },
      { type: "heading", text: "Core backend responsibilities" },
      {
        type: "list",
        items: [
          "Ingest CSV uploads (multi-file or an all-in-one CSV) via an API endpoint (e.g. `/api/ingest`).",
          "Auto-detect upload mode: sales-only, multi-file (sales/recipes/ingredients/inventory), or all-in-one rows.",
          "Normalize/split incoming data into internal tables: `sales_df_raw`, `recipe_df_raw`, `ingredient_df_raw`, `inventory_df_raw`.",
          "Canonicalize fields (date, store, menu_item, qty_sold) and run per-store×menu forecasting.",
          "Use recipes + ingredient metadata + inventory snapshots to derive ingredient demand, simulate inventory, and emit BUY/OK/SURPLUS advisories.",
        ],
      },
      { type: "heading", text: "Project layout" },
      {
        type: "code",
        text: "tastecast/\n├─ api/\n│  ├─ ingest/        # endpoint + file parsing + mode detection\n│  ├─ forecast/      # forecast output endpoints\n│  └─ ingredient-plan/ # advisories, planning\n├─ core/\n│  ├─ preprocessing/ # column mapping, dedupe, date parsing\n│  ├─ forecasting/   # per store×item forecast logic\n│  ├─ recipes/       # menu-item to ingredient expansion\n│  └─ inventory/     # inventory simulation and advisories\n├─ uploads/          # sample CSVs for tests\n├─ schemas/          # CSV specs / field defs\n└─ frontend/         # upload UI, dashboards",
      },
      {
        type: "paragraph",
        text: "This architecture cleanly separates ingestion, preprocessing, forecasting, and planning, allowing graceful degradation if only sales are available.",
      },
    ],
    tags: ["Python", "pandas", "scikit-learn", "Forecasting", "ML"],
    extras: "Featured · Startup",
    resources: {
      website: "https://www.tastecast.me/",
      demoVideo: "https://youtu.be/fKMd_QUdI0g",
    },
  },

  flashfind: {
    slug: "flashfind",
    title: "FlashFind",
    role: "Full-Stack / ML Developer",
    desc: 'Hyperlocal AI marketplace: users submit natural-language "Flash Requests" and the system parses intent with an LLM then Smart-Pings nearby students ranked by a Random Forest to fulfill needs in minutes.',
    longDesc: [
      { type: "heading", text: "Inspiration" },
      {
        type: "paragraph",
        text: "Built to solve urgent student needs (forgotten charger, last-minute textbook) by turning campus inventory into an on-demand network — faster than fragmented marketplaces and better for community reuse.",
      },
      { type: "heading", text: "What it does" },
      {
        type: "paragraph",
        text: "Students submit a short natural-language Flash Request; an LLM parses intent and item, and a lightweight ML classifier ranks and Smart-Pings nearby students most likely to help. The flow is optimized for speed, low noise, and privacy.",
      },
      { type: "heading", text: "How we built it" },
      {
        type: "paragraph",
        text: "Two-step AI pipeline: Google Gemini for language-to-JSON parsing, then a scikit-learn Random Forest (saved as a .joblib) for fast logical matching. Backend is FastAPI (Python) with MongoDB, frontend is React + TypeScript.",
      },
      { type: "heading", text: "Challenges & wins" },
      {
        type: "paragraph",
        text: "Key challenges were data alignment with training vs live data and solving cold-start via a synthetic-data factory. We're proud of integrating the Two-Step AI and training a custom Random Forest from synthetic examples.",
      },
      { type: "heading", text: "What's next" },
      {
        type: "paragraph",
        text: "Scale to other communities and emergency scenarios where rapid resource distribution matters.",
      },
    ],
    tags: ["Python", "FastAPI", "MongoDB", "Gemini", "React", "Tailwind"],
    resources: {
      website: "https://flashfind.tech/",
      github: "https://github.com/benmorrissey06/aiatlwinningproject",
      youtube: "https://www.youtube.com/watch?v=GLwls6jSdPU",
      devpost: "https://devpost.com/software/flashfind",
    },
    extras: "Featured · Web/AI",
  },

  gitgood: {
    slug: "gitgood",
    title: "gitGood",
    role: "Full-Stack / AI Workflow Developer",
    desc: "AI code analysis tool that converts GitHub repos into interactive, beginner-friendly walkthroughs — it maps structure, generates diagrams, and creates step-by-step tutorials using Mastra and LLM-assisted analysis.",
    longDesc: [
      { type: "heading", text: "The problem" },
      {
        type: "paragraph",
        text: "Open-source repos can be overwhelming. Outdated docs and disorganized files create a barrier to contribution. GitGood simplifies this by converting any GitHub repo into a clear, interactive tutorial.",
      },
      { type: "heading", text: "The solution" },
      {
        type: "paragraph",
        text: "GitGood analyzes a repo's files, architecture, and logic, generates high-level maps and diagrams, and produces multi-page, beginner-friendly walkthroughs with clickable node trees and explanations.",
      },
      { type: "heading", text: "What it does" },
      {
        type: "list",
        items: [
          "Fetches a GitHub repo and extracts code structure automatically.",
          "Generates a high-level overview and maps component relationships.",
          "Breaks down code into digestible tutorial chapters with diagrams.",
          "Provides interactive, clickable code diagrams for exploration.",
        ],
      },
      { type: "heading", text: "How we built it" },
      {
        type: "paragraph",
        text: "Tech: React + TypeScript (Next.js) frontend, Mastra Agent workflows, Google Gemini, libSQL, and a backend that fetches repos, runs analysis, and packages a UI-ready JSON payload for the frontend.",
      },
      { type: "heading", text: "Challenges" },
      {
        type: "paragraph",
        text: "Integrating frontend and backend workflows, avoiding AI hallucination by enforcing structured prompts and file splitting, and building a robust pipeline that outputs consistent, UI-ready data.",
      },
      { type: "heading", text: "Accomplishments & what's next" },
      {
        type: "paragraph",
        text: "We learned Mastra end-to-end, shipped a working prototype, and plan to add language support, a built-in AI chatbot per page, and smarter, skill-adaptive explanations.",
      },
    ],
    tags: ["Next.js", "TypeScript", "Mastra", "AI Agents", "Markdown"],
    resources: {
      website: "https://gitgood.work",
      github: "https://github.com/deadly-nightshade/hackatgt25",
      youtube: "https://www.youtube.com/watch?v=7wa2r_rMioc",
      devpost: "https://devpost.com/software/gitgood-1qir93",
    },
    extras: "Featured",
  },

  eunokinetix: {
    slug: "eunokinetix",
    title: "EunoKinetix",
    role: "Cofounder",
    desc: "KinetiX is a fleet management system that helps logistical providers monitor vehicles and optimize operations using AI-driven routing and simulations.",
    longDesc: [
      {
        type: "paragraph",
        text: "KinetiX is a revolutionary fleet management system developed by a team of three high school students from GEMS Modern Academy Dubai. It empowers logistical service providers to track and manage vehicles (buses, trucks) with real-time maintenance, vehicle history, registration, and operational data.",
      },
      {
        type: "paragraph",
        text: "At the heart of KinetiX is **Eunex**, an AI model and algorithm that performs dynamic route optimization by considering payload, weather, traffic, and geography to improve efficiency and safety.",
      },
      { type: "heading", text: "Milestones & funding" },
      {
        type: "paragraph",
        text: "Supported by GEMS management and community recognition. Winner of the Ru'ya Next Founders Competition (AED 20,000) and first place in the GEMS Modern Academy Entrepreneurship Competition (Project Prism). We also raised AED 8,000 via crowdfunding — total support: AED 28,000.",
      },
    ],
    tags: ["Python", "Graph Algorithms", "Dijkstra", "Route Optimization"],
    resources: { image: "/work/eunokinetix.png" },
    extras: "Featured · Funded",
    stats: { funding_aed: 28000 },
  },

  birthdaypal: {
    slug: "birthdaypal",
    title: "BirthdayPal",
    role: "iOS Developer / Team Lead Contributor",
    desc: "SwiftUI iOS app for birthday tracking and AI-generated personalized birthday messages. Won the GT iOS Club Demo Day Pitch Competition.",
    contributions: [
      "Built a SwiftUI iOS application for tracking birthdays.",
      "Helped lead a team project that won the GT iOS Club Demo Day Pitch Competition.",
      "Created an LLM pipeline using Apple's Foundation Model in Swift to generate personalised messages per user.",
    ],
    tags: ["Swift", "SwiftUI", "iOS", "AI Content"],
    resources: { youtube: "https://www.youtube.com/watch?v=eJ7s6XHZhao" },
    extras: "Award Winner",
  },

  "text-to-sql": {
    slug: "text-to-sql",
    title: "Text-to-SQL LLM",
    role: "ML Intern · Reliance Jio",
    desc: "Built an AI-powered SQL chatbot that converts natural language questions into executable SQL and displays results in a Streamlit UI.",
    longDesc: [
      {
        type: "paragraph",
        text: "Built an AI-powered SQL chatbot during my Jio internship that allows users to ask questions in natural language and automatically converts them into SQL queries. The system connects to a user-provided MySQL database, understands the database schema, generates the correct SQL query using an LLM, runs the query, and displays the result in a Streamlit web interface.",
      },
      {
        type: "paragraph",
        text: "Technically, I used Streamlit for the frontend, LangChain for LLM orchestration and prompt engineering, Ollama for local LLM integration, SQLDatabase for database connectivity, FAISS and OllamaEmbeddings for semantic similarity search, and Pandas for displaying query results as downloadable dataframes. The project also used structured output parsing to force the LLM response into a reliable SQL query format.",
      },
      {
        type: "paragraph",
        text: "I implemented two different query-generation pipelines: one optimized for faster runtime, and another optimized for higher accuracy. The faster version directly generates SQL using the user question, relevant database details, and example queries, while the more accurate version adds an extra LLM step to describe table data before generating the final SQL query.",
      },
      {
        type: "paragraph",
        text: "**Tech Stack:** Python, Streamlit, LangChain, Ollama, SQL, MySQL, Pandas, FAISS, OllamaEmbeddings, Pygwalker, ChromaDB",
      },
      { type: "heading", text: "Key Features" },
      {
        type: "list",
        items: [
          "Converted natural language questions into executable SQL queries",
          "Connected dynamically to MySQL databases using database name and URI",
          "Generated table descriptions and examples automatically for better LLM context",
          "Used embeddings and FAISS similarity search to retrieve relevant examples",
          "Displayed query results in Streamlit as interactive, downloadable dataframes",
          "Compared two LLM pipelines based on speed vs. accuracy tradeoffs",
        ],
      },
    ],
    tags: ["Python", "LangChain", "Ollama", "Streamlit", "SQL", "NLP"],
    resources: { pdf: "/work/jio-internship-report.pdf" },
    extras: "ML · Internship",
  },

  "nus-ml-nlp": {
    slug: "nus-ml-nlp",
    title: "AI / NLP Predictive Models",
    role: "AI & NLP Intern · NUS",
    desc: "AI / NLP projects: predictive analytics, chatbots, face recognition, and telecom churn prediction.",
    longDesc: [
      { type: "heading", text: "Technical Contributions" },
      {
        type: "list",
        items: [
          "Implemented ANN, CNN, RNN, regression, clustering, and decision tree models.",
          "Built and deployed chatbots using Amazon Lex.",
          "Built face recognition solutions using Amazon Rekognition.",
        ],
      },
      { type: "heading", text: "Telecom Customer Churn Prediction Project" },
      {
        type: "paragraph",
        text: "Built a machine learning project to analyze telecom customer behavior and predict customer churn using Python. The project cleaned and transformed a dataset of over 7,000 customers, explored churn patterns through visualizations, and compared multiple classification models to identify which factors were most strongly linked to customers leaving.",
      },
      {
        type: "paragraph",
        text: "Technically, I used Pandas and NumPy for data cleaning and preprocessing, converted categorical customer attributes into model-ready features with one-hot encoding, and used Matplotlib and Seaborn to visualize relationships between churn, tenure, contract type, monthly charges, and customer demographics. I then trained and evaluated several models, including Logistic Regression, Random Forest, Support Vector Machine, and an LSTM neural network, with the best model reaching around 82% accuracy.",
      },
      {
        type: "paragraph",
        text: "**Tech Stack:** Python, Pandas, NumPy, Scikit-learn, TensorFlow/Keras, Matplotlib, Seaborn",
      },
      { type: "heading", text: "Key Features" },
      {
        type: "list",
        items: [
          "Cleaned and preprocessed raw telecom customer data",
          "Handled missing values and converted categorical data into numerical features",
          "Visualized churn trends across contract type, tenure, charges, and demographics",
          "Trained and compared multiple ML models for churn prediction",
          "Interpreted model weights and feature importances to understand churn drivers",
        ],
      },
    ],
    contributions: [
      "Implemented ANN, CNN, RNN, regression, clustering, and decision tree models.",
      "Built and deployed chatbots using Amazon Lex.",
      "Built face recognition solutions using Amazon Rekognition.",
    ],
    tags: ["Python", "ANN", "CNN", "Amazon Lex", "Rekognition", "NLP"],
    resources: { notebook: "/work/nus-internship-notebook.html" },
    extras: "Research",
  },

  luvumom: {
    slug: "luvumom",
    title: "LuvUMom",
    role: "Founder",
    desc: "Breast cancer screening app based on a 1+1 social impact model: every paid screening subsidizes a free screening for a domestic helper. Focused on accessibility and preventive healthcare equity.",
    tags: ["Product Design", "Health Tech", "Social Impact", "MVP Design"],
    extras: "Startup · Social Impact",
  },

  "cultfit-meal-planner": {
    slug: "cultfit-meal-planner",
    title: "CULTFIT Meal-Planner",
    role: "Product Design Intern · JuniorMBA",
    desc: "Meal-planning app prototype in partnership with CULTFIT India. Designed Concierge, Wizard of Oz, and Piecemeal MVPs with a custom GUI and homepage applying user-centered design principles.",
    tags: ["UI/UX", "MVP Prototyping", "Product Design"],
    extras: "Web · Design",
  },

  "blueboat-research": {
    slug: "blueboat-research",
    title: "Autonomous BlueBoat Navigation Research",
    role: "Undergraduate Researcher · Georgia Tech",
    desc: "Research on perception and autonomous navigation for a BlueBoat surface vessel using computer vision, depth estimation, object detection, and sensor fusion.",
    longDesc: [
      {
        type: "paragraph",
        text: "I am working on research focused on building an autonomous navigation and perception system for a BlueBoat surface vessel. The project explores how computer vision, depth estimation, object detection, and sensor fusion can help the boat better understand its environment and navigate safely on water.",
      },
      {
        type: "paragraph",
        text: "My work focuses mainly on the perception side of the system. I have tested and compared different monocular depth estimation models, including Apple Depth Pro, MiDaS, ZoeDepth, and ORB-SLAM-based approaches, to evaluate how well they estimate distance from a single camera feed. A key part of this research is determining which models are accurate enough for navigation while still being lightweight enough to run on a Raspberry Pi 5 onboard the boat.",
      },
      {
        type: "paragraph",
        text: "I am also contributing to the broader navigation pipeline through YOLOv10-based object detection research, sonar-based position estimation using an Extended Kalman Filter, and high-level navigation logic for autonomous movement. Together, these components help the boat detect obstacles, estimate distance, track its position, and make safer navigation decisions.",
      },
      { type: "heading", text: "Technical Focus" },
      {
        type: "list",
        items: [
          "Tested monocular depth estimation models for camera-based obstacle awareness",
          "Compared Apple Depth Pro, MiDaS, ZoeDepth, and ORB-SLAM-style approaches",
          "Evaluated model performance based on accuracy, depth quality, speed, and Raspberry Pi 5 feasibility",
          "Supported YOLOv10 object detection research for identifying obstacles in the boat's surroundings",
          "Worked with sonar-based position estimation using an Extended Kalman Filter",
          "Helped design the perception and navigation pipeline for autonomous BlueBoat movement",
        ],
      },
    ],
    tags: ["Computer Vision", "Depth Estimation", "YOLOv10", "Sensor Fusion", "Robotics"],
    extras: "Research",
  },
};

export const projectDetailSlugs = Object.keys(projectDetails);

export const hasDetail = (id: string): boolean => id in projectDetails;
