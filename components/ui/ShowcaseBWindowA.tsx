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
      className={`sbwa${focused ? " isFocused" : ""}${className ? ` ${className}` : ""}`}
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
      <div className="sbwaTitlebar">
        <span className="sbwaTraffic" aria-hidden>
          <span />
          <span />
          <span />
        </span>
        <span className="sbwaApp">Mail</span>
      </div>

      <div className="sbwaSubject">
        Re: Need your input, budget discrepancy across campaigns
      </div>

      <div className="sbwaThread hideScrollbar" ref={listRef}>
        {messages.map((msg) => (
          <div key={msg.id}>
            {msg.showBanner ? (
              <div className="sbwaSent">
                <span className="sbwaSentCheck">✓</span>
                Message sent
              </div>
            ) : null}

            <article className="sbwaMsg">
              <div className="sbwaMsgTop">
                <span className={`sbwaAvatar sbwaAvatar${msg.from}`}>
                  {msg.from === "larry" ? "LA" : "M"}
                </span>
                <div className="sbwaMeta">
                  <p className="sbwaFrom">
                    {msg.from === "larry" ? (
                      <>
                        AI Larry{" "}
                        <span className="sbwaEmail">&lt;larry@app.bear.dev&gt;</span>
                      </>
                    ) : (
                      "Me"
                    )}
                  </p>
                  <p className="sbwaTo">
                    {msg.from === "larry" ? "to me" : "to AI Larry"}
                  </p>
                </div>
                <time className="sbwaTime">{msg.time}</time>
              </div>
              <p className="sbwaBody">
                {msg.typed ?? ""}
                {typingId === msg.id ? <span className="sbwaCaret" /> : null}
              </p>
            </article>
          </div>
        ))}
      </div>

      <div className="sbwaFooter" aria-hidden>
        <button type="button" className="sbwaSend" tabIndex={-1}>
          Send
          <IoChevronDown size={12} />
        </button>
        <div className="sbwaTools">
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
          font-family: var(--fontGeistSans), ui-sans-serif, system-ui, sans-serif;
          color: #1d1d1d;
          cursor: pointer;
          transition: box-shadow 0.25s ease, transform 0.25s ease;
          outline: none;
        }

        .sbwa.isFocused {
          box-shadow:
            0 28px 64px -22px rgba(20, 20, 30, 0.48),
            0 0 0 1px rgba(0, 0, 0, 0.08);
        }

        .sbwaTitlebar {
          position: relative;
          display: grid;
          place-items: center;
          min-height: 1.85rem;
          background: #e9e9e7;
          border-bottom: 1px solid rgba(0, 0, 0, 0.04);
        }

        .sbwaTraffic {
          position: absolute;
          left: 0.65rem;
          display: flex;
          gap: 0.3rem;
        }

        .sbwaTraffic span {
          width: 0.48rem;
          height: 0.48rem;
          border-radius: 999px;
          background: #c6c6c4;
        }

        .sbwa.isFocused .sbwaTraffic span:nth-child(1) { background: #ff5f57; }
        .sbwa.isFocused .sbwaTraffic span:nth-child(2) { background: #febc2e; }
        .sbwa.isFocused .sbwaTraffic span:nth-child(3) { background: #28c840; }

        .sbwaApp {
          font-size: 0.72rem;
          font-weight: 550;
          color: #555;
        }

        .sbwaSubject {
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

        .sbwaThread {
          min-height: 0;
          overflow-y: auto;
          overscroll-behavior: contain;
          padding: 0.35rem 0;
          background: #fafafa;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .sbwaSent {
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

        .sbwaSentCheck {
          display: grid;
          place-items: center;
          width: 1rem;
          height: 1rem;
          border-radius: 999px;
          background: #3b82f6;
          color: #fff;
          font-size: 0.58rem;
        }

        .sbwaMsg {
          padding: 0.65rem 0.8rem 0.75rem;
          border-bottom: 1px solid #ececeb;
        }

        .sbwaMsgTop {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 0.5rem;
          align-items: start;
          margin-bottom: 0.4rem;
        }

        .sbwaAvatar {
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

        .sbwaFrom {
          margin: 0;
          font-size: 0.72rem;
          font-weight: 650;
          color: #222;
        }

        .sbwaEmail {
          font-weight: 450;
          color: #666;
        }

        .sbwaTo {
          margin: 0.1rem 0 0;
          font-size: 0.62rem;
          color: #888;
        }

        .sbwaTime {
          font-size: 0.62rem;
          color: #8a8a8a;
        }

        .sbwaBody {
          margin: 0 0 0 2.05rem;
          font-size: 0.74rem;
          line-height: 1.45;
          color: #2a2a2a;
        }

        .sbwaCaret {
          display: inline-block;
          width: 0.4rem;
          height: 0.9em;
          margin-left: 1px;
          vertical-align: text-bottom;
          background: #2a2a2a;
          animation: sbwaBlink 0.85s steps(1) infinite;
        }

        .sbwaFooter {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          padding: 0.55rem 0.7rem 0.65rem;
          background: #f0f0ee;
          border-top: 1px solid rgba(0, 0, 0, 0.05);
        }

        .sbwaSend {
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

        .sbwaTools {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          color: #8a8a88;
        }

        @keyframes sbwaBlink {
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
