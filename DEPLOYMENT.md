# 🚀 Quick Deployment Guide

## Deploy to Vercel (Recommended - 2 minutes)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/edumate.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"

3. **Add Environment Variables** (Optional - for real AI)
   - In Vercel dashboard → Settings → Environment Variables
   - Add `VITE_OPENAI_API_KEY` with your OpenAI API key

## Deploy to Netlify (Alternative)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder
   - Your site is live!

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Environment Setup (Optional)

1. **Copy environment file**
   ```bash
   cp env.example .env
   ```

2. **Add your OpenAI API key**
   ```bash
   # Edit .env file
   VITE_OPENAI_API_KEY=your_api_key_here
   ```

3. **Replace mock API** in `src/App.jsx`:
   ```javascript
   // Replace simulateOpenAIAPI with:
   import { generateStudyGuideWithAI } from './services/openai'
   
   const response = await generateStudyGuideWithAI(topic, options)
   ```

## Features Ready to Use

✅ **Working Features:**
- Beautiful, responsive UI
- Mock AI study guide generation
- Practice questions with show/hide answers
- Video recommendations
- Copy to clipboard functionality
- Download as text file
- Mobile-friendly design

🔄 **Ready for Real AI:**
- OpenAI API integration code included
- Environment variable setup
- Error handling
- Rate limiting

## Customization

- **Colors**: Edit `tailwind.config.js`
- **Styling**: Modify `src/index.css`
- **Components**: Update files in `src/components/`
- **Content**: Customize mock data in `src/App.jsx`

## Support

- **Issues**: Check the main README.md
- **Documentation**: See README.md for detailed setup
- **Deployment**: This guide covers the basics

---

🎉 **Your EduMate app is ready to deploy!** 