import Footer from "~/shared/components/footer/Footer";
import type { Route } from "./+types/Home";
import HomeHeader from "~/features/home/components/homeHeader/HomeHeader";
import HeroSection from "~/features/home/components/hero/Hero";
import ServiciosSection from "~/features/home/components/servicesSection/ServicesSection";
import SpecialitiesSection from "~/features/home/components/specialistsSection/SpecialistsSection";
import AboutSection from "~/features/home/components/aboutSection/AboutSection";
import StaticsSection from "~/features/home/components/staticsSection/StaticsSection";
import TestimonialsSection from "~/features/home/components/testimonialsSection/TestimonialsSection";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Clinic Managment - Home" },
    { name: "description", content: "Clinic Management Dashboard" },
  ];
}

export default function Home() {
  return (
    <>
      <HomeHeader />
      <HeroSection />
      <ServiciosSection />
      <SpecialitiesSection />
      <AboutSection />
      <StaticsSection />
      <TestimonialsSection />
      <Footer />
    </>
  )
}