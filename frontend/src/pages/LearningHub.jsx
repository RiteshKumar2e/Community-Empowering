import { useState } from 'react'
import { BookOpen, Play, ExternalLink, Clock, Award, Users, GraduationCap, Code, Briefcase, Languages } from 'lucide-react'
import '../styles/LearningHub.css'

const LearningHub = () => {
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [showAll, setShowAll] = useState(false)

    const categories = [
        { value: 'all', label: 'All Courses', icon: <BookOpen size={18} /> },
        { value: 'digital', label: 'Digital Skills', icon: <Code size={18} /> },
        { value: 'professional', label: 'Professional', icon: <Briefcase size={18} /> },
        { value: 'language', label: 'Languages', icon: <Languages size={18} /> },
        { value: 'government', label: 'Government Exams', icon: <GraduationCap size={18} /> }
    ]

    // Real Government and Free Learning Platforms
    const learningPlatforms = [
        // Digital Skills & Technology
        {
            title: "SWAYAM - Study Webs of Active Learning",
            description: "Free online courses from Class 9 to Post-Graduation. Courses from IITs, IIMs, Central Universities. Credit transfer facility available.",
            category: "digital",
            provider: "Ministry of Education",
            duration: "4-16 weeks per course",
            students: "10M+ learners",
            level: "All Levels",
            link: "https://swayam.gov.in/",
            features: ["Free Certificates", "Credit Transfer", "Video Lectures", "Assignments"],
            isOfficial: true
        },
        {
            title: "National Digital Literacy Mission (NDLM)",
            description: "Digital literacy training for non-IT literate citizens. Learn basic computer operations, internet usage, email, and digital payments.",
            category: "digital",
            provider: "Ministry of Electronics & IT",
            duration: "20 hours",
            students: "5M+ trained",
            level: "Beginner",
            link: "https://www.digitalindia.gov.in/content/national-digital-literacy-mission-ndlm",
            features: ["Free Training", "Certification", "Practical Sessions"],
            isOfficial: true
        },
        {
            title: "NIELIT - Online Learning",
            description: "IT and Electronics courses. CCC, BCC, O Level, A Level certifications. Recognized by Government of India.",
            category: "digital",
            provider: "NIELIT",
            duration: "3-12 months",
            students: "2M+ certified",
            level: "Beginner to Advanced",
            link: "https://www.nielit.gov.in/",
            features: ["Government Recognized", "Job-Oriented", "Practical Training"],
            isOfficial: true
        },

        // Professional Skills
        {
            title: "Skill India Digital Hub",
            description: "Free skill development courses across 40+ sectors. Industry-recognized certifications. Job placement assistance.",
            category: "professional",
            provider: "Ministry of Skill Development",
            duration: "1-6 months",
            students: "15M+ enrolled",
            level: "All Levels",
            link: "https://www.skillindiadigital.gov.in/",
            features: ["Free Courses", "Industry Certificates", "Job Assistance"],
            isOfficial: true
        },
        {
            title: "PMKVY Training Centers",
            description: "Pradhan Mantri Kaushal Vikas Yojana. Short-term and long-term training programs. Monetary rewards on certification.",
            category: "professional",
            provider: "NSDC",
            duration: "150-300 hours",
            students: "12M+ trained",
            level: "Beginner to Intermediate",
            link: "https://www.pmkvyofficial.org/",
            features: ["Free Training", "Monetary Rewards", "Placement Support"],
            isOfficial: true
        },
        {
            title: "e-Skill India",
            description: "Online platform for skill training. Courses in IT, Electronics, Healthcare, Retail, and more. Free e-learning content.",
            category: "professional",
            provider: "NSDC",
            duration: "Flexible",
            students: "8M+ users",
            level: "All Levels",
            link: "https://eskillindia.org/",
            features: ["Self-Paced", "Industry-Aligned", "Free Access"],
            isOfficial: true
        },

        // Language Learning
        {
            title: "Bhasha Sangam",
            description: "Learn Indian languages. Basic conversational skills in 22 scheduled languages. Interactive multimedia content.",
            category: "language",
            provider: "NCERT",
            duration: "Self-paced",
            students: "1M+ learners",
            level: "Beginner",
            link: "https://www.bhashasangam.in/",
            features: ["22 Languages", "Interactive", "Cultural Context"],
            isOfficial: true
        },
        {
            title: "e-Pathshala",
            description: "Digital textbooks and resources in multiple languages. NCERT books, audio-video content, and interactive modules.",
            category: "language",
            provider: "NCERT",
            duration: "Ongoing",
            students: "5M+ users",
            level: "School Students",
            link: "https://epathshala.nic.in/",
            features: ["Free Textbooks", "Multilingual", "Interactive Content"],
            isOfficial: true
        },

        // Government Exam Preparation
        {
            title: "DIKSHA - Digital Infrastructure for Knowledge Sharing",
            description: "National platform for school education. Content for teachers and students. Aligned with state curricula.",
            category: "government",
            provider: "Ministry of Education",
            duration: "Ongoing",
            students: "20M+ users",
            level: "School to Higher Education",
            link: "https://diksha.gov.in/",
            features: ["State-Specific Content", "QR-Enabled Books", "Teacher Training"],
            isOfficial: true
        },
        {
            title: "NIOS - National Institute of Open Schooling",
            description: "Open schooling for Class 10 and 12. Vocational courses. Flexible learning for working professionals and dropouts.",
            category: "government",
            provider: "Ministry of Education",
            duration: "6 months - 2 years",
            students: "3M+ enrolled",
            level: "Secondary & Senior Secondary",
            link: "https://www.nios.ac.in/",
            features: ["Flexible Schedule", "Recognized Certification", "Vocational Courses"],
            isOfficial: true
        },

        // Additional Free Platforms
        {
            title: "NPTEL - National Programme on Technology Enhanced Learning",
            description: "Engineering and science courses from IITs and IISc. Video lectures, assignments, and exams. Free certificates.",
            category: "digital",
            provider: "IITs & IISc",
            duration: "4-12 weeks",
            students: "8M+ enrolled",
            level: "Undergraduate to Postgraduate",
            link: "https://nptel.ac.in/",
            features: ["IIT Faculty", "Free Certificates", "Credit Transfer"],
            isOfficial: true
        },
        {
            title: "IGNOU - Indira Gandhi National Open University",
            description: "Distance learning programs. Undergraduate, Postgraduate, Diploma, and Certificate courses. Affordable education.",
            category: "professional",
            provider: "IGNOU",
            duration: "6 months - 3 years",
            students: "4M+ students",
            level: "All Levels",
            link: "https://www.ignou.ac.in/",
            features: ["UGC Recognized", "Affordable Fees", "Flexible Learning"],
            isOfficial: true
        }
    ]

    const filteredPlatforms = selectedCategory === 'all'
        ? learningPlatforms
        : learningPlatforms.filter(p => p.category === selectedCategory)

    // Show only 4 platforms initially, then all on "View More"
    const displayedPlatforms = showAll ? filteredPlatforms : filteredPlatforms.slice(0, 4)

    return (
        <div className="learning-hub-page">
            <div className="container">
                <div className="page-header">
                    <h1>Learning & Skill Development</h1>
                    <p>Access free government-approved courses and certifications to enhance your skills</p>
                </div>

                {/* Stats Section */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon">
                            <Users size={24} />
                        </div>
                        <div className="stat-content">
                            <div className="stat-number">50M+</div>
                            <div className="stat-label">Active Learners</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">
                            <Award size={24} />
                        </div>
                        <div className="stat-content">
                            <div className="stat-number">100%</div>
                            <div className="stat-label">Free Courses</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">
                            <BookOpen size={24} />
                        </div>
                        <div className="stat-content">
                            <div className="stat-number">1000+</div>
                            <div className="stat-label">Certifications</div>
                        </div>
                    </div>
                </div>

                {/* Category Filters */}
                <div className="category-filters">
                    {categories.map(category => (
                        <button
                            key={category.value}
                            className={`filter-btn ${selectedCategory === category.value ? 'active' : ''}`}
                            onClick={() => {
                                setSelectedCategory(category.value)
                                setShowAll(false) // Reset to show only 4 when changing category
                            }}
                        >
                            {category.icon}
                            {category.label}
                        </button>
                    ))}
                </div>

                {/* Learning Platforms Grid */}
                <div className="platforms-grid">
                    {displayedPlatforms.map((platform, index) => (
                        <div key={index} className="platform-card">
                            <div className="platform-header">
                                <div className="header-badges">
                                    <span className={`badge badge-${platform.level === 'Beginner' ? 'success' :
                                        platform.level === 'Intermediate' ? 'warning' :
                                            platform.level === 'Advanced' ? 'error' :
                                                'info'
                                        }`}>
                                        {platform.level}
                                    </span>
                                    {platform.isOfficial && (
                                        <span className="badge badge-primary">
                                            <Award size={14} />
                                            Official
                                        </span>
                                    )}
                                </div>
                            </div>

                            <h3>{platform.title}</h3>
                            <p className="platform-description">{platform.description}</p>

                            <div className="platform-meta">
                                <div className="meta-row">
                                    <div className="meta-item">
                                        <GraduationCap size={16} />
                                        <span>{platform.provider}</span>
                                    </div>
                                </div>
                                <div className="meta-row">
                                    <div className="meta-item">
                                        <Clock size={16} />
                                        <span>{platform.duration}</span>
                                    </div>
                                    <div className="meta-item">
                                        <Users size={16} />
                                        <span>{platform.students}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="platform-features">
                                {platform.features.map((feature, idx) => (
                                    <span key={idx} className="feature-tag">
                                        {feature}
                                    </span>
                                ))}
                            </div>

                            <div className="platform-actions">
                                <a
                                    href={platform.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary btn-sm"
                                >
                                    <Play size={16} />
                                    Start Learning
                                    <ExternalLink size={14} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View More Button */}
                {filteredPlatforms.length > 4 && (
                    <div className="view-more-section">
                        <button
                            className="view-more-btn"
                            onClick={() => setShowAll(!showAll)}
                        >
                            {showAll ? 'Show Less' : `View More (${filteredPlatforms.length - 4} more)`}
                        </button>
                    </div>
                )}

                {/* Additional Resources */}
                <div className="additional-resources">
                    <h2>More Learning Resources</h2>
                    <div className="resources-list">
                        <a href="https://www.coursera.org/" target="_blank" rel="noopener noreferrer" className="resource-link">
                            <BookOpen size={20} />
                            <div>
                                <h4>Coursera</h4>
                                <p>Free courses from top universities worldwide</p>
                            </div>
                            <ExternalLink size={16} />
                        </a>
                        <a href="https://www.edx.org/" target="_blank" rel="noopener noreferrer" className="resource-link">
                            <GraduationCap size={20} />
                            <div>
                                <h4>edX</h4>
                                <p>University-level courses in various subjects</p>
                            </div>
                            <ExternalLink size={16} />
                        </a>
                        <a href="https://www.khanacademy.org/" target="_blank" rel="noopener noreferrer" className="resource-link">
                            <BookOpen size={20} />
                            <div>
                                <h4>Khan Academy</h4>
                                <p>Free education for anyone, anywhere</p>
                            </div>
                            <ExternalLink size={16} />
                        </a>
                        <a href="https://www.udemy.com/courses/free/" target="_blank" rel="noopener noreferrer" className="resource-link">
                            <Code size={20} />
                            <div>
                                <h4>Udemy Free Courses</h4>
                                <p>Thousands of free courses on various topics</p>
                            </div>
                            <ExternalLink size={16} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LearningHub
