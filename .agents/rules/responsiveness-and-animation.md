# Responsiveness & Animation Guidelines

## Core Principles
1. **Multi-Platform Responsiveness (320px to 4K)**:
   - Ensure every page and component renders flawlessly across all screen sizes: Mobile (320px, 375px, 414px), Tablet (768px, 1024px), Desktop (1280px, 1440px, 1920px), and Ultra-Wide displays.
   - Prevent horizontal overflow across the application (`overflow-x: clip`).
   - Use flexible grid tracks (`minmax(0, 1fr)`) to prevent container blowouts.
   - Ensure all touch targets on mobile have comfortable spacing (minimum 44x44px).
   - Ensure labels, buttons, and navigation badges do not clip, overflow, or break awkwardly on small mobile viewports.

2. **Adaptive Shape & Layout Flexibility**:
   - Feel free to adapt or alter the layout geometry, component shapes, or structural arrangement between mobile, tablet, and desktop breakpoints (e.g. accordion versus card stacks, drawer versus modal, single-column versus multi-column).

3. **Motion & Animation Adaptability**:
   - Ensure animations feel tactile, responsive, and performance-budgeted at 60 FPS.
   - Adjust animation complexity, duration, or translate distances if needed for smoother rendering on mobile devices.
   - Respect `prefers-reduced-motion` media queries for accessible interactions.
