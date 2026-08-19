# User Instructions & Design Rules

This document records the user's permanent project constraints, design rules, and behavioral preferences.

---

## 1. Aesthetic & Design Rules

1. **Dark Theme as Default**:
   - The site is in **Dark Theme** using deep obsidian (`#0c0c0c`), graphite surfaces (`#141414`), subtle architectural grid lines (`#262626`), and stark chalk text (`#f5f4f0`).
   - Accent color is bold **International Red-Orange (`#FF4500`)**.
   - Background features a sophisticated, ultra-subtle lighting gradient (no flat plain backgrounds, but strictly avoid tacky AI-slop gradients).

2. **No Black & White Images**:
   - Project and experiment photos must **NEVER** use grayscale filters. Show them in their full, vivid, natural colors.

3. **No Text Covering Image Previews**:
   - Do not place text centered on top of project or experiment images.
   - Project and experiment images must remain clean and unobstructed, with metadata placed in top/bottom status bars or below the image.

4. **Live Clock Formatting**:
   - Date and time in the navbar must be **un-boxed** (pure typography without border boxes or heavy containers).

5. **Icon & Tech Badge Rules**:
   - Tech icons must be **flat** (no container boxes or drop shadows).
   - Use official vector sources (`simple-icons` and calibrated Adobe CC badges) in their authentic brand colors.

---

## 2. Interactive Animation Rules

1. **Button Animations**:
   - Boxed buttons use **left-to-right swipe fill transitions** on hover (no harsh shadow-jumping animations).
   - Ensure high contrast in hover states (e.g. orange background fills with stark white on hover with black text).
   - Un-boxed buttons use interactive typography variants (`text-arrow` with sliding arrow `→`, `text-bracket` with expanding `[ BRACKETS ]`, `text-underline` with expanding line).

2. **Hero Letter Morphing**:
   - The centered `FULLSTACK DEVELOPER` headline features **single-letter hover morphing**: hovering over an individual letter morphs *only that specific letter* into an elegant italic serif in orange (`#FF4500`).

3. **Continuous Carousel**:
   - The tech carousel must continuously slide seamlessly at 60fps across the full viewport width and pause on hover.

4. **Scroll Appear Animations**:
   - Sections and cards must smoothly reveal as the user scrolls down the page using `ScrollReveal`.

---

## 3. Engineering & Architecture Rules

1. **Strict TypeScript & Verbatim Module Syntax**:
   - Use `import type` for all TypeScript interfaces.
   - Maintain 0 compiler errors/warnings on `npm run build`.

2. **Zero Hardcoded Data**:
   - All projects, experiments, and tech stack items must be stored in `src/data/*.json` and typed with `src/types/project.ts`.

3. **Component Modularity**:
   - Reusable elements must be organized as modular components in `src/components/` (`Navbar`, `Button`, `TechIcon`, `TechCarousel`, `SelectedWorksSection`, `ExperimentsSection`, `Footer`, `ScrollReveal`).
