import ImageUploadBox from '../ImageUploadBox';
import { useState } from 'react';

export default function ImageUploadBoxExample() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageSelect = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-8 bg-background">
      <ImageUploadBox
        title="Upload Moodboard Image"
        onImageSelect={handleImageSelect}
        imagePreview={imagePreview}
      />
    </div>
  );
}