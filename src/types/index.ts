export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  sources?: string[];
}

export interface Notification {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

export interface QueryRequest {
  question: string;
  conversation_history?: Array<{
    role: string;
    content: string;
  }>;
}

export interface QueryResponse {
  answer: string;
  sources: string[];
  confidence: number;
}

export interface IngestResponse {
  message: string;
  document_id: string;
  chunks_processed: number;
}
