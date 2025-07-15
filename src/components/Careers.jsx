import React, { useEffect, useRef } from 'react';
import { MapPin, Clock, DollarSign, Users, Briefcase, Home } from 'lucide-react';
import './Careers.css';

const Careers = ({ onJobClick }) => {
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  const jobListings = [
    {
      id: 1,
      title: "Full Stack Developer",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-Time",
      experience: "2-4 Years",
      salary: "8-15 LPA",
      workType: "On-Site",
      description: "Work on building scalable, user-friendly web applications and contribute to our mission of empowering startups through technology.",
      requirements: [
        "Bachelor's degree in Computer Science or related field",
        "Strong experience with React.js, Node.js, and MongoDB",
        "Experience with RESTful APIs and microservices",
        "Knowledge of cloud platforms (AWS/Azure)",
        "Strong problem-solving skills and attention to detail"
      ],
      responsibilities: [
        "Develop and maintain web applications using React and Node.js",
        "Design and implement RESTful APIs",
        "Collaborate with UI/UX designers to implement responsive designs",
        "Write clean, maintainable, and efficient code",
        "Participate in code reviews and team meetings"
      ]
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      location: "Banglore, India",
      type: "Full-Time",
      experience: "3-6 Years",
      salary: "15-25 LPA",
      workType: "On-Site",
      description: "Drive the strategic direction of our platform. Work closely with engineering, design, and business teams to deliver products that empower startups.",
      requirements: [
        "Bachelor's degree in Business, Engineering, or related field",
        "3+ years of product management experience",
        "Experience with product analytics tools",
        "Strong analytical and problem-solving skills",
        "Excellent communication and leadership abilities"
      ],
      responsibilities: [
        "Define product roadmap and strategy",
        "Gather and analyze user feedback and requirements",
        "Work with cross-functional teams to deliver features",
        "Monitor product metrics and user engagement",
        "Conduct market research and competitive analysis"
      ]
    },
    {
      id: 3,
      title: "UI/UX Designer",
      department: "Design",
      location: "Pune, India",
      type: "Full-Time",
      experience: "2-5 Years",
      salary: "6-12 LPA",
      workType: "Remote",
      description: "Enhance user experience across our platform. You'll be responsible for creating intuitive, beautiful interfaces that help startups succeed.",
      requirements: [
        "Bachelor's degree in Design, HCI, or related field",
        "Strong portfolio showcasing UX/UI design work",
        "Proficiency in Figma, Sketch, or Adobe Creative Suite",
        "Understanding of design systems and accessibility",
        "Experience with user research and testing"
      ],
      responsibilities: [
        "Design user interfaces for web and mobile applications",
        "Conduct user research and usability testing",
        "Create wireframes, prototypes, and design systems",
        "Collaborate with developers to ensure design implementation",
        "Stay updated with design trends and best practices"
      ]
    }
  ];

  return (
    <div className="careers-section" id="careers">
      <div className="careers-container">
        <div className="careers-header">
          <h2>Join Our Team</h2>
          <p>
            Build The Future Of Entrepreneurship With Us. We're Looking For Passionate Individuals Who Want To Make A Difference In The Startup Ecosystem.
          </p>
        </div>

        <div className="company-culture">
          <div className="culture-stats">
            <div className="stat-item">
              <Users className="stat-icon" />
              <h3>50+</h3>
              <p>Team Members</p>
            </div>
            <div className="stat-item">
              <Briefcase className="stat-icon" />
              <h3>100+</h3>
              <p>Startups Supported</p>
            </div>
            <div className="stat-item">
              <MapPin className="stat-icon" />
              <h3>3</h3>
              <p>Office Locations</p>
            </div>
          </div>
        </div>

        <div className="jobs-section">
          <h3>Open Positions</h3>
          <div className="jobs-grid">
            {jobListings.map((job) => (
              <div key={job.id} className="job-card">
                <div className="job-header">
                  <h4>{job.title}</h4>
                  <span className="department-badge">{job.department.toUpperCase()}</span>
                </div>
                
                <div className="job-meta">
                  <div className="meta-item">
                    <MapPin size={16} />
                    <span>{job.location}</span>
                  </div>
                  <div className="meta-item">
                    <Clock size={16} />
                    <span>{job.type}</span>
                  </div>
                  <div className="meta-item">
                    <Briefcase size={16} />
                    <span>{job.experience}</span>
                  </div>
                  <div className="meta-item">
                    <DollarSign size={16} />
                    <span>{job.salary}</span>
                  </div>
                  <div className="meta-item">
                    <Home size={16} />
                    <span>{job.workType}</span>
                  </div>
                </div>

                <div className="job-description">
                  <p>{job.description}</p>
                </div>

                <div className="job-actions">
                  <button className="apply-btn" onClick={() => onJobClick(job)}>
                    KNOW MORE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="careers-footer1">
          <div className="footer-content1" ref={footerRef}>
            <h3>Don't See The Right Role?</h3>
            <p>
              We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <button className="contact-btn1">
              SEND YOUR RESUME
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;
