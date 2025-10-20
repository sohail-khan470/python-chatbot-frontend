import { create } from "zustand";
import { api } from "../utils/api";

interface FileUploadState {
  isUploading: boolean;
  uploadProgress: number;
  uploadFile: (
    file: File
  ) => Promise<{
    message: string;
    document_id: string;
    chunks_processed: number;
  }>;
  setUploading: (uploading: boolean) => void;
  setProgress: (progress: number) => void;
}

export const useFileUploadStore = create<FileUploadState>((set) => ({
  isUploading: false,
  uploadProgress: 0,

  uploadFile: async (file) => {
    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "text/plain",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/csv",
    ];

    if (!allowedTypes.includes(file.type)) {
      throw new Error("Please upload a PDF, TXT, DOC/DOCX, or CSV file.");
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      throw new Error("File size must be less than 10MB.");
    }

    set({ isUploading: true, uploadProgress: 0 });

    try {
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        set((state) => ({
          uploadProgress: Math.min(state.uploadProgress + 10, 90),
        }));
      }, 100);

      const result = await api.uploadFile(file);

      clearInterval(progressInterval);
      set({ uploadProgress: 100 });

      // Reset after a short delay
      setTimeout(() => {
        set({ isUploading: false, uploadProgress: 0 });
      }, 1000);

      return result;
    } catch (error) {
      set({ isUploading: false, uploadProgress: 0 });
      throw error;
    }
  },

  setUploading: (uploading) => {
    set({ isUploading: uploading });
  },

  setProgress: (progress) => {
    set({ uploadProgress: progress });
  },
}));
