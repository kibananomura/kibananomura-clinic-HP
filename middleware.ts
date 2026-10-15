import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * /admin と /admin-docs（内部業務資料のPDF置き場）をBasic認証で保護する。
 * ADMIN_PASSWORD が未設定の場合は安全側に倒してアクセスを拒否する
 * （パスワード未設定のまま本番公開されることを防ぐ）。
 */
export function middleware(request: NextRequest) {
  const expectedUser = process.env.ADMIN_USER || "nomura";
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedPassword) {
    return new NextResponse("管理者ページは現在設定中です（ADMIN_PASSWORD未設定）。", {
      status: 503,
    });
  }

  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Basic ")) {
    const decoded = Buffer.from(authHeader.slice(6), "base64").toString("utf-8");
    const separatorIndex = decoded.indexOf(":");
    const user = decoded.slice(0, separatorIndex);
    const password = decoded.slice(separatorIndex + 1);
    if (user === expectedUser && password === expectedPassword) {
      return NextResponse.next();
    }
  }

  return new NextResponse("認証が必要です。", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="admin"' },
  });
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/admin-docs/:path*"],
};
