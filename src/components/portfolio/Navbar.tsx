import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { CTAButton } from "./primitives";
import { useLang } from "@/lib/i18n";
import { content, nav } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function Navbar({ onOpenModal }: { onOpenModal: () => void }) {
  const { t, lang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = nav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { threshold: [0.25, 0.5], rootMargin: "-20% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out",
        scrolled
          ? "border-b border-border bg-background/72 py-2.5 backdrop-blur-xl"
          : "border-b border-transparent py-5",
      )}
    >
      <nav
        aria-label={t({ ar: "التنقل الرئيسي", en: "Main navigation" })}
        className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-12"
      >
        <a href="#home" className="group flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-xl border border-border bg-surface text-[0.7rem] font-semibold tracking-widest text-signal transition-colors group-hover:border-signal/40">
            {lang === "ar" ? "س خ" : "SK"}
          </span>
          <span className="text-sm font-semibold tracking-tight text-foreground">
            {t(content.shortName)}
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  "relative rounded-full px-3 py-2 text-[0.8rem] transition-colors",
                  active === item.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t(item.label)}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-3 -bottom-0.5 h-px origin-center bg-signal transition-transform duration-500",
                    active === item.id ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LanguageSwitcher className="hidden sm:inline-flex" />
          <CTAButton onClick={onOpenModal} className="hidden md:inline-flex">
            {t(content.ui.navCta)}
          </CTAButton>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t(content.ui.menu)}
            className="grid size-10 place-items-center rounded-full border border-border bg-surface/60 text-foreground lg:hidden"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </nav>

      <div
        className={cn(
          "fixed inset-0 z-50 bg-background/96 backdrop-blur-xl transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="flex items-center justify-between px-5 py-5 sm:px-8">
          <span className="meta-label">{t(content.ui.menu)}</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t(content.ui.close)}
            className="grid size-10 place-items-center rounded-full border border-border bg-surface/60"
          >
            <X className="size-5" />
          </button>
        </div>
        <ul className="mt-6 flex flex-col gap-1 px-5 sm:px-8">
          {nav.map((item, i) => (
            <li key={item.id} className="border-b border-border/60">
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 py-4 text-xl font-medium text-foreground"
              >
                <span className="meta-label">{String(i + 1).padStart(2, "0")}</span>
                {t(item.label)}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap items-center gap-3 px-5 sm:px-8">
          <LanguageSwitcher />
          <CTAButton
            onClick={() => {
              setOpen(false);
              onOpenModal();
            }}
          >
            {t(content.ui.navCta)}
          </CTAButton>
        </div>
      </div>
    </header>
  );
}
