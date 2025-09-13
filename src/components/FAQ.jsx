import React, { useState, useEffect, useRef } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const faqRef = useRef(null);

  const faqData = [
    {
      question: "WHO CAN APPLY TO V-NEST?",
      answer: "Anyone with a viable startup idea or early-stage startup can apply."
    },
    {
      question: "WHAT KIND OF SUPPORT DOES V-NEST OFFER?",
      answer: "V-NEST offers mentorship, funding access, workspace and networking opportunities."
    },
    {
      question: "IS THERE ANY FEE TO INCUBATE A STARTUP AT V-NEST?",
      answer: "No, incubation at V-NEST is free of charge."
    },
    {
      question: "HOW DO I APPLY TO V-NEST?",
      answer: "You can apply online via the V-NEST website by filling out the application form."
    },
    // {
    //   question: "WHAT IS THE DURATION OF THE PROGRAMS OFFERED BY FOREIGN UNIVERSITIES ?",
    //   answer: "Program duration varies depending on the level of study. Undergraduate programs typically range from 3-4 years, master's programs from 1-2 years, and doctoral programs from 3-5 years."
    // }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (faqRef.current) {
      observer.observe(faqRef.current);
    }

    return () => {
      if (faqRef.current) {
        observer.unobserve(faqRef.current);
      }
    };
  }, []);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={`faq-container ${isVisible ? 'animate-in' : ''}`} ref={faqRef}>
      <div className="faq-content">
        <div className="faq-left">
          <div className="faq-badge">FAQ</div>
          <h2 className="faq-title">
            Frequently<br />
            Asked<br />
            Questions.
          </h2>
          <p className="faq-subtitle">
            We got all your questions,<br />
            answered!
          </p>
          <button className="faq-button">
            FAQ'S →
          </button>
        </div>
        
        <div className="faq-right">
          {faqData.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            >
              <div 
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <div className={`faq-icon ${activeIndex === index ? 'rotate' : ''}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path 
                      d="M19 9L12 16L5 9" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className={`faq-answer ${activeIndex === index ? 'show' : ''}`}>
                <div className="faq-answer-content">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;