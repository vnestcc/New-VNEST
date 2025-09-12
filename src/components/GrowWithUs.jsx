// import React, { useEffect, useRef, useState } from 'react';
// import './GrowWithUs.css';

// const GrowWithUs = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const sectionRef = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting && !isVisible) {
//           setIsVisible(true);
//         }
//       },
//       {
//         threshold: 0.2,
//         rootMargin: '0px 0px -50px 0px'
//       }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => {
//       if (sectionRef.current) {
//         observer.unobserve(sectionRef.current);
//       }
//     };
//   }, [isVisible]);

//   return (
//     <section className="grow-with-us" ref={sectionRef}>
//       <div className="container">
//         <div className="cards-grid">
//           {/* Grow with VNEST Card */}
//           <div className={`card grow-card ${isVisible ? 'animate-left' : ''}`}>
//             <div className="card-content">
//               <h3 className="card-title">GROW WITH VNEST</h3>
//               <p className="card-description">
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
//                 do eiusmod tempor incididunt ut labore et dolore magna
//                 aliqua.
//               </p>
//               <button className="cta-button100">KNOW MORE</button>
//             </div>
//             <div className="card-image">
//               <img 
//                 src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop" 
//                 alt="Students learning"
//                 loading="lazy"
//               />
//             </div>
//           </div>

//           {/* Partner with VNEST Card */}
//           <div className={`card partner-card ${isVisible ? 'animate-right' : ''}`}>
//             <div className="card-content">
//               <h3 className="card-title">PARTNER WITH VNEST</h3>
//               <p className="card-description">
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
//                 do eiusmod tempor incididunt ut labore et dolore magna
//                 aliqua.
//               </p>
//               <button className="cta-button100">CONTACT US</button>
//             </div>
//             <div className="card-image">
//               <img 
//                 src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop" 
//                 alt="Partnership meeting"
//                 loading="lazy"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default GrowWithUs;














import React, { useEffect, useRef, useState } from 'react';
import './GrowWithUs.css';

const GrowWithUs = ({ onGoToApplication }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  return (
    <section className="grow-with-us" ref={sectionRef}>
      <div className="container">
        <div className="cards-grid">
          {/* Study With Eduventures Card */}
          <div className={`card grow-card ${isVisible ? 'animate-left' : ''}`}>
            <div className="card-content">
              <h3 className="card-title">Our Vision</h3>
              <p className="card-description">
              To be a leading hub of innovation and entrepreneurship, empowering transformative ideas to become market-leading solutions with global impact.
              </p>
              <button className="cta-button100" onClick={onGoToApplication}>GET IN TOUCH</button>
            </div>
            <div className="card-image">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop"
                alt="Students in graduation gowns"
                loading="lazy"
              />
            </div>
          </div>

          {/* Partner With Eduventures Card */}
          <div className={`card partner-card ${isVisible ? 'animate-right' : ''}`}>
            <div className="card-content">
              <h3 className="card-title">Our Mission</h3>
              <ul className="card-description">
                <li>Incubate and support students, faculty, and entrepreneurs in transforming ideas into viable businesses.</li>
                <li>Foster innovation in emerging fields such as medical devices, drones, robotics, and green energy.</li>
                <li>Provide mentorship, funding, and partnerships to accelerate first-of-its-kind innovations toward market leadership.</li>
                {/* <li>Drive impact through research-based innovation and market validation.</li> */}
              </ul>
              <button className="cta-button120" onClick={onGoToApplication}>GET IN TOUCH</button>
            </div>
            <div className="card-image">
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop"
                alt="Professional in office setting"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrowWithUs;