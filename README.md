# Quagster AI - RAG Chatbot with 3D Neural Network

A modern, beautiful RAG (Retrieval-Augmented Generation) chatbot powered by Google Gemini API with stunning Three.js floating neural network animations.

## ✨ Features

- 🧠 **RAG Technology**: Retrieval-Augmented Generation for context-aware responses
- 🤖 **Gemini AI Integration**: Powered by Google's advanced language model
- 🎨 **3D Neural Network**: Beautiful floating Three.js animations in the background
- 💬 **Modern Chat Interface**: Sleek, responsive chat UI with animations
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- 🎯 **Document Search**: Intelligent retrieval from your knowledge base
- ⚡ **Real-time Processing**: Fast response times with streaming support

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Atharva-Kulkarni-694/quagster-website.git
cd quagster-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up your Gemini API key:
   - Open `src/components/RAGChatbot.tsx`
   - Find the comment `// ⚠️ Add your Gemini API key here`
   - Replace `'YOUR_GEMINI_API_KEY_HERE'` with your actual Gemini API key

### Getting Your Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key
5. Paste it in the configuration file as described above

### Configuration

#### Setting up RAG Documents

To customize the knowledge base for your chatbot:

1. Open `src/components/RAGChatbot.tsx`
2. Find the `mockRAGDocuments` array
3. Replace the mock documents with your actual content:

```typescript
const mockRAGDocuments = [
  {
    id: '1',
    title: 'Your Document Title',
    content: 'Your document content here...',
    category: 'Category Name'
  },
  // Add more documents...
]
```

#### API Integration

The main API integration point is in `src/components/RAGChatbot.tsx` in the `callGeminiAPI` function. Here's where to add your Gemini API key:

```typescript
// ⚠️ GEMINI API INTEGRATION POINT
const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY_HERE'; // Add your key here

const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + GEMINI_API_KEY, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    contents: [{
      parts: [{
        text: contextPrompt
      }]
    }]
  })
});
```

### Running the Application

1. Start the development server:
```bash
npm run dev
```

2. Open your browser and navigate to `http://localhost:8080`

3. Click the floating chat button in the bottom right corner to start chatting!

## 🛠️ Technologies Used

- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **Three.js** - 3D graphics and animations
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful UI components
- **Vite** - Fast build tool
- **Google Gemini API** - Advanced language model

## 🎨 Design System

The project uses a modern AI-themed design system with:
- Dark theme optimized for AI applications
- Gradient accents and neural network inspired colors
- Smooth animations and transitions
- Responsive design patterns

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── FloatingNeuralNetwork.tsx  # 3D neural network background
│   ├── RAGChatbot.tsx     # Main chatbot component
│   └── ChatMessage.tsx    # Individual message component
├── pages/
│   └── Index.tsx          # Main landing page
├── lib/
│   └── utils.ts           # Utility functions
└── index.css              # Global styles and design system
```

## 🔧 Customization

### Styling
- Modify `src/index.css` for global styles and design tokens
- Update `tailwind.config.ts` for theme customization
- Component styles use the design system tokens

### Neural Network Animation
- Customize `src/components/FloatingNeuralNetwork.tsx`
- Adjust node count, colors, and animation parameters
- Modify connection logic and visual effects

### Chat Interface
- Customize `src/components/RAGChatbot.tsx` for UI changes
- Modify `src/components/ChatMessage.tsx` for message styling
- Add new features like file upload, voice input, etc.

## 🚀 Deployment

Build for production:
```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## 📝 API Configuration Notes

**Important**: The current implementation includes mock responses for demonstration. To enable full functionality:

1. **Add your Gemini API key** in `src/components/RAGChatbot.tsx`
2. **Uncomment the actual API call code** in the `callGeminiAPI` function
3. **Replace mock documents** with your actual knowledge base
4. **Test the integration** thoroughly before deployment

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Gemini for the AI capabilities
- Three.js community for the amazing 3D graphics library
- shadcn for the beautiful UI components
- The React and TypeScript communities

---

Made with ❤️ by [Atharva Kulkarni](https://github.com/Atharva-Kulkarni-694)