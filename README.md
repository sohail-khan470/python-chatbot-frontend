# RAG Chatbot Frontend

A modern React-based frontend for a Retrieval-Augmented Generation (RAG) chatbot with document upload capabilities and real-time chat interface.

## Overview

This frontend provides a user-friendly interface for interacting with the RAG chatbot backend. It features:

- Document upload with drag-and-drop support
- Real-time streaming chat responses
- Conversation history management
- Notification system for user feedback
- Responsive design with Tailwind CSS

## Architecture

### Core Technologies

- **React 19**: Modern React with hooks and functional components
- **TypeScript**: Type-safe development
- **Zustand**: Lightweight state management
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool and development server

### Key Components

- **App.tsx**: Main application component with layout
- **ChatInterface.tsx**: Chat UI with message display and input
- **FileUpload.tsx**: Drag-and-drop file upload component
- **Notification.tsx**: Toast notification system

### State Management

- **Chat Store** (`chatStore.ts`): Manages chat messages, loading states, and API calls
- **File Upload Store** (`fileUploadStore.ts`): Handles file upload progress and validation
- **Notification Store** (`notificationStore.ts`): Manages notification display and auto-removal

## Features

### Document Upload

- **Supported Formats**: PDF, TXT, CSV files
- **File Size Limit**: 10MB maximum
- **Drag & Drop**: Intuitive file dropping interface
- **Progress Tracking**: Visual upload progress indicator
- **Validation**: Client-side file type and size validation

### Chat Interface

- **Real-time Streaming**: Token-by-token response display
- **Conversation History**: Persistent chat context
- **Message Types**: User and assistant message differentiation
- **Source Citations**: Display of document sources for responses
- **Loading States**: Visual feedback during API calls

### User Experience

- **Responsive Design**: Works on desktop and mobile devices
- **Notifications**: Success/error/info messages with auto-dismiss
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Performance**: Optimized rendering with React best practices

## Component Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── App.tsx              # Main application layout
│   │   ├── ChatInterface.tsx    # Chat UI component
│   │   ├── FileUpload.tsx       # File upload component
│   │   └── Notification.tsx     # Notification component
│   ├── stores/
│   │   ├── chatStore.ts         # Chat state management
│   │   ├── fileUploadStore.ts   # Upload state management
│   │   └── notificationStore.ts # Notification state
│   ├── types/
│   │   └── index.ts             # TypeScript type definitions
│   ├── utils/
│   │   └── api.ts               # API client utilities
│   ├── hooks/
│   │   └── useNotifications.ts  # Custom notification hook
│   ├── App.css                  # Global styles
│   ├── index.css                # Tailwind imports
│   └── main.tsx                 # Application entry point
├── public/
│   └── vite.svg                 # Vite logo
├── package.json                 # Dependencies and scripts
├── vite.config.ts               # Vite configuration
├── tailwind.config.js           # Tailwind configuration
└── README.md                    # This file
```

## Data Flow

### File Upload Process

1. User selects or drags file onto upload area
2. Client-side validation (type, size)
3. File sent to backend via FormData
4. Progress tracking with visual feedback
5. Success/error notification displayed

### Chat Process

1. User types message and submits
2. Message added to local chat store
3. API call made to backend streaming endpoint
4. Response streamed and displayed token-by-token
5. Sources displayed alongside response
6. Conversation history maintained for context

## API Integration

### Backend Communication

- **Base URL**: `http://localhost:8000`
- **Endpoints Used**:
  - `POST /ingest` - Document upload
  - `POST /query-stream` - Streaming chat queries
  - `GET /stats` - Vector store statistics (future use)

### Request/Response Handling

- **Streaming Responses**: NDJSON format for real-time updates
- **Error Handling**: Comprehensive error states and user feedback
- **Type Safety**: Full TypeScript integration with backend models

## Styling & UI

### Design System

- **Color Palette**: Blue gradient background with white cards
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent padding and margins using Tailwind utilities
- **Components**: Reusable, accessible UI components

### Responsive Breakpoints

- **Mobile**: Single column layout
- **Tablet/Desktop**: Two-column layout (upload | chat)
- **Large Screens**: Optimized spacing and sizing

## Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Backend server running on port 8000

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

- Starts Vite dev server on `http://localhost:5173`
- Hot reload enabled
- ESLint for code quality

### Build

```bash
npm run build
```

- Production build in `dist/` directory
- Optimized bundle with code splitting

### Linting

```bash
npm run lint
```

- ESLint checks for code quality issues

## Configuration

### Environment Variables

- **VITE_API_BASE_URL**: Backend API URL (default: http://localhost:8000)

### Build Configuration

- **Vite Config**: Custom plugins and build settings
- **Tailwind Config**: Custom theme and utility classes
- **TypeScript Config**: Strict type checking and path aliases

## State Management Details

### Chat Store

```typescript
interface ChatState {
  messages: Message[];
  isLoading: boolean;
  addMessage: (message: Message) => void;
  updateLastMessage: (updates: Partial<Message>) => void;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
}
```

### File Upload Store

```typescript
interface FileUploadState {
  isUploading: boolean;
  uploadProgress: number;
  uploadFile: (file: File) => Promise<string>;
  setUploading: (uploading: boolean) => void;
  setProgress: (progress: number) => void;
}
```

### Notification Store

```typescript
interface NotificationState {
  notifications: Notification[];
  addNotification: (message: string, type?: NotificationType) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}
```

## Performance Optimizations

- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Components loaded on demand
- **Memoization**: React.memo for expensive components
- **Efficient Re-renders**: Proper dependency arrays in hooks
- **Bundle Analysis**: Optimized chunk sizes

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Browsers**: iOS Safari, Chrome Mobile
- **ES2020+**: Modern JavaScript features supported

## Accessibility

- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Proper ARIA labels and roles
- **Color Contrast**: WCAG compliant color ratios
- **Focus Management**: Visible focus indicators

## Troubleshooting

### Common Issues

- **API Connection**: Ensure backend is running on correct port
- **File Upload**: Check file size limits and supported formats
- **Streaming Issues**: Verify backend streaming implementation
- **Build Errors**: Clear node_modules and reinstall dependencies

### Development Tips

- Use React DevTools for component debugging
- Check Network tab for API request/response details
- Use browser dev tools for performance profiling
- Enable strict mode for development warnings

## Future Enhancements

- **File Preview**: Document preview before upload
- **Chat Export**: Save conversations to file
- **Dark Mode**: Theme switching capability
- **Multi-language**: Internationalization support
- **Offline Mode**: Service worker implementation
- **Real-time Collaboration**: Multi-user chat support
