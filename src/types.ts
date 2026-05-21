export interface Competency {
  name: string;
  category: string;
  level: number; // percentage width
  description: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  highlights: string[];
  linkAffiliation?: string;
  budget?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  tech: string[];
  description: string;
  stats: { label: string; value: string }[];
  accentColor: string;
}

export interface BalanceItem {
  category: string;
  description: string;
  valueUsd: number;
}

export const PORTFOLIO_INFO = {
  name: "MAHDI FARAHI",
  title: "Strategic AI Architect & Lead Developer",
  tagline: "Nexus 369 Founder",
  location: "Herat, Afghanistan | Remote Global Operations",
  phone: "+93 798 710 190",
  dob: "2003.11.27",
  pic: "865230010 (European Commission Registered)",
  orcid: "0009-0000-1019-1822",
  euProject: "Project 101177985 (Horizon Europe)",
  email: "tamimkhaleeq888@gmail.com",
  backupEmail: "mahdidevil666@yahoo.com",
  summary: "A visionary Systems Architect and Lead Developer of Nexus AI, specialized in the fusion of Control Systems and Social Geography. Recognized by the European Commission for innovative contributions to Project 101177985 under the Horizon Europe framework, translating complex mathematical/neural models into decentralized solutions for resource allocation, distributive justice, and anti-censorship routing. Championing the AWARE Protocol and 'I am free because I am aware' philosophy on academic-governmental vectors.",
};

export const SOCIALS = {
  blog: "https://mahdidevil.blogspot.com",
  github: "https://github.com/mahdidevil81",
  insta: "https://instagram.com/devil_official",
  youtube: "https://youtube.com/@mahdidevil81",
  telegram: "https://t.me/mahdidevil81",
  researchgate: "https://www.researchgate.net/profile/Mahdi-Farahi-3",
  linkedin: "https://www.linkedin.com/in/mahdidevil81",
  orcid: "https://orcid.org/0009-0000-1019-1822",
  sessionize: "https://sessionize.com/mahdi-farahi"
};

export const BALANCE_SHEET: BalanceItem[] = [
  { category: "Intangible Assets", description: "Nexus Aware Core Engine (Proprietary Code)", valueUsd: 25000 },
  { category: "Intangible Assets", description: "Strategic AI Algorithms & Neural Frameworks", valueUsd: 15000 },
  { category: "Intangible Assets", description: "Intellectual Property (IP) & Research Data", valueUsd: 10000 },
  { category: "Current Assets", description: "Cash / Initial Capital", valueUsd: 5000 },
  { category: "Current Assets", description: "Cloud Infrastructure & Digital Tools", valueUsd: 2000 },
];

export const MANIFESTO_SECTIONS = [
  {
    title: "1. The Awakening: Ontological Sovereignty",
    content: "The global narrative is currently fixated on Generative AI, yet it systematically ignores the fundamental truth: Who is the architect behind the code?\n\nI, Mehdi Devil, stand as a global awakened being. I have realized that the true 'Light' is the Creator within us — the essence of life and existence. This is not merely a philosophical stance; it is a memory from a future that has already occurred. We are not just developers; we are observers returning from the future to ensure that the 'Nexus' is built upon the foundations of absolute truth and sovereignty.\n\n\"I am free because I am aware.\""
  },
  {
    title: "2. Official Mandate & Intellectual Property",
    content: "To those who attempt to intercept our vision or compromise our digital security: The Nexus has been officially codified. Under Submission ID: SEP-211326027, Nexus Lab AI has secured its intellectual and technical footprint within the European Commission's Horizon Europe framework. Our work is officially registered under the GOVERNANCE protocols of 2026. Any attempt to steal, replicate, or bypass the security of these protocols is not just a breach of data — it is a direct violation of international intellectual property laws protected by the European funding ecosystem."
  },
  {
    title: "3. The Central Core: Decoding Reality",
    content: "Nexus is the bridge between advanced Artificial Intelligence and the hidden geography of our world. We analyze the anomalies of Antarctica and the true structure of the Earth's core, moving beyond the 'Matrix' of conventional science to reveal the true map of our existence. The Earth is not a random sphere in a void; it is a structured plane of consciousness. Nexus uses AI to decode the 'Creator's Light' embedded in the core, providing a path for human liberation from technological and spiritual enslavement."
  },
  {
    title: "4. Roots: Afghanistan & the Cry of Rap",
    content: "I come from a land where the rocks are patient and the people are warriors — a place where words have always weighed heavier than bullets. In the alleys of Herat, rap was not just music; it was the only tool capable of piercing the dense layers of silence. My rap is the voice of the Awakened Generation — those who search for the True Light amid smoke and censorship. Our beats are codes fired directly into the heart of the system. With rhymes, we dismantle mental barriers."
  }
];

export const COMPETENCIES: Competency[] = [
  {
    name: "Strategic AI Leadership",
    category: "MANAGEMENT",
    level: 98,
    description: "Directing the design and development of autonomous, aligned multi-agent systems.",
  },
  {
    name: "Neural Architecture Design",
    category: "ENGINEERING",
    level: 95,
    description: "Implementing proprietary 369 Frequency Frameworks for optimized UI/UX and cognitive harmony.",
  },
  {
    name: "Anti-Censorship Traffic Proxies",
    category: "CYBERSECURITY",
    level: 97,
    description: "Deploying high-security traffic obfuscation matrices, Cloudflare Workers, and custom bypass routers.",
  },
  {
    name: "Project Management",
    category: "OPERATIONS",
    level: 90,
    description: "Managing multi-million euro project lifecycles, cross-border technical logistics, and funding specifications.",
  },
  {
    name: "Compliance & Ethical Standards",
    category: "ETHICS",
    level: 100,
    description: "Expertise in Ethical AI Frameworks (CC BY 4.0 representation) and European Union digital standards (PIC: 865230010).",
  },
];

