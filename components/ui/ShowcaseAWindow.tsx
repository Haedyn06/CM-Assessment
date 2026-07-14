"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import {
  IoAdd,
  IoArrowUp,
  IoCalendarOutline,
  IoCreateOutline,
  IoHomeOutline,
  IoPersonAddOutline,
  IoPlay,
  IoSettingsOutline,
} from "react-icons/io5";
import { Button } from "@/components/ui/Button";
import { ShowcaseAPage } from "@/components/ui/ShowcaseAPage";
import chatLogData from "@/data/ShowcaseAChat.json";
import type { ShowcaseAChatItem } from "@/types/ShowcaseAChatItem";

const SCRIPT = chatLogData as ShowcaseAChatItem[];

const CHAR_MS = 16;
const STEP_MS = 38;
const GAP_MS = 420;

type VisibleMessage = ShowcaseAChatItem & {
  /** Typed so far (null = fully revealed / no typewriter) */
  typedText?: string;
  typedSteps?: string[];
  stepsComplete?: boolean;
  computerVisible?: boolean;
};

function MessageView({
  message,
  isTyping,
}: {
  message: VisibleMessage;
  isTyping: boolean;
}) {
  const text = message.typedText ?? message.text ?? "";
  const steps = message.typedSteps ?? [];
  const showSteps = Boolean(message.steps?.length);
  const showComputer =
    message.showComputer && (message.computerVisible || !message.autowrite);

  if (message.role === "user") {
    return (
      <div className="saw__row saw__row--user">
        {text ? <div className="saw__bubble">{text}</div> : null}
        {message.attachment ? (
          <div className="saw__attachment">
            <span className="saw__attachment-icon">
              <IoPlay size={11} />
            </span>
            {message.attachment.label}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="saw__msg saw__msg--ai">
      {text || message.link || isTyping ? (
        <p>
          {text}
          {message.link && !isTyping ? (
            <a className="saw__msg-link" href={message.link.href}>
              {message.link.label}
            </a>
          ) : null}
          {isTyping && !showSteps ? <span className="saw__caret" /> : null}
        </p>
      ) : null}

      {showSteps ? (
        <ol className="saw__plan">
          {steps.map((step, i) => (
            <li key={`${message.id}-step-${i}`}>
              {i + 1}. {step}
              {isTyping &&
              message.stepsComplete === false &&
              i === steps.length - 1 ? (
                <span className="saw__caret" />
              ) : null}
            </li>
          ))}
        </ol>
      ) : null}

      {showComputer ? <ShowcaseAPage active /> : null}
    </div>
  );
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export function ShowcaseAWindow() {
  const [messages, setMessages] = useState<VisibleMessage[]>([]);
  const [typingId, setTypingId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [scriptDone, setScriptDone] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const cancelledRef = useRef(false);

  const scrollToBottom = () => {
    const el = chatRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingId]);

  useEffect(() => {
    cancelledRef.current = false;

    const run = async () => {
      for (const item of SCRIPT) {
        if (cancelledRef.current) return;

        // Instant attachment / non-writing messages
        if (!item.autowrite && !item.text && !item.steps) {
          setMessages((prev) => [...prev, { ...item }]);
          await sleep(GAP_MS);
          continue;
        }

        // User messages (and any non-autowrite) appear instantly — no typewriter
        if (item.role === "user" || !item.autowrite) {
          setMessages((prev) => [
            ...prev,
            {
              ...item,
              typedText: item.text,
              typedSteps: item.steps,
              stepsComplete: true,
              computerVisible: Boolean(item.showComputer),
            },
          ]);
          await sleep(GAP_MS);
          continue;
        }

        setTypingId(item.id);
        setMessages((prev) => [
          ...prev,
          {
            ...item,
            typedText: "",
            typedSteps: [],
            stepsComplete: false,
            computerVisible: false,
          },
        ]);

        const fullText = item.text ?? "";
        for (let i = 1; i <= fullText.length; i += 1) {
          if (cancelledRef.current) return;
          const slice = fullText.slice(0, i);
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === item.id ? { ...msg, typedText: slice } : msg,
            ),
          );
          await sleep(CHAR_MS);
        }

        if (item.steps?.length) {
          for (let s = 0; s < item.steps.length; s += 1) {
            if (cancelledRef.current) return;
            const stepText = item.steps[s] ?? "";
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === item.id
                  ? { ...msg, typedSteps: [...(msg.typedSteps ?? []), ""] }
                  : msg,
              ),
            );

            for (let c = 1; c <= stepText.length; c += 1) {
              if (cancelledRef.current) return;
              const slice = stepText.slice(0, c);
              setMessages((prev) =>
                prev.map((msg) => {
                  if (msg.id !== item.id) return msg;
                  const nextSteps = [...(msg.typedSteps ?? [])];
                  nextSteps[s] = slice;
                  return { ...msg, typedSteps: nextSteps };
                }),
              );
              await sleep(STEP_MS);
            }
            await sleep(120);
          }

          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === item.id ? { ...msg, stepsComplete: true } : msg,
            ),
          );
        }

        if (item.showComputer) {
          await sleep(280);
          if (cancelledRef.current) return;
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === item.id ? { ...msg, computerVisible: true } : msg,
            ),
          );
        }

        setTypingId(null);
        await sleep(GAP_MS);
      }

      if (!cancelledRef.current) setScriptDone(true);
    };

    void run();

    return () => {
      cancelledRef.current = true;
    };
  }, []);

  const sendMessage = () => {
    const text = draft.trim();
    if (!text) return;

    const id = `user-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      {
        id,
        role: "user",
        text,
        typedText: text,
      },
    ]);
    setDraft("");

    // Mock reply matching convey.dev
    window.setTimeout(() => {
      if (cancelledRef.current) return;
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          role: "ai",
          text: "To try Convey, please ",
          typedText: "To try Convey, please ",
          link: {
            label: "contact us",
            href: "#contact",
          },
        },
      ]);
    }, 650);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="saw">
      <aside className="saw__sidebar" aria-hidden>
        <div className="saw__sidebar-top">
          <span className="saw__avatar">LA</span>
          <IoCreateOutline size={18} />
          <IoHomeOutline size={18} />
          <IoCalendarOutline size={18} />
        </div>
        <div className="saw__sidebar-bottom">
          <IoPersonAddOutline size={18} />
          <IoSettingsOutline size={18} />
        </div>
      </aside>

      <div className="saw__body">
        <header className="saw__header">
          <span className="saw__logo">convey.</span>
          <Button
            decorative
            color="#1a1a1a"
            background="linear-gradient(90deg, #efe48a 0%, #b7eb9a 48%, #8fdfe0 100%)"
            borderColor="transparent"
            hoverBackground="linear-gradient(90deg, #efe48a 0%, #b7eb9a 48%, #8fdfe0 100%)"
            style={{
              borderRadius: "0.4rem",
              minHeight: "2rem",
              padding: "0.4rem 0.85rem",
              fontSize: "0.78rem",
              fontWeight: 500,
            }}
          >
            Schedule demo
          </Button>
        </header>

        <div className="saw__chat" ref={chatRef} role="log" aria-live="polite">
          {messages.map((message) => (
            <MessageView
              key={message.id}
              message={message}
              isTyping={typingId === message.id}
            />
          ))}
        </div>

        <form className="saw__composer" onSubmit={onSubmit}>
          <label className="sr-only" htmlFor="saw-input">
            Message
          </label>
          <div className="saw__input-wrap">
            <input
              id="saw-input"
              className="saw__input"
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Tell me what you need..."
              autoComplete="off"
            />
            <button
              type="button"
              className="saw__add"
              aria-label="Add attachment"
              tabIndex={-1}
            >
              <IoAdd size={18} />
            </button>
          </div>
          <button
            type="submit"
            className="saw__send"
            aria-label="Send message"
            disabled={!draft.trim()}
          >
            <IoArrowUp size={16} />
          </button>
        </form>
        {!scriptDone ? (
          <span className="sr-only">Demo conversation is still writing…</span>
        ) : null}
      </div>

      <style>{`
        .saw {
          display: grid;
          grid-template-columns: 3.15rem 1fr;
          width: 100%;
          max-width: none;
          height: min(40rem, 78vh);
          overflow: hidden;
          border-radius: 1rem;
          background: #f3f3f2;
          box-shadow:
            0 28px 70px -28px rgba(20, 20, 30, 0.35),
            0 0 0 1px rgba(0, 0, 0, 0.04);
          font-family: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
          color: #1d1d1d;
        }

        .saw__sidebar {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 0.85rem 0.55rem 0.9rem;
          background: #ececeb;
          border-right: 1px solid rgba(0, 0, 0, 0.04);
          color: #6d6d6d;
        }

        .saw__sidebar-top,
        .saw__sidebar-bottom {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .saw__avatar {
          display: grid;
          place-items: center;
          width: 1.7rem;
          height: 1.7rem;
          border-radius: 999px;
          background: #2b2b2b;
          color: #fff;
          font-size: 0.58rem;
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        .saw__body {
          display: grid;
          grid-template-rows: auto minmax(0, 1fr) auto;
          min-width: 0;
          min-height: 0;
          background: #f7f7f6;
        }

        .saw__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 0.85rem 1rem 0.65rem;
        }

        .saw__logo {
          font-size: 1.15rem;
          font-weight: 700;
          letter-spacing: -0.04em;
          color: #141414;
        }

        .saw__chat {
          min-height: 0;
          overflow-x: hidden;
          overflow-y: auto;
          overscroll-behavior: contain;
          padding: 0.55rem 1.1rem 0.9rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          scrollbar-width: thin;
        }

        .saw__msg {
          margin: 0;
          max-width: 94%;
          font-size: 0.82rem;
          line-height: 1.45;
          color: #222;
        }

        .saw__msg--ai p {
          margin: 0 0 0.45rem;
        }

        .saw__msg-link {
          color: inherit;
          text-decoration: underline;
          text-underline-offset: 0.15em;
        }

        .saw__msg-link:hover {
          color: #111;
        }

        .saw__row {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.45rem;
        }

        .saw__bubble {
          max-width: 88%;
          padding: 0.7rem 0.85rem;
          border-radius: 0.85rem;
          background: #e8e8e6;
          font-size: 0.78rem;
          line-height: 1.45;
          color: #2a2a2a;
          white-space: pre-wrap;
        }

        .saw__attachment {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.55rem 0.8rem;
          border-radius: 0.75rem;
          background: #e8e8e6;
          font-size: 0.74rem;
          font-weight: 500;
          color: #2f2f2f;
        }

        .saw__attachment-icon {
          display: grid;
          place-items: center;
          width: 1.35rem;
          height: 1.35rem;
          border-radius: 0.3rem;
          border: 1px solid #c8c8c6;
          background: #f4f4f3;
          color: #333;
        }

        .saw__plan {
          margin: 0;
          padding: 0;
          list-style: none;
          font-size: 0.8rem;
          line-height: 1.55;
          color: #2a2a2a;
        }

        .saw__caret {
          display: inline-block;
          width: 0.45rem;
          height: 0.95em;
          margin-left: 0.1rem;
          vertical-align: text-bottom;
          background: #2a2a2a;
          animation: saw-blink 0.85s steps(1) infinite;
        }

        .saw__composer {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.65rem 0.9rem 0.85rem;
          background: #f7f7f6;
          border-top: 1px solid rgba(0, 0, 0, 0.04);
        }

        .saw__input-wrap {
          position: relative;
          display: flex;
          align-items: center;
          flex: 1;
          min-width: 0;
        }

        .saw__input {
          width: 100%;
          min-height: 2.4rem;
          padding: 0.45rem 2.4rem 0.45rem 0.9rem;
          border: 1px solid #dededd;
          border-radius: 999px;
          background: #fff;
          color: #222;
          font: inherit;
          font-size: 0.78rem;
          outline: none;
        }

        .saw__input::placeholder {
          color: #9a9a98;
        }

        .saw__input:focus {
          border-color: #c5c5c3;
        }

        .saw__add {
          position: absolute;
          right: 0.55rem;
          display: grid;
          place-items: center;
          width: 1.6rem;
          height: 1.6rem;
          border: 0;
          background: transparent;
          color: #6d6d6d;
          cursor: default;
        }

        .saw__send {
          display: grid;
          place-items: center;
          width: 2.15rem;
          height: 2.15rem;
          border: 0;
          border-radius: 999px;
          background: #1f2430;
          color: #fff;
          flex-shrink: 0;
          cursor: pointer;
          transition: opacity 0.15s ease;
        }

        .saw__send:disabled {
          opacity: 0.4;
          cursor: default;
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        @keyframes saw-blink {
          50% { opacity: 0; }
        }

        @media (max-width: 720px) {
          .saw {
            height: min(36rem, 72vh);
          }

          .saw__bubble {
            max-width: 94%;
          }
        }
      `}</style>
    </div>
  );
}
