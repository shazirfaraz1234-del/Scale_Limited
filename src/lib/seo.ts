export const SITE_URL = "https://scalelimited.cc";

export const SITE_NAME = "Scale Limited";
export const SITE_EMAIL = "info@scalelimited.cc";
export const SITE_PHONE = "+1-647-870-9695";

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

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];
export type IndustrySlug = (typeof INDUSTRY_SLUGS)[number];

/**
 * Parent -> child taxonomy for the service tree.
 *
 * This is the single source of truth for internal linking. Every child slug
 * listed here must be reachable from the /services hub, from its own parent
 * category page, and from the footer — otherwise the page is an orphan and
 * will not be crawled.
 */
export const SERVICE_GROUPS: {
  slug: ServiceSlug;
  title: string;
  children: { slug: ServiceSlug; title: string }[];
}[] = [
  {
    slug: "staff-augmentation",
    title: "Staff Augmentation",
    children: [
      { slug: "full-stack-developers", title: "Full Stack Developers" },
      { slug: "ai-ml-engineers", title: "AI & ML Engineers" },
      { slug: "ui-ux-designers", title: "UI/UX Designers" },
      { slug: "customer-support", title: "Customer Support Representatives" },
      { slug: "finance-accounting", title: "Finance & Accounting Staff" },
      { slug: "operations-back-office", title: "Operations & Back Office Staff" },
    ],
  },
  {
    slug: "bpo",
    title: "Business Process Outsourcing",
    children: [
      { slug: "contact-center", title: "Contact Center Services" },
      { slug: "data-entry", title: "Data Entry & Processing" },
      { slug: "sales-lead-generation", title: "Sales & Lead Generation" },
    ],
  },
  {
    slug: "technology-ai",
    title: "Technology & AI Solutions",
    children: [
      { slug: "web-design-development", title: "Web Design & Development" },
      { slug: "custom-software", title: "Custom Software Development" },
      { slug: "ai-chatbots", title: "AI Chatbots & Virtual Assistants" },
    ],
  },
];

export const INDUSTRIES: { slug: IndustrySlug; title: string }[] = [
  { slug: "technology", title: "Technology & SaaS" },
  { slug: "healthcare", title: "Healthcare & MedTech" },
  { slug: "finance", title: "Finance & Fintech" },
  { slug: "e-commerce", title: "E-Commerce & Retail" },
];

/** Find the parent category for a child service slug, if it has one. */
export function getServiceParent(slug: string) {
  return SERVICE_GROUPS.find((group) =>
    group.children.some((child) => child.slug === slug)
  );
}

/** Sibling services within the same category — used for related-service links. */
export function getRelatedServices(slug: string, limit = 3) {
  const group =
    SERVICE_GROUPS.find((g) => g.slug === slug) ?? getServiceParent(slug);
  if (!group) return [];
  return group.children.filter((child) => child.slug !== slug).slice(0, limit);
}

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * Public profiles that belong to Scale Limited.
 *
 * Only add a URL here once the profile actually exists and links back to
 * scalelimited.cc. Empty strings are filtered out before the schema is
 * emitted, so an unfinished entry never ships as invalid structured data.
 */
export const SOCIAL_PROFILES: string[] = [
  // "https://www.linkedin.com/company/scalelimited",
  // "https://www.crunchbase.com/organization/scale-limited",
  // "https://clutch.co/profile/scale-limited",
].filter(Boolean);

export const organizationSchema = {
  "@type": "ProfessionalService",
  "@id": ORGANIZATION_ID,
  name: SITE_NAME,
  // Brand-query variants. These help Google resolve "scalelimited",
  // "scale limited" and "scale ltd" to this same entity.
  alternateName: ["ScaleLimited", "Scale Ltd", "scalelimited.cc"],
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/logo.png`,
    width: 1073,
    height: 375,
  },
  image: `${SITE_URL}/logo.png`,
  description:
    "Scale Limited provides staff augmentation, business process outsourcing and technology services for companies in Canada, the USA and Australia.",
  email: SITE_EMAIL,
  telephone: SITE_PHONE,
  areaServed: [
    { "@type": "Country", name: "Canada" },
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "Australia" },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    telephone: SITE_PHONE,
    email: SITE_EMAIL,
    availableLanguage: ["English"],
    areaServed: ["CA", "US", "AU"],
  },
  knowsAbout: [
    "Staff augmentation",
    "Business process outsourcing",
    "Custom software development",
    "AI chatbots",
    "Customer support outsourcing",
  ],
  ...(SOCIAL_PROFILES.length > 0 ? { sameAs: SOCIAL_PROFILES } : {}),
};

/**
 * WebSite entity. This is what tells Google the site is the canonical home of
 * the "Scale Limited" brand, and it is a prerequisite for name-based sitelinks
 * on brand queries.
 */
export const websiteSchema = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: SITE_NAME,
  alternateName: "ScaleLimited",
  description:
    "Scale Limited helps businesses grow through flexible staffing, reliable business process outsourcing, and technology-driven solutions.",
  publisher: { "@id": ORGANIZATION_ID },
  inLanguage: "en",
};

/** Both root entities, emitted once from the root layout. */
export const siteSchemaGraph = {
  "@context": "https://schema.org",
  "@graph": [organizationSchema, websiteSchema],
};

/** BreadcrumbList for a page, given its trail of crumbs. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
