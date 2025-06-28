import React, { useEffect, useRef, useState } from 'react';
import './StepToApply.css';

const StepToApply = () => {
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [buttonVisible, setButtonVisible] = useState(false);
  const stepRefs = useRef([]);
  const containerRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const steps = [
    {
      number: "01",
      title: "Complete Application Form",
      description: "Fill out our comprehensive application form with your personal details, academic background, and course preferences. Ensure all information is accurate and complete."
    },
    {
      number: "02", 
      title: "Self-report your courses",
      description: "Provide detailed information about your previous coursework, grades, and academic achievements. This helps us understand your educational background better."
    },
    {
      number: "03",
      title: "Choose your program",
      description: "Select from our wide range of educational programs that best align with your career goals and interests. Our advisors can help guide your decision."
    },
    {
      number: "04",
      title: "Additional information about yourself or your circumstances",
      description: "Share any additional details about your background, circumstances, or special requirements that might be relevant to your application and enrollment process."
    },
    {
      number: "05",
      title: "Payment of fee",
      description: "Complete the payment process for your application fee and any required deposits. Multiple payment options are available for your convenience."
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            // Trigger animation sequence when container comes into view
            setHasAnimated(true);
            steps.forEach((_, index) => {
              setTimeout(() => {
                setVisibleSteps(prev => [...prev, index]);
              }, index * 300); // 300ms delay between each step
            });
            
            // Show button after all steps are visible
            setTimeout(() => {
              setButtonVisible(true);
            }, steps.length * 300 + 200); // Extra 200ms delay after last step
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the component is visible
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <div className="step-to-apply" ref={containerRef}>
      <div className="step-container">
        <h2 className="step-heading">Easy Step to Apply</h2>
        <p className="step-description">
          Follow these simple steps to begin your educational journey with us. 
          Our streamlined application process is designed to make your enrollment 
          as smooth and efficient as possible.
        </p>
        
        <div className="steps-list">
          {steps.map((step, index) => (
            <div 
              key={index}
              ref={el => stepRefs.current[index] = el}
              className={`step-item ${visibleSteps.includes(index) ? 'visible' : ''}`}
            >
              <div className="step-number">
                {step.number}
              </div>
              <div className="step-content">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-text">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className={`button-container ${buttonVisible ? 'visible' : ''}`}>
          <button className="application-button">
            APPLICATION FORM
            <span className="arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepToApply;