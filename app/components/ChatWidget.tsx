"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSite } from "../lib/site";

/**
 * HP案内チャットボット「キバナビ」（右下のボタンから開くチャット窓）。
 * マスコット画像は public/kibanavi/（全身・丸い顔アイコン）。
 * 回答は /api/chat（app/lib/chatbot-server.ts）が、HP内の情報だけを根拠に作る。
 */

type Source = { title: string; url: string };
type Turn = { question: string; answer?: string; sources?: Source[]; error?: string };

const TEXT = {
  ja: {
    open: "キバナビに質問する",
    title: "AI案内係「キバナビ」",
    subtitle: "ホームページの情報からお答えします",
    close: "閉じる",
    notice:
      "キバナビはAIで、自動で回答します。内容に誤りがある場合もあります。お名前・連絡先などの個人情報や、詳しい症状は入力しないでください。ご質問と回答は、サービス改善のために記録しています。",
    privacy: "プライバシーポリシー",
    placeholder: "例：駐車場はありますか？",
    send: "送信",
    thinking: "回答を作成しています…",
    sources: "詳しくはこちらのページで",
    greeting: "こんにちは、キバナビです。ホームページの情報から、当院のことをご案内します。",
    error: "うまくお答えできませんでした。時間をおいてお試しください。",
    examples: ["駐車場はありますか？", "熱があるときの受診方法は？", "胃カメラの前日は何時まで食べていい？"],
  },
  en: {
    open: "Ask Kibanavi",
    title: "Kibanavi, our AI guide",
    subtitle: "Answers from the information on this website",
    close: "Close",
    notice:
      "Kibanavi is an AI, and its answers are generated automatically and may contain mistakes. Please do not enter personal information such as your name or contact details, or detailed symptoms. Questions and answers are recorded to improve the service.",
    privacy: "Privacy policy",
    placeholder: "e.g. Is there parking?",
    send: "Send",
    thinking: "Preparing an answer…",
    sources: "Read more on these pages",
    greeting: "Hi, I'm Kibanavi! I can guide you using the information on this website.",
    error: "Sorry, we couldn't answer that. Please try again later.",
    examples: ["Is there parking?", "How do I come in if I have a fever?", "When does the clinic open?"],
  },
};

const SOURCE_LINK_CLASS =
  "flex items-center justify-between gap-2 rounded-xl bg-surface px-3 py-2 font-bold text-primary-dark ring-1 ring-primary/20 transition-colors hover:bg-accent";

