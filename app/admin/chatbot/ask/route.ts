import { handleChatRequest } from "../../../lib/chatbot-server";

/**
 * HP案内チャットボットの管理者用・動作確認API。
 * /admin 配下なので middleware.ts のBasic認証で保護されている（回数制限なし）。
 * 一般公開用は app/api/chat/route.ts。回答処理の本体は app/lib/chatbot-server.ts。
 */
export async function POST(request: Request) {
  return handleChatRequest(request, { publicAccess: false });
}
