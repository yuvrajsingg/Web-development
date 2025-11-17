import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAuth } from './src/AuthContext'
import { ProtectedRoute, PublicRoute } from './src/ProtectedRoute'
import Home from './components/Home'
import About from './src/about'
import Contact from './src/contact'
import Project from './src/project'
import Layout from './components/Layout'
import Services from './src/services'
import SignIn from './src/SignIn'
import SignUp from './src/SignUp'


const MainRouter = () => {
  // Show portfolio directly without authentication
  return (
    <div>
      <Layout/>
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
    </div>
  )
}

export default MainRouter