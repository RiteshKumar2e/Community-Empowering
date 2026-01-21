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
        },
        // ------------------- NEWLY ADDED LEARNING RESOURCES (Total 40) -------------------
        {
            title: "National Digital Library of India (NDL)",
            description: "A virtual repository of learning resources with a single-window search facility. Millions of books, articles, and lectures.",
            category: "government",
            provider: "IIT Kharagpur & Ministry of Education",
            duration: "Ongoing",
            students: "30M+ users",
            level: "All Levels",
            link: "https://ndl.iitkgp.ac.in/",
            features: ["Multilingual", "Single-Window Search", "Academic Content"],
            isOfficial: true
        },
        {
            title: "Spoken Tutorial",
            description: "Self-paced audio-video tutorials in various Indian languages. Learn IT software, programming, and digital tools.",
            category: "digital",
            provider: "IIT Bombay",
            duration: "Self-paced",
            students: "5M+ trained",
            level: "All Levels",
            link: "https://spoken-tutorial.org/",
            features: ["22 Languages", "Self-Taught", "Free Software"],
            isOfficial: true
        },
        {
            title: "Virtual Labs",
            description: "Online lab environment for science and engineering students. Perform experiments remotely using simulation-based modules.",
            category: "digital",
            provider: "Ministry of Education",
            duration: "Ongoing",
            students: "2M+ users",
            level: "Higher Education",
            link: "https://www.vlab.co.in/",
            features: ["Remote Access", "Engineering Labs", "Experimental Simulation"],
            isOfficial: true
        },
        {
            title: "FOSSEE",
            description: "Free and Open Source Software for Education. Encouraging the use of open-source tools in tech education across India.",
            category: "digital",
            provider: "IIT Bombay",
            duration: "Project-based",
            students: "1M+ contributors",
            level: "Technical Students",
            link: "https://fossee.in/",
            features: ["Open Source", "Software Training", "Educational Kits"],
            isOfficial: true
        },
        {
            title: "CEC - Consortium for Educational Communication",
            description: "Digital content for higher education. Video lectures and e-content for undergraduate courses across all streams.",
            category: "government",
            provider: "UGC",
            duration: "Ongoing",
            students: "1M+ views",
            level: "Undergraduate",
            link: "https://cec.nic.in/",
            features: ["UGC-Approved", "Video Lectures", "Curriculum Aligned"],
            isOfficial: true
        },
        {
            title: "Swayam Prabha",
            description: "Free 34 DTH channels for educational telecasting. 24/7 educational content for school and higher education.",
            category: "government",
            provider: "Ministry of Education",
            duration: "24/7",
            students: "Millions of viewers",
            level: "School to PG",
            link: "https://www.swayamprabha.gov.in/",
            features: ["TV-Based Learning", "DTH Support", "Offline Access"],
            isOfficial: true
        },
        {
            title: "NEAT - National Education Alliance",
            description: "Platform using AI for personalized learning. Ed-tech products for students to improve employability and skills.",
            category: "professional",
            provider: "AICTE",
            duration: "Variable",
            students: "500K+ beneficiaries",
            level: "Technical Education",
            link: "https://neat.aicte-india.org/",
            features: ["AI-Driven", "EdTech Coupons", "Skill Enhancement"],
            isOfficial: true
        },
        {
            title: "AICTE Free Learning Support",
            description: "Portal providing free access to high-quality technical education products during the pandemic and beyond.",
            category: "professional",
            provider: "AICTE",
            duration: "Self-paced",
            students: "1M+ enrolled",
            level: "Engineering/MBA",
            link: "https://free.aicte-india.org/",
            features: ["Technical Focus", "Free Tools", "Corporate Tie-ups"],
            isOfficial: true
        },
        {
            title: "Khan Academy (Hindi)",
            description: "World-class education for anyone, anywhere. Math, science, and history lessons translated into Hindi.",
            category: "language",
            provider: "Khan Academy",
            duration: "Self-paced",
            students: "10M+ users",
            level: "K-12",
            link: "https://hi.khanacademy.org/",
            features: ["Free Video Lessons", "Practice Exercises", "Progress Tracking"],
            isOfficial: false
        },
        {
            title: "Google Career Certificates",
            description: "Job-ready skills in high-growth fields. Data Analytics, IT Support, Project Management, and UX Design.",
            category: "professional",
            provider: "Google (via Coursera)",
            duration: "3-6 months",
            students: "5M+ global",
            level: "All Levels",
            link: "https://grow.google/certificates/",
            features: ["Industry Recognized", "Hands-on Projects", "Direct Recruitment"],
            isOfficial: false
        },
        {
            title: "IBM SkillsBuild",
            description: "Project-based learning and certifications. Courses in Cybersecurity, Data Analysis, and AI foundations for job seekers.",
            category: "digital",
            provider: "IBM",
            duration: "Flexible",
            students: "1.7M+ users",
            level: "Beginner to Pro",
            link: "https://skillsbuild.org/",
            features: ["Real-world Projects", "Badges & Certificates", "Mentorship"],
            isOfficial: false
        },
        {
            title: "TCS iON Digital Hub",
            description: "Learning solutions for students and working professionals. Industry-relevant courses and career readiness programs.",
            category: "professional",
            provider: "TCS iON",
            duration: "2-4 weeks",
            students: "Millions of users",
            level: "Students/Job Seekers",
            link: "https://learning.tcsionhub.in/",
            features: ["Career Edge", "Digital Certifications", "Soft Skills"],
            isOfficial: false
        },
        {
            title: "Microsoft Learn for Educators",
            description: "Training programs for teachers and students on Microsoft technologies like Azure, AI, and Cloud computing.",
            category: "digital",
            provider: "Microsoft",
            duration: "Variable",
            students: "2M+ trained",
            level: "Intermediate",
            link: "https://learn.microsoft.com/",
            features: ["Cloud Training", "Microsoft Certified", "Free Sandbox"],
            isOfficial: false
        },
        {
            title: "Infosys Springboard",
            description: "Holistic learning experience for students from Class 6 to working professionals. Digital literacy and skill building.",
            category: "professional",
            provider: "Infosys",
            duration: "Self-paced",
            students: "5M+ users",
            level: "All Levels",
            link: "https://infyspringboard.onwingspan.com/",
            features: ["Digital Literacy", "Next-Gen Skills", "Free Access"],
            isOfficial: false
        },
        {
            title: "Tata STRIVE",
            description: "Skill development initiative by Tata Trusts. Vocational training in BFSI, Hospitality, and BPO sectors.",
            category: "professional",
            provider: "Tata STRIVE",
            duration: "3 months",
            students: "1M+ trained",
            level: "Beginner",
            link: "https://www.tatastrive.com/",
            features: ["Vocational Training", "Youth Empowerment", "Job Placement"],
            isOfficial: false
        },
        {
            title: "Cisco Networking Academy",
            description: "Tech training program for all. Learn Networking, OS, and Cybersecurity from industry experts.",
            category: "digital",
            provider: "Cisco",
            duration: "3-6 months",
            students: "15M+ global",
            level: "Technical",
            link: "https://www.netacad.com/",
            features: ["Lab Simulations", "Market Recognized", "Technical Depth"],
            isOfficial: false
        },
        {
            title: "AWS Educate",
            description: "Cloud computing resources for students and educators. Self-paced labs and training on Amazon Web Services.",
            category: "digital",
            provider: "Amazon",
            duration: "Self-paced",
            students: "1M+ global",
            level: "Technical",
            link: "https://aws.amazon.com/education/awseducate/",
            features: ["Cloud Skills", "Job Board Access", "Free Credits"],
            isOfficial: false
        },
        {
            title: "National Digital Literacy (Phase 2)",
            description: "Expanding digital literacy to every household. Training in digital devices, safety, and online services.",
            category: "digital",
            provider: "PM Disha / MeitY",
            duration: "40 hours",
            students: "60M+ target",
            level: "Beginner",
            link: "https://www.pmgdisha.in/",
            features: ["Rural Focus", "Government Certified", "Basic IT Skills"],
            isOfficial: true
        },
        {
            title: "Vidwan Database",
            description: "Expert database of Indian scientists and researchers. Profiles of faculty from leading academic institutions.",
            category: "government",
            provider: "INFLIBNET",
            duration: "Access based",
            students: "100K+ experts",
            level: "Postgraduate & Faculty",
            link: "https://vidwan.inflibnet.ac.in/",
            features: ["Research Network", "Expert Profiles", "Academic Search"],
            isOfficial: true
        },
        {
            title: "Shodhganga",
            description: "Digital repository of Indian Electronic Theses and Dissertations. Millions of research papers from Indian Universities.",
            category: "government",
            provider: "INFLIBNET",
            duration: "Ongoing",
            students: "5M+ papers",
            level: "PhD & Researchers",
            link: "https://shodhganga.inflibnet.ac.in/",
            features: ["Research Papers", "Thesis Database", "Open Access"],
            isOfficial: true
        },
        {
            title: "National Education Policy 2020 Portal",
            description: "Resources for implementing NEP. Training modules for teachers and parents to understand the new education framework.",
            category: "government",
            provider: "Ministry of Education",
            duration: "Variable",
            students: "1M+ trained",
            level: "Educators/Parents",
            link: "https://www.education.gov.in/nep-2020",
            features: ["Legal Frameworks", "Training Kits", "Future Outlook"],
            isOfficial: true
        },
        {
            title: "English Helper",
            description: "Free English language training for government school students and teachers. AI-powered reading and speaking tool.",
            category: "language",
            provider: "Public-Private Partnership",
            duration: "Ongoing",
            students: "2M+ students",
            level: "Beginner",
            link: "https://www.englishhelper.com/",
            features: ["AI-Reading", "Spoken English", "Classroom Support"],
            isOfficial: false
        },
        {
            title: "LingoHut (Indian Regional)",
            description: "Language lessons in various regional Indian languages. Learn survival vocabulary and basic grammar.",
            category: "language",
            provider: "LingoHut",
            duration: "Self-paced",
            students: "500K+ global",
            level: "Beginner",
            link: "https://www.lingohut.com/",
            features: ["Regional Focus", "Free Audio", "Basic Lessons"],
            isOfficial: false
        },
        {
            title: "National Apprenticeship Training (NATS)",
            description: "Portal for technical graduates and diploma holders to find apprenticeship opportunities in government and private sectors.",
            category: "professional",
            provider: "Board of Apprenticeship",
            duration: "1 year",
            students: "2M+ Registered",
            level: "Graduates/Diploma",
            link: "http://www.mhrdnats.gov.in/",
            features: ["Stipend Guaranteed", "Industry Experience", "Skill Gap Fill"],
            isOfficial: true
        },
        {
            title: "Wipro FutureSkills",
            description: "Reskilling platform for IT professionals and students. Focus on AI, Cloud, and emerging technology stacks.",
            category: "digital",
            provider: "Wipro (via NASSCOM)",
            duration: "Flexible",
            students: "1M+ globally",
            level: "Intermediate",
            link: "https://futureskillsprime.in/",
            features: ["IT Focus", "Industry Standards", "NASSCOM Support"],
            isOfficial: false
        },
        {
            title: "Reliance Jio Institute Online",
            description: "Massive open online courses (MOOCs) platform from Jio. AI, Data Science, and Digital Management courses.",
            category: "digital",
            provider: "Jio Institute",
            duration: "4-8 weeks",
            students: "New Platform",
            level: "Professional",
            link: "https://www.jioinstitute.edu.in/",
            features: ["Modern Labs", "Industry Leaders", "Digital Focus"],
            isOfficial: false
        },
        {
            title: "Bharat Skills",
            description: "Learning management system for ITI students. Video lectures, study material, and mock tests for various trades.",
            category: "professional",
            provider: "DGT / MSDE",
            duration: "ITI Duration",
            students: "2M+ users",
            level: "Vocational",
            link: "https://bharatskills.gov.in/",
            features: ["ITI Specific", "Mock Tests", "Linguistic Support"],
            isOfficial: true
        },
        {
            title: "Vidya Lakshmi Portal",
            description: "Single window for education loans. Resources to find and apply for education loans and scholarships in India.",
            category: "government",
            provider: "NSDL / Finance Ministry",
            duration: "Access based",
            students: "1M+ applications",
            level: "Higher Education",
            link: "https://www.vidyalakshmi.co.in/",
            features: ["Loan Tracking", "Single Form", "Government-backed"],
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
