# A&A Projects

A static React/Vite website for Ammar and Adam's programming and 3D printing build logs.

## Edit Content

- Projects: edit `src/data/projects.js`.
- Team profiles: edit `src/data/team.js`.
- Local photos/videos: put files in `public/assets`, then reference them as `/assets/file-name.png` or `/assets/file-name.mp4`.
- External videos: add YouTube, Vimeo, or direct video URLs in a step's `videos` array.

Each project supports:

- `status`: `ongoing` or `finished`
- `progress`
- `currentStepId`
- `featured`
- project links/resources/tags
- unlimited steps
- step photos and videos

The project detail page shows 5 steps at a time. If there are more, the step rail shows previous/next arrow controls.

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy

Recommended: Vercel. It is free for this kind of static site and will be easier if the site later gets an admin/database.

1. Push this folder to GitHub.
2. Import the repository in Vercel.
3. Use the default Vite settings:
   - Build command: `npm run build`
   - Output directory: `dist`

GitHub Pages is also possible because `vite.config.js` uses `base: "./"`, but Vercel is the cleaner default for future changes.
