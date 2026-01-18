'use client';

import { Hero } from "@/components/sections/Hero";
import { BuildInPublic } from "@/components/sections/BuildInPublic";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Leadership } from "@/components/sections/Leadership";
import { VentureLab } from "@/components/sections/VentureLab";
import { Services } from "@/components/sections/Services";
import { BlogSection } from "@/components/sections/BlogSection";
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
      <Leadership />
      <VentureLab />
      <Services />
      <BlogSection />
      <Experience />
      <Now />
      <Newsletter />
      <Contact />
    </main>
  );
}
