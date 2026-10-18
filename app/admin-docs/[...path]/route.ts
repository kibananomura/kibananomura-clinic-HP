import { NextRequest, NextResponse } from "next/server";
import manifest from "../../admin/manifest.json";

// Proxies internal document requests to the private Vercel Blob store.
// Files used to be copied into public/admin-docs and bundled into every
// deployment; they now live in Blob and this route streams them through
// instead. Access control is unchanged: middleware.ts still Basic-Auth-gates
// every request matching /admin-docs/:path* before it reaches this handler.

type ManifestFile = {
  url: string;
  blobUrl: string;
  htmlUrl: string | null;
  blobHtmlUrl: string | null;
};

function findFile(targetUrl: string): { blobUrl: string; contentType: string } | null {
  for (const category of manifest.categories as { files: ManifestFile[] }[]) {
    for (const file of category.files) {
      if (file.url === targetUrl) {
        return { blobUrl: file.blobUrl, contentType: "application/pdf" };
      }
      if (file.htmlUrl === targetUrl && file.blobHtmlUrl) {
        return { blobUrl: file.blobHtmlUrl, contentType: "text/html; charset=utf-8" };
      }
    }
  }
  return null;
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path: segments } = await params;
  const targetUrl = "/admin-docs/" + segments.map(encodeURIComponent).join("/");
  const match = findFile(targetUrl);
  if (!match) {
    return new NextResponse("Not found", { status: 404 });
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  const upstream = await fetch(match.blobUrl, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  if (!upstream.ok || !upstream.body) {
    return new NextResponse("Failed to fetch document", { status: 502 });
  }

  return new NextResponse(upstream.body, {
    headers: {
      "Content-Type": match.contentType,
      "Cache-Control": "private, max-age=3600",
    },
  });
}
