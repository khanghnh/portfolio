# Portfolio Project Rules

## 1. Core Architecture & Styling
- **Data Source**: Use local static TypeScript data (`src/data/portfolioData.ts`). Do NOT add backends or databases unless explicitly instructed.
- **Design Approach**: Build a modern, responsive 2D-first layout with high visual polish using Tailwind CSS (v4). Incorporate 3D elements (Spline / React Three Fiber) strictly as subtle, interactive decorative touches.
- **Components**: Keep React components clean, focused, modular, and fully typed.

## 2. Documentation & Organization
- Keep internal planning and specification documents in `doc/` (`doc/PORTFOLIO_PLAN.md`, `doc/SCREEN_FLOW.md`).

- Ensure `doc/` remains in `.gitignore`.

## 3. Hosting & Deployment Rules
- **Custom Domain**: `khanght.id.vn`.
- **Base Path**: Keep `base: '/'` in `vite.config.ts`.
- **CNAME Preservation**: Maintain `CNAME` inside `public/` so Vite copies it to `dist/` on build.
- **Deploy Workflow**: Use `npm run deploy` to push `dist/` directly to the `gh-pages` branch on GitHub.

## 4. Account & Git Configuration
- Work exclusively with the user's primary personal GitHub account for git commits and deployments.

## 5. Content & Storytelling
- **User Ownership**: Do NOT invent personal stories, bio narratives, placeholder pages, features, or dummy copy on your own. Build strictly what the user instructs. The user will provide all story content, personal background, and career details. The AI's job is strictly to build the layout, technical structure, and UI components as directed.

## 6. Verification Requirements
- Always verify code with `npm run build` before declaring completion.

