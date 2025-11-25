# Animated Generate Button Integration

## Component Overview

`animated-generate-button.tsx` is a custom animated button component that provides a visually engaging "Generate" action button with dynamic animations and interactive effects.

## Features

- ✨ **Smooth Animations**: Letter-by-letter animations and SVG sparkle effects
- 🎨 **Customizable Hue**: Adjustable highlight color via `highlightHueDeg` prop
- 🎯 **Loading State**: Visual feedback with `generating` prop
- ♿ **Accessible**: Full ARIA support and keyboard navigation
- 🎭 **Interactive Effects**: Hover, focus, and active states with visual feedback
- 📱 **Responsive**: Works seamlessly on all screen sizes

## Props

```typescript
type AnimatedGenerateButtonProps = {
  className?: string;              // Additional CSS classes
  labelIdle?: string;              // Text when not generating (default: "Generate")
  labelActive?: string;            // Text when generating (default: "Generating")
  generating?: boolean;            // Loading state (default: false)
  highlightHueDeg?: number;        // Hue rotation in degrees (default: 210)
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  id?: string;
  ariaLabel?: string;
};
```

## Usage in Dashboard

The component is integrated in `/src/app/dashboard/page.tsx` to replace the standard resume generation button:

```tsx
<AnimatedGenerateButton
  onClick={() => {
    // Validation and handler logic
    setShowTemplateModal(true)
  }}
  labelIdle="Generate Resume"
  labelActive="Building Resume"
  generating={isProcessing}
  highlightHueDeg={120}  // Green highlight for resume generation
/>
```

### Props Explanation

- **labelIdle**: "Generate Resume" - shown when not processing
- **labelActive**: "Building Resume" - shown while generating
- **generating**: `isProcessing` state - controls animation state
- **highlightHueDeg**: `120` - Green hue for positive action feedback

## Color Hue Reference

Common hue values for different actions:
- `0°` - Red (alerts, destructive actions)
- `120°` - Green (generation, success)
- `210°` - Blue (default, neutral actions)
- `45°` - Orange (warnings)
- `300°` - Purple (premium features)

## Animation States

### Idle State
- SVG sparkle flickers gently
- Letter animations pulse subtly
- Button glows on hover

### Active State (generating=true)
- Text transitions from "Generate Resume" to "Building Resume"
- Letters maintain animation but with faster timing
- Visual feedback indicates processing

### Focus State
- Individual letters scale and blur out
- Enhanced glow effects
- Accessible keyboard navigation feedback

### Disabled State
- Opacity reduced to 60%
- Cursor changes to not-allowed
- Prevents interactions

## Technical Notes

- Uses **CSS-in-JS** (`style jsx`) for scoped styles
- Leverages **CSS custom properties** for dynamic theming
- No external animation library required
- **TypeScript** typed for full IDE support
- **Tailwind CSS** for base styling and responsive design
- **clsx** for conditional class merging

## Dependencies

- `clsx`: For conditional class merging
- Tailwind CSS: For base styling
- React 19.2.0+: For component framework

## Best Practices

1. **Always provide clear labels**: Use descriptive `labelIdle` and `labelActive` text
2. **Match hue to action**: Use appropriate `highlightHueDeg` for visual consistency
3. **Handle loading state**: Bind `generating` prop to actual loading/processing state
4. **Accessibility**: Use `ariaLabel` for screen reader support when needed
5. **Error handling**: Validate inputs before processing to prevent invalid operations

## Example: Different Actions

```tsx
// For PDF export
<AnimatedGenerateButton
  labelIdle="Export PDF"
  labelActive="Exporting..."
  generating={isExporting}
  highlightHueDeg={210}
/>

// For AI operations
<AnimatedGenerateButton
  labelIdle="Enhance with AI"
  labelActive="Processing..."
  generating={isProcessing}
  highlightHueDeg={300}
/>

// For validation
<AnimatedGenerateButton
  labelIdle="Validate"
  labelActive="Validating..."
  generating={isValidating}
  highlightHueDeg={45}
/>
```

## Migration Guide

If replacing an existing button, update like this:

```tsx
// Before
<button className="bg-gray-900 text-white px-12 py-4 rounded-lg font-semibold border border-gray-700 hover:bg-gray-950">
  Generate Resume
</button>

// After
<AnimatedGenerateButton
  labelIdle="Generate Resume"
  labelActive="Building Resume"
  generating={isProcessing}
  highlightHueDeg={120}
  onClick={handleGenerateResume}
/>
```
