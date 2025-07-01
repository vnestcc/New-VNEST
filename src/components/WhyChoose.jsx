// import React, { useState, useEffect, useRef } from 'react';
// import './WhyChoose.css';

// const WhyChoose = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const componentRef = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//         }
//       },
//       {
//         threshold: 0.1,
//         rootMargin: '50px 0px -50px 0px'
//       }
//     );

//     if (componentRef.current) {
//       observer.observe(componentRef.current);
//     }

//     return () => {
//       if (componentRef.current) {
//         observer.unobserve(componentRef.current);
//       }
//     };
//   }, []);

//   const LazyIcon = ({ iconType, alt }) => {
//     const [loaded, setLoaded] = useState(false);
    
//     useEffect(() => {
//       const timer = setTimeout(() => {
//         setLoaded(true);
//       }, 100);
//       return () => clearTimeout(timer);
//     }, []);

//     if (!loaded) {
//       return <div className="icon-placeholder"></div>;
//     }

//     const getIconSvg = (type) => {
//       switch (type) {
//         case 'convenience':
//           return (
//             <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//             </svg>
//           );
//         case 'quality':
//           return (
//             <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//             </svg>
//           );
//         case 'global':
//           return (
//             <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
//               <path d="M2 12H22" stroke="currentColor" strokeWidth="2"/>
//               <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="currentColor" strokeWidth="2"/>
//             </svg>
//           );
//         case 'expertise':
//           return (
//             <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//             </svg>
//           );
//         case 'support':
//           return (
//             <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//             </svg>
//           );
//         case 'certified':
//           return (
//             <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               <path d="M16 13L13 16L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//             </svg>
//           );
//         default:
//           return null;
//       }
//     };

//     return (
//       <div className="feature-icon">
//         {getIconSvg(iconType)}
//       </div>
//     );
//   };

//   const features = [
//     {
//       icon: 'convenience',
//       title: 'Convenience',
//       description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.'
//     },
//     {
//       icon: 'quality',
//       title: 'Quality',
//       description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.'
//     },
//     {
//       icon: 'global',
//       title: 'Global',
//       description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.'
//     },
//     {
//       icon: 'expertise',
//       title: 'Expertise',
//       description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.'
//     },
//     {
//       icon: 'support',
//       title: 'Support',
//       description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.'
//     },
//     {
//       icon: 'certified',
//       title: 'Certified',
//       description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.'
//     }
//   ];

//   return (
//     <div className="why-choose-container" ref={componentRef}>
//       <div className={`why-choose-content ${isVisible ? 'animate-in' : ''}`}>
//         <div className="why-choose-header">
//           <h2 className="main-title">Why choose V-NEST</h2>
//           <p className="subtitle">Education beyond boundaries</p>
//           <div className="title-underline">
//             <div className="underline-part-1"></div>
//             <div className="underline-part-2"></div>
//           </div>
//         </div>
        
//         <div className="features-grid">
//           {features.map((feature, index) => (
//             <div 
//               key={feature.title} 
//               className={`feature-card ${isVisible ? 'slide-up' : ''}`}
//               style={{ animationDelay: `${index * 150}ms` }}
//             >
//               <LazyIcon iconType={feature.icon} alt={feature.title} />
//               <h3 className="feature-title">{feature.title}</h3>
//               <p className="feature-description">{feature.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WhyChoose;














import React, { useState, useEffect, useRef } from 'react';
import './WhyChoose.css';

const WhyChoose = () => {
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px'
      }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, []);

  const LazyIcon = ({ iconType, alt }) => {
    const [loaded, setLoaded] = useState(false);
    
    useEffect(() => {
      const timer = setTimeout(() => {
        setLoaded(true);
      }, 100);
      return () => clearTimeout(timer);
    }, []);

    if (!loaded) {
      return <div className="icon-placeholder"></div>;
    }

    const getIconSvg = (type) => {
      switch (type) {
        case 'convenience':
          return (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          );
        case 'quality':
          return (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          );
        case 'global':
          return (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M2 12H22" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="currentColor" strokeWidth="2"/>
            </svg>
          );
        case 'expertise':
          return (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          );
        case 'support':
          return (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          );
        case 'certified':
          return (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 13L13 16L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          );
        default:
          return null;
      }
    };

    return (
      <div className="feature-icon">
        {getIconSvg(iconType)}
      </div>
    );
  };

  const features = [
    {
      icon: 'convenience',
      title: 'Product development guidance',
      description: 'Expert support to refine and build your startup\'s product efficiently.'
    },
    {
      icon: 'quality',
      title: 'Investor readiness',
      description: 'Help preparing compelling pitches and validating proposals for investors.'
    },
    {
      icon: 'global',
      title: 'Tech platform access',
      description: 'Free or discounted access to cutting-edge development tools and platforms.'
    },
    {
      icon: 'expertise',
      title: 'Get revenue-based funding models',
      description: 'Flexible funding options that grow with your startup’s earnings.'
    },
    {
      icon: 'support',
      title: 'To engage in research-backed entrepreneurship',
      description: 'Leverage academic research to create innovative, market-ready solutions.'
    },
    {
      icon: 'certified',
      title: 'Collaboration with VIT faculty and partner ecosystems',
      description: 'Network and collaborate with a vibrant community of mentors and experts.'
    }
  ];

  return (
    <div className="why-choose-container" ref={componentRef}>
      <div className={`why-choose-content ${isVisible ? 'animate-in' : ''}`}>
        <div className="why-choose-header">
          <h2 className="main-title">Why choose V-NEST</h2>
          <p className="subtitle">Key Startup Benefits</p>
          <div className="title-underline">
            <div className="underline-part-1"></div>
            <div className="underline-part-2"></div>
          </div>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={feature.title} 
              className={`feature-card ${isVisible ? 'slide-up' : ''}`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <LazyIcon iconType={feature.icon} alt={feature.title} />
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;