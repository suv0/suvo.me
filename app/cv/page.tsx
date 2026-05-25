import type { Metadata } from "next";
import { DwetechLink, linkProfileText } from "@/components/profile-text-links";
import cv from "@/lib/cv-data.json";
import { getCvSummary } from "@/lib/portfolio-data";

/** Match `TENURE_REVALIDATE_SECONDS` in `@/lib/portfolio-data` — must be a literal for Next segment config. */
export const revalidate = 86_400;

export const metadata: Metadata = {
  title: `${cv.name} - CV`,
  description: `Professional CV for ${cv.name}, ${cv.title}.`,
};

export default function CvPage() {
  const summary = getCvSummary();

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-950 print:bg-white print:px-0 print:py-0">
      <article className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-xl print:max-w-none print:rounded-none print:p-0 print:shadow-none">
        <header className="border-b border-slate-300 pb-5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">{cv.title}</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">{cv.name}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-700">{linkProfileText(summary)}</p>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-700">
            <span>{cv.location}</span>
            <a href={`mailto:${cv.email}`}>{cv.email}</a>
            <a href={cv.website}>{cv.website}</a>
            <a href={cv.linkedin}>LinkedIn</a>
            <a href={cv.github}>GitHub</a>
          </div>
        </header>

        <section className="mt-6">
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-sky-800">Core Strengths</h2>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-800 md:grid-cols-2 print:grid-cols-2">
            {cv.strengths.map((item) => (
              <li key={item} className="rounded-lg border border-slate-200 bg-slate-50 p-3 print:border-slate-300 print:bg-white">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-7">
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-sky-800">Experience</h2>
          <div className="mt-4 space-y-5">
            {cv.experience.map((job) => (
              <section key={`${job.company}-${job.period}`} className="break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <div>
                    <h3 className="text-lg font-bold text-slate-950">{job.role}</h3>
                    <p className="text-sm font-semibold text-slate-700">
                      {job.company === "Dwetech" ? (
                        <DwetechLink className="text-slate-700 hover:text-sky-800" />
                      ) : (
                        job.company
                      )}
                      {" - "}
                      {job.location}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-sky-800">{job.period}</p>
                </div>
                <ul className="mt-2 space-y-1.5 text-sm leading-6 text-slate-800">
                  {job.highlights.map((point) => (
                    <li key={point} className="list-inside list-disc marker:text-sky-700">
                      {linkProfileText(point)}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </section>

        <section className="mt-7">
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-sky-800">Selected Projects</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-2 print:grid-cols-2">
            {cv.projects.map((project) => (
              <section key={project.name} className="break-inside-avoid rounded-lg border border-slate-200 p-3 print:border-slate-300">
                <h3 className="text-sm font-bold text-slate-950">{project.name}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-800">{project.details}</p>
              </section>
            ))}
          </div>
        </section>

        <section className="mt-7">
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-sky-800">Skills</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-2 print:grid-cols-2">
            {cv.skills.map((group) => (
              <section key={group.group} className="break-inside-avoid">
                <h3 className="text-sm font-bold text-slate-950">{group.group}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-800">{group.items.join(" · ")}</p>
              </section>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}
