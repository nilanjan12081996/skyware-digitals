import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Services from '../components/Services/Services';
import Portfolio from '../components/Portfolio/Portfolio';
import Team from '../components/Team/Team';
import Testimonials from '../components/Testimonials/Testimonials';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Team />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
