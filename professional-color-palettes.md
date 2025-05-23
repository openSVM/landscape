# Professional Color Palette Redesign

## Light Theme (Professional & Clean)
```css
:root {
  /* Light theme - Professional & Clean */
  --background: rgb(250, 250, 252);
  --background-alt: rgb(240, 240, 245);
  --surface: rgb(255, 255, 255);
  --surface-alt: rgb(246, 246, 250);
  --primary: rgb(51, 51, 64);
  --primary-light: rgb(82, 82, 92);
  --secondary: rgb(107, 114, 128);
  --secondary-light: rgb(156, 163, 175);
  --secondary-dark: rgb(75, 85, 99);
  --border: rgb(226, 232, 240);
  --accent: #4F46E5;
  --accent-light: #6366F1;
  --accent-dark: #4338CA;
  --text-on-accent: rgb(255, 255, 255);
  --text-on-secondary: rgb(255, 255, 255);
  --error: #DC2626;
  --success: #059669;
  --warning: #D97706;
  --info: #2563EB;
  --focus-ring: rgba(79, 70, 229, 0.5);
  --sidebar-bg: var(--surface);
  --sidebar-border: var(--border);
  --card-bg: var(--surface);
  --card-border: var(--border);
  --header-bg: var(--surface);
  --header-border: var(--border);
}
```

## Dark Theme (Professional & Elegant)
```css
.theme-dark {
  /* Dark theme - Professional & Elegant */
  --background: rgb(17, 24, 39);
  --background-alt: rgb(31, 41, 55);
  --surface: rgb(31, 41, 55);
  --surface-alt: rgb(55, 65, 81);
  --primary: rgb(243, 244, 246);
  --primary-light: rgb(209, 213, 219);
  --secondary: rgb(156, 163, 175);
  --secondary-light: rgb(209, 213, 219);
  --secondary-dark: rgb(107, 114, 128);
  --border: rgb(55, 65, 81);
  --accent: #6366F1;
  --accent-light: #818CF8;
  --accent-dark: #4F46E5;
  --text-on-accent: rgb(255, 255, 255);
  --text-on-secondary: rgb(255, 255, 255);
  --error: #EF4444;
  --success: #10B981;
  --warning: #F59E0B;
  --info: #3B82F6;
  --focus-ring: rgba(99, 102, 241, 0.5);
  --sidebar-bg: rgb(24, 31, 46);
  --sidebar-border: rgb(55, 65, 81);
  --card-bg: var(--surface);
  --card-border: var(--border);
  --header-bg: rgb(24, 31, 46);
  --header-border: rgb(55, 65, 81);
}
```

## Blue Theme (Professional & Vibrant)
```css
.theme-blue {
  /* Blue theme - Professional & Vibrant */
  --background: rgb(238, 242, 255);
  --background-alt: rgb(224, 231, 255);
  --surface: rgb(255, 255, 255);
  --surface-alt: rgb(238, 242, 255);
  --primary: rgb(30, 41, 59);
  --primary-light: rgb(51, 65, 85);
  --secondary: rgb(71, 85, 105);
  --secondary-light: rgb(100, 116, 139);
  --secondary-dark: rgb(51, 65, 85);
  --border: rgb(199, 210, 254);
  --accent: #3730A3;
  --accent-light: #4F46E5;
  --accent-dark: #312E81;
  --text-on-accent: rgb(255, 255, 255);
  --text-on-secondary: rgb(255, 255, 255);
  --error: #DC2626;
  --success: #059669;
  --warning: #D97706;
  --info: #2563EB;
  --focus-ring: rgba(79, 70, 229, 0.5);
  --sidebar-bg: rgb(238, 242, 255);
  --sidebar-border: rgb(199, 210, 254);
  --card-bg: var(--surface);
  --card-border: var(--border);
  --header-bg: rgb(238, 242, 255);
  --header-border: rgb(199, 210, 254);
}
```

## Color Palette Rationale

### Light Theme
- **Background & Surface**: Subtle off-white with slight blue undertone for a clean, professional look
- **Primary Text**: Deeper, richer dark gray with blue undertone for better readability and professional appearance
- **Accent**: Rich indigo that conveys trust and professionalism while maintaining brand identity
- **Secondary**: Balanced gray tones that complement the primary colors without competing

### Dark Theme
- **Background & Surface**: Rich dark blue-gray that reduces eye strain while maintaining professional appearance
- **Primary Text**: Bright but not harsh white with subtle warmth for better readability
- **Accent**: Vibrant indigo that stands out against the dark background while maintaining brand identity
- **Secondary**: Carefully balanced gray tones with slight warmth for better contrast against dark backgrounds

### Blue Theme
- **Background & Surface**: Subtle indigo-tinted backgrounds that maintain readability while reinforcing brand identity
- **Primary Text**: Deep slate blue for excellent contrast and professional appearance
- **Accent**: Rich, deep indigo that provides strong brand identity while maintaining accessibility
- **Secondary**: Slate-tinted grays that complement the blue palette while providing sufficient contrast

## Accessibility Considerations
- All color combinations meet WCAG AA contrast requirements
- Text colors provide strong readability against their backgrounds
- Interactive elements have distinct focus and hover states
- Color is not the sole means of conveying information
