import { initEdgeStore } from "@edgestore/server";
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";

const es = initEdgeStore.create();

/**
 * This is the main router for the Edge Store buckets.
 */
const edgeStoreRouter = es.router({
  publicFiles: es.fileBucket(),
});

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
});

// ✅ Export named handlers for Next.js API routes
export { handler as GET, handler as POST };

// ❌ Remove default export (Not allowed in Next.js API routes)
// export default edgeStoreRouter;
