import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ImageUploadBox from '@/components/ImageUploadBox';
import ModelSelector from '@/components/ModelSelector';
import PreviewPanel from '@/components/PreviewPanel';
import { apiRequest } from '@/lib/queryClient';

export default function Home() {
  const [moodboardFile, setMoodboardFile] = useState<File | null>(null);
  const [emptySpaceFile, setEmptySpaceFile] = useState<File | null>(null);
  const [moodboardPreview, setMoodboardPreview] = useState<string | null>(null);
  const [emptySpacePreview, setEmptySpacePreview] = useState<string | null>(null);
  const [renderPreview, setRenderPreview] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>('gemini-2.5-flash-image');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleMoodboardSelect = (file: File) => {
    setMoodboardFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setMoodboardPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleEmptySpaceSelect = (file: File) => {
    setEmptySpaceFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setEmptySpacePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    if (!moodboardPreview || !emptySpacePreview) {
      toast({
        title: "Missing images",
        description: "Please upload both moodboard and empty space images",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setRenderPreview(null);

    try {
      const response = await apiRequest('POST', '/api/generate', {
        moodboardImage: moodboardPreview,
        emptySpaceImage: emptySpacePreview,
        model: selectedModel,
      });

      const data = await response.json();

      if (data.success && data.imageData) {
        setRenderPreview(data.imageData);
        toast({
          title: "Success!",
          description: "Your render has been generated",
        });
      } else {
        throw new Error(data.error || 'Failed to generate render');
      }
    } catch (error) {
      console.error('Error generating render:', error);
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Failed to generate render. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const isGenerateEnabled = moodboardFile !== null && emptySpaceFile !== null && !isGenerating;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            MOODBOARD TO PHOTOREALISTIC RENDER
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl">
            Transform moodboard concepts into realistic interior renders with AI-powered visualization.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col gap-8">
            <ImageUploadBox
              title="Upload Moodboard Image"
              onImageSelect={handleMoodboardSelect}
              imagePreview={moodboardPreview}
            />

            <ImageUploadBox
              title="Upload Empty Space Image"
              onImageSelect={handleEmptySpaceSelect}
              imagePreview={emptySpacePreview}
            />

            <ModelSelector onModelChange={setSelectedModel} />

            <Button
              size="lg"
              disabled={!isGenerateEnabled}
              onClick={handleGenerate}
              className="w-full h-14 text-lg font-semibold rounded-lg"
              data-testid="button-generate"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              {isGenerating ? 'Generating...' : 'Generate Image'}
            </Button>

            {!isGenerating && !isGenerateEnabled && (
              <p className="text-xs text-muted-foreground text-center -mt-4">
                Upload both images to continue
              </p>
            )}
            {isGenerating && (
              <p className="text-xs text-muted-foreground text-center -mt-4">
                This may take 30-60 seconds...
              </p>
            )}
          </div>

          <div className="bg-card rounded-2xl p-8 border border-card-border">
            <PreviewPanel
              moodboardPreview={moodboardPreview}
              renderPreview={renderPreview}
            />
          </div>
        </div>
      </div>
    </div>
  );
}