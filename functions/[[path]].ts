// This file is for Cloudflare Pages deployment
// For Vercel deployment, use app/entry.vercel.tsx instead

import type { ServerBuild } from '@remix-run/cloudflare';
import { createPagesFunctionHandler } from '@remix-run/cloudflare-pages';

export const onRequest: PagesFunction = async (context) => {
  try {
    const serverBuild = (await import('../build/server')) as unknown as ServerBuild;

    const handler = createPagesFunctionHandler({
      build: serverBuild,
    });

    return handler(context);
  } catch (error) {
    // Return a simple response if build is not available
    return new Response('Build not available. Please run "pnpm build" first.', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
};
