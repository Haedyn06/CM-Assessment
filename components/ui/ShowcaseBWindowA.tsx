"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  IoAttachOutline,
  IoChevronDown,
  IoHappyOutline,
  IoImageOutline,
  IoLinkOutline,
  IoTrashOutline,
} from "react-icons/io5";
import mailData from "@/data/ShowcaseBMail.json";

type MailMessage = {
  id: string;
  from: "larry" | "me";
  time: string;
  text: string;
  autowrite?: boolean;
  sentBanner?: boolean;
};

const SCRIPT = mailData as MailMessage[];
const CHAR_MS = 14;
const GAP_MS = 380;

type ShowcaseBWindowAProps = {
  focused: boolean;
  onFocus: () => void;
  style?: CSSProperties;
  className?: string;
};

function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

type Visible = MailMessage & {
  typed?: string;
  showBanner?: boolean;
};

export function ShowcaseBWindowA({
  focused,
  onFocus,
  style,
  className = "",
}: ShowcaseBWindowAProps) {
  const [messages, setMessages] = useState<Visible[]>([]);
  const [typingId, setTypingId] = useState<string | null>(null);
  const cancelledRef = useRef(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, typingId]);

  useEffect(() => {
    if (!focused) return;

    cancelledRef.current = false;

    const run = async () => {
      setMessages([]);
      setTypingId(null);
      await sleep(200);
      if (cancelledRef.current) return;

      for (const item of SCRIPT) {
        if (cancelledRef.current) return;

        if (item.sentBanner) {
          setMessages((prev) => [...prev, { ...item, showBanner: true, typed: "" }]);
          await sleep(450);
        }

        if (!item.autowrite || item.from === "me") {
          setMessages((prev) => {
            const exists = prev.some((m) => m.id === item.id);
            if (exists) {
              return prev.map((m) =>
                m.id === item.id ? { ...m, typed: item.text } : m,
              );
            }
            return [...prev, { ...item, typed: item.text }];
          });
          await sleep(GAP_MS);
          continue;
        }

        setTypingId(item.id);
        setMessages((prev) => {
          const exists = prev.some((m) => m.id === item.id);
          if (exists) {
            return prev.map((m) =>
              m.id === item.id ? { ...m, typed: "" } : m,
            );
          }
          return [...prev, { ...item, typed: "" }];
        });

        for (let i = 1; i <= item.text.length; i += 1) {
          if (cancelledRef.current) return;
          const slice = item.text.slice(0, i);
          setMessages((prev) =>
            prev.map((m) => (m.id === item.id ? { ...m, typed: slice } : m)),
          );
          await sleep(CHAR_MS);
        }

        setTypingId(null);
        await sleep(GAP_MS);
      }
    };

    const start = window.setTimeout(() => {
      void run();
    }, 0);

    return () => {
      cancelledRef.current = true;
      window.clearTimeout(start);
    };
  }, [focused]);

  return (
    <div
      className={`sbwa${focused ? " is-focused" : ""}${className ? ` ${className}` : ""}`}
      style={style}
      role="button"
      tabIndex={0}
      onClick={onFocus}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onFocus();
        }
      }}
      aria-label="Mail window"
    >
      <div className="sbwa__titlebar">
        <span className="sbwa__traffic" aria-hidden>
          <span />
          <span />
          <span />
        </span>
        <span className="sbwa__app">Mail</span>
      </div>

      <div className="sbwa__subject">
        Re: Need your input, budget discrepancy across campaigns
      </div>

      <div className="sbwa__thread" ref={listRef}>
        {messages.map((msg) => (
          <div key={msg.id}>
            {msg.showBanner ? (
              <div className="sbwa__sent">
                <span className="sbwa__sent-check">✓</span>
                Message sent
              </div>
            ) : null}

            <article className="sbwa__msg">
              <div className="sbwa__msg-top">
                <span className={`sbwa__avatar sbwa__avatar--${msg.from}`}>
                  {msg.from === "larry" ? "LA" : "M"}
                </span>
                <div className="sbwa__meta">
                  <p className="sbwa__from">
                    {msg.from === "larry" ? (
                      <>
                        AI Larry{" "}
                        <span className="sbwa__email">&lt;larry@app.convey.dev&gt;</span>
                      </>
                    ) : (
                      "Me"
                    )}
                  </p>
                  <p className="sbwa__to">
                    {msg.from === "larry" ? "to me" : "to AI Larry"}
                  </p>
                </div>
                <time className="sbwa__time">{msg.time}</time>
              </div>
              <p className="sbwa__body">
                {msg.typed ?? ""}
                {typingId === msg.id ? <span className="sbwa__caret" /> : null}
              </p>
            </article>
          </div>
        ))}
      </div>

      <div className="sbwa__footer" aria-hidden>
        <button type="button" className="sbwa__send" tabIndex={-1}>
          Send
          <IoChevronDown size={12} />
        </button>
        <div className="sbwa__tools">
          <IoAttachOutline size={15} />
          <IoLinkOutline size={15} />
          <IoHappyOutline size={15} />
          <IoImageOutline size={15} />
          <IoTrashOutline size={15} />
        </div>
      </div>

      <style>{`
        .sbwa {
          display: grid;
          grid-template-rows: auto auto minmax(0, 1fr) auto;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 0.75rem;
          background: #f4f4f3;
          box-shadow:
            0 22px 48px -24px rgba(20, 20, 30, 0.4),
            0 0 0 1px rgba(0, 0, 0, 0.06);
          font-family: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
          color: #1d1d1d;
          cursor: pointer;
          transition: box-shadow 0.25s ease, transform 0.25s ease;
          outline: none;
        }

        .sbwa.is-focused {
          box-shadow:
            0 28px 64px -22px rgba(20, 20, 30, 0.48),
            0 0 0 1px rgba(0, 0, 0, 0.08);
        }

        .sbwa__titlebar {
          position: relative;
          display: grid;
          place-items: center;
          min-height: 1.85rem;
          background: #e9e9e7;
          border-bottom: 1px solid rgba(0, 0, 0, 0.04);
        }

        .sbwa__traffic {
          position: absolute;
          left: 0.65rem;
          display: flex;
          gap: 0.3rem;
        }

        .sbwa__traffic span {
          width: 0.48rem;
          height: 0.48rem;
          border-radius: 999px;
          background: #c6c6c4;
        }

        .sbwa.is-focused .sbwa__traffic span:nth-child(1) { background: #ff5f57; }
        .sbwa.is-focused .sbwa__traffic span:nth-child(2) { background: #febc2e; }
        .sbwa.is-focused .sbwa__traffic span:nth-child(3) { background: #28c840; }

        .sbwa__app {
          font-size: 0.72rem;
          font-weight: 550;
          color: #555;
        }

        .sbwa__subject {
          padding: 0.55rem 0.8rem;
          background: #eceaf2;
          border-bottom: 1px solid #dddbe5;
          font-size: 0.72rem;
          font-weight: 500;
          color: #333;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .sbwa__thread {
          min-height: 0;
          overflow-y: auto;
          overscroll-behavior: contain;
          padding: 0.35rem 0;
          background: #fafafa;
          scrollbar-width: thin;
        }

        .sbwa__sent {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          margin: 0.35rem 0.65rem;
          padding: 0.4rem 0.55rem;
          border-radius: 0.35rem;
          background: #e8f1fb;
          color: #2f6fad;
          font-size: 0.7rem;
          font-weight: 500;
        }

        .sbwa__sent-check {
          display: grid;
          place-items: center;
          width: 1rem;
          height: 1rem;
          border-radius: 999px;
          background: #3b82f6;
          color: #fff;
          font-size: 0.58rem;
        }

        .sbwa__msg {
          padding: 0.65rem 0.8rem 0.75rem;
          border-bottom: 1px solid #ececeb;
        }

        .sbwa__msg-top {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 0.5rem;
          align-items: start;
          margin-bottom: 0.4rem;
        }

        .sbwa__avatar {
          display: grid;
          place-items: center;
          width: 1.55rem;
          height: 1.55rem;
          border-radius: 999px;
          background: #2b2b2b;
          color: #fff;
          font-size: 0.52rem;
          font-weight: 650;
        }

        .sbwa__from {
          margin: 0;
          font-size: 0.72rem;
          font-weight: 650;
          color: #222;
        }

        .sbwa__email {
          font-weight: 450;
          color: #666;
        }

        .sbwa__to {
          margin: 0.1rem 0 0;
          font-size: 0.62rem;
          color: #888;
        }

        .sbwa__time {
          font-size: 0.62rem;
          color: #8a8a8a;
        }

        .sbwa__body {
          margin: 0 0 0 2.05rem;
          font-size: 0.74rem;
          line-height: 1.45;
          color: #2a2a2a;
        }

        .sbwa__caret {
          display: inline-block;
          width: 0.4rem;
          height: 0.9em;
          margin-left: 1px;
          vertical-align: text-bottom;
          background: #2a2a2a;
          animation: sbwa-blink 0.85s steps(1) infinite;
        }

        .sbwa__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          padding: 0.55rem 0.7rem 0.65rem;
          background: #f0f0ee;
          border-top: 1px solid rgba(0, 0, 0, 0.05);
        }

        .sbwa__send {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.35rem 0.55rem 0.35rem 0.7rem;
          border: 0;
          border-radius: 0.35rem;
          background: #7eb6ef;
          color: #fff;
          font-size: 0.72rem;
          font-weight: 600;
          cursor: default;
          pointer-events: none;
        }

        .sbwa__tools {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          color: #8a8a88;
        }

        @keyframes sbwa-blink {
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
