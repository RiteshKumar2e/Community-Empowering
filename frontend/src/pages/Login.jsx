import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../contexts/LanguageContext'
import { Mail, Lock, AlertCircle, Loader } from 'lucide-react'
import '../styles/Auth.css'

const Login = () => {
    const { login } = useAuth()
    const { t } = useLanguage()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        const result = await login(formData.email, formData.password)

        if (!result.success) {
            setError(result.error)
        }

        setLoading(false)
    }

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <div className="logo-icon">🌟</div>
                        <h1>Welcome Back</h1>
                        <p>Sign in to access your community dashboard</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        {error && (
                            <div className="error-message">
                                <AlertCircle size={18} />
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="email" className="form-label">
                                <Mail size={16} />
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="your.email@example.com"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="form-label">
                                <Lock size={16} />
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                            disabled={loading}
                            style={{ width: '100%' }}
                        >
                            {loading ? (
                                <>
                                    <Loader className="spinner" size={20} />
                                    Signing in...
                                </>
                            ) : (
                                t('login')
                            )}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>
                            Don't have an account?{' '}
                            <Link to="/register" className="auth-link">
                                {t('register')}
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="auth-features">
                    <h3>Why Join Community AI?</h3>
                    <ul>
                        <li>
                            <span className="feature-icon">🎯</span>
                            <div>
                                <strong>Access Government Schemes</strong>
                                <p>Get personalized recommendations for schemes and benefits</p>
                            </div>
                        </li>
                        <li>
                            <span className="feature-icon">📚</span>
                            <div>
                                <strong>Learn & Grow</strong>
                                <p>Access educational resources and skill development courses</p>
                            </div>
                        </li>
                        <li>
                            <span className="feature-icon">🗣️</span>
                            <div>
                                <strong>Your Language</strong>
                                <p>Interact in your preferred local language with voice support</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Login