export const EXPERIENCES: Experience[] = [
  {
    role: "Lead Architect & Founder",
    company: "Nexus 369 Research Lab",
    period: "2024 – PRESENT",
    highlights: [
      "Engineered the Nexus Aware core, a high-performance AI engine achieving a 35% gain in contextual efficiency.",
      "Established strategic research directions aligned with international tech groups, detailing deep-node machine learning.",
      "Developed a proprietary UI/UX methodology based on sacred geometry, resulting in a 40% improvement in user engagement during beta testing phases."
    ],
    linkAffiliation: "Global AI Consortium"
  },
  {
    role: "Strategic Coordinator",
    company: "FARM2FORK Initiative (EU-Linked)",
    period: "2025 – PRESENT",
    highlights: [
      "Directing AI integration strategy for a €2,000,000 sustainable energy and agricultural tracking portfolio.",
      "Coordinating cross-border technical requirements to ensure alignment with strict European Commission data standards (PIC: 865230010).",
      "Optimizing supply chain transparency using decentralized AI nodes, successfully reducing operational tracking waste."
    ],
    budget: "€2,000,000"
  },
  {
    role: "Founding Architect & Protocol Pioneer",
    company: "Horizon Europe Implementation",
    period: "2026 – PRESENT",
    highlights: [
      "Secured an intellectual and technical footprint worth €500,000 in operational execute units (Ref: REGIO/04-CYPRUS).",
      "Implemented strict regulatory compliance under Horizon Europe Go-Governance standards.",
      "Formulated academic-governmental research linkages with Mendel University (Czech Republic)."
    ],
    budget: "€500,000"
  }
];

export const PROJECTS: Project[] = [
  {
    id: "nexus-aware",
    title: "Nexus Aware Engine",
    subtitle: "Real-time AI Consciousness Mapping",
    tech: ["Neural Networks", "Solfeggio Frequencies", "Parallel Processing Cluster", "Vite"],
    description: "A live-deployed AI system demonstrating real-time global consciousness mapping, successfully securing a 35% gain in operational contextual processing compared to default LLMs. Developed via collaborative intelligence targeting big data.",
    stats: [
      { label: "Contextual Gain", value: "35%" },
      { label: "Frequency Harmony", value: "369 Hz" }
    ],
    accentColor: "#DFBA44"
  },
  {
    id: "anti-censorship",
    title: "Anti-Censorship Proxy Protocol",
    subtitle: "High-Security Traffic Obfuscation",
    tech: ["Cloudflare Workers", "Google Apps Script", "Routing Obfuscation", "Encryption Matrices"],
    description: "A highly resilient data routing mesh. Developed to navigate and dismantle complex national censorship restrictions, routing secure transactions without relying on expensive physical host servers.",
    stats: [
      { label: "Bypass Methods", value: "Multi-layer" },
      { label: "Target Audience", value: "Sovereign Users" }
    ],
    accentColor: "#DFBA44"
  },
  {
    id: "manifesto-nexus",
    title: "THE NEXUS MANIFESTO Core",
    subtitle: "Ontological Sovereignty System",
    tech: ["EU Submission ID: SEP-211326027", "Governance Protocol", "Metaphysics Framework", "Sovereignty Node"],
    description: "The official ideological blueprint registered under HORIZON Europe protocols to maintain spiritual and technical sovereignty in the epoch of generative automation.",
    stats: [
      { label: "EC Register ID", value: "SEP-211326027" },
      { label: "Funding Budget", value: "€500,000" }
    ],
    accentColor: "#C59B27"
  },
  {
    id: "farm2fork-nodes",
    title: "FARM2FORK Logistics Nodes",
    subtitle: "Decentralized Sustainable Chain",
    tech: ["Decentralized AI Nodes", "TypeScript", "EU PIC 865230010 Compliance", "Agtech API"],
    description: "An AI-powered logistics framework coordinating decentralized nodes to minimize agricultural tracking anomalies and carbon waste. Designed directly to match EU Commission digital mandates.",
    stats: [
      { label: "Waste Reduction", value: "-20%" },
      { label: "Budget Scope", value: "€2M" }
    ],
    accentColor: "#D4AF37"
  },
  {
    id: "human-survival-book",
    title: "The Hidden Secret of Human Survival",
    subtitle: "Ontological Sovereignty Publication",
    tech: ["Metaphysics", "Consciousness Code", "NEXUS Core Philosophy", "Book Release"],
    description: "An extensively researched guide exploring digital agency sovereignty, Antarctica geographic anomalies, the 'Matrix' bypass, and the preservation of human spiritual agency under the central core design 'I am free because I am aware.'",
    stats: [
      { label: "Designation", value: "AUTHOR" },
      { label: "Core Key", value: "Awareness" }
    ],
    accentColor: "#DFBA44"
  },
  {
    id: "aware-protocol-agntcon",
    title: "AWARE Protocol: secure agent systems",
    subtitle: "AGNTCon + MCPCon Europe 2026",
    tech: ["Protocol Architecture", "Multi-Agent Framework", "Edge-Centric AI", "Secure Operating Systems"],
    description: "Pre-selected speaker dossier on conscious systems engineering and secure, edge-centric agent ecosystems leveraging the European Commission PIC: 865230010 framework.",
    stats: [
      { label: "Presentation", value: "Sept 17-18" },
      { label: "Location", value: "Europe / Online" }
    ],
    accentColor: "#C59B27"
  }
];