export default function ChatWidget() {
  const { lang } = useSite();
  const t = TEXT[lang];
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  // 会話ID：同じページで続けた質問を1つの会話として数えるため（ページを開き直すと変わる）
  const sessionIdRef = useRef<string | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [turns, open]);

  async function ask(q: string) {
    const text = q.trim();
    if (!text || loading) return;
    setLoading(true);
    setQuestion("");
    setTurns((prev) => [...prev, { question: text }]);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text, sessionId: (sessionIdRef.current ??= crypto.randomUUID()) }),
      });
      const data = await res.json().catch(() => ({}));
      setTurns((prev) =>
        prev.map((turn, i) =>
          i === prev.length - 1
            ? res.ok
              ? { ...turn, answer: data.answer, sources: data.sources }
              : { ...turn, error: data.error ?? t.error }
            : turn
        )
      );
    } catch {
      setTurns((prev) => prev.map((turn, i) => (i === prev.length - 1 ? { ...turn, error: t.error } : turn)));
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    ask(question);
  }

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-[6.5rem] right-4 z-[65] inline-flex items-center gap-2 rounded-full bg-primary py-1.5 pl-1.5 pr-4 text-sm font-bold text-white shadow-soft transition-transform hover:scale-105 sm:bottom-6 sm:right-6"
          aria-label={t.open}
        >
          <Image src="/kibanavi/kibanavi-face.png" alt="" width={40} height={40} className="h-10 w-10 rounded-full ring-2 ring-white" />
          {t.open}
        </button>
      )}

      {open && (
        <div
          role="dialog"
          aria-label={t.title}
          className="fixed inset-x-3 bottom-[6.5rem] top-24 z-[70] flex flex-col overflow-hidden rounded-3xl bg-surface shadow-soft ring-1 ring-ink/10 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:top-auto sm:h-[600px] sm:max-h-[80vh] sm:w-[400px]"
        >
          <div className="flex items-center justify-between gap-3 bg-primary px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <Image src="/kibanavi/kibanavi-face.png" alt="" width={44} height={44} className="h-11 w-11 shrink-0 rounded-full ring-2 ring-white" />
              <div>
                <p className="text-sm font-bold">{t.title}</p>
                <p className="text-xs text-white/85">{t.subtitle}</p>
              </div>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="shrink-0 rounded-full px-2 text-lg leading-none" aria-label={t.close}>
              ×
            </button>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
            <p className="rounded-2xl bg-accent/60 p-3 text-xs leading-relaxed text-ink/75">
              {t.notice}{" "}
              <Link href="/privacy" className="underline">
                {t.privacy}
              </Link>
            </p>

            {turns.length === 0 && (
              <div className="flex items-end gap-3">
                <Image src="/kibanavi/kibanavi.png" alt="キバナビ" width={360} height={440} className="h-32 w-auto shrink-0" />
                <p className="mb-2 rounded-2xl rounded-bl-sm bg-cream px-3.5 py-2.5 text-sm leading-relaxed text-ink/85">{t.greeting}</p>
              </div>
            )}

            {turns.length === 0 && (
              <div className="flex flex-wrap gap-2">
                {t.examples.map((ex) => (
                  <button
                    key={ex}
                    type="button"
                    onClick={() => ask(ex)}
                    className="rounded-full border border-primary/30 px-3 py-1.5 text-xs font-bold text-primary-dark transition-colors hover:bg-accent"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            )}

            {turns.map((turn, i) => (
              <div key={i} className="space-y-2">
                <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-3.5 py-2 text-sm text-white">
                  {turn.question}
                </p>
                <div className="flex items-start gap-2">
                <Image src="/kibanavi/kibanavi-face.png" alt="キバナビ" width={32} height={32} className="mt-0.5 h-8 w-8 shrink-0 rounded-full" />
                <div className="w-fit max-w-[85%] rounded-2xl rounded-bl-sm bg-cream px-3.5 py-2.5 text-sm leading-relaxed text-ink/85">
                  {turn.error ? (
                    <p className="text-red-700">{turn.error}</p>
                  ) : turn.answer ? (
                    <>
                      <p className="whitespace-pre-wrap">{turn.answer}</p>
                      {turn.sources && turn.sources.length > 0 && (
                        <div className="mt-2 border-t border-ink/10 pt-2 text-xs">
                          <p className="font-bold text-ink/60">{t.sources}</p>
                          <ul className="mt-1.5 space-y-1.5">
                            {turn.sources.map((s) => (
                              <li key={s.url}>
                                {/* よくある質問の各項目（/faq#faq-3 など）は、開いた状態で表示できるよう通常の遷移にする */}
                                {s.url.includes("#") ? (
                                  <a href={s.url} className={SOURCE_LINK_CLASS}>
                                    {s.title}
                                    <span aria-hidden="true">→</span>
                                  </a>
                                ) : (
                                  <Link href={s.url} className={SOURCE_LINK_CLASS} onClick={() => setOpen(false)}>
                                    {s.title}
                                    <span aria-hidden="true">→</span>
                                  </Link>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-ink/50">{t.thinking}</p>
                  )}
                </div>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <form onSubmit={onSubmit} className="flex gap-2 border-t border-ink/10 p-3">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              maxLength={300}
              placeholder={t.placeholder}
              className="min-w-0 flex-1 rounded-full border border-ink/15 px-4 py-2.5 text-[16px] outline-none focus:border-primary"
            />
            <button
              type="submit"
              disabled={loading || !question.trim()}
              className="shrink-0 rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50"
            >
              {t.send}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
