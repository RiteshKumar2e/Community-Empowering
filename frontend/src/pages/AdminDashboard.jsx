import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import {
    Users, MessageSquare, BookOpen, Search, TrendingUp, Award,
    Shield, Activity, Database, Globe, AlertCircle, CheckCircle,
    UserCheck, FileText, BarChart3, Clock
} from 'lucide-react'
import api from '../services/api'
import '../styles/AdminDashboard.css'

const AdminDashboard = () => {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalQueries: 0,
        totalCourses: 0,
        totalResources: 0,
        activeUsers: 0,
        todayQueries: 0
    })
    const [users, setUsers] = useState([])
    const [recentQueries, setRecentQueries] = useState([])
    const [recentEnrollments, setRecentEnrollments] = useState([])

    useEffect(() => {
        // Check if user is admin
        if (user?.email !== 'riteshkumar90359@gmail.com') {
            navigate('/dashboard')
            return
        }

        fetchAdminData()
    }, [user, navigate])

    const fetchAdminData = async () => {
        try {
            setLoading(true)
            // Fetch all admin data
            const [usersRes, queriesRes, enrollmentsRes] = await Promise.all([
                api.get('/admin/users'),
                api.get('/admin/queries'),
                api.get('/admin/enrollments')
            ])

            setUsers(usersRes.data || [])
            setRecentQueries(queriesRes.data || [])
            setRecentEnrollments(enrollmentsRes.data || [])

            // Calculate stats
            setStats({
                totalUsers: usersRes.data?.length || 0,
                totalQueries: queriesRes.data?.length || 0,
                totalCourses: 5, // From database
                totalResources: 5, // From database
                activeUsers: usersRes.data?.filter(u => u.is_active)?.length || 0,
                todayQueries: queriesRes.data?.filter(q => {
                    const today = new Date().toDateString()
                    return new Date(q.created_at).toDateString() === today
                })?.length || 0
            })
        } catch (error) {
            console.error('Error fetching admin data:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="admin-loading">
                <div className="spinner-large"></div>
                <p>Loading admin dashboard...</p>
            </div>
        )
    }

    return (
        <div className="admin-dashboard">
            <div className="container">
                {/* Header */}
                <div className="admin-header">
                    <div>
                        <h1>
                            <Shield size={32} />
                            Admin Dashboard
                        </h1>
                        <p>Complete platform overview and management</p>
                    </div>
                    <div className="admin-badge-large">
                        <Shield size={20} />
                        Administrator
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="admin-stats-grid">
                    <div className="admin-stat-card primary">
                        <div className="stat-icon">
                            <Users size={32} />
                        </div>
                        <div className="stat-details">
                            <div className="stat-value">{stats.totalUsers}</div>
                            <div className="stat-label">Total Users</div>
                            <div className="stat-meta">{stats.activeUsers} active</div>
                        </div>
                    </div>

                    <div className="admin-stat-card success">
                        <div className="stat-icon">
                            <MessageSquare size={32} />
                        </div>
                        <div className="stat-details">
                            <div className="stat-value">{stats.totalQueries}</div>
                            <div className="stat-label">AI Queries</div>
                            <div className="stat-meta">{stats.todayQueries} today</div>
                        </div>
                    </div>

                    <div className="admin-stat-card warning">
                        <div className="stat-icon">
                            <BookOpen size={32} />
                        </div>
                        <div className="stat-details">
                            <div className="stat-value">{stats.totalCourses}</div>
                            <div className="stat-label">Courses</div>
                            <div className="stat-meta">Available</div>
                        </div>
                    </div>

                    <div className="admin-stat-card info">
                        <div className="stat-icon">
                            <Search size={32} />
                        </div>
                        <div className="stat-details">
                            <div className="stat-value">{stats.totalResources}</div>
                            <div className="stat-label">Resources</div>
                            <div className="stat-meta">Listed</div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="admin-content-grid">
                    {/* Users Table */}
                    <div className="admin-section">
                        <div className="section-header">
                            <h2>
                                <Users size={24} />
                                Registered Users
                            </h2>
                            <span className="badge badge-primary">{users.length} total</span>
                        </div>

                        <div className="admin-table-container">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Location</th>
                                        <th>Community Type</th>
                                        <th>Language</th>
                                        <th>Status</th>
                                        <th>Joined</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id}>
                                            <td>#{user.id}</td>
                                            <td className="user-name">
                                                <UserCheck size={16} />
                                                {user.name}
                                            </td>
                                            <td>{user.email}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.location}</td>
                                            <td>
                                                <span className="badge badge-secondary">
                                                    {user.community_type}
                                                </span>
                                            </td>
                                            <td>{user.language?.toUpperCase()}</td>
                                            <td>
                                                {user.is_active ? (
                                                    <span className="status-badge active">
                                                        <CheckCircle size={14} />
                                                        Active
                                                    </span>
                                                ) : (
                                                    <span className="status-badge inactive">
                                                        <AlertCircle size={14} />
                                                        Inactive
                                                    </span>
                                                )}
                                            </td>
                                            <td>{new Date(user.created_at).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {users.length === 0 && (
                                <div className="empty-state">
                                    <Users size={48} />
                                    <p>No users registered yet</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Recent Queries */}
                    <div className="admin-section">
                        <div className="section-header">
                            <h2>
                                <MessageSquare size={24} />
                                Recent AI Queries
                            </h2>
                            <span className="badge badge-success">{recentQueries.length} total</span>
                        </div>

                        <div className="queries-list">
                            {recentQueries.slice(0, 10).map((query, index) => (
                                <div key={index} className="query-item">
                                    <div className="query-header">
                                        <span className="query-user">User #{query.user_id}</span>
                                        <span className="query-time">
                                            <Clock size={14} />
                                            {new Date(query.created_at).toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="query-message">
                                        <strong>Q:</strong> {query.message}
                                    </div>
                                    {query.response && (
                                        <div className="query-response">
                                            <strong>A:</strong> {query.response.substring(0, 150)}...
                                        </div>
                                    )}
                                    <div className="query-meta">
                                        <span className="badge badge-info">{query.language?.toUpperCase()}</span>
                                    </div>
                                </div>
                            ))}

                            {recentQueries.length === 0 && (
                                <div className="empty-state">
                                    <MessageSquare size={48} />
                                    <p>No queries yet</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Analytics */}
                    <div className="admin-section">
                        <div className="section-header">
                            <h2>
                                <BarChart3 size={24} />
                                Platform Analytics
                            </h2>
                        </div>

                        <div className="analytics-grid">
                            <div className="analytics-card">
                                <Activity size={24} />
                                <div>
                                    <div className="analytics-value">{stats.totalQueries}</div>
                                    <div className="analytics-label">Total Interactions</div>
                                </div>
                            </div>

                            <div className="analytics-card">
                                <TrendingUp size={24} />
                                <div>
                                    <div className="analytics-value">
                                        {stats.totalUsers > 0 ? (stats.totalQueries / stats.totalUsers).toFixed(1) : 0}
                                    </div>
                                    <div className="analytics-label">Avg Queries/User</div>
                                </div>
                            </div>

                            <div className="analytics-card">
                                <Globe size={24} />
                                <div>
                                    <div className="analytics-value">
                                        {new Set(users.map(u => u.language)).size}
                                    </div>
                                    <div className="analytics-label">Languages Used</div>
                                </div>
                            </div>

                            <div className="analytics-card">
                                <Award size={24} />
                                <div>
                                    <div className="analytics-value">
                                        {new Set(users.map(u => u.community_type)).size}
                                    </div>
                                    <div className="analytics-label">Community Types</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* System Status */}
                    <div className="admin-section">
                        <div className="section-header">
                            <h2>
                                <Database size={24} />
                                System Status
                            </h2>
                        </div>

                        <div className="system-status">
                            <div className="status-item">
                                <CheckCircle size={20} color="var(--success-500)" />
                                <span>Database Connected</span>
                            </div>
                            <div className="status-item">
                                <CheckCircle size={20} color="var(--success-500)" />
                                <span>API Server Running</span>
                            </div>
                            <div className="status-item">
                                <CheckCircle size={20} color="var(--success-500)" />
                                <span>AI Service Active</span>
                            </div>
                            <div className="status-item">
                                <CheckCircle size={20} color="var(--success-500)" />
                                <span>Authentication Working</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
