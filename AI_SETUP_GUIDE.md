# 🤖 AI Setup Guide for EduMate

This guide shows you how to set up different AI sources for generating detailed, topic-specific study guides.

## 🎯 Available AI Options

### 1. **Demo Mode (Default)**
- ✅ **No setup required**
- ✅ **Works immediately**
- ✅ **Fast responses**
- ❌ **Generic content**

### 2. **Wikipedia Integration (Recommended)**
- ✅ **Free to use**
- ✅ **Factual, detailed information**
- ✅ **No API key required**
- ✅ **Reliable source**
- ❌ **Limited to Wikipedia topics**

### 3. **Hugging Face AI (Advanced)**
- ✅ **Free API token**
- ✅ **AI-generated content**
- ✅ **Customizable responses**
- ❌ **Requires setup**

### 4. **OpenAI GPT (Premium)**
- ✅ **High-quality responses**
- ✅ **Very detailed content**
- ❌ **Requires paid API key**
- ❌ **Rate limits**

---

## 🚀 Quick Setup

### **Option 1: Wikipedia (Easiest)**

1. **No setup required!** Just select "Wikipedia" in the app
2. **Works immediately** with factual information
3. **Perfect for academic topics**

### **Option 2: Hugging Face (Recommended)**

1. **Get free API token:**
   - Go to [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)
   - Click "New token"
   - Give it a name (e.g., "EduMate")
   - Select "Read" permissions
   - Copy the token

2. **Add to environment:**
   ```bash
   # Create .env file
   cp env.example .env
   
   # Edit .env file
   VITE_HF_API_TOKEN=your_token_here
   ```

3. **Restart the app:**
   ```bash
   npm run dev
   ```

### **Option 3: OpenAI (Premium)**

1. **Get API key:**
   - Go to [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
   - Create new secret key
   - Copy the key

2. **Add to environment:**
   ```bash
   VITE_OPENAI_API_KEY=your_openai_key_here
   ```

---

## 📊 Comparison Table

| Feature | Demo | Wikipedia | Hugging Face | OpenAI |
|---------|------|-----------|--------------|---------|
| **Setup Time** | 0 min | 0 min | 5 min | 5 min |
| **Cost** | Free | Free | Free | Paid |
| **Content Quality** | Basic | Excellent | Good | Excellent |
| **Topic Coverage** | Generic | Limited | Broad | Very Broad |
| **Response Speed** | Fast | Medium | Medium | Fast |
| **Factual Accuracy** | Low | High | Medium | High |

---

## 🔧 Advanced Configuration

### **Custom Hugging Face Models**

Edit `src/services/huggingface.js` to use different models:

```javascript
const MODELS = {
  // For better text generation
  TEXT_GENERATION: 'gpt2-large',
  
  // For question answering
  QA: 'deepset/roberta-base-squad2',
  
  // For summarization
  SUMMARIZATION: 'facebook/bart-large-cnn',
}
```

### **Wikipedia Customization**

Edit `src/services/wikipedia.js` to:
- Change language (e.g., Spanish, French)
- Modify content structure
- Add more categories

### **Environment Variables**

```bash
# .env file
VITE_HF_API_TOKEN=your_token
VITE_OPENAI_API_KEY=your_key
VITE_ENABLE_WIKIPEDIA=true
VITE_ENABLE_HUGGINGFACE=true
VITE_ENABLE_OPENAI=true
```

---

## 🎯 Best Practices

### **For Students:**
- Start with **Wikipedia** for factual topics
- Use **Hugging Face** for creative subjects
- Try **OpenAI** for complex topics

### **For Teachers:**
- **Wikipedia** for reliable, sourced content
- **Hugging Face** for customizable responses
- **Demo mode** for quick examples

### **For Developers:**
- **Wikipedia** for no-setup testing
- **Hugging Face** for free AI integration
- **OpenAI** for production quality

---

## 🛠️ Troubleshooting

### **Hugging Face Issues:**

```bash
# Error: "No Hugging Face API token found"
# Solution: Add VITE_HF_API_TOKEN to .env file

# Error: "API Error: 401"
# Solution: Check if token is valid and has read permissions

# Error: "Model not found"
# Solution: The model might be loading, wait 30 seconds and try again
```

### **Wikipedia Issues:**

```bash
# Error: "Failed to search Wikipedia"
# Solution: Check internet connection

# Error: "No results found"
# Solution: Try a different topic name
```

### **General Issues:**

```bash
# App not loading
npm install
npm run dev

# Environment variables not working
# Make sure .env file is in root directory
# Restart the development server
```

---

## 📚 Example Topics to Try

### **Wikipedia (Best Results):**
- "Quantum Physics"
- "World War II"
- "Shakespeare"
- "Photosynthesis"
- "Machine Learning"

### **Hugging Face (Good Results):**
- "JavaScript Programming"
- "Creative Writing"
- "Business Strategy"
- "Cooking Techniques"
- "Fitness Training"

### **All Sources:**
- "Python Programming"
- "History of Art"
- "Environmental Science"
- "Psychology Basics"
- "Mathematics"

---

## 🎉 Success Tips

1. **Start Simple:** Use Wikipedia for academic topics
2. **Be Specific:** "Machine Learning" works better than "AI"
3. **Try Different Sources:** Each has strengths for different topics
4. **Check Sources:** Always verify information from multiple sources
5. **Customize:** Modify the prompts for your specific needs

---

## 📞 Support

- **Issues:** Check the main README.md
- **API Problems:** Check the troubleshooting section above
- **Customization:** Edit the service files in `src/services/`

**Happy studying! 📚✨** 