import React from 'react';
import { MapPin, Clock, DollarSign, Users, Briefcase } from 'lucide-react';
import './Careers.css';

const Careers = () => {
  const jobListings = [
    {
      id: 1,
      title: "Full Stack Developer",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      experience: "2-4 years",
      salary: "₹8-15 LPA",
      description: "We are looking for a passionate Full Stack Developer to join our growing team. You'll work on building scalable web applications using modern technologies and contribute to our mission of fostering innovation in the startup ecosystem.",
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
      location: "Bangalore, India",
      type: "Full-time",
      experience: "3-6 years",
      salary: "₹15-25 LPA",
      description: "Join us as a Product Manager to drive the strategic direction of our platform. You'll work closely with engineering, design, and business teams to deliver products that empower startups and entrepreneurs.",
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
      title: "UX/UI Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      experience: "2-5 years",
      salary: "₹6-12 LPA",
      description: "We're seeking a creative UX/UI Designer to enhance user experience across our platform. You'll be responsible for creating intuitive, beautiful interfaces that help startups succeed.",
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
            Build the future of entrepreneurship with us. We're looking for passionate individuals 
            who want to make a difference in the startup ecosystem.
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
                  <span className="department-badge">{job.department}</span>
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
                </div>

                <div className="job-description">
                  <p>{job.description}</p>
                </div>

                <div className="job-details">
                  <div className="requirements">
                    <h5>Requirements:</h5>
                    <ul>
                      {job.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="responsibilities">
                    <h5>Responsibilities:</h5>
                    <ul>
                      {job.responsibilities.map((resp, index) => (
                        <li key={index}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="job-actions">
                  <button className="apply-btn">
                    Apply Now
                  </button>
                  <button className="save-btn">
                    Save Job
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="careers-footer1">
          <div className="footer-content1">
            <h3>Don't see the right role?</h3>
            <p>
              We're always looking for talented individuals. Send us your resume and 
              we'll keep you in mind for future opportunities.
            </p>
            <button className="contact-btn1">
              Send Your Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;
