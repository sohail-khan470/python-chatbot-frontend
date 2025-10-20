import React from "react";
import ChatInterface from "./components/ChatInterface";
import FileUpload from "./components/FileUpload";
import { useNotificationStore } from "./stores/notificationStore";
import Notification from "./components/Notification.tsx";

function App() {
  const { notifications, removeNotification } = useNotificationStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">RAG Chatbot</h1>
          <p className="text-lg text-gray-600">
            Upload documents and chat with your AI assistant
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* File Upload Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Upload Documents
              </h2>
              <FileUpload />
            </div>
          </div>

          {/* Chat Interface Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg min-h-[600px] max-h-screen flex flex-col">
              <div className="p-6 border-b flex-shrink-0">
                <h2 className="text-xl font-semibold text-gray-800">
                  Chat Interface
                </h2>
              </div>
              <div className="flex-1 min-h-0">
                <ChatInterface />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          message={notification.message}
          type={notification.type}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
}

export default App;
