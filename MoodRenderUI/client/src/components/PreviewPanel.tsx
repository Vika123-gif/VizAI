import { ArrowRight, Image as ImageIcon } from 'lucide-react';

interface PreviewPanelProps {
  moodboardPreview: string | null;
  renderPreview: string | null;
}

export default function PreviewPanel({ moodboardPreview, renderPreview }: PreviewPanelProps) {
  return (
    <div className="flex flex-col gap-6 h-full">
      <h2 className="text-2xl font-semibold text-foreground">
        Ready to create render
      </h2>
      <p className="text-sm text-muted-foreground">
        Upload a moodboard to transform into a photorealistic render
      </p>
      
      <div className="flex flex-col lg:flex-row items-center gap-6 flex-1">
        <div className="flex-1 w-full flex flex-col gap-3">
          <label className="text-sm font-medium text-muted-foreground">
            Moodboard
          </label>
          <div 
            className="aspect-square rounded-xl bg-card border-2 border-dashed border-border flex items-center justify-center overflow-hidden"
            data-testid="preview-moodboard-panel"
          >
            {moodboardPreview ? (
              <img 
                src={moodboardPreview} 
                alt="Moodboard preview" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-3 p-6 text-center">
                <div className="rounded-full bg-muted p-4">
                  <ImageIcon className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground">
                  No image uploaded
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="rounded-full bg-muted p-3">
            <ArrowRight className="w-6 h-6 text-muted-foreground rotate-90 lg:rotate-0" />
          </div>
        </div>

        <div className="flex-1 w-full flex flex-col gap-3">
          <label className="text-sm font-medium text-muted-foreground">
            Render
          </label>
          <div 
            className="aspect-square rounded-xl bg-card border-2 border-dashed border-border flex items-center justify-center overflow-hidden"
            data-testid="preview-render-panel"
          >
            {renderPreview ? (
              <img 
                src={renderPreview} 
                alt="Render preview" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-3 p-6 text-center">
                <div className="rounded-full bg-muted p-4">
                  <ImageIcon className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground">
                  Generate to preview
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}