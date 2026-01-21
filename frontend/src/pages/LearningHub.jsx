import { useState, useEffect } from 'react'
import { BookOpen, Play, CheckCircle, Clock, Award } from 'lucide-react'
import api from '../services/api'
import '../styles/LearningHub.css'

const LearningHub = () => {
    const [courses, setCourses] = useState([])
    const [enrolledCourses, setEnrolledCourses] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchCourses()
    }, [])

    const fetchCourses = async () => {
        try {
            const [coursesRes, enrolledRes] = await Promise.all([
                api.get('/learning/courses'),
                api.get('/learning/enrolled')
            ])
            setCourses(coursesRes.data)
            setEnrolledCourses(enrolledRes.data)
        } catch (error) {
            console.error('Error fetching courses:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleEnroll = async (courseId) => {
        try {
            await api.post(`/learning/enroll/${courseId}`)
            fetchCourses()
        } catch (error) {
            console.error('Error enrolling:', error)
        }
    }

    const isEnrolled = (courseId) => {
        return enrolledCourses.some(c => c.id === courseId)
    }

    return (
        <div className="learning-hub-page">
            <div className="container">
                <div className="page-header">
                    <h1>Learning Hub</h1>
                    <p>Develop new skills and expand your knowledge</p>
                </div>

                {/* My Learning Section */}
                {enrolledCourses.length > 0 && (
                    <div className="my-learning-section">
                        <h2>
                            <BookOpen size={24} />
                            Continue Learning
                        </h2>
                        <div className="enrolled-courses-grid">
                            {enrolledCourses.map((course, index) => (
                                <div key={index} className="enrolled-course-card">
                                    <div className="course-thumbnail">
                                        <img src={course.thumbnail || '/placeholder-course.jpg'} alt={course.title} />
                                        <div className="progress-overlay">
                                            <div className="progress-bar">
                                                <div
                                                    className="progress-fill"
                                                    style={{ width: `${course.progress || 0}%` }}
                                                ></div>
                                            </div>
                                            <span className="progress-text">{course.progress || 0}% Complete</span>
                                        </div>
                                    </div>
                                    <div className="course-content">
                                        <h3>{course.title}</h3>
                                        <p>{course.description}</p>
                                        <button className="btn btn-primary btn-sm">
                                            <Play size={16} />
                                            Continue
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* All Courses */}
                <div className="all-courses-section">
                    <h2>
                        <Award size={24} />
                        Available Courses
                    </h2>
                    <div className="courses-grid">
                        {loading ? (
                            <div className="loading-state">
                                <div className="spinner"></div>
                                <p>Loading courses...</p>
                            </div>
                        ) : courses.length > 0 ? (
                            courses.map((course, index) => (
                                <div key={index} className="course-card">
                                    <div className="course-image">
                                        <img src={course.thumbnail || '/placeholder-course.jpg'} alt={course.title} />
                                        <span className={`badge badge-${course.level === 'beginner' ? 'success' : course.level === 'intermediate' ? 'warning' : 'error'}`}>
                                            {course.level}
                                        </span>
                                    </div>

                                    <div className="course-body">
                                        <h3>{course.title}</h3>
                                        <p>{course.description}</p>

                                        <div className="course-meta">
                                            <div className="meta-item">
                                                <Clock size={16} />
                                                <span>{course.duration}</span>
                                            </div>
                                            <div className="meta-item">
                                                <BookOpen size={16} />
                                                <span>{course.lessons} lessons</span>
                                            </div>
                                        </div>

                                        <div className="course-footer">
                                            {isEnrolled(course.id) ? (
                                                <button className="btn btn-outline btn-sm" disabled>
                                                    <CheckCircle size={16} />
                                                    Enrolled
                                                </button>
                                            ) : (
                                                <button
                                                    className="btn btn-primary btn-sm"
                                                    onClick={() => handleEnroll(course.id)}
                                                >
                                                    Enroll Now
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">
                                <BookOpen size={48} />
                                <p>No courses available at the moment</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LearningHub
