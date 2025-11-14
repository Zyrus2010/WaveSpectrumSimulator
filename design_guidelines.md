# Electromagnetic Wave Visualization App - Design Guidelines

## Design Approach: Wave-Adaptive Educational Interface

**Rationale**: The design adapts dynamically to the electromagnetic spectrum being displayed, with backgrounds transitioning from white (radio waves) to pure black (gamma rays). This creates an immersive educational experience where the interface itself demonstrates the energy progression across the electromagnetic spectrum.

## Typography System

**Font Family**: System fonts for clarity and performance
- Primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- Monospace (for scientific values): 'SF Mono', 'Monaco', 'Cascadia Code', monospace

**Hierarchy**:
- Wave Type Display: 2.5rem (text-4xl), weight 700
- Section Headers: 0.875rem (text-sm), weight 600, uppercase, tracking-wider
- Values (Scientific Notation): 2.25rem (text-4xl) for primary, 1.5rem (text-2xl) for secondary
- Body Text: 1rem (text-base), weight 400
- Reference Objects: 1.125rem (text-lg), weight 500
- Subtype Info: 0.875rem (text-sm) to 1.125rem (text-lg)

## Dynamic Color System

**Background Colors by Wave Type**:
- Radio Waves: `rgb(255, 255, 255)` - Pure white
- Microwaves: `rgb(220, 220, 220)` - Light gray
- Infrared: `rgb(139, 0, 0)` - Deep red
- Visible Light: Rainbow gradient (Red→Orange→Yellow→Green→Blue→Indigo→Violet)
- Ultraviolet: `rgb(75, 0, 130)` - Indigo/purple
- X-Rays: `rgb(0, 0, 50)` - Dark blue-black
- Gamma Rays: `rgb(0, 0, 0)` - Pure black

**Text Colors** (automatically adapt for contrast):
- Light backgrounds (Radio, Microwaves): Dark text `rgb(0, 0, 0)` or `rgb(20, 20, 20)`
- Dark backgrounds (IR, UV, X-Ray, Gamma): Light text `rgb(200-255, 200-255, 200-255)`
- Visible Light: White text with shadow for readability

**Transitions**: 
- Background color changes: `transition-all duration-700` (700ms smooth transitions)
- All elements fade smoothly when wave type changes

## Layout System - Landscape Orientation

**Overall Structure** (based on PDF reference):
- Maximum width: 1600px
- Padding: 1.5rem (p-6) on all sides
- Grid-based layout optimized for landscape viewing

**Three-Tier Layout**:

1. **Top Tier** - Wave Identification (3 columns)
   - Wave Type Display (icon + name)
   - Safety Warning (badge with alert level)
   - Subtype Information (count + current subtype)

2. **Middle Tier** - Wave Properties (3 columns)
   - Reference Objects (size comparison list)
   - Wave Visualization (SVG animation)
   - Wavelength Value (large display)

3. **Bottom Tier** - Controls & Information
   - Frequency Slider + Value (2 columns)
   - Energy Display + Formula
   - Practical Uses (full width, 2-column grid)
   - Detailed Subtypes (3-column grid)
   - Health & Safety (full width)

## Component Specifications

### Cards
- Border: 2px solid (uses dynamic text color)
- Background: Transparent with border
- Padding: 1.5rem (p-6)
- Border radius: Default rounded
- All cards use the dynamic border/text color system

### Badges
- Background: Semi-transparent with safety color
  - Danger: `rgba(220, 38, 38, 0.2)`
  - Caution: `rgba(234, 179, 8, 0.2)`
  - Safe: `rgba(34, 197, 94, 0.2)`
- Border: Uses dynamic text color
- Padding: px-4 py-2

### Sliders
- Custom styled to match wave type
- Full width within container
- Smooth value updates with scientific notation display
- Step: 0.1 for fine control
- Range: 0-100 (logarithmic mapping to actual values)

### Wave Visualization
- SVG-based sine wave
- Frequency determines wave density
- Stroke color matches dynamic text color
- Height: 80px, responsive width
- Animated path based on current frequency

## Content Structure

### Wave Type Data
Each wave type includes:
- **Icon**: Emoji representation (📡, 📶, 🔥, 🌈, ☀️, 💉, ☢️)
- **Subtypes**: 3-7 subtypes with wavelength ranges, descriptions, and specific uses
- **Reference Objects**: 3 objects for size comparison
- **Safety Information**: Level, warning, health effects, protection methods
- **Practical Uses**: 8+ real-world applications with descriptions

### Subtype Display
Each subtype card shows:
- Name (bold, large text)
- Wavelength range (small, lighter opacity)
- Description
- 3-5 specific use cases (bulleted list)

### Health & Safety Section
- Health Effects paragraph
- Protection Methods paragraph
- Color-coded by safety level
- Comprehensive, educational information

## Responsive Breakpoints

**Mobile (< 768px)**:
- Single column for all grids
- Reduced card padding (p-4)
- Smaller text sizes
- Simplified wave visualization

**Tablet (768px - 1024px)**:
- 2-column grids where appropriate
- Standard card padding (p-6)
- Full wave visualization

**Desktop (> 1024px)**:
- 3-column grids for top/middle tiers
- Maximum width container (1600px)
- Optimal viewing experience

## Data Accuracy

### Scientific Constants
- Speed of Light: 3×10⁸ m/s
- Planck's Constant: 6.626×10⁻³⁴ J·s
- Frequency Range: 10³ Hz to 10²⁰ Hz
- Wavelength calculation: λ = c/f

### Wave Classification Boundaries
- Radio: λ ≥ 1×10⁻³ m (1 mm)
- Microwave: 1×10⁻⁶ m ≤ λ < 1×10⁻³ m
- Infrared: 7×10⁻⁷ m ≤ λ < 1×10⁻⁶ m
- Visible: 4×10⁻⁷ m ≤ λ < 7×10⁻⁷ m (400-700 nm)
- Ultraviolet: 1×10⁻⁸ m ≤ λ < 4×10⁻⁷ m
- X-Ray: 1×10⁻¹¹ m ≤ λ < 1×10⁻⁸ m
- Gamma: λ < 1×10⁻¹¹ m

## Accessibility

**Contrast**: Text colors automatically adapt to ensure readability on all backgrounds
**Focus Indicators**: Visible on all interactive elements
**Keyboard Navigation**: Full slider control with keyboard
**Screen Readers**: Proper labeling with data-testid attributes
**Touch Targets**: Minimum 44px for mobile interactions

## Educational Philosophy

The design emphasizes:
1. **Visual Learning**: Background colors teach energy levels intuitively
2. **Scale Comprehension**: Reference objects help visualize wavelength sizes
3. **Practical Relevance**: Real-world uses make abstract concepts concrete
4. **Safety Awareness**: Prominent health information for ionizing radiation
5. **Scientific Accuracy**: All values calculated from proper physics formulas
6. **Interactive Exploration**: Smooth transitions encourage experimentation

The interface serves as both a calculator and an educational tool, making electromagnetic wave properties tangible and memorable for students.
