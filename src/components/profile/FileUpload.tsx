
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Upload, File, X } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept: string;
  label: string;
  currentFile?: string;
  onRemove?: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  accept,
  label,
  currentFile,
  onRemove
}) => {
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "File size must be less than 10MB",
          variant: "destructive",
        });
        return;
      }
      onFileSelect(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "File size must be less than 10MB",
          variant: "destructive",
        });
        return;
      }
      onFileSelect(file);
    }
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive
            ? 'border-emerald-400 bg-emerald-400/10'
            : 'border-gray-600 hover:border-gray-500'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-300 mb-2">{label}</p>
        <p className="text-sm text-gray-500 mb-4">
          Drag and drop or click to browse (Max 10MB)
        </p>
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
          id={`file-upload-${label.replace(/\s+/g, '-').toLowerCase()}`}
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            const input = document.getElementById(`file-upload-${label.replace(/\s+/g, '-').toLowerCase()}`) as HTMLInputElement;
            input?.click();
          }}
          className="border-gray-600"
        >
          Select File
        </Button>
      </div>

      {currentFile && (
        <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
          <div className="flex items-center space-x-3">
            <File className="h-5 w-5 text-emerald-400" />
            <span className="text-sm text-gray-300">File uploaded</span>
          </div>
          {onRemove && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onRemove}
              className="text-red-400 hover:text-red-300"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
