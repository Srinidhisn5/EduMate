# 🎓 EduMate - AI Personalized Study Guide Generator

## 🎓 **College Project Submission**

**Student Name:** Srinidhi SN  
**Email:** srinidhisnnairy@gmail.com  
**Phone:** +91 8105506208  
**GitHub:** [github.com/Srinidhisn5](https://github.com/Srinidhisn5)

---

## 📋 **Project Overview**

EduMate is an innovative AI-powered web application that generates personalized study guides for any subject or topic. The application leverages multiple AI sources including Hugging Face models, Wikipedia API, and demo mode to provide comprehensive educational content.

### 🎯 **Key Features**

- **🤖 Multi-AI Source Integration**: Support for Hugging Face AI, Wikipedia API, and Demo Mode
- **📚 Comprehensive Study Guides**: Detailed summaries, key concepts, and learning tips
- **❓ Practice Questions**: AI-generated questions with detailed explanations
- **🎥 Video Recommendations**: Curated video content for visual learning
- **📱 Responsive Design**: Beautiful, modern UI that works on all devices
- **🎨 Glassmorphism Design**: Stunning visual effects with animated backgrounds
- **📤 Export Functionality**: Download study guides in various formats

### 🛠 **Technologies Used**

- **Frontend**: React 18, Vite, Tailwind CSS
- **AI Integration**: Hugging Face API, Wikipedia API
- **Styling**: Glassmorphism, Motion animations
- **Deployment**: Vercel
- **Version Control**: Git

---

## 🚀 **Live Demo**

**Deployed Application:** [EduMate Live Demo](https://edumate-ai.vercel.app)

## 🌐 Live Demo
**Visit the live application:** [EduMate on Vercel](https://edumate-srinidhisn5.vercel.app/)

---

## 📦 **Installation & Setup**

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Srinidhisn5/EduMate.git
   cd EduMate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_HF_API_TOKEN=your_huggingface_api_token_here
   VITE_DEFAULT_AI_SOURCE=huggingface
   VITE_APP_NAME=EduMate
   VITE_ENABLE_WIKIPEDIA=true
   VITE_ENABLE_HUGGINGFACE=true
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:5173`

---

## 🌐 **Deployment to Vercel**

### Method 1: Using Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy the project**
   ```bash
   vercel
   ```

### Method 2: Using Vercel Dashboard

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables
   - Deploy

### Environment Variables for Production

Add these in your Vercel dashboard:
- `VITE_HF_API_TOKEN`: Your Hugging Face API token
- `VITE_DEFAULT_AI_SOURCE`: huggingface
- `VITE_APP_NAME`: EduMate
- `VITE_ENABLE_WIKIPEDIA`: true
- `VITE_ENABLE_HUGGINGFACE`: true

---

## 📁 **Project Structure**

```
EduMate/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── InputForm.jsx
│   │   ├── StudyGuideOutput.jsx
│   │   ├── ExportButtons.jsx
│   │   └── ui/
│   │       └── beams-background.tsx
│   ├── services/
│   │   ├── huggingface.js
│   │   ├── wikipedia.js
│   │   └── openai.js
│   ├── lib/
│   │   └── utils.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── package.json
├── vercel.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 🎮 **How to Use**

1. **Choose AI Source**: Select from Demo Mode, Wikipedia, or Hugging Face
2. **Enter Topic**: Type any subject or topic you want to study
3. **Configure Options**: Choose to include practice questions and video recommendations
4. **Generate Guide**: Click "Generate Study Guide" to create your personalized guide
5. **Export**: Download your study guide in various formats

---

## 🔧 **API Integration**

### Hugging Face API
- **Purpose**: AI-powered text generation for study guides
- **Setup**: Get free API token from [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)
- **Models Used**: Microsoft DialoGPT, RoBERTa for QA, BART for summarization

### Wikipedia API
- **Purpose**: Factual, detailed information from Wikipedia
- **Features**: Automatic fallback to Hugging Face if Wikipedia fails
- **Usage**: Free, no API key required

---

## 🎨 **Design Features**

- **Glassmorphism UI**: Modern glass-like design with backdrop blur effects
- **Animated Background**: Dynamic beams animation using Canvas API
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Motion.js powered transitions and hover effects
- **Dark Theme**: Eye-friendly dark color scheme

---

## 📊 **Performance & Optimization**

- **Bundle Size**: Optimized with Vite for fast loading
- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Optimized assets and SVGs
- **Caching**: Proper cache headers for static assets
- **SEO**: Meta tags and structured data

---

## 🔒 **Security Features**

- **Environment Variables**: Sensitive data stored securely
- **CORS Protection**: Proper cross-origin resource sharing
- **XSS Protection**: Content Security Policy headers
- **Input Validation**: Sanitized user inputs
- **API Rate Limiting**: Respectful API usage

---

## 🧪 **Testing**

### Manual Testing Checklist
- [ ] Page loads correctly on all devices
- [ ] Navigation links work properly
- [ ] AI source selection functions
- [ ] Study guide generation works
- [ ] Export functionality operates
- [ ] Contact links are functional
- [ ] Responsive design on mobile/tablet

### Browser Compatibility
- ✅ Chrome (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Edge (Latest)

---

## 📈 **Future Enhancements**

- [ ] User authentication and profiles
- [ ] Save and share study guides
- [ ] Progress tracking
- [ ] Collaborative study groups
- [ ] Mobile app version
- [ ] More AI model integrations
- [ ] Offline functionality

---

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 **Contact & Support**

**Developer:** Srinidhi SN  
**Email:** srinidhisnnairy@gmail.com  
**Phone:** +91 8105506208  
**GitHub:** [github.com/Srinidhisn5](https://github.com/Srinidhisn5)

---

## 🙏 **Acknowledgments**

- Hugging Face for providing free AI models
- Wikipedia for open-source knowledge
- Vercel for hosting platform
- React and Vite communities
- Tailwind CSS for styling framework

---

## 📋 **Submission Checklist**

### For College Submission:
- [x] Complete project documentation
- [x] Live demo deployed and working
- [x] Source code properly organized
- [x] README with setup instructions
- [x] Contact information included
- [x] Technologies used documented
- [x] Features and functionality listed
- [x] Deployment instructions provided
- [x] Future enhancements outlined

**Project Status:** ✅ **Ready for Submission**

---

*This project demonstrates advanced web development skills, AI integration, modern UI/UX design, and deployment practices suitable for academic evaluation.* 