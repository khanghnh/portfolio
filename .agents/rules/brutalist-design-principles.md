# Brutalist Design & Styling Rules

## 1. Strict Brutalism & Pure Typography
- **No Unnecessary Border Boxes or Pill Capsules**:
  - Do NOT wrap navigation buttons, triggers, chips, or links in generic rounded pill capsules (`rounded-full`) or artificial boxed containers unless explicitly specified.
  - Lead with raw, architectural typography and monospace bracket syntax (e.g. `[ MENU ☰ ]`, `[ CLOSE ✕ ]`, `[ WORKS ]`, `[ CONTACT ]`).
- **Sharp Structural Aesthetics**:
  - Favor clean lines, asymmetric editorial grids, monospace technical notations, and sharp geometry over soft bubbly UI components.
  - Interactive states should utilize color shifts (e.g. into `#ff4500` brand accent), text brackets, sliding arrows, or solid rectangular swipes instead of generic rounded pill borders.

## 2. No Pulsing Dots or Generic Blinking Beacons
- **Zero Pulsing Dots**:
  - Do NOT use pulsing / blinking animated dots (`animate-ping`, `animate-pulse`, glowing radar dots) on live clocks, system status labels, tap indicators, or loaders.
  - Express live status, telemetry, clocks, and indicators using clean, raw monospace text (e.g. `[ LIVE 18:01:03 GMT+7 ]`, `[ TAP TO SEND EMAIL ↗ ]`, `[ SYSTEM OPERATIONAL ]`).

## 3. Multi-Platform Responsiveness
- Ensure all navigation triggers, drawers, and modal dialogs render without horizontal overflow (`overflow-x: clip`).
- Keep touch targets comfortable on mobile (minimum 44px tap area) while maintaining pure, un-boxed brutalist visual styling.
