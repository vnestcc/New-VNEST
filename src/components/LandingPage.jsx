import React from 'react';
import Header from './Header';
import Hero from './Hero';
import WhoAreWe from './WhoAreWe';
import GrowWithUs from './GrowWithUs';
import Stats from './Stats';
import DiscoverMore from './DiscoverMore';
import OurServices from './OurServices';
import WhyChoose from './WhyChoose';
import ContactUs from './ContactUs';
import StepToApply from './StepToApply';
import Alumni from './Alumni';
import FAQ from './FAQ';
// import Blog from './Blog';
import EcosystemPartners from './EcosystemPartners';
import ApplyNow from './ApplyNow';
import Footer from './Footer';

const LandingPage = ({ onGoToApplication, onGoToAdmin, onGoToCareers }) => {
  return (
    <>
      <Header onGoToApplication={onGoToApplication} onGoToAdmin={onGoToAdmin} onGoToCareers={onGoToCareers} />
      <Hero onGoToApplication={onGoToApplication} />
      <section id="about">
        <WhoAreWe />
      </section>
      <GrowWithUs />
      <Stats />
      <DiscoverMore />
      <section id="services">
        <OurServices />
      </section>
      <section id="contact">
        <ContactUs />
      </section>
      <WhyChoose />
      <StepToApply onGoToApplication={onGoToApplication} />
      <Alumni />
      <section id="faqs">
        <FAQ />
      </section>
      {/* <Blog /> */}
      <section id="sponsors">
        <EcosystemPartners />
      </section>
      <ApplyNow onGoToApplication={onGoToApplication} />
      <Footer />
    </>
  );
};

export default LandingPage;
