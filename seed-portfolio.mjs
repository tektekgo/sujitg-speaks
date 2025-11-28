import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const portfolioData = [
  {
    section: "Executive Summary",
    title: "Professional Overview",
    content: "Visionary, business-driven IT executive with 30+ years of experience leading enterprise technology strategy, global team scaling, and digital transformation. Proven success aligning technology with business growth, driving cloud-first adoption, and delivering AI-powered, secure, and scalable solutions in regulated industries.",
    order: 1,
  },
  {
    section: "Expertise",
    title: "Cloud & Infrastructure",
    content: "Leading cloud-first transformations with Terraform, Ansible, and visual IaC platforms. Delivered 30% cost reduction and 400-500% speed improvements.",
    order: 2,
  },
  {
    section: "Expertise",
    title: "AI Integration",
    content: "Pioneering AI-powered solutions and automation strategies. Created AI-Focus.org and custom GPT solutions for enterprise deployment.",
    order: 3,
  },
  {
    section: "Expertise",
    title: "Cybersecurity & Compliance",
    content: "Expert in cybersecurity strategy, risk management, and regulatory alignment for insurance and financial services.",
    order: 4,
  },
  {
    section: "Expertise",
    title: "DevOps & Automation",
    content: "Built enterprise DevOps practices from the ground up. Achieved 50% reduction in deployment time and 99.99% uptime.",
    order: 5,
  },
  {
    section: "Expertise",
    title: "Global Team Leadership",
    content: "Scaled high-performing teams across US, Europe, and Asia. C-level collaboration with proven M&A integration experience.",
    order: 6,
  },
  {
    section: "Expertise",
    title: "Digital Transformation",
    content: "30+ years driving technology modernization in regulated industries. Partner to C-suite and Boards on strategic initiatives.",
    order: 7,
  },
  {
    section: "Projects",
    title: "AI-Focus.org",
    content: "A comprehensive website focused on AI integration and enterprise solutions, showcasing AI capabilities and use cases for enterprise deployment.",
    order: 8,
  },
  {
    section: "Projects",
    title: "Sherlock-logs",
    content: "A powerful Python-based CLI tool that helps developers, DevOps engineers, and sysadmins analyze log files quickly and efficiently with styled output, summaries, and export options.",
    order: 9,
  },
  {
    section: "Projects",
    title: "Splitbi",
    content: "A PFA/mobile app for expense sharing between friends. Track shared expenses, split bills, and settle up seamlessly. Coming soon on Android & iOS App Stores.",
    order: 10,
  },
  {
    section: "Projects",
    title: "Dev Workflow Generator",
    content: "Creates persistent development context that bridges every coding session, helping developers maintain continuity and productivity across projects.",
    order: 11,
  },
  {
    section: "Projects",
    title: "Retirement Ready Vault",
    content: "A secure retirement planning application that helps individuals organize and maintain retirement information for easy sharing with consultants or planners.",
    order: 12,
  },
  {
    section: "Projects",
    title: "Automation Analytics Dashboard",
    content: "A comprehensive analytics dashboard for tracking and visualizing automation metrics, performance indicators, and operational insights across enterprise systems.",
    order: 13,
  },
  {
    section: "Speaking",
    title: "Autocon 4 - Leadership Track",
    content: "From Vision to Reality: Building an Enterprise Automation Platform in Banking. Achieved 66% efficiency improvement and 3,500 hours saved.",
    order: 14,
  },
  {
    section: "Speaking",
    title: "GSDC Global AI Tools Challenge 2025",
    content: "Keynote Speaker & Knowledge Advisor. Data & Analytics - Turning Spreadsheets into Dashboards with AI in Seconds.",
    order: 15,
  },
  {
    section: "Speaking",
    title: "DevOps Summit 2023",
    content: "Panel Discussion: Scaling DevOps Across Global Teams. Shared insights on building high-performing teams across multiple regions.",
    order: 16,
  },
  {
    section: "Speaking",
    title: "Cloud Strategy Forum 2023",
    content: "Technical Workshop: Infrastructure as Code - From Concept to 400% Efficiency Gains. Demonstrated practical IaC implementation strategies.",
    order: 17,
  },
  {
    section: "Articles",
    title: "The Future of DevOps Engineering",
    content: "Exploring how the convergence of infrastructure automation, artificial intelligence, and quantum computing is reshaping the DevOps landscape.",
    order: 18,
  },
  {
    section: "Articles",
    title: "Building ExcelGPT: AI-Powered Spreadsheet Intelligence",
    content: "How custom GPT models are transforming enterprise data analysis and decision-making processes.",
    order: 19,
  },
  {
    section: "Articles",
    title: "Infrastructure as Code: A 400% Efficiency Journey",
    content: "Lessons learned from piloting BrainBoard and achieving dramatic improvements in infrastructure delivery.",
    order: 20,
  },
];

async function seedPortfolio() {
  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    
    console.log("Connected to database. Seeding portfolio content...");
    
    for (const item of portfolioData) {
      await connection.execute(
        "INSERT INTO portfolioContent (section, title, content, `order`) VALUES (?, ?, ?, ?)",
        [item.section, item.title, item.content, item.order]
      );
    }
    
    console.log(`✓ Successfully seeded ${portfolioData.length} portfolio items`);
    await connection.end();
  } catch (error) {
    console.error("Error seeding portfolio:", error);
    process.exit(1);
  }
}

seedPortfolio();
