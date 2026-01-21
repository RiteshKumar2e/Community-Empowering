import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { LanguageProvider } from './contexts/LanguageContext'
import Navbar from './components/Navbar'
import ParticleCursor from './components/ParticleCursor'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AIAssistant from './pages/AIAssistant'
import Resources from './pages/Resources'
import LearningHub from './pages/LearningHub'
import Profile from './pages/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'

function App() {
    return (
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <AuthProvider>
                <LanguageProvider>
                    <div className="app">
                        <ParticleCursor />
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<Landing />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/admin-login" element={<AdminLogin />} />

                            {/* Protected Routes */}
                            <Route path="/dashboard" element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            } />
                            <Route path="/assistant" element={
                                <ProtectedRoute>
                                    <AIAssistant />
                                </ProtectedRoute>
                            } />
                            <Route path="/resources" element={
                                <ProtectedRoute>
                                    <Resources />
                                </ProtectedRoute>
                            } />
                            <Route path="/learning" element={
                                <ProtectedRoute>
                                    <LearningHub />
                                </ProtectedRoute>
                            } />
                            <Route path="/profile" element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            } />
                            <Route path="/admin" element={
                                <ProtectedRoute>
                                    <AdminDashboard />
                                </ProtectedRoute>
                            } />
                        </Routes>
                    </div>
                </LanguageProvider>
            </AuthProvider>
        </Router>
    )
}

export default App
