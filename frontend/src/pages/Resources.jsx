import { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { Search, Filter, ExternalLink, Building, Users, Briefcase } from 'lucide-react'
import api from '../services/api'
import '../styles/Resources.css'

const Resources = () => {
    const { t } = useLanguage()
    const [resources, setResources] = useState([])
    const [filteredResources, setFilteredResources] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [loading, setLoading] = useState(true)

    const categories = [
        { value: 'all', label: 'All Resources', icon: <Building size={18} /> },
        { value: 'schemes', label: 'Government Schemes', icon: <Building size={18} /> },
        { value: 'jobs', label: 'Job Opportunities', icon: <Briefcase size={18} /> },
        { value: 'ngos', label: 'NGO Programs', icon: <Users size={18} /> }
    ]

    useEffect(() => {
        fetchResources()
    }, [])

    useEffect(() => {
        filterResources()
    }, [searchQuery, selectedCategory, resources])

    const fetchResources = async () => {
        try {
            const response = await api.get('/resources')
            setResources(response.data)
        } catch (error) {
            console.error('Error fetching resources:', error)
        } finally {
            setLoading(false)
        }
    }

    const filterResources = () => {
        let filtered = resources

        if (selectedCategory !== 'all') {
            filtered = filtered.filter(r => r.category === selectedCategory)
        }

        if (searchQuery) {
            filtered = filtered.filter(r =>
                r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                r.description.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        setFilteredResources(filtered)
    }

    return (
        <div className="resources-page">
            <div className="container">
                <div className="page-header">
                    <h1>Resources & Opportunities</h1>
                    <p>Discover government schemes, job opportunities, and community programs</p>
                </div>

                {/* Search and Filter */}
                <div className="search-filter-section">
                    <div className="search-box">
                        <Search size={20} />
                        <input
                            type="text"
                            placeholder="Search resources..."
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
                                onClick={() => setSelectedCategory(category.value)}
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
                            <p>Loading resources...</p>
                        </div>
                    ) : filteredResources.length > 0 ? (
                        filteredResources.map((resource, index) => (
                            <div key={index} className="resource-card">
                                <div className="resource-header">
                                    <span className={`badge badge-${resource.category === 'schemes' ? 'primary' : resource.category === 'jobs' ? 'success' : 'warning'}`}>
                                        {resource.category}
                                    </span>
                                    {resource.isNew && <span className="badge badge-error">New</span>}
                                </div>

                                <h3>{resource.title}</h3>
                                <p>{resource.description}</p>

                                <div className="resource-meta">
                                    {resource.eligibility && (
                                        <div className="meta-item">
                                            <strong>Eligibility:</strong> {resource.eligibility}
                                        </div>
                                    )}
                                    {resource.location && (
                                        <div className="meta-item">
                                            <strong>Location:</strong> {resource.location}
                                        </div>
                                    )}
                                    {resource.deadline && (
                                        <div className="meta-item">
                                            <strong>Deadline:</strong> {resource.deadline}
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
                                        Learn More
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
            </div>
        </div>
    )
}

export default Resources
