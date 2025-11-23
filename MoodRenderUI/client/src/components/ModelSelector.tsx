import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ModelSelectorProps {
  onModelChange?: (model: string) => void;
}

const models = [
  { value: 'gemini-2.5-flash-image', label: 'Gemini 2.5 Flash Image' },
  { value: 'gemini-2.0-flash-exp', label: 'Gemini 2.0 Flash Experimental' },
];

export default function ModelSelector({ onModelChange }: ModelSelectorProps) {
  const [selectedModel, setSelectedModel] = useState('gemini-2.5-flash-image');

  const handleValueChange = (value: string) => {
    setSelectedModel(value);
    onModelChange?.(value);
    console.log('Model changed to:', value);
  };

  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-medium text-foreground">
        Model Selection
      </label>
      <Select value={selectedModel} onValueChange={handleValueChange}>
        <SelectTrigger 
          className="w-full rounded-full px-6 py-3 h-auto bg-card border-border"
          data-testid="select-model"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent data-testid="select-model-content">
          {models.map((model) => (
            <SelectItem 
              key={model.value} 
              value={model.value}
              data-testid={`model-option-${model.value}`}
            >
              {model.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}