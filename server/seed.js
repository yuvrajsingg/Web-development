// seed.js - Script to create an admin user in MongoDB
import mongoose from 'mongoose';
import User from './models/user.model.js';
import Project from './models/project.model.js';
import Services from './models/services.model.js';
import dotenv from 'dotenv';

dotenv.config();

async function seedAdminUser() {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');

    // Create admin user if doesn't exist
    const adminExists = await User.findOne({ email: 'admin@portfolio.com' });
    
    if (!adminExists) {
      const adminUser = new User({
        name: 'Admin User',
        email: 'admin@portfolio.com',
        password: 'admin123',
        role: 'admin'
      });

      await adminUser.save();
      console.log('✅ Admin user created successfully!');
      console.log('Email: admin@portfolio.com');
      console.log('Password: admin123');
      console.log('Role: admin');
    } else {
      console.log('ℹ️ Admin user already exists');
    }

    // Create regular user if doesn't exist
    const userExists = await User.findOne({ email: 'user@portfolio.com' });
    
    if (!userExists) {
      const regularUser = new User({
        name: 'Regular User',
        email: 'user@portfolio.com',
        password: 'user123',
        role: 'user'
      });

      await regularUser.save();
      console.log('✅ Regular user created successfully!');
      console.log('Email: user@portfolio.com');
      console.log('Password: user123');
      console.log('Role: user');
    } else {
      console.log('ℹ️ Regular user already exists');
    }

    // Clear existing projects
    await Project.deleteMany({});
    console.log('🗑️ Cleared existing projects');

    // Seed new professional projects
    const projects = [
      {
        title: 'AI-Powered Analytics Dashboard',
        firstname: 'Yuvraj',
        lastname: 'Singh',
        email: 'yuvraj@example.com',
        completion: new Date('2024-11-10'),
        description: 'Enterprise-grade analytics platform leveraging TypeScript, React 18, and Redux Toolkit. Integrated machine learning predictions with D3.js visualizations, real-time data streaming via WebSockets, and role-based access control. Achieved 99.2% uptime with AWS Lambda backend.'
      },
      {
        title: 'Microservices Architecture Platform',
        firstname: 'Yuvraj',
        lastname: 'Singh',
        email: 'yuvraj@example.com',
        completion: new Date('2024-10-28'),
        description: 'Scalable microservices ecosystem built with Node.js, Docker, and Kubernetes. Implemented event-driven architecture using RabbitMQ, comprehensive CI/CD pipelines with GitHub Actions, and centralized logging with ELK stack. Supports 10,000+ concurrent users.'
      },
      {
        title: 'FinTech Payment Gateway',
        firstname: 'Yuvraj',
        lastname: 'Singh',
        email: 'yuvraj@example.com',
        completion: new Date('2024-10-15'),
        description: 'Secure payment processing system with PCI-DSS compliance using Next.js and Express.js. Features include multi-currency support, real-time fraud detection with ML models, webhook integrations, and comprehensive transaction auditing. Processes $2M+ monthly volume.'
      },
      {
        title: 'Real-Time Collaboration Suite',
        firstname: 'Yuvraj',
        lastname: 'Singh',
        email: 'yuvraj@example.com',
        completion: new Date('2024-09-20'),
        description: 'Sophisticated collaboration platform with React, Socket.io, and Firebase. Implements operational transformation for real-time document editing, video/audio calling via WebRTC, presence awareness, and conflict resolution. Used by 5,000+ teams globally.'
      },
      {
        title: 'Cloud Infrastructure Management CLI',
        firstname: 'Yuvraj',
        lastname: 'Singh',
        email: 'yuvraj@example.com',
        completion: new Date('2024-09-05'),
        description: 'Comprehensive DevOps tool written in Node.js for AWS/Azure infrastructure management. Features include auto-scaling configuration, cost optimization algorithms, security scanning, and terraform integration. Published on NPM with 50K+ weekly downloads.'
      }
    ];

    await Project.insertMany(projects);
    console.log('✅ Projects seeded successfully!');

    // Clear existing services
    await Services.deleteMany({});
    console.log('🗑️ Cleared existing services');

    // Seed new professional services
    const services = [
      {
        title: 'Full-Stack Web Development',
        description: 'Custom web applications built with modern technologies including React, Node.js, TypeScript, and MongoDB. Includes UI/UX design, API development, database architecture, and deployment.',
        price: '$5,000 - $25,000',
        duration: '4-12 weeks',
        features: 'Responsive Design, RESTful APIs, Authentication & Authorization, Database Design, Performance Optimization, Testing & QA'
      },
      {
        title: 'Mobile App Development',
        description: 'Native and cross-platform mobile applications for iOS and Android. Built with React Native or Flutter, featuring offline capabilities, push notifications, and third-party integrations.',
        price: '$8,000 - $30,000',
        duration: '6-16 weeks',
        features: 'Cross-platform Support, Push Notifications, Offline Sync, App Store Deployment, Analytics Integration, Security & Encryption'
      },
      {
        title: 'Cloud Architecture & DevOps',
        description: 'Design and implementation of scalable cloud infrastructure on AWS, Azure, or GCP. Includes CI/CD pipelines, containerization, monitoring, and security hardening.',
        price: '$3,000 - $15,000',
        duration: '2-8 weeks',
        features: 'Infrastructure as Code, Docker & Kubernetes, CI/CD Pipelines, Monitoring & Logging, Auto-scaling, Security Compliance'
      },
      {
        title: 'AI & Machine Learning Integration',
        description: 'Integration of machine learning models and AI services into applications. Includes data pipeline setup, model training, deployment, and optimization for production use.',
        price: '$6,000 - $20,000',
        duration: '4-10 weeks',
        features: 'Data Pipeline Setup, Model Training, Real-time Predictions, API Integration, Performance Tuning, Model Monitoring'
      },
      {
        title: 'System Architecture Consulting',
        description: 'Expert consultation on designing scalable, maintainable system architectures. Includes technology selection, design patterns, performance optimization, and security considerations.',
        price: '$2,000 - $10,000',
        duration: '1-6 weeks',
        features: 'Technology Assessment, Design Patterns, Scalability Planning, Security Architecture, Performance Optimization, Documentation'
      }
    ];

    await Services.insertMany(services);
    console.log('✅ Services seeded successfully!');

    process.exit(0);
  } catch (err) {
    console.error('❌ Error creating admin user:', err.message);
    process.exit(1);
  }
}

seedAdminUser();
