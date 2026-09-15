import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { LangProvider } from "@/lib/i18n";
import { Navbar } from "@/components/portfolio/Navbar";
import { ContactModal } from "@/components/portfolio/ContactModal";
import {
  About,
  Certifications,
  Contact,
  Experience,
  FloatingCta,
  Footer,
  Hero,
  HireMatch,
  Process,
  Project,
  Skills,
} from "@/components/portfolio/sections";

const title = "سعيد خضر الزهراني — تقنية معلومات، شبكات ودعم تقني";
const description =
  "الملف الشخصي لسعيد خضر الزهراني: بكالوريوس تقنية المعلومات — إدارة الشبكات وأمنها، خبرة دعم فني، ومشروع MyFCITR. Saeed Khader Alzahrani — IT, networking and technical support portfolio.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [modalOpen, setModalOpen] = useState(false);
  const open = () => setModalOpen(true);

  return (
    <LangProvider>
      <div className="min-h-screen bg-background">
        <Navbar onOpenModal={open} />
        <main>
          <Hero onOpenModal={open} />
          <About />
          <Experience onOpenModal={open} />
          <Skills />
          <Process />
          <Project onOpenModal={open} />
          <Certifications />
          <HireMatch />
          <Contact onOpenModal={open} />
        </main>
        <Footer />
        <FloatingCta onOpenModal={open} />
        <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </LangProvider>
  );
}
