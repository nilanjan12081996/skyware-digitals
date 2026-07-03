import Navbar from '../../components/Navbar/Navbar';
import Careers from '../../components/Careers/Careers';
import Footer from '../../components/Footer/Footer';
import styles from './CareersPage.module.css';

export const metadata = {
  title: 'Careers | Skyware Digital',
  description: 'Join the AI revolution at Skyware Digital. Explore our current job openings and build the future with us.',
};

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <section className={styles.intro}>
          <div className="container">
            <div className={styles.content}>
              <h1 className="outfit-font">Work with <span className="text-gradient">Innovation</span></h1>
              <p>
                At Skyware Digital, we aren't just building applications; we are shaping the future of AI-driven digital experiences. 
                We are looking for passionate creators, thinkers, and explorers who want to make a real impact.
              </p>
              <div className={styles.stats}>
                <div className={styles.statItem}>
                  <h3>Remote First</h3>
                  <p>Work from anywhere</p>
                </div>
                <div className={styles.statItem}>
                  <h3>Latest Tech</h3>
                  <p>AI, Cloud & React</p>
                </div>
                <div className={styles.statItem}>
                  <h3>Growth</h3>
                  <p>Continuous learning</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <Careers />
      </main>
      <Footer />
    </>
  );
}
