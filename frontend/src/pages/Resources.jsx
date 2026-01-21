import { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { Search, Filter, ExternalLink, Building, Users, Briefcase, GraduationCap, Heart, Home, Leaf, BookOpen, Award } from 'lucide-react'
import api from '../services/api'
import '../styles/Resources.css'

const Resources = () => {
    const { t } = useLanguage()
    const [resources, setResources] = useState([])
    const [filteredResources, setFilteredResources] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [loading, setLoading] = useState(true)
    const [showAll, setShowAll] = useState(false)

    const categories = [
        { value: 'all', label: 'All Resources', icon: <Building size={18} /> },
        { value: 'schemes', label: 'Government Schemes', icon: <Building size={18} /> },
        { value: 'education', label: 'Education', icon: <GraduationCap size={18} /> },
        { value: 'healthcare', label: 'Healthcare', icon: <Heart size={18} /> },
        { value: 'housing', label: 'Housing', icon: <Home size={18} /> },
        { value: 'agriculture', label: 'Agriculture', icon: <Leaf size={18} /> },
        { value: 'jobs', label: 'Employment', icon: <Briefcase size={18} /> }
    ]

    // Real Government Resources and Schemes
    const governmentResources = [
        // Education Schemes
        {
            title: "PM-YASASVI Scheme",
            description: "Pre-Matric and Post-Matric Scholarship for OBC, EBC, and DNT students. Financial assistance for education from Class 9 to Post-Graduation.",
            category: "education",
            eligibility: "OBC/EBC/DNT students, Family income < ₹2.5 lakh/year",
            link: "https://socialjustice.gov.in/schemes/pm-yasasvi",
            provider: "Ministry of Social Justice & Empowerment",
            isNew: true
        },
        {
            title: "National Scholarship Portal",
            description: "One-stop solution for various scholarships from Central and State Governments. Apply for Pre-Matric, Post-Matric, Merit-cum-Means scholarships.",
            category: "education",
            eligibility: "Students from Class 1 to Post-Graduation",
            link: "https://scholarships.gov.in/",
            provider: "Government of India"
        },
        {
            title: "Pradhan Mantri Kaushal Vikas Yojana (PMKVY)",
            description: "Skill development training program. Free training with certification and monetary rewards. Over 40 sectors covered.",
            category: "education",
            eligibility: "Youth aged 15-45 years",
            link: "https://www.pmkvyofficial.org/",
            provider: "Ministry of Skill Development"
        },

        // Healthcare Schemes
        {
            title: "Ayushman Bharat - PM-JAY",
            description: "World's largest health insurance scheme. Free treatment up to ₹5 lakh per family per year at empanelled hospitals.",
            category: "healthcare",
            eligibility: "Families identified through SECC 2011 database",
            link: "https://pmjay.gov.in/",
            provider: "National Health Authority",
            isNew: false
        },
        {
            title: "Janani Suraksha Yojana (JSY)",
            description: "Cash assistance for pregnant women for institutional delivery. Promotes safe motherhood and reduces maternal mortality.",
            category: "healthcare",
            eligibility: "Pregnant women, especially from BPL families",
            link: "https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=841&lid=309",
            provider: "Ministry of Health & Family Welfare"
        },
        {
            title: "Pradhan Mantri Matru Vandana Yojana (PMMVY)",
            description: "Maternity benefit program. Direct cash transfer of ₹5,000 in three installments for first living child.",
            category: "healthcare",
            eligibility: "Pregnant and lactating mothers",
            link: "https://pmmvy.wcd.gov.in/",
            provider: "Ministry of Women & Child Development"
        },

        // Housing Schemes
        {
            title: "Pradhan Mantri Awas Yojana (PMAY)",
            description: "Housing for All mission. Interest subsidy on home loans up to ₹2.67 lakh. Assistance for construction of pucca houses.",
            category: "housing",
            eligibility: "EWS/LIG/MIG families without pucca house",
            link: "https://pmaymis.gov.in/",
            provider: "Ministry of Housing & Urban Affairs"
        },
        {
            title: "Pradhan Mantri Awas Yojana - Gramin (PMAY-G)",
            description: "Rural housing scheme. Financial assistance of ₹1.2 lakh (plain areas) and ₹1.3 lakh (hilly areas) for house construction.",
            category: "housing",
            eligibility: "Rural families without pucca house",
            link: "https://pmayg.nic.in/",
            provider: "Ministry of Rural Development"
        },

        // Agriculture Schemes
        {
            title: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
            description: "Direct income support to farmers. ₹6,000 per year in three equal installments directly to bank accounts.",
            category: "agriculture",
            eligibility: "All landholding farmers",
            link: "https://pmkisan.gov.in/",
            provider: "Ministry of Agriculture",
            isNew: false
        },
        {
            title: "Kisan Credit Card (KCC)",
            description: "Credit facility for farmers. Loans up to ₹3 lakh at 4% interest for crop cultivation and allied activities.",
            category: "agriculture",
            eligibility: "Farmers, tenant farmers, sharecroppers",
            link: "https://www.india.gov.in/spotlight/kisan-credit-card-kcc",
            provider: "Department of Financial Services"
        },
        {
            title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
            description: "Crop insurance scheme. Comprehensive risk coverage at lowest premium. Claims settled within 2 months.",
            category: "agriculture",
            eligibility: "All farmers including sharecroppers and tenant farmers",
            link: "https://pmfby.gov.in/",
            provider: "Ministry of Agriculture"
        },

        // Employment Schemes
        {
            title: "MGNREGA (Mahatma Gandhi NREGA)",
            description: "Employment guarantee scheme. 100 days of guaranteed wage employment per year to rural households.",
            category: "jobs",
            eligibility: "Adult members of rural households",
            link: "https://nrega.nic.in/",
            provider: "Ministry of Rural Development"
        },
        {
            title: "Pradhan Mantri Mudra Yojana (PMMY)",
            description: "Loans for micro-enterprises. Loans up to ₹10 lakh for non-corporate, non-farm small/micro enterprises.",
            category: "jobs",
            eligibility: "Entrepreneurs, small businesses, self-employed",
            link: "https://www.mudra.org.in/",
            provider: "Ministry of Finance",
            isNew: false
        },
        {
            title: "National Career Service (NCS)",
            description: "Job portal with career counseling, skill development, and job matching services. Free registration for job seekers.",
            category: "jobs",
            eligibility: "All job seekers",
            link: "https://www.ncs.gov.in/",
            provider: "Ministry of Labour & Employment"
        },
        {
            title: "Stand Up India Scheme",
            description: "Bank loans between ₹10 lakh to ₹1 crore for SC/ST and women entrepreneurs for greenfield enterprises.",
            category: "jobs",
            eligibility: "SC/ST and women entrepreneurs",
            link: "https://www.standupmitra.in/",
            provider: "Ministry of Finance"
        },

        // General Welfare Schemes
        {
            title: "Pradhan Mantri Jan Dhan Yojana (PMJDY)",
            description: "Financial inclusion program. Zero-balance bank accounts with RuPay debit card and accident insurance cover.",
            category: "schemes",
            eligibility: "All Indian citizens",
            link: "https://pmjdy.gov.in/",
            provider: "Department of Financial Services"
        },
        {
            title: "Atal Pension Yojana (APY)",
            description: "Pension scheme for unorganized sector. Guaranteed pension of ₹1,000 to ₹5,000 per month after 60 years.",
            category: "schemes",
            eligibility: "Citizens aged 18-40 years",
            link: "https://www.npscra.nsdl.co.in/atal-pension-yojana.php",
            provider: "Pension Fund Regulatory Authority"
        },
        {
            title: "Sukanya Samriddhi Yojana (SSY)",
            description: "Savings scheme for girl child. High interest rate with tax benefits. Maturity after 21 years or marriage after 18 years.",
            category: "schemes",
            eligibility: "Parents/guardians of girl child below 10 years",
            link: "https://www.india.gov.in/spotlight/sukanya-samriddhi-yojana",
            provider: "Ministry of Finance"
        },
        {
            title: "Beti Bachao Beti Padhao",
            description: "Campaign for girl child welfare. Aims to prevent gender-biased sex selection and ensure education for girls.",
            category: "schemes",
            eligibility: "Girl children and their families",
            link: "https://wcd.nic.in/bbbp-schemes",
            provider: "Ministry of Women & Child Development"
        }
    ]

    useEffect(() => {
        // Simulate API call - in production, this would fetch from backend
        setTimeout(() => {
            setResources(governmentResources)
            setLoading(false)
        }, 500)
    }, [])

    useEffect(() => {
        filterResources()
    }, [searchQuery, selectedCategory, resources])

    const filterResources = () => {
        let filtered = resources

        if (selectedCategory !== 'all') {
            filtered = filtered.filter(r => r.category === selectedCategory)
        }

        if (searchQuery) {
            filtered = filtered.filter(r =>
                r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                r.provider.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        setFilteredResources(filtered)
    }

    // Show only 4 resources initially, then all on "View More"
    const displayedResources = showAll ? filteredResources : filteredResources.slice(0, 4)

    return (
        <div className="resources-page">
            <div className="container">
                <div className="page-header">
                    <h1>Government Resources & Schemes</h1>
                    <p>Access official government schemes, programs, and resources for your benefit</p>
                </div>

                {/* Stats Section */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon">
                            <BookOpen size={24} />
                        </div>
                        <div className="stat-content">
                            <div className="stat-number">{resources.length}+</div>
                            <div className="stat-label">Active Schemes</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">
                            <Search size={24} />
                        </div>
                        <div className="stat-content">
                            <div className="stat-number">7</div>
                            <div className="stat-label">Categories</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">
                            <Award size={24} />
                        </div>
                        <div className="stat-content">
                            <div className="stat-number">100%</div>
                            <div className="stat-label">Official Sources</div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="search-filter-section">
                    <div className="search-box">
                        <Search size={20} />
                        <input
                            type="text"
                            placeholder="Search schemes, programs, or keywords..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                    </div>

                    <div className="category-filters">
                        {categories.map(category => (
                            <button
                                key={category.value}
                                className={`filter-btn ${selectedCategory === category.value ? 'active' : ''}`}
                                onClick={() => {
                                    setSelectedCategory(category.value)
                                    setShowAll(false)
                                }}
                            >
                                {category.icon}
                                {category.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Resources Grid */}
                <div className="resources-grid">
                    {loading ? (
                        <div className="loading-state">
                            <div className="spinner"></div>
                            <p>Loading government resources...</p>
                        </div>
                    ) : displayedResources.length > 0 ? (
                        displayedResources.map((resource, index) => (
                            <div key={index} className="resource-card">
                                <div className="resource-header">
                                    <span className={`badge badge-${resource.category === 'schemes' ? 'primary' :
                                        resource.category === 'education' ? 'info' :
                                            resource.category === 'healthcare' ? 'error' :
                                                resource.category === 'housing' ? 'warning' :
                                                    resource.category === 'agriculture' ? 'success' :
                                                        'secondary'
                                        }`}>
                                        {resource.category}
                                    </span>
                                    {resource.isNew && <span className="badge badge-error">New</span>}
                                </div>

                                <h3>{resource.title}</h3>
                                <p className="resource-description">{resource.description}</p>

                                <div className="resource-meta">
                                    <div className="meta-item">
                                        <strong>Provider:</strong> {resource.provider}
                                    </div>
                                    {resource.eligibility && (
                                        <div className="meta-item">
                                            <strong>Eligibility:</strong> {resource.eligibility}
                                        </div>
                                    )}
                                </div>

                                <div className="resource-actions">
                                    <a
                                        href={resource.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-primary btn-sm"
                                    >
                                        Visit Official Website
                                        <ExternalLink size={16} />
                                    </a>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="empty-state">
                            <Filter size={48} />
                            <p>No resources found matching your criteria</p>
                            <button
                                className="btn btn-outline btn-sm"
                                onClick={() => {
                                    setSearchQuery('')
                                    setSelectedCategory('all')
                                }}
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>

                {/* View More Button */}
                {filteredResources.length > 4 && (
                    <div className="view-more-section">
                        <button
                            className="view-more-btn"
                            onClick={() => setShowAll(!showAll)}
                        >
                            {showAll ? 'Show Less' : `View More (${filteredResources.length - 4} more)`}
                        </button>
                    </div>
                )}

                {/* Important Links Section */}
                <div className="important-links-section">
                    <h2>Important Government Portals</h2>
                    <div className="links-grid">
                        <a href="https://www.india.gov.in/" target="_blank" rel="noopener noreferrer" className="link-card">
                            <Building size={24} />
                            <h4>India.gov.in</h4>
                            <p>National Portal of India</p>
                        </a>
                        <a href="https://www.mygov.in/" target="_blank" rel="noopener noreferrer" className="link-card">
                            <Users size={24} />
                            <h4>MyGov</h4>
                            <p>Citizen Engagement Platform</p>
                        </a>
                        <a href="https://www.digitalindia.gov.in/" target="_blank" rel="noopener noreferrer" className="link-card">
                            <GraduationCap size={24} />
                            <h4>Digital India</h4>
                            <p>Digital Empowerment</p>
                        </a>
                        <a href="https://www.umang.gov.in/" target="_blank" rel="noopener noreferrer" className="link-card">
                            <Briefcase size={24} />
                            <h4>UMANG</h4>
                            <p>Unified Mobile App</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Resources
