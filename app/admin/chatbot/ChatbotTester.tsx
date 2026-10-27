"use client";

import { useState, type FormEvent } from "react";

type Source = { title: string; url: string };
type Usage = { input_tokens: number; output_tokens: number };
type Turn = { question: string; answer?: string; sources?: Source[]; usage?: Usage; error?: string };

// Claude Haiku 5.5 の単価（100万トークンあたり：入力0.10ドル／出力0.50ドル）。1ドル150円で概算表示する
const YEN_PER_INPUT_TOKEN = (0.1 / 1_000_000) * 150;
const YEN_PER_OUTPUT_TOKEN = (0.5 / 1_000_000) * 150;

export default function ChatbotTester() {
  const [question, setQuestion] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const q = question.trim();
    if (!q || loading) return;
    setLoading(true);
    setQuestion("");
    setTurns((prev) => [...prev, { question: q }]);
    try {
      const res = await fetch("/admin/chatbot/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });
      const data = await res.json();
      setTurns((prev) =>
        prev.map((t, i) =>
          i === prev.length - 1
            ? res.ok
              ? { ...t, answer: data.answer, sources: data.sources, usage: data.usage }
              : { ...t, error: data.error ?? "エラーが発生しました。" }
            : t
        )
      );
    } catch {
      setTurns((prev) =>
        prev.map((t, i) => (i === prev.length - 1 ? { ...t, error: "通信に失敗しました。" } : t))
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 20 }}>
        {turns.map((t, i) => (
          <div key={i} style={{ border: "1px solid #e5e5e5", borderRadius: 12, padding: 16 }}>
            <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Q. {t.question}</p>
            {t.error && <p style={{ fontSize: 14, color: "#b00020" }}>{t.error}</p>}
            {!t.answer && !t.error && <p style={{ fontSize: 14, color: "#888" }}>回答を作成しています…</p>}
            {t.answer && (
              <p style={{ fontSize: 14, lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{t.answer}</p>
            )}
            {t.sources && t.sources.length > 0 && (
              <div style={{ marginTop: 10, fontSize: 12, color: "#555" }}>
                <p style={{ fontWeight: 700 }}>参照したページ</p>
                <ul style={{ margin: "4px 0 0 18px", listStyle: "disc" }}>
                  {t.sources.map((s) => (
                    <li key={s.url + s.title}>
                      <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }}>
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {t.usage && (
              <p style={{ marginTop: 8, fontSize: 11, color: "#999" }}>
                入力 {t.usage.input_tokens}／出力 {t.usage.output_tokens} トークン（約
                {(t.usage.input_tokens * YEN_PER_INPUT_TOKEN + t.usage.output_tokens * YEN_PER_OUTPUT_TOKEN).toFixed(2)}
                円）
              </p>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit} style={{ display: "flex", gap: 8 }}>
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          maxLength={300}
          placeholder="例：駐車場はありますか？／胃カメラの前日は何時まで食べていいですか？"
          style={{ flex: 1, border: "1px solid #ccc", borderRadius: 8, padding: "10px 12px", fontSize: 14 }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{ borderRadius: 8, padding: "10px 16px", fontSize: 14, fontWeight: 700, background: "#2f6b3f", color: "#fff", opacity: loading ? 0.6 : 1 }}
        >
          送信
        </button>
      </form>
    </div>
  );
}
