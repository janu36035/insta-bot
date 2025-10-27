import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

export default function App() {
  // App now uses react-router Routes so pages can navigate by URL
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signup" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      {/* lightweight placeholder for dashboard and other routes */}
      <Route path="/dashboard" element={<div className="p-8">Dashboard (placeholder)</div>} />
      <Route path="*" element={<Navigate to="/signup" replace />} />
    </Routes>
  )
}
