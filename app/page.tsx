import Image from "next/image";
import Link from "next/link";
import { DwetechLink, linkProfileText } from "@/components/profile-text-links";
import { HeroPanel } from "@/components/hero-panel";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SkillMarquee } from "@/components/skill-marquee";
import { FrontendSkillDemo } from "@/components/skill-demos/frontend-skill-demo";
import {
  experiences,
  featuredProjects,
  getCurrentYear,
  getProfileTenure,
  profile,
  skillGroups,
} from "@/lib/portfolio-data";

/** Match `TENURE_REVALIDATE_SECONDS` in `@/lib/portfolio-data` — must be a literal for Next segment config. */
export const revalidate = 86_400;

const skillBentoClass: string[] = [
  "bento-skill-card glass-panel lg:col-span-2 lg:row-span-2 rounded-2xl p-5 sm:p-6 md:p-7",
  "bento-skill-card glass-panel lg:col-span-1 rounded-2xl p-4 sm:p-5 md:p-6",
  "bento-skill-card glass-panel lg:col-span-1 lg:row-start-2 lg:col-start-3 rounded-2xl p-4 sm:p-5 md:p-6",
  "bento-skill-card glass-panel lg:col-span-3 rounded-2xl p-4 sm:p-5 md:p-6",
];

/** Six cards: three × span-2 per row on a 6-column grid. */
const projectGridClass: string[] = [
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
];

