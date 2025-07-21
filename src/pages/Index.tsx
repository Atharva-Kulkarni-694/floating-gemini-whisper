import FloatingNeuralNetwork from "@/components/FloatingNeuralNetwork";
import RAGChatbot from "@/components/RAGChatbot";
import { Brain, Sparkles, MessageSquare, FileText, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Floating Neural Network Background */}
      <FloatingNeuralNetwork />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="mb-8 space-y-6">
            <Badge className="mb-4 ai-gradient border-none text-white px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              Powered by AI & RAG Technology
            </Badge>
            
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-br from-foreground via-ai-primary to-ai-secondary bg-clip-text text-transparent animate-fade-in">
              Quagster AI
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in">
              Experience the future of conversational AI with our advanced RAG-powered chatbot, 
              featuring beautiful floating neural network visualizations
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 animate-fade-in">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-ai-primary/50 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-ai-primary to-ai-secondary flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">RAG Technology</h3>
                <p className="text-sm text-muted-foreground">
                  Retrieval-Augmented Generation for accurate, context-aware responses
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-ai-neural/50 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-ai-neural to-ai-primary flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Document Search</h3>
                <p className="text-sm text-muted-foreground">
                  Intelligent document retrieval and knowledge base integration
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-ai-secondary/50 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-ai-secondary to-accent flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Real-time AI</h3>
                <p className="text-sm text-muted-foreground">
                  Powered by Google Gemini for fast, intelligent conversations
                </p>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-center gap-2 text-ai-primary">
              <MessageSquare className="w-5 h-5" />
              <span className="text-sm font-medium">Click the floating button to start chatting</span>
            </div>
            
            <div className="text-xs text-muted-foreground">
              • Supports complex queries • Context-aware responses • Real-time processing
            </div>
          </div>
        </div>
      </div>

      {/* RAG Chatbot Component */}
      <RAGChatbot />
    </div>
  );
};

export default Index;
