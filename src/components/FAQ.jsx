import React, { useState, useEffect, useRef } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const faqRef = useRef(null);

  const faqData = [
    {
      question: "WHAT IS THE INSTITUTION'S ROLE IN THE ADMISSIONS PROCESS TO FOREIGN UNIVERSITIES?",
      answer: "The Institution acts as a facilitator in the admissions process, and students can apply to the foreign universities through the Institution. The Institution will guide students through the application process and help them prepare the required documents for admissions."
    },
    {
      question: "CAN I APPLY DIRECTLY TO THE FOREIGN UNIVERSITIES ?",
      answer: "Yes, you can apply directly to foreign universities. However, going through the Institution provides additional support and guidance throughout the application process."
    },
    {
      question: "WHAT ARE THE ELIGIBILITY CRITERIA FOR ADMISSION TO FOREIGN UNIVERSITIES THROUGH THE INSTITUTION ?",
      answer: "Eligibility criteria vary by university and program. Generally, you need to meet academic requirements, language proficiency standards, and provide necessary documentation as specified by each institution."
    },
    {
      question: "WHAT IS THE APPLICATION DEADLINE FOR FOREIGN UNIVERSITIES ?",
      answer: "Application deadlines vary by university and program. Most universities have multiple intake periods throughout the year. We recommend checking with specific institutions for their exact deadlines."
    },
    {
      question: "WHAT IS THE DURATION OF THE PROGRAMS OFFERED BY FOREIGN UNIVERSITIES ?",
      answer: "Program duration varies depending on the level of study. Undergraduate programs typically range from 3-4 years, master's programs from 1-2 years, and doctoral programs from 3-5 years."
    }
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