export default function Home() {
  const currentYear = getCurrentYear();
  const tenure = getProfileTenure(currentYear);

  const personLd = {
    "@type": "Person",
    "@id": `${profile.website}/#person`,
    name: profile.name,
    jobTitle: profile.title,
    url: profile.website,
    email: profile.email,
    sameAs: [profile.linkedin, profile.github],
    worksFor: {
      "@type": "Organization",
      name: "Chaldal",
    },
    knowsAbout: skillGroups.flatMap((group) => group.items),
    description:
      `${tenure.careerYearsLabel} building software — Dwetech (2009–2016) and ${tenure.chaldalYearsLabel} at Chaldal (YC S15): shopper stack, logistics apps, and platform architecture.`,
  };

  const websiteLd = {
    "@type": "WebSite",
    "@id": `${profile.website}/#website`,
    url: profile.website,
    name: `${profile.name} — portfolio`,
    description:
      `${tenure.careerYearsLabel} in software — from Dwetech (2009–2016) to Chaldal (YC S15): web, mobile, logistics, and platform engineering.`,
    publisher: { "@id": `${profile.website}/#person` },
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [websiteLd, personLd],
  };

  return (
    <div className="relative min-h-screen min-w-0 overflow-x-hidden bg-slate-950 text-slate-100">
      <div aria-hidden className="aurora-gradient absolute inset-0 -z-20" />
      <div aria-hidden className="noise-overlay absolute inset-0 -z-10" />
      <div aria-hidden className="hero-backdrop -z-[15]" />

      <main
        className="mx-auto flex w-full max-w-6xl min-w-0 flex-col gap-12 pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] pt-[calc(2rem+env(safe-area-inset-top,0px))] pb-[calc(2rem+env(safe-area-inset-bottom,0px))] sm:gap-16 sm:pl-[max(1.5rem,env(safe-area-inset-left,0px))] sm:pr-[max(1.5rem,env(safe-area-inset-right,0px))] sm:pt-[calc(2.5rem+env(safe-area-inset-top,0px))] sm:pb-[calc(2.5rem+env(safe-area-inset-bottom,0px))] md:gap-20 md:pl-[max(2rem,env(safe-area-inset-left,0px))] md:pr-[max(2rem,env(safe-area-inset-right,0px))] md:pt-[calc(3.5rem+env(safe-area-inset-top,0px))] md:pb-[calc(3.5rem+env(safe-area-inset-bottom,0px))] lg:pl-[max(3rem,env(safe-area-inset-left,0px))] lg:pr-[max(3rem,env(safe-area-inset-right,0px))]"
      >
        <HeroPanel currentYear={currentYear} />

        <SkillMarquee />

        <Reveal className="block w-full">
          <div className="section-divider" aria-hidden />
        </Reveal>

        <section id="about" className="min-w-0 space-y-6 sm:space-y-8">
          <Reveal>
            <SectionHeading
              eyebrow="About"
              title="Building products people actually use"
              description={linkProfileText(profile.about)}
            />
          </Reveal>
        </section>

        <Reveal className="block w-full">
          <div className="section-divider" aria-hidden />
        </Reveal>

        <section id="skills" className="min-w-0 space-y-6 sm:space-y-8">
          <Reveal>
            <SectionHeading
              eyebrow="Skills"
              title="Modern product engineering stack"
              description="Focused capabilities across frontend, mobile, and backend delivery for production-scale systems."
            />
          </Reveal>
          <div className="grid min-w-0 gap-3 sm:gap-4 lg:grid-cols-3 lg:grid-rows-[auto_auto]">
            {skillGroups.map((group, index) => (
              <Reveal
                key={group.title}
                delay={index * 0.06}
                className={`${skillBentoClass[index] ?? skillBentoClass[0]} ${index === 0 ? "lg:self-start" : ""}`}
              >
                <div className="flex min-h-0 flex-col">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">{group.title}</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li key={item} className="skill-chip">
                        {item}
                      </li>
                    ))}
                  </ul>
                  {index === 0 ? (
                    <div className="mt-5 flex min-h-0 flex-col sm:mt-6 lg:mt-6">
                      <FrontendSkillDemo />
                    </div>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <Reveal className="block w-full">
          <div className="section-divider" aria-hidden />
        </Reveal>

        <section id="experience" className="min-w-0 space-y-6 sm:space-y-8">
          <Reveal>
            <SectionHeading
              eyebrow="Experience"
              title="Ownership across products and lifecycle"
              description={linkProfileText(
                `About ${tenure.careerYears} years total: Dwetech from 2009 through 2016, then ${tenure.chaldalYearsLabel} at Chaldal (YC S15) from January 2017 — shopper web and native apps built from zero, then ride-sharing and logistics operations at national scale.`,
              )}
            />
          </Reveal>
          <div className="space-y-5">
            {experiences.map((item, index) => (
              <Reveal
                key={item.company}
                delay={index * 0.07}
                className="experience-card glass-panel rounded-2xl p-4 sm:p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{item.role}</h3>
                    <p className="text-sm text-slate-300">
                      {item.company === "Dwetech" ? (
                        <DwetechLink className="text-slate-300 hover:text-cyan-200" />
                      ) : (
                        item.company
                      )}
                      {" · "}
                      {item.location}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-cyan-200">{item.period}</p>
                </div>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-slate-200 sm:text-base">
                  {item.highlights.map((point) => (
                    <li key={point} className="list-inside list-disc marker:text-cyan-300">
                      {linkProfileText(point)}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>

        <Reveal className="block w-full">
          <div className="section-divider" aria-hidden />
        </Reveal>

        <section id="projects" className="min-w-0 space-y-6 sm:space-y-8">
          <Reveal>
            <SectionHeading
              eyebrow="Selected Work"
              title="Projects with durable product impact"
              description="Chaldal shopper apps at national scale, GogoBangla merchant fulfillment, logistics operations, internal Protocol, historical Chalao ride-sharing (regulatory), and open-source platform work."
            />
          </Reveal>
          <div className="grid min-w-0 gap-4 sm:gap-5 lg:grid-cols-6">
            {featuredProjects.map((project, index) => (
              <Reveal key={project.name} delay={index * 0.06} className={projectGridClass[index] ?? ""}>
                <article className="group project-card h-full">
                  <div className="project-card-media">
                    <div className="project-card-media__zoom">
                      <Image
                        src={project.coverImage}
                        alt={project.coverAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                    <div
                      aria-hidden
                      className="project-card-media__shade pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"
                    />
                    <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex flex-col items-start gap-2 sm:bottom-4 sm:left-4 sm:right-4 sm:flex-row sm:items-end sm:justify-between sm:gap-3">
                      <h3 className="max-w-full text-pretty text-base font-semibold leading-snug text-white drop-shadow sm:text-lg md:text-xl">
                        {project.name}
                      </h3>
                      <span className="shrink-0 rounded-full border border-cyan-300/35 bg-slate-950/55 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-cyan-100/90 sm:text-[0.65rem] sm:tracking-[0.14em]">
                        {project.badge}
                      </span>
                    </div>
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-6">
                    <p className="text-sm text-slate-300 sm:text-base">{project.description}</p>
                    <p className="mt-4 text-sm leading-relaxed text-slate-200">{project.impact}</p>
                    {project.link ? (
                      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                        <a
                          className="link-project inline-flex text-sm font-semibold text-cyan-200/95"
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {project.linkLabel ?? "Explore project →"}
                        </a>
                        {project.extraLinks?.map((extra) => (
                          <a
                            key={extra.href}
                            className="link-project inline-flex text-sm font-semibold text-cyan-200/95"
                            href={extra.href}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {extra.label}
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <Reveal className="glass-panel rounded-3xl p-6 text-center sm:p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Contact</p>
          <h2 className="mt-3 text-balance text-2xl font-semibold text-white sm:text-4xl">
            {profile.contactHeadline}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm text-slate-300 sm:text-base">{profile.cta}</p>
          <a
            className="btn-primary mt-6 inline-flex max-w-full break-all px-4 sm:mt-8 sm:break-normal sm:px-5"
            href={`mailto:${profile.email}`}
          >
            {profile.email}
          </a>
          <p className="mt-6 text-center text-xs text-slate-400 sm:mt-8">
            <Link href="/kids" className="underline-offset-4 hover:text-slate-200 hover:underline">
              Something else →
            </Link>
          </p>
        </Reveal>
      </main>

      <footer className="border-t border-slate-800/50 bg-slate-950/80 py-8 text-slate-500">
        <nav
          aria-label="On this site"
          className="mx-auto flex max-w-6xl flex-wrap justify-center gap-x-5 gap-y-2 px-4 text-sm sm:gap-x-6 sm:px-6"
        >
          <Link href="#about" className="hover:text-slate-300">
            About
          </Link>
          <Link href="#skills" className="hover:text-slate-300">
            Skills
          </Link>
          <Link href="#experience" className="hover:text-slate-300">
            Experience
          </Link>
          <Link href="#projects" className="hover:text-slate-300">
            Projects
          </Link>
          <Link href="/cv" className="hover:text-slate-300">
            CV page
          </Link>
          <Link href="/kids" className="hover:text-slate-300">
            Kids corner
          </Link>
        </nav>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </div>
  );
}
