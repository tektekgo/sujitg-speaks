import postgres from "postgres";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("DATABASE_URL environment variable is not set");
  process.exit(1);
}

const sql = postgres(DATABASE_URL);

const talks = [
  {
    title: "Building an Enterprise Automation Platform in Banking",
    subtitle: "A real-world journey with Red Hat AAP in a regulated financial institution",
    abstract: "Learn how to design, build, and deploy an enterprise-grade automation platform in a highly regulated banking environment. This talk covers practical strategies for overcoming compliance challenges, scaling automation across teams, and delivering measurable business outcomes.",
    keyTakeaways: JSON.stringify([
      "Enterprise automation architecture patterns for regulated industries",
      "Compliance-first approach to infrastructure automation",
      "Team scaling and knowledge transfer strategies",
      "Measuring ROI and business impact of automation"
    ]),
    audienceFit: "CTOs, IT Directors, DevOps Leaders, Enterprise Architects in Financial Services",
    formatOptions: JSON.stringify(["Keynote (45-60 min)", "Technical Talk (60-90 min)", "Workshop (3-4 hours)"])
  },
  {
    title: "Agentic AI for DevOps & Infrastructure Teams",
    subtitle: "Moving from automation to autonomous systems",
    abstract: "Explore how agentic AI is transforming DevOps and infrastructure management. Discover practical applications of AI agents for incident response, capacity planning, and infrastructure optimization. Learn how to integrate AI into your existing DevOps workflows without disrupting operations.",
    keyTakeaways: JSON.stringify([
      "Understanding AI agents vs traditional automation",
      "Real-world use cases for agentic AI in DevOps",
      "Integration patterns with existing tools and workflows",
      "Governance and safety considerations for autonomous systems"
    ]),
    audienceFit: "DevOps Engineers, Infrastructure Teams, Technology Leaders, AI Enthusiasts",
    formatOptions: JSON.stringify(["Keynote (45-60 min)", "Technical Talk (60-90 min)", "Panel Discussion"])
  },
  {
    title: "Developer Platforms: Rebuilding CI/CD for a Modern Enterprise",
    subtitle: "Designing scalable, secure, high-speed pipelines with AI assistance",
    abstract: "Modern enterprises need CI/CD platforms that scale with complexity while maintaining security and speed. This talk covers the architecture, tooling, and practices for building developer platforms that empower teams while maintaining governance and compliance.",
    keyTakeaways: JSON.stringify([
      "Developer platform architecture and design principles",
      "GitOps and declarative infrastructure patterns",
      "Security and compliance in CI/CD pipelines",
      "Scaling pipelines for enterprise complexity"
    ]),
    audienceFit: "Platform Engineers, DevOps Leaders, Enterprise Architects, Development Teams",
    formatOptions: JSON.stringify(["Technical Talk (60-90 min)", "Workshop (4 hours)", "Deep Dive (2-3 hours)"])
  },
  {
    title: "AI in Regulated Industries: How to Adopt Safely and Effectively",
    subtitle: "Practical roadmap for banks, credit unions, and insurance",
    abstract: "Regulated industries face unique challenges when adopting AI. This talk provides a practical roadmap for implementing AI safely and effectively in banking, credit unions, insurance, and other regulated sectors. Learn about compliance frameworks, risk management, and building organizational readiness.",
    keyTakeaways: JSON.stringify([
      "AI governance frameworks for regulated industries",
      "Risk assessment and mitigation strategies",
      "Compliance considerations (SOX, GLBA, HIPAA, etc.)",
      "Building organizational readiness for AI adoption"
    ]),
    audienceFit: "Compliance Officers, Risk Managers, Technology Leaders, C-Suite Executives in Financial Services",
    formatOptions: JSON.stringify(["Keynote (45-60 min)", "Executive Briefing (30-45 min)", "Panel Discussion"])
  },
  {
    title: "Global DevOps Operations: Scaling Teams and Practices Across Regions",
    subtitle: "Lessons from managing DevOps at Fortune 500 scale",
    abstract: "Managing DevOps operations across multiple regions and time zones requires careful planning, clear processes, and strong automation. Learn from real-world experience scaling DevOps practices globally, including team structure, communication patterns, and tooling strategies.",
    keyTakeaways: JSON.stringify([
      "Global team structure and coordination models",
      "Time zone management and on-call strategies",
      "Knowledge sharing and documentation at scale",
      "Standardization vs. regional customization"
    ]),
    audienceFit: "DevOps Managers, Engineering Leaders, Global Teams, Enterprise Operations",
    formatOptions: JSON.stringify(["Technical Talk (60-90 min)", "Workshop (3-4 hours)", "Roundtable Discussion"])
  },
  {
    title: "Cloud Transformation: From Legacy to Cloud-Native in Regulated Industries",
    subtitle: "Practical strategies for modernizing enterprise infrastructure",
    abstract: "Cloud transformation in regulated industries requires careful planning, strong governance, and pragmatic execution. This talk shares practical strategies for migrating legacy systems to cloud-native architectures while maintaining compliance and managing risk.",
    keyTakeaways: JSON.stringify([
      "Cloud migration strategies for regulated industries",
      "Legacy system modernization patterns",
      "Cost optimization and FinOps practices",
      "Governance and compliance in cloud environments"
    ]),
    audienceFit: "CIOs, Enterprise Architects, Cloud Leaders, Technology Executives",
    formatOptions: JSON.stringify(["Keynote (45-60 min)", "Technical Talk (60-90 min)", "Workshop (4 hours)"])
  }
];

async function seedTalks() {
  try {
    console.log("Seeding talks...");
    
    for (let i = 0; i < talks.length; i++) {
      const talk = talks[i];
      await sql`
        INSERT INTO talks (title, subtitle, abstract, "keyTakeaways", "audienceFit", "formatOptions", "order")
        VALUES (
          ${talk.title},
          ${talk.subtitle},
          ${talk.abstract},
          ${talk.keyTakeaways},
          ${talk.audienceFit},
          ${talk.formatOptions},
          ${i}
        )
      `;
      console.log(`✓ Seeded talk: ${talk.title}`);
    }
    
    console.log("\n✓ All talks seeded successfully!");
  } catch (error) {
    console.error("Error seeding talks:", error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

seedTalks();
