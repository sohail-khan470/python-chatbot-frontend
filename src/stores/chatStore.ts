import { create } from "zustand";
import type { Message } from "../types";
import { api } from "../utils/api";

interface ChatState {
  messages: Message[];
  isLoading: boolean;
  addMessage: (message: Message) => void;
  updateLastMessage: (updates: Partial<Message>) => void;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  isLoading: false,

  addMessage: (message) => {
    set((state) => ({
      messages: [...state.messages, message],
    }));
  },

  updateLastMessage: (updates) => {
    set((state) => {
      const messages = [...state.messages];
      const lastMessage = messages[messages.length - 1];
      if (lastMessage) {
        Object.assign(lastMessage, updates);
      }
      return { messages };
    });
  },

  sendMessage: async (content) => {
    const { messages, addMessage, updateLastMessage } = get();

    // Create user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: content,
      isUser: true,
    };

    addMessage(userMessage);
    set({ isLoading: true });

    try {
      // Create assistant message placeholder
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "",
        isUser: false,
        sources: [],
      };

      addMessage(assistantMessage);

      const conversationHistory = messages.map((msg) => ({
        role: msg.isUser ? "user" : "assistant",
        content: msg.text,
      }));

      const response = await api.queryStream(content, conversationHistory);

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();
      let buffer = "";
      let accumulatedText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.trim()) {
            try {
              const data = JSON.parse(line);
              if (data.type === "sources") {
                updateLastMessage({ sources: data.data });
              } else if (data.type === "token") {
                accumulatedText += data.data;
                updateLastMessage({
                  text: accumulatedText,
                });
              }
            } catch (e) {
              console.error("Error parsing stream data:", e);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: "Sorry, I encountered an error. Please try again.",
        isUser: false,
      };
      addMessage(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },

  clearMessages: () => {
    set({ messages: [] });
  },
}));
