import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAuth } from './src/AuthContext'
import { ProtectedRoute, PublicRoute } from './src/ProtectedRoute'
import Layout from './components/Layout'

// Lazy load route components for better performance
const Home = lazy(() => import('./components/Home'))
const About = lazy(() => import('./src/about'))
const Contact = lazy(() => import('./src/contact'))
const Project = lazy(() => import('./src/project'))
const Services = lazy(() => import('./src/services'))
const SignIn = lazy(() => import('./src/SignIn'))
const SignUp = lazy(() => import('./src/SignUp'))

// Loading fallback component
const LoadingFallback = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '100vh',
    fontSize: '18px',
    color: '#888'
  }}>
    Loading...
  </div>
)

const MainRouter = () => {
  // Show portfolio directly without authentication
  return (
    <div>
      <Layout/>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/project" element={<Project />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/services" element={<Services />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/signup" element={<SignUp />} />
        
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default MainRouter