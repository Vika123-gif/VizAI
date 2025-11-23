# Design Guidelines: Moodboard to Render Web Application

## Design Approach
**Utility-Focused Application** with a clean, professional dark interface optimizing for workflow efficiency. Drawing inspiration from professional creative tools like Figma and Linear for their minimal, focused interfaces.

## Core Design Elements

### Typography
- **Primary Font**: Inter or similar modern sans-serif via Google Fonts
- **Hierarchy**: 
  - Upload box labels: text-lg or text-xl, font-medium
  - Button text: text-base, font-semibold
  - Preview labels: text-sm, font-medium
  - Helper text: text-xs, text-gray-400

### Layout System
**Spacing Primitives**: Use Tailwind units of 4, 6, 8, and 12 for consistent rhythm
- Component padding: p-6 to p-8
- Section gaps: gap-6 to gap-8
- Container padding: p-8 to p-12
- Button padding: px-6 py-3

**Grid Structure**:
- Two-column layout on desktop (lg:grid-cols-2)
- Left column: Upload controls and actions (stacked vertically with gap-6)
- Right column: Preview panel
- Mobile: Single column stack (grid-cols-1)
- Max container width: max-w-7xl with mx-auto

### Component Design

**Upload Boxes**:
- Large, prominent areas with dashed border (border-2 border-dashed)
- Aspect ratio: Maintain reasonable proportions (aspect-video or similar)
- Minimum height: min-h-64 or min-h-72
- Rounded corners: rounded-xl or rounded-2xl
- Hover state: Subtle background brightening
- Active/dragging state: Brighter border, background change
- Icon + text centered when empty
- Full image preview when populated (with subtle overlay showing filename)

**Model Selection Pill**:
- Rounded-full styling for pill shape
- Compact padding: px-4 py-2
- Dropdown indicator (chevron icon)
- Position below upload boxes with appropriate spacing (mt-6)

**Generate Button**:
- Full width or prominent centered placement
- Large size: px-8 py-4
- Rounded-lg
- Disabled state: Lower opacity, no pointer events
- Enabled state: High contrast, clear call-to-action

**Preview Panel**:
- Three-section horizontal layout:
  - Left: Moodboard preview (flex-1)
  - Center: Arrow icon (→) with fixed width
  - Right: Render placeholder (flex-1)
- Each preview area has rounded corners (rounded-lg)
- Aspect ratio maintained for previews
- Placeholder state shows dashed border with centered icon
- Labels above each preview section

### Dark Theme Specifications
- **Background**: Deep charcoal/near-black (bg-gray-900 or bg-gray-950)
- **Upload boxes**: Slightly lighter (bg-gray-800)
- **Text**: High contrast whites and light grays (text-gray-100, text-gray-300)
- **Borders**: Subtle gray tones (border-gray-700)
- **Accents**: Use a vibrant accent color for the generate button (blue, purple, or teal)
- **Hover states**: Subtle lightening (hover:bg-gray-700)

### Visual Hierarchy
1. Upload boxes dominate left side - primary interaction points
2. Generate button as clear call-to-action
3. Preview panel provides visual feedback
4. Model selection subtle but accessible

### Responsive Behavior
- **Desktop (lg+)**: Side-by-side two-column layout
- **Tablet (md)**: Side-by-side with tighter spacing
- **Mobile**: Stack vertically - uploads first, then preview panel
- Preview panel stacks vertically on small screens (moodboard over render)

### Interaction States
- **Empty upload box**: Dashed border, upload icon, instructional text
- **Drag-over**: Border color change, background highlight
- **Image loaded**: Show preview image, subtle filename overlay
- **Button disabled**: Reduced opacity (opacity-50), cursor-not-allowed
- **Button enabled**: Full opacity, hover effects active

### Icons
Use Heroicons (outline style) via CDN:
- Upload icon for empty boxes
- Arrow-right for preview separator
- Chevron-down for model selection
- Photo/image icon for render placeholder

### Micro-interactions
- Smooth transitions on hover (transition-all duration-200)
- Fade-in for image previews
- Scale effect on drag-over (scale-102)
- No complex animations - keep focused on utility

### Accessibility
- Proper focus states on all interactive elements (focus:ring-2 focus:ring-offset-2)
- File input labels properly associated
- Alt text for preview images
- Keyboard navigation support for all controls
- ARIA labels for drag-drop regions

## Images
No hero images needed - this is a tool-focused application. All imagery is user-generated through uploads.