import type { SkillGroup } from "@/lib/portfolio-data";

/** Long-form positioning for metadata and assistive labels. */
export const JOURNAL_SITE_TITLE = "The Product Engineer's Journal";

/** Short nav brand — readable on small screens; matches the domain. */
export const JOURNAL_NAV_BRAND = "suvo.me";

export type SkillBentoConfig = {
  groupTitle: string;
  displayTitle: string;
  icon: string;
  gridClass: string;
  order: string;
};

export const skillBentoConfig: SkillBentoConfig[] = [
  {
    groupTitle: "Frontend",
    displayTitle: "Frontend Architecture",
    icon: "devices",
    gridClass: "col-span-12 sm:col-span-6",
    order: "01",
  },
  {
    groupTitle: "Backend & Data",
    displayTitle: "Backend & Data",
    icon: "database",
    gridClass: "col-span-12 sm:col-span-6",
    order: "02",
  },
  {
    groupTitle: "Mobile",
    displayTitle: "Mobile Delivery",
    icon: "smartphone",
    gridClass: "col-span-12 sm:col-span-6",
    order: "03",
  },
  {
    groupTitle: "Engineering practice",
    displayTitle: "Staff Engineering Practices",
    icon: "architecture",
    gridClass: "col-span-12 sm:col-span-6",
    order: "04",
  },
];

export function getSkillGroupForBento(groups: SkillGroup[], groupTitle: string): SkillGroup | undefined {
  return groups.find((g) => g.title === groupTitle);
}
