import { handleChatRequest } from "../../lib/chatbot-server";

/**
 * HP案内チャットボットの一般公開用API（サイト右下のチャット窓から呼ばれる）。
 * 当サイトからの呼び出しのみ受け付け、IPごとの回数制限をかける。回答処理の本体は app/lib/chatbot-server.ts。
 */
export async function POST(request: Request) {
  return handleChatRequest(request, { publicAccess: true });
}
