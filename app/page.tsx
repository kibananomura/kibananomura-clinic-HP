import Hero from "./components/Hero";
import SurveyBanner from "./components/SurveyBanner";
import Features from "./components/Features";
import Director from "./components/Director";
import Services from "./components/Services";
import Access from "./components/Access";
import BlogTeaser from "./components/BlogTeaser";
import RegisterCTA from "./components/RegisterCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <SurveyBanner />
      <Features />
      <Director />
      <Services />
      <BlogTeaser />
      <Access />
      <RegisterCTA />
    </>
  );
}
