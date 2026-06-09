import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Catalog } from "@/components/site/Catalog";
import { Story } from "@/components/site/Story";
import { Process } from "@/components/site/Process";
import { BrewingGuide } from "@/components/site/BrewingGuide";
import { Testimonials } from "@/components/site/Testimonials";
import { Origins } from "@/components/site/Origins";
import { Locations } from "@/components/site/Locations";
import { Newsletter } from "@/components/site/Newsletter";
import { Footer } from "@/components/site/Footer";


function App() {
  return (
    <main className="bg-cream text-ink overflow-x-hidden">
      <Nav />
      <Hero />
      <Marquee />
      <Catalog />
      <Story />
      <Process />
      <BrewingGuide />
      <Testimonials />
      <Origins />
      <Locations />
      <Newsletter />
      <Footer />
    </main>
  )
}

export default App