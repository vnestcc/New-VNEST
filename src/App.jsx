// import { useState } from 'react'
// import Header from './components/Header'
// import './App.css'
// import Hero from './components/Hero'
// import WhoAreWe from './components/WhoAreWe'
// import GrowWithUs from './components/GrowWithUs'
// import Stats from './components/Stats'
// import DiscoverMore from './components/DiscoverMore'
// import OurServices from './components/OurServices'
// import WhyChoose from './components/WhyChoose'
// import ContactUs from './components/ContactUs'
// import StepToApply from './components/StepToApply'
// import Alumni from './components/Alumni'
// import FAQ from './components/FAQ'
// import Blog from './components/Blog'
// import EcosystemPartners from './components/EcosystemPartners'
// import ApplyNow from './components/ApplyNow'
// import Footer from './components/Footer'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//     <Header />
//     <Hero />
//     <WhoAreWe/>
//     <GrowWithUs/>
//     <Stats/>
//     <DiscoverMore/>
//     <OurServices/>
//     <ContactUs/>
//     <WhyChoose/>
//     <DiscoverMore/>
//     <StepToApply/>
//     <Alumni/>
//     <FAQ/>
//     <Blog/>
//     <EcosystemPartners/>
//     <ApplyNow/>
//     <Footer/>
//     </>
//   )
// }

// export default App












import React from 'react'
import { AuthProvider } from './context/AuthContext'
import { FormProvider } from './context/FormContext'
import Router from './components/Router'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <FormProvider>
        <Router />
      </FormProvider>
    </AuthProvider>
  )
}

export default App