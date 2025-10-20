import React, { useState } from "react";
import { useFileUploadStore } from "../stores/fileUploadStore";
import { useNotificationStore } from "../stores/notificationStore";

interface FileUploadProps {
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ className }) => {
  const [dragActive, setDragActive] = useState(false);
  const { isUploading, uploadProgress, uploadFile } = useFileUploadStore();
  const { addNotification } = useNotificationStore();

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    try {
      const result = await uploadFile(file);
      addNotification(result.message, "success");
    } catch (error) {
      console.error("Upload error:", error);
      addNotification(
        error instanceof Error
          ? error.message
          : "Failed to upload file. Please try again.",
        "error"
      );
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  return (
    <div className={`file-upload ${className}`}>
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="space-y-4">
          <div className="text-4xl text-gray-400">📄</div>
          <div>
            <p className="text-lg font-medium text-gray-700">
              {isUploading ? "Uploading..." : "Drop your document here"}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              or click to browse files
            </p>
          </div>
          <input
            type="file"
            accept=".pdf,.txt,.doc,.docx,.csv"
            onChange={handleFileInput}
            disabled={isUploading}
            className="hidden"
            id="file-input"
          />
          <label
            htmlFor="file-input"
            className={`inline-block px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors ${
              isUploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isUploading ? "Uploading..." : "Choose File"}
          </label>
          <p className="text-xs text-gray-400 mt-2">
            Supported formats: PDF, TXT, DOC, DOCX, CSV (max 10MB)
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
