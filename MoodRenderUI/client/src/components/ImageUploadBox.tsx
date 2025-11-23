import { useCallback, useState } from 'react';
import { Upload } from 'lucide-react';

interface ImageUploadBoxProps {
  title: string;
  onImageSelect: (file: File) => void;
  imagePreview: string | null;
  acceptedFormats?: string;
}

export default function ImageUploadBox({
  title,
  onImageSelect,
  imagePreview,
  acceptedFormats = "PNG, JPG, JPEG & WEBP (Up to 5MB)"
}: ImageUploadBoxProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (validateFile(file)) {
        onImageSelect(file);
      }
    }
  }, [onImageSelect]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (validateFile(file)) {
        onImageSelect(file);
      }
    }
  }, [onImageSelect]);

  const validateFile = (file: File): boolean => {
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    const maxSize = 5 * 1024 * 1024;
    
    if (!validTypes.includes(file.type)) {
      console.log('Invalid file type. Please upload PNG, JPG, JPEG or WEBP.');
      return false;
    }
    
    if (file.size > maxSize) {
      console.log('File too large. Maximum size is 5MB.');
      return false;
    }
    
    return true;
  };

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-medium text-foreground">{title}</h3>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative min-h-64 rounded-xl border-2 border-dashed transition-all duration-200
          flex items-center justify-center overflow-hidden
          ${isDragging 
            ? 'border-primary bg-card scale-102' 
            : 'border-border bg-card hover-elevate cursor-pointer'
          }
        `}
        data-testid={`upload-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <input
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          data-testid={`input-${title.toLowerCase().replace(/\s+/g, '-')}`}
        />
        
        {imagePreview ? (
          <div className="relative w-full h-full min-h-64">
            <img 
              src={imagePreview} 
              alt={`${title} preview`}
              className="w-full h-full object-cover"
              data-testid={`preview-${title.toLowerCase().replace(/\s+/g, '-')}`}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm p-3">
              <p className="text-xs text-muted-foreground truncate">
                Click or drag to replace
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 p-8 text-center pointer-events-none">
            <div className="rounded-full bg-muted p-6">
              <Upload className="w-8 h-8 text-muted-foreground" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-base font-medium text-foreground">
                {isDragging ? 'Drop image here' : 'Click to upload or drag and drop'}
              </p>
              <p className="text-xs text-muted-foreground">
                {acceptedFormats}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}