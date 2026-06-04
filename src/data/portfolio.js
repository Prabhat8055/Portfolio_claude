export const personalInfo = {
  name: "Prabhat Bhasme",
  title: "Aspiring Full Stack Developer",
  subtitle: "& Brain Stromer",
  tagline:
    "I build interfaces that live at the intersection of art and engineering.",
  email: "prabhatbhasme@gmail.com",
  location: "Pune ,Maharashtra",
  avatar: "./image.jpg", // Using initials fallback
  socials: {
    github: "https://github.com/prabhat8055",
    linkedin: "https://www.linkedin.com/in/prabhat-bhasme/",
    twitter: "https://twitter.com",
  },
};

export const roles = [
  "Java Full Stack Developer",
  "Creative Technologist",
  "Full Stack Web Developer",
  "Problem Solver",
];

export const about = { 
  bio: [
    "I'm a developer who believes great software is an art form.I operate at the boundary where engineering precision meets creative vision.",
    "My work spans from performant backend systems to pixel-perfect interfaces — always with an obsession for the details that most people never notice, but everyone feels.",
  ],
  stats: [
    { value: "Fresher", label: "Internship Experience" },
    { value: "2", label: "Projects Shipped" },
    { value: "2", label: "Publications" },
    { value: "1", label: "Patient" },
  ],
};

export const skills = [
  { name: "Java", level: 75, category: "Programming", color: "#ff9900" },
  {
    name: "React.js",
    level: 95,
    category: "Frontend",
    color: "#61dafb",
  },
  { name: "Spring Boot", level: 88, category: "Backend", color: "#68a063" },
  { name: "Hibernates", level: 82, category: "ORM", color: "#f45948" },
  { name: "MySQL", level: 80, category: "Database", color: "#336791" },
  {
    name: "C++",
    level: 72,
    category: "Programming",
    color: "#6c63ff",
  },
];

export const techStack = [
  { name: "React", icon: "SiReact", color: "#61dafb" },
  { name: "Next.js", icon: "SiNextdotjs", color: "#fff" },
  { name: "TypeScript", icon: "SiTypescript", color: "#3178c6" },
  { name: "Node.js", icon: "SiNodedotjs", color: "#68a063" },
  { name: "Python", icon: "SiPython", color: "#f7c948" },
  { name: "PostgreSQL", icon: "SiPostgresql", color: "#336791" },
  { name: "GraphQL", icon: "SiGraphql", color: "#e535ab" },
  { name: "Docker", icon: "SiDocker", color: "#2496ed" },
  { name: "AWS", icon: "SiAmazonaws", color: "#ff9900" },
  { name: "Figma", icon: "SiFigma", color: "#f24e1e" },
  { name: "Three.js", icon: "SiThreedotjs", color: "#fff" },
  { name: "Rust", icon: "SiRust", color: "#ce412b" },
];

export const projects = [
  {
    id: 1,
    title: "NeuralCanvas",
    subtitle: "AI-Powered Creative Studio",
    description:
      "A real-time collaborative creative platform powered by diffusion models. Artists can generate, remix, and animate AI art with millisecond-latency streaming.",
    longDescription:
      "Built on a custom WebSocket architecture with Redis pub/sub for real-time collaboration. The inference pipeline uses ONNX-optimized models deployed on A100 clusters, achieving sub-200ms generation latency at scale. Features include multi-user canvas, style transfer, animation sequences, and NFT minting.",
    image: null,
    color: "#6c63ff",
    tags: ["React", "WebSockets", "Python", "ONNX", "Redis", "AWS"],
    github: "#",
    live: "#",
    featured: true,
    year: "2024",
  },
  {
    id: 2,
    title: "Synapse DB",
    subtitle: "Graph Database Engine",
    description:
      "A high-performance graph database written in Rust with a GraphQL query layer. Processes 1M+ traversals/sec on commodity hardware.",
    longDescription:
      "Implements a novel adjacency-list storage format with SIMD-optimized traversal. The query planner uses cost-based optimization with learned cardinality estimates. Ships with a visual query builder and real-time execution plan visualization.",
    image: null,
    color: "#00d4ff",
    tags: ["Rust", "GraphQL", "WASM", "C++", "SIMD"],
    github: "#",
    live: "#",
    featured: true,
    year: "2024",
  },
  {
    id: 3,
    title: "Orbit Design System",
    subtitle: "Component Library & Design Tokens",
    description:
      "A themeable, accessible component library with 80+ components, design tokens, and a live Figma integration for design-to-code workflows.",
    longDescription:
      "Built with Radix UI primitives and a custom styling engine. The Figma plugin syncs design tokens bidirectionally, enabling designers to push changes directly to production CSS variables. Comprehensive a11y testing with axe-core integration.",
    image: null,
    color: "#43e97b",
    tags: ["TypeScript", "React", "Radix UI", "Figma API", "Storybook"],
    github: "#",
    live: "#",
    featured: false,
    year: "2023",
  },
  {
    id: 4,
    title: "Flux Protocol",
    subtitle: "Decentralized Data Streaming",
    description:
      "A peer-to-peer data streaming protocol for IoT devices with end-to-end encryption and sub-10ms latency over local networks.",
    longDescription:
      "Uses a custom binary protocol over UDP with QUIC-like reliability guarantees. The encryption layer implements forward secrecy with rotating session keys. Supports 10,000+ concurrent device connections on a single node.",
    image: null,
    color: "#ff6584",
    tags: ["Go", "WebRTC", "Cryptography", "MQTT", "Protocol Buffers"],
    github: "#",
    live: "#",
    featured: false,
    year: "2023",
  },
];

export const experience = [
  {
    type: "work",
    title: "Senior Frontend Engineer",
    company: "Anthropic",
    location: "San Francisco, CA",
    period: "2023 — Present",
    description:
      "Leading the developer experience team building internal tooling for AI researchers. Architected the evaluation dashboard serving 200+ researchers.",
    highlights: [
      "Built real-time eval pipelines with WebSockets",
      "Led migration to TypeScript (0→100% coverage)",
      "Reduced dashboard load time by 68%",
    ],
    color: "#6c63ff",
  },
  {
    type: "work",
    title: "Full Stack Engineer",
    company: "Figma",
    location: "San Francisco, CA",
    period: "2021 — 2023",
    description:
      "Core team member on the multiplayer collaboration engine. Worked on CRDT implementation and operational transform algorithms.",
    highlights: [
      "Co-authored the branching & merging system",
      "Optimized WebSocket message compression by 40%",
      "Open-sourced internal state-sync library (8k stars)",
    ],
    color: "#ff6584",
  },
  {
    type: "work",
    title: "Software Engineer",
    company: "Vercel",
    location: "Remote",
    period: "2019 — 2021",
    description:
      "Built the Edge Functions runtime and developer-facing CLI tooling. Contributed to the Next.js open source project.",
    highlights: [
      "Shipped Edge Middleware v1.0",
      "Core contributor to Next.js App Router",
      "Reduced cold-start latency by 3x",
    ],
    color: "#00d4ff",
  },
  {
    type: "education",
    title: "B.S. Computer Science",
    company: "UC Berkeley",
    location: "Berkeley, CA",
    period: "2015 — 2019",
    description:
      "Specialized in systems programming and HCI. Thesis on adaptive rendering techniques for low-power devices.",
    highlights: [
      "Summa Cum Laude",
      "Berkeley AI Research Lab",
      "ACM ICPC Regional Finalist",
    ],
    color: "#43e97b",
  },
];
