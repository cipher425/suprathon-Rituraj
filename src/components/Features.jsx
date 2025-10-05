import React from 'react'
import './Features.css'

const Features = () => {
  const features = [
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Built with Vite for instant hot reload and optimized builds'
    },
    {
      icon: '📱',
      title: 'Responsive Design',
      description: 'Perfect on all devices with modern CSS Grid and Flexbox'
    },
    {
      icon: '🎨',
      title: 'Modern UI',
      description: 'Beautiful, accessible interface with smooth animations'
    },
    {
      icon: '🔧',
      title: 'Developer Friendly',
      description: 'Clean code structure with React best practices'
    },
    {
      icon: '🌙',
      title: 'Dark Mode',
      description: 'Toggle between light and dark themes seamlessly'
    },
    {
      icon: '🚀',
      title: 'Production Ready',
      description: 'Optimized for performance and SEO'
    }
  ]

  return (
    <section className="features" id="features">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Features</h2>
          <p className="section-description">
            Everything you need for a modern web application
          </p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features