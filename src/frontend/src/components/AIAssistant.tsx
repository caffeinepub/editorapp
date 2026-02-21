import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { X, Send, Sparkles, ChevronDown, ChevronUp, Command } from "lucide-react";
import { aiKnowledgeBase } from "../data/aiKnowledgeBase";
import { mockChatHelp } from "../services/aiService";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

interface QuickCommand {
  label: string;
  command: string;
  category: string;
}

const QUICK_COMMANDS: QuickCommand[] = [
  { label: "Make this cinematic", command: "command.cinematic", category: "assistant" },
  { label: "Fix color and audio", command: "command.fixColorAudio", category: "assistant" },
  { label: "Turn into viral reel", command: "command.viralReel", category: "assistant" },
  { label: "Optimize for YouTube", command: "optimize.youtube", category: "growth" },
  { label: "Add motion blur", command: "effect.motionBlur", category: "creator" },
  { label: "Balance exposure", command: "enhance.exposure", category: "enhancement" },
  { label: "Remove background noise", command: "enhance.audioNoise", category: "enhancement" },
  { label: "Add dynamic transitions", command: "timeline.transitions", category: "editing" },
  { label: "Enhance faces", command: "face.restore", category: "enhancement" },
  { label: "Generate captions", command: "auto.subtitle", category: "creator" },
];

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! I'm your AI video editing assistant. I can help you with:\n\n• Using AI tools\n• Editing techniques\n• Troubleshooting issues\n• Learning features\n\nWhat would you like to know?",
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCommands, setShowCommands] = useState(false);
  const [commandHistory, setCommandHistory] = useState<Array<{ command: string; timestamp: number; result: string }>>([]);
  const [autocompleteResults, setAutocompleteResults] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load command history from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("aiCommandHistory");
    if (stored) {
      try {
        setCommandHistory(JSON.parse(stored));
      } catch (error) {
        console.error("Failed to load command history:", error);
      }
    }
  }, []);

  // Save command history to localStorage
  useEffect(() => {
    if (commandHistory.length > 0) {
      localStorage.setItem("aiCommandHistory", JSON.stringify(commandHistory.slice(-20)));
    }
  }, [commandHistory]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Autocomplete logic
  useEffect(() => {
    if (input.startsWith("/")) {
      const query = input.slice(1).toLowerCase();
      const matches = QUICK_COMMANDS.filter((cmd) =>
        cmd.label.toLowerCase().includes(query) || cmd.command.toLowerCase().includes(query)
      ).map((cmd) => cmd.label);
      setAutocompleteResults(matches.slice(0, 5));
    } else {
      setAutocompleteResults([]);
    }
  }, [input]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Check if it's a command
      if (input.startsWith("/")) {
        const commandLabel = input.slice(1);
        const command = QUICK_COMMANDS.find((cmd) => cmd.label.toLowerCase() === commandLabel.toLowerCase());

        if (command) {
          handleQuickCommand(command);
          return;
        }
      }

      const response = await mockChatHelp({
        message: input,
        context: "video-editor",
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickCommand = (command: QuickCommand) => {
    const assistantMessage: Message = {
      id: Date.now().toString(),
      role: "assistant",
      content: `Executing command: ${command.label}\n\nThis will apply ${command.label.toLowerCase()} to your current selection or project.`,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, assistantMessage]);

    // Add to command history
    setCommandHistory((prev) => [
      ...prev,
      {
        command: command.label,
        timestamp: Date.now(),
        result: "Success",
      },
    ]);

    setInput("");
  };

  const handleQuickAction = (question: string) => {
    setInput(question);
    inputRef.current?.focus();
  };

  const handleAutocompleteSelect = (label: string) => {
    setInput(`/${label}`);
    setAutocompleteResults([]);
    inputRef.current?.focus();
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        size="lg"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 z-50"
      >
        <Sparkles className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-background/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">AI Assistant</h3>
            <p className="text-xs text-muted-foreground">Always here to help</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Quick Commands Panel */}
      <div className="border-b border-border">
        <button
          onClick={() => setShowCommands(!showCommands)}
          className="w-full flex items-center justify-between p-3 hover:bg-accent/50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Command className="h-4 w-4 text-purple-500" />
            <span className="text-sm font-medium">Quick Commands</span>
          </div>
          {showCommands ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {showCommands && (
          <div className="p-3 space-y-2 bg-accent/20">
            <div className="grid grid-cols-2 gap-2">
              {QUICK_COMMANDS.map((cmd, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickCommand(cmd)}
                  className="px-3 py-2 text-xs font-medium rounded-lg bg-background/60 backdrop-blur-sm border border-border hover:border-purple-500/50 hover:bg-purple-500/10 transition-all text-left"
                >
                  {cmd.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Tip: Type <code className="px-1 py-0.5 bg-background rounded">/</code> to search commands
            </p>
          </div>
        )}
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  message.role === "user"
                    ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white"
                    : "bg-accent/50 backdrop-blur-sm"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-accent/50 backdrop-blur-sm rounded-2xl px-4 py-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Quick Actions */}
      <div className="px-4 py-2 border-t border-border">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickAction("How do I add subtitles?")}
            className="text-xs whitespace-nowrap"
          >
            Add Subtitles
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickAction("How do I export my video?")}
            className="text-xs whitespace-nowrap"
          >
            Export Video
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickAction("How do I enhance quality?")}
            className="text-xs whitespace-nowrap"
          >
            Enhance Quality
          </Button>
        </div>
      </div>

      {/* Autocomplete */}
      {autocompleteResults.length > 0 && (
        <div className="mx-4 mb-2 bg-background border border-border rounded-lg shadow-lg overflow-hidden">
          {autocompleteResults.map((result, index) => (
            <button
              key={index}
              onClick={() => handleAutocompleteSelect(result)}
              className="w-full px-3 py-2 text-sm text-left hover:bg-accent transition-colors"
            >
              {result}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask me anything..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button onClick={handleSend} disabled={isLoading || !input.trim()} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Command History (collapsed by default) */}
      {commandHistory.length > 0 && (
        <div className="px-4 pb-2">
          <details className="text-xs text-muted-foreground">
            <summary className="cursor-pointer hover:text-foreground">
              Recent commands ({commandHistory.slice(-5).length})
            </summary>
            <div className="mt-2 space-y-1">
              {commandHistory.slice(-5).reverse().map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{item.command}</span>
                  <span className="text-green-500">{item.result}</span>
                </div>
              ))}
            </div>
          </details>
        </div>
      )}
    </div>
  );
}
