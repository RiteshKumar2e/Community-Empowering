import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import '../styles/Home.css'

const Home = () => {
    const navigate = useNavigate()
    const { user } = useAuth()

    return (
        <div className="home-page">
            <div className="home-container">
                <div className="home-content">
                    <div className="welcome-section">
                        <h1 className="welcome-title">
                            Welcome, <span className="user-name">{user?.name || 'User'}</span>!
                        </h1>
                        <p className="welcome-subtitle">
                            Ready to explore the Community AI platform
                        </p>
                    </div>

                    <div className="dashboard-action">
                        <button
                            className="dashboard-btn"
                            onClick={() => navigate('/dashboard')}
                        >
                            Dashboard
                        </button>
                    </div>

                    <div className="quick-links">
                        <div className="quick-link-card" onClick={() => navigate('/assistant')}>
                            <div className="quick-link-icon">🤖</div>
                            <h3>AI Assistant</h3>
                            <p>Get instant help</p>
                        </div>
                        <div className="quick-link-card" onClick={() => navigate('/resources')}>
                            <div className="quick-link-icon">📚</div>
                            <h3>Resources</h3>
                            <p>Browse materials</p>
                        </div>
                        <div className="quick-link-card" onClick={() => navigate('/learning')}>
                            <div className="quick-link-icon">🎓</div>
                            <h3>Learning Hub</h3>
                            <p>Start learning</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
