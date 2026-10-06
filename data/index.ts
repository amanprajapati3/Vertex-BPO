import bpoData from "./siteData.json";

export type RawBpoData = typeof bpoData;

export interface SectionProps<T = unknown> {
  data?: T;
  className?: string;
  contentClassName?: string;
  variant?: string;
  isEditable?: boolean;
  onUpdate?: (newData: Partial<T>) => void;
}

const sec = bpoData.BpoIndustries.sections;

/* Section data types                                                  */

export type BpoTopbarData = typeof sec.Topbar.variants.BpoTopbar1;
export type BpoHeaderData = typeof sec.Header.variants.BpoHeader1;
export type BpoBannerData = typeof sec.Banner.variants.BpoBanner1;
export type BpoAboutData = typeof sec.About.variants.BpoAbout1;
export type BpoServicesData = typeof sec.Services.variants.BpoServices1;
export type BpoWorkData = typeof sec.Work.variants.BpoChoose1;
export type BpoChooseData = typeof sec.Choose.variants.BpoChoose1;
export type BpoTestimonialData = typeof sec.Testimonial.variants.BpoTestimonial1;
export type BpoBlogData = typeof sec.Blog.variants.BpoBlog1;
export type BpoFaqData = typeof sec.Faq.variants.BpoFaq1;
export type BpoContactData = typeof sec.Contact.variants.BpoContact1;
export type BpoQuoteData = typeof sec.Quote.variants.BpoQuote1;
export type BpoThankYouData = typeof sec.ThankYou.variants.BpoThankYou1;
export type BpoFooterData = typeof sec.Footer.variants.BpoFooter1;
export type BpoNotFoundData = typeof sec.NotFound.variants.BpoNotFound1;

/* Topbar */
export type BpoSocialLink = BpoTopbarData["socialLinks"][number];

/* Header */
export type BpoHeaderNavChild = { label: string; href: string };
export type BpoHeaderNavItem = {
  label: string;
  href: string;
  children?: BpoHeaderNavChild[];
};
export type BpoHeaderButton = BpoHeaderData["buttons"][number];
export type BpoHeaderMobileMenu = BpoHeaderData["mobileMenu"];

/* Banner */
export type BpoBannerButton = BpoBannerData["buttons"][number];

/* About */
export type BpoAboutFeatureItem = BpoAboutData["features"][number];
export type BpoAboutBannerData = BpoAboutData["banner"];

/* Services */
export type BpoServiceItem = BpoServicesData["services"][number];
export type BpoServiceDetailPageData = BpoServicesData["detailPage"];
export type BpoServiceDetail = BpoServiceDetailPageData["services"][number];

/* Work (Who we work with) */
export type BpoWorkFeatureItem = BpoWorkData["features"][number];
export type BpoWorkStatItem = BpoWorkData["stats"][number];

/* Choose (Why choose us) */
export type BpoChooseFeatureItem = BpoChooseData["features"][number];

/* Testimonial */
export type BpoTestimonialItem = BpoTestimonialData["testimonialItems"][number];
export type BpoTestimonialBannerData = BpoTestimonialData["banner"];

/* Blog */
export type BpoBlogPost = BpoBlogData["posts"][number];
export type BpoBlogBannerData = BpoBlogData["banner"];
export type BpoBlogDetailPageData = BpoBlogData["detailPage"];
export type BpoBlogArticle = BpoBlogDetailPageData["articles"][number];

/* Faq */
export type BpoFaqItem = BpoFaqData["faqs"][number];
export type BpoFaqBannerData = BpoFaqData["banner"];
export type BpoFaqSidebarData = BpoFaqData["sidebar"];

/* Contact */
export type BpoContactCard = BpoContactData["getInTouch"]["cards"][number];
export type BpoContactBannerData = BpoContactData["banner"];
export type BpoContactFormData = BpoContactData["form"];
export type BpoContactMapInfo = BpoContactData["location"]["mapInfo"];
export type BpoContactIcon = "Phone" | "Mail" | "MapPin" | "Clock";

/* Quote */
export type BpoQuoteFormData = BpoQuoteData["form"];
export type BpoQuoteBannerData = BpoQuoteData["banner"];
export type BpoQuoteCtaData = BpoQuoteData["cta"];
export type BpoQuoteCtaContactItem = BpoQuoteCtaData["contactInfo"][number];

/* ThankYou */
export type BpoThankYouButton = BpoThankYouData["button"];

/* Legal */
const legalVariants = sec.Legal.variants;
export type BpoLegalVariantKey = keyof typeof legalVariants;
export type BpoLegalData = (typeof legalVariants)[BpoLegalVariantKey];
export type BpoLegalPoint = BpoLegalData["points"][number];

/* Footer */
export type BpoFooterColumn = BpoFooterData["columns"][number];
export type BpoFooterLink = BpoFooterColumn["links"][number];
export type BpoFooterContactItem = BpoFooterData["footerContact"]["items"][number];
export type BpoFooterContactLine = BpoFooterContactItem["lines"][number];
export type BpoLegalLink = BpoFooterData["legalLinks"][number];
/* Site object                                                         */

