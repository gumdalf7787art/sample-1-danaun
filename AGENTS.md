<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Website image assets

Serve images from project files under `public/images` or the site's uploaded media storage, including broadcast stills and book covers. Use YouTube's original thumbnail URLs for YouTube video cards. Refresh the 대한재활의학과의사회TV list with `node scripts/refresh-youtube-videos.mjs` before committing. This refresh saves video metadata only.
