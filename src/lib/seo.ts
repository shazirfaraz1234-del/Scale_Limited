export const SITE_URL = "https://scalelimited.cc";

export const SERVICE_SLUGS = [
  // Top level categories
  "staff-augmentation",
  "bpo",
  "technology-ai",
  // Staff augmentation
  "full-stack-developers",
  "ai-ml-engineers",
  "ui-ux-designers",
  "customer-support",
  "finance-accounting",
  "operations-back-office",
  // Business process services
  "contact-center",
  "data-entry",
  "sales-lead-generation",
  // Technology services
  "web-design-development",
  "custom-software",
  "ai-chatbots",
] as const;

export const INDUSTRY_SLUGS = [
  "technology",
  "healthcare",
  "finance",
  "e-commerce",
] as const;

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": ORGANIZATION_ID,
  name: "Scale Limited",
  alternateName: "Scale Ltd",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/logo.png`,
  description:
    "Scale Limited provides staff augmentation, business process outsourcing and technology services for companies in Canada, the USA and Australia.",
  email: "info@scalelimited.cc",
  telephone: "+1-647-870-9695",
  areaServed: ["CA", "US", "AU"],
  knowsAbout: [
    "Staff augmentation",
    "Business process outsourcing",
    "Custom software development",
    "AI chatbots",
    "Customer support outsourcing",
  ],
};
