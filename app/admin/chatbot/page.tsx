import type { Metadata } from "next";
import ChatbotTester from "./ChatbotTester";

export const metadata: Metadata = {
  title: "HP案内チャットボット（試作・管理用）",
  robots: { index: false, follow: false },
};

export default function ChatbotAdminPage() {
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "40px 20px 80px" }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>HP案内チャットボット（試作）</h1>
      <p style={{ fontSize: 13, color: "#666", marginBottom: 24 }}>
        Claude Haiku 5.5 が、HPの病名・症状・ブログ・FAQ・自費診療・設備のページから関連部分を探して回答します。
        一般公開前の動作確認用のページです（管理者のみ閲覧可）。
      </p>
      <ChatbotTester />
    </main>
  );
}
