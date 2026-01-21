import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { User, Mail, Phone, MapPin, Globe, Edit2, Save } from 'lucide-react'
import '../styles/Profile.css'

const Profile = () => {
    const { user, logout } = useAuth()
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        location: user?.location || '',
        language: user?.language || 'en',
        communityType: user?.communityType || 'general'
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSave = async () => {
        // API call to update profile
        setIsEditing(false)
    }

    return (
        <div className="profile-page">
            <div className="container">
                <div className="profile-container">
                    {/* Profile Header */}
                    <div className="profile-header">
                        <div className="profile-avatar">
                            <User size={48} />
                        </div>
                        <div className="profile-info">
                            <h1>{user?.name}</h1>
                            <p>{user?.email}</p>
                            <span className="badge badge-primary">{user?.communityType || 'General'} User</span>
                        </div>
                        <button
                            className="btn btn-outline"
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            {isEditing ? <Save size={18} /> : <Edit2 size={18} />}
                            {isEditing ? 'Save Changes' : 'Edit Profile'}
                        </button>
                    </div>

                    {/* Profile Details */}
                    <div className="profile-details">
                        <h2>Personal Information</h2>

                        <div className="details-grid">
                            <div className="detail-item">
                                <label>
                                    <User size={18} />
                                    Full Name
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="form-input"
                                    />
                                ) : (
                                    <p>{user?.name}</p>
                                )}
                            </div>

                            <div className="detail-item">
                                <label>
                                    <Mail size={18} />
                                    Email Address
                                </label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="form-input"
                                    />
                                ) : (
                                    <p>{user?.email}</p>
                                )}
                            </div>

                            <div className="detail-item">
                                <label>
                                    <Phone size={18} />
                                    Phone Number
                                </label>
                                {isEditing ? (
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="form-input"
                                    />
                                ) : (
                                    <p>{user?.phone}</p>
                                )}
                            </div>

                            <div className="detail-item">
                                <label>
                                    <MapPin size={18} />
                                    Location
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="form-input"
                                    />
                                ) : (
                                    <p>{user?.location}</p>
                                )}
                            </div>

                            <div className="detail-item">
                                <label>
                                    <Globe size={18} />
                                    Preferred Language
                                </label>
                                {isEditing ? (
                                    <select
                                        name="language"
                                        value={formData.language}
                                        onChange={handleChange}
                                        className="form-select"
                                    >
                                        <option value="en">English</option>
                                        <option value="hi">हिंदी (Hindi)</option>
                                        <option value="bn">বাংলা (Bengali)</option>
                                        <option value="te">తెలుగు (Telugu)</option>
                                        <option value="mr">मराठी (Marathi)</option>
                                    </select>
                                ) : (
                                    <p>{user?.language === 'hi' ? 'हिंदी (Hindi)' : 'English'}</p>
                                )}
                            </div>

                            <div className="detail-item">
                                <label>
                                    <User size={18} />
                                    Community Type
                                </label>
                                {isEditing ? (
                                    <select
                                        name="communityType"
                                        value={formData.communityType}
                                        onChange={handleChange}
                                        className="form-select"
                                    >
                                        <option value="general">General</option>
                                        <option value="student">Student</option>
                                        <option value="farmer">Farmer</option>
                                        <option value="worker">Worker</option>
                                        <option value="business">Small Business</option>
                                        <option value="senior">Senior Citizen</option>
                                    </select>
                                ) : (
                                    <p>{user?.communityType || 'General'}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Account Actions */}
                    <div className="account-actions">
                        <h2>Account Settings</h2>
                        <div className="actions-grid">
                            <button className="action-btn">
                                Change Password
                            </button>
                            <button className="action-btn">
                                Privacy Settings
                            </button>
                            <button className="action-btn">
                                Notification Preferences
                            </button>
                            <button className="action-btn danger" onClick={logout}>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
