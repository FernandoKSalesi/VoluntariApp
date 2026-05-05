// src/presentation/pages/LandingPage.tsx
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { FeaturedEvents } from "../components/FeaturedEvents";
import { Features } from "../components/Features";

export function LandingPage() {
  return (
    <>
      <Header />
      <Hero />
      <FeaturedEvents />
      <Features />
    </>
  );
}