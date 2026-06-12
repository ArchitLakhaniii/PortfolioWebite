import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Showcase from "@/components/showcase/Showcase";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />
      <Showcase />
      <Experience />
      <Skills />
      <Achievements />
      <Contact />
      <Footer />
    </main>
  );
}
