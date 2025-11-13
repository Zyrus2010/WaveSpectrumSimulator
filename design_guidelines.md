# Electromagnetic Wave Visualization App - Design Guidelines

## Design Approach: Material Design System

**Rationale**: Material Design's emphasis on clear visual hierarchy, responsive interaction patterns, and strong feedback systems perfectly suits this educational tool. The system's elevation and motion principles will help users understand cause-and-effect relationships between slider adjustments and wave behavior.

## Typography System

**Font Family**: Roboto (primary), Roboto Mono (for numerical values and scientific notation)

**Hierarchy**:
- App Title: 2.5rem, weight 300, letter-spacing -0.5px
- Section Headers (Wave Type, Properties): 1.5rem, weight 500
- Educational Labels: 1rem, weight 400, line-height 1.6 for readability
- Numerical Values: 1.125rem, Roboto Mono, weight 500
- Helper Text/Warnings: 0.875rem, weight 400
- Units & Annotations: 0.75rem, weight 400, uppercase, letter-spacing 1px

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, and 8 consistently throughout
- Component gaps: gap-4
- Section padding: p-6 or p-8
- Card spacing: p-4 to p-6
- Tight groupings: gap-2

**Container Structure**:
- Max-width: 1280px (max-w-6xl) for main content
- Full-width canvas for wave visualization
- Responsive padding: px-4 (mobile), px-6 (tablet), px-8 (desktop)

## Component Architecture

### Main Layout (Single Page Application)

**Header Section** (h-16):
- App title left-aligned
- Reset controls button right-aligned
- Subtle elevation (shadow-sm)

**Wave Visualization Canvas** (h-64 to h-80):
- Full-width responsive canvas
- Housed in rounded container (rounded-lg)
- Elevation (shadow-md) to emphasize importance
- 16:9 aspect ratio maintained across viewports

**Control Panel** (Central Focus):
- Two-column grid on desktop (grid-cols-2), single column on mobile
- Frequency slider (left/top)
- Wavelength slider (right/bottom)
- Each slider group includes:
  - Label with current value in scientific notation
  - Slider track with custom thumb
  - Unit display (Hz, m)
  - Range indicators (min/max values)
- Spacing between sliders: gap-6

**Information Panels** (Grid Layout):
Three-column grid (grid-cols-1 md:grid-cols-3 gap-4):

1. **Wave Properties Card**:
   - Energy value (prominently displayed)
   - Frequency value
   - Wavelength value
   - All with proper units and scientific notation

2. **Wave Classification Card**:
   - Current wave type (Radio, Microwave, etc.)
   - Subgroup classification
   - Visual scale indicator showing size comparison to reference objects
   - Icon representation of reference object (building/human/cell/atom)

3. **Applications & Safety Card**:
   - Practical uses (bulleted list, max 3-4 items)
   - Exposure warnings (when applicable)
   - Icon indicating safety level

**Mathematical Relationship Graph** (Bottom Section):
- Compact graph visualization (h-48)
- Shows E = hf relationship
- Labeled axes
- Current point highlighted

### Component Specifications

**Slider Component**:
- Track height: h-2
- Thumb: w-5 h-5, elevated (shadow-md)
- Active thumb: w-6 h-6, higher elevation (shadow-lg)
- Touch target: 44px minimum
- Keyboard navigation: Arrow keys (fine), Page Up/Down (coarse)
- Value tooltip appears on interaction

**Card Components** (rounded-xl, shadow-md):
- Header: pb-3, border-bottom
- Content: pt-4
- Consistent internal spacing: p-4 to p-6
- Elevation changes on hover for interactive cards

**Button Components**:
- Primary (Reset): px-6 py-3, rounded-lg, elevation on hover
- Icon buttons: w-10 h-10, rounded-full
- All buttons: hover scale (scale-105), active scale (scale-95)

**Wave Reference Scale Indicators**:
- Horizontal timeline layout
- Icons + labels for reference objects
- Current wave position highlighted
- Logarithmic spacing representation
- Responsive: horizontal scroll on mobile

## Accessibility & Interactions

**Touch Targets**: Minimum 44x44px for all interactive elements
**Keyboard Navigation**: 
- Tab order: Header → Frequency Slider → Wavelength Slider → Cards → Graph
- Focus indicators: 2px outline with offset
- Escape key: Reset to defaults

**Motion & Animation**:
- Wave animation: 60fps using requestAnimationFrame
- Slider updates: Smooth interpolation (300ms ease-out)
- Background transitions: 500ms ease-in-out
- Value changes: Gentle spring animation
- Minimal decorative animations - focus on functional feedback

**Screen Reader Support**:
- ARIA labels for all sliders
- Live regions for value announcements
- Proper heading hierarchy
- Alt text for reference object icons

## Responsive Breakpoints

**Mobile (< 768px)**:
- Single column layout
- Stacked sliders (full width)
- Cards stack vertically
- Reduced canvas height (h-48)
- Simplified graph

**Tablet (768px - 1024px)**:
- Two-column slider layout
- Grid-cols-2 for information cards
- Full wave visualization

**Desktop (> 1024px)**:
- Three-column card grid
- Larger canvas (h-80)
- Side-by-side slider controls
- Full mathematical graph

## Visual Hierarchy Principles

1. **Primary Focus**: Wave visualization canvas (largest, most elevated)
2. **Secondary Focus**: Interactive sliders (central, medium elevation)
3. **Tertiary Focus**: Information cards (supporting, subtle elevation)
4. **Reference**: Mathematical graph (compact, educational context)

The design emphasizes scientific accuracy while maintaining approachability for students, using Material Design's elevation system to guide user attention and clear typography to ensure educational content is easily digestible.