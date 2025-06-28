import React, { useEffect, useRef, useState } from 'react';
import './Blog.css';

const Blog = () => {
  const [isVisible, setIsVisible] = useState(false);
  const blogRef = useRef(null);

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
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (blogRef.current) {
      observer.observe(blogRef.current);
    }

    return () => {
      if (blogRef.current) {
        observer.unobserve(blogRef.current);
      }
    };
  }, []);

  const blogPosts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&h=300&fit=crop',
      title: 'Understanding the Accreditation Process for Overseas Universities',
      description: 'Understanding the Accreditation Process for Overseas Universities For students and...',
      readMore: 'Read More'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=300&fit=crop',
      title: 'Navigating International University Collaborations: A Comprehensive Guide',
      description: 'Navigating International University Collaborations: A Comprehensive Guide In the realm...',
      readMore: 'Read More'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=500&h=300&fit=crop',
      title: 'Strategies for Increasing Diversity and Inclusion in',
      description: 'Strategies for Increasing Diversity and Inclusion in Foreign Universities In...',
      readMore: 'Read More'
    }
  ];

  return (
    <section ref={blogRef} className={`blog-section ${isVisible ? 'animate' : ''}`}>
      <div className="blog-container">
        <div className="blog-header">
          <h2 className="blog-title">Read our blogs</h2>
          <p className="blog-subtitle">
            Exciting Things on the Horizon! Stay Tuned for the Upcoming EduVentures Blog. We're Bringing You Insightful, Informative, and Inspirational Content to Fuel Your Educational Journey.
          </p>
        </div>
        
        <div className="blog-grid">
          {blogPosts.map((post, index) => (
            <div key={post.id} className={`blog-card card-${index + 1}`}>
              <div className="blog-image-container">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="blog-image"
                  loading="lazy"
                />
              </div>
              <div className="blog-content">
                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-description">{post.description}</p>
                <a href="#" className="read-more-link">{post.readMore}</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;