export const site = {
  topbar: sec.Topbar.variants.BpoTopbar1,
  header: sec.Header.variants.BpoHeader1,
  banner: sec.Banner.variants.BpoBanner1,
  about: sec.About.variants.BpoAbout1,
  services: sec.Services.variants.BpoServices1,
  serviceDetailPage: sec.Services.variants.BpoServices1.detailPage,
  work: sec.Work.variants.BpoChoose1,
  testimonial: sec.Testimonial.variants.BpoTestimonial1,
  blog: sec.Blog.variants.BpoBlog1,
  faq: sec.Faq.variants.BpoFaq1,
  contact: sec.Contact.variants.BpoContact1,
  quote: sec.Quote.variants.BpoQuote1,
  thankYou: sec.ThankYou.variants.BpoThankYou1,
  legal: legalVariants,
  footer: sec.Footer.variants.BpoFooter1,
  error: sec.NotFound.variants.BpoNotFound1,
  choose: sec.Choose.variants.BpoChoose1,
};

/* Services helpers                                                    */

const serviceItems = sec.Services.variants.BpoServices1
  .services as BpoServiceItem[];
const serviceDetails = sec.Services.variants.BpoServices1.detailPage
  .services as BpoServiceDetail[];

function normalizeSlug(slug: string, collection: "services" | "blog"): string {
  const segments = slug
    .split("/")
    .map((segment) => segment.trim())
    .filter(Boolean);
  return segments[0] === collection ? segments.slice(1).join("/") : segments.join("/");
}

export function getServices(): BpoServiceItem[] {
  return serviceItems;
}

/** First N services, used by the home page grid (`homeVisibleCount`). */
export function getHomeServices(): BpoServiceItem[] {
  return serviceItems.slice(0, sec.Services.variants.BpoServices1.homeVisibleCount);
}

export function getServiceBySlug(slug: string): BpoServiceItem | null {
  const cleanSlug = normalizeSlug(slug, "services");
  return serviceItems.find((service) => service.slug === cleanSlug) || null;
}

export function getServiceDetailBySlug(slug: string): BpoServiceDetail | null {
  const cleanSlug = normalizeSlug(slug, "services");
  return serviceDetails.find((service) => service.slug === cleanSlug) || null;
}

export function getServiceDetailPageBySlug(slug: string) {
  const service = getServiceBySlug(slug);
  const detail = getServiceDetailBySlug(slug);
  return service && detail ? { service, detail } : null;
}

export function getServiceSlugs(): BpoServiceItem[] {
  return serviceItems;
}

/* Blog helpers                                                        */

const blogPosts = sec.Blog.variants.BpoBlog1.posts as BpoBlogPost[];
const blogArticles = sec.Blog.variants.BpoBlog1.detailPage
  .articles as BpoBlogArticle[];

export function getBlogPosts(): BpoBlogPost[] {
  return blogPosts;
}

export function getBlogPostBySlug(slug: string): BpoBlogPost | null {
  const cleanSlug = normalizeSlug(slug, "blog");
  return blogPosts.find((post) => post.slug === cleanSlug) || null;
}

export function getBlogArticleBySlug(slug: string): BpoBlogArticle | null {
  const cleanSlug = normalizeSlug(slug, "blog");
  return blogArticles.find((article) => article.slug === cleanSlug) || null;
}

export function getBlogDetailPageBySlug(slug: string) {
  const post = getBlogPostBySlug(slug);
  const article = getBlogArticleBySlug(slug);
  return post && article ? { post, article } : null;
}

export function getBlogPostSlugs(): BpoBlogPost[] {
  return blogPosts;
}

/** Distinct categories, in first-seen order. */
export function getBlogCategories(): string[] {
  return [...new Set(blogPosts.map((post) => post.category))];
}

export function getBlogPostsByCategory(category: string): BpoBlogPost[] {
  return blogPosts.filter((post) => post.category === category);
}

/*  */
/* Testimonial helpers                                                 */

const testimonialItems = sec.Testimonial.variants.BpoTestimonial1
  .testimonialItems as BpoTestimonialItem[];

export function getTestimonials(): BpoTestimonialItem[] {
  return testimonialItems;
}

/* Faq helpers                                                         */

const faqItems = sec.Faq.variants.BpoFaq1.faqs as BpoFaqItem[];

export function getFaqItems(): BpoFaqItem[] {
  return faqItems;
}

/** FAQ entries have no slug, so the numeric `id` is the lookup key. */
export function getFaqById(id: number): BpoFaqItem | null {
  return faqItems.find((item) => item.id === id) || null;
}

/* Contact helpers                                                     */

export function getContactData(): BpoContactData {
  return sec.Contact.variants.BpoContact1;
}

export function getQuoteData(): BpoQuoteData {
  return sec.Quote.variants.BpoQuote1;
}

const contactCards = sec.Contact.variants.BpoContact1.getInTouch
  .cards as BpoContactCard[];

export function getContactCards(): BpoContactCard[] {
  return contactCards;
}

export function getContactCardByIcon(icon: BpoContactIcon): BpoContactCard | null {
  return contactCards.find((card) => card.icon === icon) || null;
}

export function getContactMapInfo(): BpoContactMapInfo {
  return sec.Contact.variants.BpoContact1.location.mapInfo;
}

/* Footer helpers                                                      */

export function getThankYouData(): BpoThankYouData {
  return sec.ThankYou.variants.BpoThankYou1;
}

export function getFooterColumns(): BpoFooterColumn[] {
  return sec.Footer.variants.BpoFooter1.columns;
}

export function getHeaderNav(): BpoHeaderNavItem[] {
  return sec.Header.variants.BpoHeader1.nav as BpoHeaderNavItem[];
}

export default bpoData;