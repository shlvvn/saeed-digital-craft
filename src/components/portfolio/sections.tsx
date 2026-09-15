import { useState } from "react";
import { ArrowRight, Download, GraduationCap, Mail, MapPin, ShieldCheck } from "lucide-react";
import { CTAButton, MetaLabel, Reveal, Section, SectionHeading } from "./primitives";
import { CopyEmailButton } from "./CopyEmailButton";
import { useLang } from "@/lib/i18n";
import { content, mailto, CV_PATH } from "@/data/portfolio";

/* ---------------- HERO ---------------- */

export function Hero({ onOpenModal }: { onOpenModal: () => void }) {
  const { t } = useLang();
  const e = content.education;

  return (
    <section id="home" className="atmos relative overflow-hidden px-5 pt-32 pb-20 sm:px-8 md:pt-40 md:pb-28 lg:px-12">
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 -z-10" />
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs text-muted-foreground">
            <span aria-hidden className="status-dot size-1.5 rounded-full bg-ok" />
            {t(content.ui.availability)}
          </span>
        </Reveal>

        <Reveal delay={80} className="mt-8">
          <MetaLabel>{t(content.hero.kicker)}</MetaLabel>
        </Reveal>

        <Reveal delay={140}>
          <h1 className="mt-5 display-xl text-foreground">{t(content.name)}</h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-4 text-base text-signal sm:text-lg">{t(content.role)}</p>
        </Reveal>

        <Reveal delay={260}>
          <p className="body-lg mt-7 max-w-2xl text-muted-foreground">{t(content.hero.headline)}</p>
        </Reveal>

        <Reveal delay={320}>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground/85">
            {t(content.hero.sub)}
          </p>
        </Reveal>

        <Reveal delay={400}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <CTAButton size="lg" onClick={onOpenModal}>
              {t(content.ui.contactCta)}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 rtl:rotate-180" />
            </CTAButton>
            <CTAButton size="lg" variant="outline" href="#project">
              {t(content.ui.exploreCta)}
            </CTAButton>
            <CTAButton size="lg" variant="outline" href={CV_PATH} download>
              <Download className="size-4" />
              {t(content.ui.cvCta)}
            </CTAButton>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal delay={120}>
            <div className="panel lift h-full p-6">
              <MetaLabel>{t(e.label)}</MetaLabel>
              <p className="mt-5 font-mono text-4xl font-semibold text-foreground">
                {e.gpa}
                <span className="text-base text-muted-foreground"> / {e.gpaMax}</span>
              </p>
              <p className="mt-2 text-sm text-signal">{t(e.honors)}</p>
              <p className="mt-4 text-sm text-muted-foreground">
                {t(e.degree)} — {t(e.track)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground/75">
                {t(e.university)} · {e.year}
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="panel lift h-full p-6">
              <GraduationCap className="size-5 text-signal" />
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                {t(content.about.philosophy)}
              </p>
              <div className="hairline my-5" />
              <p className="flex items-center gap-2 text-xs text-muted-foreground/80">
                <MapPin className="size-3.5" />
                {t(content.location)}
              </p>
            </div>
          </Reveal>

          <Reveal delay={280} className="sm:col-span-2 lg:col-span-1">
            <div className="panel lift flex h-full flex-col justify-between p-6">
              <div>
                <ShieldCheck className="size-5 text-signal" />
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  {t(content.cta.heroInline)}
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <CTAButton href={mailto()} size="md">
                  <Mail className="size-4" />
                  {t(content.ui.sendMeOne)}
                </CTAButton>
                <CopyEmailButton />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- ABOUT ---------------- */

export function About() {
  const { t } = useLang();
  return (
    <Section id="about" label={t(content.about.label)}>
      <SectionHeading title={t(content.about.title)} lead={t(content.about.philosophy)} />
      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        {content.about.body.map((p, i) => (
          <Reveal key={i} delay={i * 110}>
            <div className="relative ps-5">
              <span aria-hidden className="absolute inset-y-1 start-0 w-px bg-signal/30" />
              <p className="text-sm leading-relaxed text-muted-foreground">{t(p)}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- EXPERIENCE ---------------- */

export function Experience({ onOpenModal }: { onOpenModal: () => void }) {
  const { t } = useLang();
  return (
    <Section id="experience" label={t(content.experience.label)}>
      <SectionHeading title={t(content.experience.title)} />
      <div className="mt-12 space-y-5">
        {content.experience.items.map((item, i) => (
          <Reveal key={i} delay={i * 110}>
            <article className="panel lift p-6 sm:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <h3 className="display-md text-foreground">{t(item.title)}</h3>
                  <p className="mt-1.5 text-sm text-signal">{t(item.org)}</p>
                </div>
                <span className="meta-label">{t(item.period)}</span>
              </div>
              <p className="mt-4 text-xs text-muted-foreground/80">{t(item.meta)}</p>
              {item.points.length ? (
                <>
                  <div className="hairline my-6" />
                  <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {item.points.map((p, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-signal/70" />
                        {t(p)}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </article>
          </Reveal>
        ))}
      </div>
      <InlineCta text={t(content.cta.afterExperience)} onOpenModal={onOpenModal} />
    </Section>
  );
}

function InlineCta({ text, onOpenModal }: { text: string; onOpenModal: () => void }) {
  const { t } = useLang();
  return (
    <Reveal delay={120}>
      <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-surface/40 px-6 py-5">
        <p className="text-sm text-foreground">{text}</p>
        <CTAButton onClick={onOpenModal}>
          {t(content.ui.sendOpportunity)}
          <ArrowRight className="size-4 rtl:rotate-180" />
        </CTAButton>
      </div>
    </Reveal>
  );
}

/* ---------------- SKILLS ---------------- */

export function Skills() {
  const { t } = useLang();
  return (
    <Section id="skills" label={t(content.skills.label)}>
      <SectionHeading title={t(content.skills.title)} />
      <div className="mt-12 space-y-12">
        {content.skills.groups.map((g, gi) => (
          <div key={gi}>
            <Reveal>
              <div className="flex items-center gap-4">
                <h3 className="text-sm font-semibold tracking-wide text-foreground">{t(g.name)}</h3>
                <span aria-hidden className="hairline flex-1" />
                <span className="meta-label">{String(g.items.length).padStart(2, "0")}</span>
              </div>
            </Reveal>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((it, i) => (
                <Reveal key={i} delay={i * 70}>
                  <div className="panel lift h-full p-5">
                    <p className="text-sm font-medium text-foreground">{t(it.n)}</p>
                    <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">{t(it.d)}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- PROCESS ---------------- */

export function Process() {
  const { t } = useLang();
  return (
    <Section label={t(content.process.label)} className="atmos">
      <SectionHeading title={t(content.process.title)} />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {content.process.steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 100}>
            <div className="panel lift h-full p-6">
              <span className="font-mono text-xs text-signal">{s.n}</span>
              <h3 className="mt-4 text-base font-semibold text-foreground">{t(s.t)}</h3>
              <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">{t(s.d)}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={120}>
        <ol className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2">
          {content.process.flow.map((f, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="rounded-full border border-border bg-surface/50 px-3.5 py-1.5 text-xs text-muted-foreground">
                {t(f)}
              </span>
              {i < content.process.flow.length - 1 ? (
                <span aria-hidden className="h-px w-6 bg-signal/40" />
              ) : null}
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}

/* ---------------- PROJECT ---------------- */

export function Project({ onOpenModal }: { onOpenModal: () => void }) {
  const { t } = useLang();
  const p = content.project;
  return (
    <Section id="project" label={t(p.label)}>
      <SectionHeading title={p.name} lead={t(p.title)} />
      <Reveal delay={100}>
        <p className="mt-5 max-w-2xl text-sm text-muted-foreground/85">{t(p.context)}</p>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {p.blocks.map((b, i) => (
          <Reveal key={i} delay={i * 90}>
            <div className="panel lift h-full p-6">
              <MetaLabel>{t(b.k)}</MetaLabel>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t(b.v)}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {p.modules.map((m, i) => (
          <Reveal key={i} delay={i * 90}>
            <div className="panel lift h-full p-6">
              <h3 className="text-base font-semibold text-foreground">{t(m.t)}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{t(m.d)}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={140}>
        <figure className="panel mt-4 overflow-hidden p-6">
          <MetaLabel>{t(p.previewLabel)}</MetaLabel>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-xl border border-border bg-surface-2/40 p-4">
                <span className="block h-2 w-16 rounded-full bg-signal/40" />
                <span className="mt-3 block h-2 w-full rounded-full bg-foreground/10" />
                <span className="mt-2 block h-2 w-4/5 rounded-full bg-foreground/10" />
                <span className="mt-2 block h-2 w-2/3 rounded-full bg-foreground/10" />
              </div>
            ))}
          </div>
          <figcaption className="mt-5 text-xs text-muted-foreground/70">{t(p.previewNote)}</figcaption>
        </figure>
      </Reveal>

      <InlineCta text={t(content.cta.afterProject)} onOpenModal={onOpenModal} />
    </Section>
  );
}

/* ---------------- CERTIFICATIONS + AI ---------------- */

export function Certifications() {
  const { t } = useLang();
  return (
    <Section id="certifications" label={t(content.certifications.label)}>
      <SectionHeading title={t(content.certifications.title)} />
      <ul className="mt-12 divide-y divide-border">
        {content.certifications.items.map((c, i) => (
          <Reveal as="li" key={i} delay={i * 60}>
            <div className="flex flex-wrap items-baseline justify-between gap-3 py-5">
              <p className="text-sm text-foreground">{t(c.t)}</p>
              <span className="meta-label">{t(c.i)}</span>
            </div>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={120}>
        <div className="panel mt-12 p-6 sm:p-8">
          <MetaLabel>{t(content.ai.label)}</MetaLabel>
          <h3 className="mt-4 display-md text-foreground">{t(content.ai.title)}</h3>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {t(content.ai.body)}
          </p>
          <p className="mt-3 max-w-2xl text-xs leading-relaxed text-muted-foreground/75">
            {t(content.ai.note)}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {content.ai.tags.map((tag, i) => (
              <span
                key={i}
                className="rounded-full border border-border bg-surface-2/40 px-3.5 py-1.5 text-xs text-muted-foreground"
              >
                {t(tag)}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------------- HIRE MATCH ---------------- */

export function HireMatch() {
  const { t } = useLang();
  const [active, setActive] = useState(content.hire.options[0]!.k);
  const current = content.hire.options.find((o) => o.k === active)!;

  return (
    <Section label={t(content.hire.label)} className="atmos">
      <SectionHeading title={t(content.hire.title)} lead={t(content.hire.cardHint)} />
      <Reveal delay={100}>
        <div className="panel mt-12 p-6 sm:p-8">
          <h3 className="text-base font-semibold text-foreground">{t(content.hire.cardTitle)}</h3>
          <div className="mt-6 flex flex-wrap gap-2">
            {content.hire.options.map((o) => (
              <button
                key={o.k}
                type="button"
                onClick={() => setActive(o.k)}
                aria-pressed={active === o.k}
                className={`rounded-full border px-4 py-2 text-xs transition-all duration-300 ${
                  active === o.k
                    ? "border-signal/50 bg-signal/10 text-foreground"
                    : "border-border bg-surface-2/30 text-muted-foreground hover:text-foreground"
                }`}
              >
                {t(o.label)}
              </button>
            ))}
          </div>
          <div className="hairline my-7" />
          <p className="text-sm leading-relaxed text-foreground">{t(current.answer)}</p>
          <div className="mt-6">
            <CTAButton href={mailto(t(current.subject))}>
              <Mail className="size-4" />
              {t(content.ui.sendOpportunity)}
            </CTAButton>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------------- CONTACT + FOOTER ---------------- */

export function Contact({ onOpenModal }: { onOpenModal: () => void }) {
  const { t } = useLang();
  return (
    <Section id="contact" label={t(content.contact.label)} className="atmos">
      <Reveal>
        <h2 className="display-lg max-w-3xl text-foreground">{t(content.cta.beforeFooter)}</h2>
      </Reveal>
      <Reveal delay={90}>
        <p className="body-lg mt-5 max-w-2xl text-muted-foreground">{t(content.contact.statement)}</p>
      </Reveal>
      <Reveal delay={160}>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <CTAButton size="lg" onClick={onOpenModal}>
            {t(content.contact.cta)}
            <ArrowRight className="size-4 rtl:rotate-180" />
          </CTAButton>
          <CopyEmailButton size="lg" />
          <CTAButton size="lg" variant="outline" href={CV_PATH} download>
            <Download className="size-4" />
            {t(content.ui.cvCtaPdf)}
          </CTAButton>
        </div>
      </Reveal>
    </Section>
  );
}

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-border px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">{t(content.footer.tagline)}</p>
        <p className="meta-label">{t(content.footer.copyright)}</p>
      </div>
    </footer>
  );
}

export function FloatingCta({ onOpenModal }: { onOpenModal: () => void }) {
  const { t } = useLang();
  return (
    <div className="fixed bottom-5 z-40 end-5 lg:hidden">
      <CTAButton onClick={onOpenModal} className="shadow-[var(--glow-accent)]">
        <Mail className="size-4" />
        {t(content.ui.floatingCta)}
      </CTAButton>
    </div>
  );
}
