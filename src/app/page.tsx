'use client';

import { Hero } from "@/components/sections/Hero";
import { BuildInPublic } from "@/components/sections/BuildInPublic";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Process } from "@/components/sections/Process";
import { Leadership } from "@/components/sections/Leadership";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { Services } from "@/components/sections/Services"; // Added
import { BlogSection } from "@/components/sections/BlogSection";
import { PublicCases } from "@/components/sections/PublicCases";
import { Ideas } from "@/components/sections/Ideas";
import { Experience } from "@/components/sections/Experience";
import { Now } from "@/components/sections/Now";
import { Newsletter } from "@/components/sections/Newsletter";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <BuildInPublic />
      <TrustedBy />
      <CaseStudies />
      <Process />
      <Leadership />
      <ProjectsSection />
      <Services />
      <BlogSection />
      <PublicCases />
      <Ideas />
      <Experience />
      <Now />
      <Newsletter />
      <Contact />
    </main>
  );
}
