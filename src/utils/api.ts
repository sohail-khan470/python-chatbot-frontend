const API_BASE_URL = "http://localhost:8000";

export const api = {
  async queryStream(question: string, conversationHistory: any[] = []) {
    const response = await fetch(`${API_BASE_URL}/query-stream`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
        conversation_history: conversationHistory,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to query");
    }

    return response;
  },

  async uploadFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_BASE_URL}/ingest`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload file");
    }

    return response.json();
  },

  async getStats() {
    const response = await fetch(`${API_BASE_URL}/stats`);
    if (!response.ok) {
      throw new Error("Failed to get stats");
    }
    return response.json();
  },

  async healthCheck() {
    const response = await fetch(`${API_BASE_URL}/`);
    if (!response.ok) {
      throw new Error("Health check failed");
    }
    return response.json();
  },
};
