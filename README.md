# 🌟 Community AI Platform

## AI for Communities, Access & Public Impact

An AI-powered platform that improves access to information, resources, and opportunities for communities and public systems across India.

---

## 🎯 Overview

**Community AI Platform** is a comprehensive solution designed to empower underserved communities through accessible technology. The platform provides:

- 🏛️ **Government Schemes** - Easy access to civic services and benefits
- 📚 **Education & Skills** - Learning resources and development programs  
- 💼 **Job Opportunities** - Local employment and business support
- 🗣️ **Voice-First AI** - Multilingual assistant with speech interaction
- 🌐 **Accessibility** - Low-bandwidth, mobile-optimized design

---

## ✨ Key Features

### 🤖 AI Assistant
- Multilingual chat (English, Hindi, and more)
- Voice input and output using Web Speech API
- Context-aware responses based on user profile
- Personalized recommendations

### 📊 Dashboard
- User statistics and activity tracking
- Quick actions for common tasks
- Personalized content feed
- Achievement system

### 🔍 Resource Finder
- Government schemes database
- Job listings and opportunities
- NGO programs and support
- Advanced search and filtering

### 🎓 Learning Hub
- Skill development courses
- Progress tracking
- Digital literacy content
- Community-focused education

---

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI framework
- **Three.js** - Stunning 3D graphics and animations
- **Vite** - Lightning-fast build tool
- **Axios** - HTTP client for API calls

### Backend
- **FastAPI** - High-performance Python framework
- **PostgreSQL** - Reliable database
- **SQLAlchemy** - Powerful ORM
- **JWT** - Secure authentication

### AI/ML
- **Groq API** - Fast AI responses
- **Web Speech API** - Voice interaction
- **NLP** - Multilingual understanding

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.9+
- PostgreSQL 14+

### Installation

1. **Clone and navigate to the project**
   ```bash
   cd "AI BHARAT"
   ```

2. **Setup Database**
   ```bash
   psql -U postgres -f backend/database/init.sql
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

4. **Install Backend Dependencies**
   ```bash
   cd backend
   python -m venv venv
   venv\Scripts\activate  # Windows
   pip install -r requirements.txt
   ```

5. **Configure Environment**
   ```bash
   # Backend
   cd backend
   copy .env.example .env
   # Edit .env and add your API keys

   # Frontend
   cd frontend
   copy .env.example .env
   ```

6. **Run the Application**
   
   **Option 1: Use startup script**
   ```bash
   # Windows
   start.bat
   
   # Linux/Mac
   chmod +x start.sh
   ./start.sh
   ```

   **Option 2: Manual start**
   ```bash
   # Terminal 1 - Backend
   cd backend
   python main.py

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

7. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

---

## 📁 Project Structure

```
AI BHARAT/
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── contexts/        # React contexts (Auth, Language)
│   │   ├── services/        # API service layer
│   │   ├── styles/          # CSS stylesheets
│   │   └── index.css        # Global styles
│   ├── public/              # Static assets
│   └── package.json
│
├── backend/
│   ├── app/
│   │   ├── api/            # API route handlers
│   │   ├── core/           # Configuration & security
│   │   ├── models/         # Database models
│   │   └── services/       # Business logic
│   ├── database/           # Database initialization
│   │   └── init.sql
│   ├── main.py             # FastAPI application
│   └── requirements.txt
│
├── start.bat               # Windows startup script
├── start.sh                # Linux/Mac startup script
├── README.md               # This file
├── SETUP.md                # Detailed setup guide
├── QUICKSTART.md           # Quick reference
├── API_DOCS.md             # API documentation
└── CONTRIBUTING.md         # Contribution guidelines
```

---

## 🎨 Features in Detail

### Voice-First Experience
- **Speech-to-Text**: Speak your queries naturally
- **Text-to-Speech**: Hear responses in your language
- **Multilingual**: Supports English, Hindi, and more
- **Accessibility**: Perfect for users with limited literacy

### Personalized Recommendations
- Based on community type (student, farmer, worker, etc.)
- Location-aware suggestions
- AI-powered matching
- Contextual relevance

### Government Schemes
- Comprehensive database
- Eligibility checking
- Application guidance
- Deadline tracking

### Learning Resources
- Free courses
- Skill development
- Progress tracking
- Certificates

---

## 🌍 Social Impact

### Target Communities
- 🌾 Rural & underserved populations
- 🎓 Students & job seekers
- 💼 Small business owners
- 👥 General citizens needing public services

### Impact Goals
- Improve access to government benefits
- Increase digital literacy
- Enhance employment opportunities
- Empower communities with information

---

## 🔐 Security

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - Bcrypt encryption
- **CORS Protection** - Configured origins
- **Input Validation** - Pydantic models
- **SQL Injection Prevention** - ORM-based queries

---

## 📚 Documentation

- **[SETUP.md](SETUP.md)** - Detailed installation guide
- **[QUICKSTART.md](QUICKSTART.md)** - Quick reference commands
- **[API_DOCS.md](API_DOCS.md)** - Complete API documentation
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribution guidelines
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Comprehensive overview

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Areas for Contribution
- Additional language support
- New government schemes data
- Course content creation
- UI/UX improvements
- Bug fixes and optimizations

---

## 📄 License

MIT License - Open source for social good

---

## 🏆 Hackathon Alignment

Built for **AI Bharat Hackathon** addressing:
- ✅ Community access to information
- ✅ Inclusion and accessibility
- ✅ Real-world social impact
- ✅ Local language support
- ✅ Voice-first interaction
- ✅ Low-bandwidth optimization

---

## 💡 Future Roadmap

### Phase 2
- [ ] SMS-based interaction
- [ ] Offline mode with PWA
- [ ] Regional language expansion
- [ ] Video tutorials
- [ ] Community forums
- [ ] Push notifications

### Advanced Features
- [ ] RAG for accurate information
- [ ] Sentiment analysis
- [ ] Predictive analytics
- [ ] Advanced search with Elasticsearch
- [ ] Real-time updates via WebSocket

---

## 📞 Support

- Check documentation files for help
- Review API docs at `/docs` endpoint
- Open an issue for bugs
- Join discussions for questions

---

## 🎉 Acknowledgments

Built with ❤️ for communities across India

**Mission**: *"An inclusive AI platform that brings public services, education, and opportunities directly to communities — accessible, multilingual, and powered by intelligent technology."*

---

**Get Started Now!** Follow the [Quick Start](#-quick-start) guide above.
