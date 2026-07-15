"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type KeyboardEvent,
} from "react";
import {
  IoCalendarOutline,
  IoCheckmarkCircle,
  IoChevronBack,
  IoChevronForward,
  IoCreateOutline,
  IoHomeOutline,
  IoPersonAddOutline,
  IoSettingsOutline,
  IoTimeOutline,
} from "react-icons/io5";

type ShowcaseBWindowBProps = {
  focused: boolean;
  onFocus: () => void;
  style?: CSSProperties;
  className?: string;
};

type View = "home" | "calendar";

const SUMMARY =
  "Completed 12 tasks - email triage, briefing, GCM pacing, invoicing, pipeline review, Nike Spring creative swap, and daily recap. Before end of day I will confirm pacing across campaigns in GCM and complete our prepaid reconciliation ahead of month-end close kicking off tomorrow. I'm still waiting on the budget discrepancy from you.";

const WORK = [
  {
    id: "pacing",
    label: "Checking campaign pacing",
    title: "Nike Spring — GCM",
    detail: "Check delivery and pacing",
    hint: "Cursor clicks Run; line recomputes delivery curve.",
    count: "8/10",
    status: "working ↗",
    kind: "meter" as const,
  },
  {
    id: "invoice",
    label: "Processing invoice",
    title: "SEARCH INVOICES",
    detail: "INV-2024-2841",
    hint: "Types invoice ID, then clicks Apply.",
    count: "14/14",
    status: "2m ago",
    kind: "search" as const,
  },
  {
    id: "creative",
    label: "Swapping creative assets",
    title: "CREATIVE SWAP",
    detail: "",
    hint: "Click selects asset for swap queue.",
    count: "1/1",
    status: "",
    kind: "grid" as const,
  },
];

const COMING = [
  { when: "In 30m", text: "Google Campaign Manager - check pacing" },
  { when: "In 1h", text: "NetSuite prepaid reconciliation for month end close" },
];

const IDEAS = [
  {
    id: "pacing-resp",
    title: "Add pacing & recap as responsibilities",
    body: "These skills aren't tracked formally yet — I can report on them more clearly",
  },
  {
    id: "vendor",
    title: "Auto-flag vendor discrepancies",
    body: "3 vendors had issues in 30 days — an automated rule could catch these earlier",
  },
  {
    id: "swap",
    title: "Share the creative swap speed win",
    body: "Nike Spring swap went from 45 min to 9 — worth highlighting to the team",
  },
];

const HIGHLIGHTS = [
  { label: "8/10", title: "ON PACE", note: "2 campaigns underpacing", meter: 80 },
  { label: "14", title: "INVOICES", note: "2 flagged for review", meter: 55 },
  { label: "$42k", title: "AT RISK", note: "Nike Spring underpacing", meter: 35 },
];

const CHECKS = [
  "DV360 paused - Acme Corp $14.2k overlap resolved",
  "Creative swap - Nike Spring live",
  "Daily recap - 12 tasks compiled",
];

/** Hour slots from 6 AM; `start`/`end` in hours from midnight */
const CALENDAR_EVENTS = [
  { start: 7, end: 7.75, title: "Email triage & daily briefing" },
  { start: 8, end: 8.5, title: "Google Campaign Manager - check pacing" },
  { start: 8.5, end: 9, title: "Slack catch-up digest" },
  { start: 9.5, end: 11, title: "Customer invoicing" },
  { start: 11, end: 11.75, title: "Pipeline review" },
  { start: 12.5, end: 13, title: "Creative swap - Nike Spring" },
  { start: 13, end: 13.75, title: "Vendor onboarding follow-ups" },
  { start: 14, end: 14.75, title: "Ad ops QA" },
  { start: 15, end: 15.75, title: "Campaign reconciliation" },
  { start: 16, end: 16.75, title: "Inbox re-triage (afternoon)" },
  { start: 17, end: 17.75, title: "Budget reallocation analysis" },
  { start: 18, end: 18.75, title: "Daily recap compilation" },
];

const HOUR_START = 6;
const HOUR_END = 19;
const HOUR_PX = 42;

function CursorIcon() {
  return (
    <svg width="16" height="20" viewBox="0 0 18 22" fill="none" aria-hidden>
      <path
        d="M1 1L1 16.5L5.2 12.8L8.1 20.2L10.6 19.2L7.6 11.9H13.8L1 1Z"
        fill="#2a2a2a"
        stroke="#fff"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function formatHour(h: number) {
  const hour = Math.floor(h);
  const suffix = hour >= 12 ? "PM" : "AM";
  const display = hour % 12 === 0 ? 12 : hour % 12;
  return `${display} ${suffix}`;
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export function ShowcaseBWindowB({
  focused,
  onFocus,
  style,
  className = "",
}: ShowcaseBWindowBProps) {
  const [view, setView] = useState<View>("home");
  const [expandedWork, setExpandedWork] = useState("pacing");
  const [expandedIdea, setExpandedIdea] = useState<string | null>("pacing-resp");
  const [barWidth, setBarWidth] = useState(34);
  const [invoiceText, setInvoiceText] = useState("INV-2…");
  const [cursor, setCursor] = useState({ x: 70, y: 58, visible: false });
  const [wasFocused, setWasFocused] = useState(focused);
  const cancelledRef = useRef(false);

  if (focused !== wasFocused) {
    setWasFocused(focused);
    if (!focused) {
      setCursor((c) => ({ ...c, visible: false }));
    }
  }

  useEffect(() => {
    if (!focused || view !== "home") {
      cancelledRef.current = true;
      return;
    }

    cancelledRef.current = false;
    const workId = expandedWork;

    const run = async () => {
      // Wait for shelf-style expand transition before animating
      await sleep(480);
      if (cancelledRef.current) return;

      while (!cancelledRef.current) {
        if (workId === "pacing") {
          setInvoiceText("INV-2…");
          setBarWidth(28);
          setCursor({ x: 18, y: 48, visible: true });
          await sleep(420);
          if (cancelledRef.current) return;
          // Move to RUN, click, recompute bar
          setCursor({ x: 88, y: 28, visible: true });
          await sleep(480);
          if (cancelledRef.current) return;
          setBarWidth(82);
          await sleep(1100);
          if (cancelledRef.current) return;
          setBarWidth(42);
          await sleep(700);
        } else if (workId === "invoice") {
          setBarWidth(34);
          setInvoiceText("");
          setCursor({ x: 36, y: 42, visible: true });
          await sleep(220);
          const full = "INV-2024-2841";
          for (let i = 1; i <= full.length; i += 1) {
            if (cancelledRef.current) return;
            setInvoiceText(full.slice(0, i));
            await sleep(38);
          }
          setCursor({ x: 22, y: 72, visible: true });
          await sleep(900);
        } else {
          setBarWidth(34);
          setInvoiceText("INV-2…");
          setCursor({ x: 26, y: 40, visible: true });
          await sleep(360);
          if (cancelledRef.current) return;
          setCursor({ x: 58, y: 52, visible: true });
          await sleep(400);
          if (cancelledRef.current) return;
          setCursor({ x: 74, y: 38, visible: true });
          await sleep(700);
        }

        await sleep(420);
      }
    };

    const start = window.setTimeout(() => {
      void run();
    }, 0);

    return () => {
      cancelledRef.current = true;
      window.clearTimeout(start);
    };
  }, [focused, expandedWork, view]);

  const focusWindow = () => onFocus();

  const goHome = (e?: MouseEvent) => {
    e?.stopPropagation();
    onFocus();
    setView("home");
  };

  const goCalendar = (e?: MouseEvent) => {
    e?.stopPropagation();
    onFocus();
    setView("calendar");
  };

  const onWorkClick = (e: MouseEvent, id: string) => {
    e.stopPropagation();
    onFocus();
    setExpandedWork(id);
  };

  const onIdeaClick = (e: MouseEvent, id: string) => {
    e.stopPropagation();
    onFocus();
    setExpandedIdea((current) => (current === id ? null : id));
  };

  const onWindowKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onFocus();
    }
  };

  const hours = Array.from(
    { length: HOUR_END - HOUR_START + 1 },
    (_, i) => HOUR_START + i,
  );

  return (
    <div
      className={`sbwb${focused ? " is-focused" : ""}${className ? ` ${className}` : ""}`}
      style={style}
      role="button"
      tabIndex={0}
      onClick={focusWindow}
      onKeyDown={onWindowKeyDown}
      aria-label="Convey dashboard window"
    >
      <aside className="sbwb__sidebar">
        <div className="sbwb__sidebar-top">
          <span className="sbwb__avatar" aria-hidden>
            LA
          </span>
          <span className="sbwb__nav-icon" aria-hidden>
            <IoCreateOutline size={16} />
          </span>
          <button
            type="button"
            className={`sbwb__nav-btn${view === "home" ? " is-active" : ""}`}
            aria-label="Home"
            onClick={goHome}
          >
            <IoHomeOutline size={16} />
          </button>
          <button
            type="button"
            className={`sbwb__nav-btn${view === "calendar" ? " is-active" : ""}`}
            aria-label="Calendar"
            onClick={goCalendar}
          >
            <IoCalendarOutline size={16} />
          </button>
        </div>
        <div className="sbwb__sidebar-bottom" aria-hidden>
          <IoPersonAddOutline size={16} />
          <IoSettingsOutline size={16} />
        </div>
      </aside>

      <div className="sbwb__main">
        <header className="sbwb__header">
          <span className="sbwb__logo">convey.</span>
        </header>

        {view === "home" ? (
          <div className="sbwb__content">
            <div className="sbwb__center">
              <p className="sbwb__date">Tuesday, July 14</p>
              <div className="sbwb__headline">
                <h3>Tuesday&apos;s in the books.</h3>
                <div className="sbwb__stats">
                  <span>
                    <IoCheckmarkCircle size={14} /> 12 done
                  </span>
                  <span>
                    <IoTimeOutline size={14} /> 5h saved
                  </span>
                </div>
              </div>

              <p className="sbwb__summary">{SUMMARY}</p>

              <section className="sbwb__section">
                <h4>WHAT I&apos;M WORKING ON</h4>
                <div className="sbwb__work" role="list">
                  {WORK.map((item) => {
                    const open = expandedWork === item.id;
                    return (
                      <div
                        key={item.id}
                        className={`sbwb__work-item${open ? " is-active" : ""}`}
                        role="listitem"
                      >
                        <button
                          type="button"
                          className={`sbwb__work-card${open ? " is-open" : ""}`}
                          onClick={(e) => onWorkClick(e, item.id)}
                          aria-pressed={open}
                          aria-label={
                            open
                              ? `${item.label} (focused)`
                              : `Focus ${item.label}`
                          }
                        >
                          <div className="sbwb__mini">
                            <div className="sbwb__mini-chrome" aria-hidden>
                              <span />
                              <span />
                              <span />
                            </div>

                            <div className="sbwb__mini-body">
                              {item.kind === "meter" ? (
                                <>
                                  <div className="sbwb__mini-head">
                                    <div className="sbwb__mini-copy">
                                      <strong>{item.title}</strong>
                                      <small>{item.detail}</small>
                                    </div>
                                    <span className="sbwb__run">RUN</span>
                                  </div>
                                  <div className="sbwb__meter">
                                    <span
                                      style={{
                                        width: open ? `${barWidth}%` : "28%",
                                      }}
                                    />
                                  </div>
                                  {open ? (
                                    <p className="sbwb__hint">{item.hint}</p>
                                  ) : null}
                                </>
                              ) : null}

                              {item.kind === "search" ? (
                                <>
                                  <strong className="sbwb__mini-kicker">
                                    {item.title}
                                  </strong>
                                  <div className="sbwb__search">
                                    <span>
                                      {open ? invoiceText : "INV-2…"}
                                      {open && focused ? (
                                        <i className="sbwb__text-caret" />
                                      ) : null}
                                    </span>
                                  </div>
                                  <span className="sbwb__apply">Apply</span>
                                </>
                              ) : null}

                              {item.kind === "grid" ? (
                                <>
                                  <div className="sbwb__grid" aria-hidden>
                                    <span />
                                    <span />
                                    <span />
                                    <span />
                                    <span />
                                    <span />
                                  </div>
                                  {open ? (
                                    <p className="sbwb__hint">{item.hint}</p>
                                  ) : null}
                                </>
                              ) : null}

                              {open && focused && cursor.visible ? (
                                <span
                                  className="sbwb__cursor"
                                  style={{
                                    left: `${cursor.x}%`,
                                    top: `${cursor.y}%`,
                                  }}
                                >
                                  <CursorIcon />
                                </span>
                              ) : null}
                            </div>
                          </div>

                          <div className="sbwb__work-meta">
                            <p className="sbwb__work-label">{item.label}</p>
                            <div className="sbwb__work-foot">
                              <span className="sbwb__dot" />
                              <span className="sbwb__work-count">{item.count}</span>
                              {item.status ? (
                                <span className="sbwb__work-status">
                                  {item.status}
                                </span>
                              ) : null}
                            </div>
                          </div>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </section>

              <section className="sbwb__section">
                <div className="sbwb__section-head">
                  <h4>COMING UP</h4>
                  <button
                    type="button"
                    className="sbwb__link"
                    onClick={goCalendar}
                  >
                    View calendar ›
                  </button>
                </div>
                <ul className="sbwb__coming">
                  {COMING.map((item) => (
                    <li key={item.text}>
                      <span>{item.when}</span>
                      {item.text}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="sbwb__section">
                <h4>SOMETHING I&apos;VE BEEN THINKING ABOUT</h4>
                <ul className="sbwb__ideas">
                  {IDEAS.map((item) => {
                    const open = expandedIdea === item.id;
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          className={`sbwb__idea${open ? " is-open" : ""}`}
                          onClick={(e) => onIdeaClick(e, item.id)}
                          aria-expanded={open}
                        >
                          <div className="sbwb__idea-copy">
                            <strong>{item.title}</strong>
                            <div
                              className={`sbwb__idea-body${open ? " is-open" : ""}`}
                            >
                              <div>
                                <p>{item.body}</p>
                              </div>
                            </div>
                          </div>
                          <IoChevronForward
                            className={`sbwb__chevron${open ? " is-open" : ""}`}
                            size={14}
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            </div>

            <aside className="sbwb__highlights">
              <h4>TODAY&apos;S HIGHLIGHTS</h4>
              <div className="sbwb__metric-list">
                {HIGHLIGHTS.map((item) => (
                  <div key={item.title} className="sbwb__metric">
                    <p>
                      <strong>{item.label}</strong> {item.title}
                    </p>
                    <small>{item.note}</small>
                    <div className="sbwb__meter sbwb__meter--sm">
                      <span style={{ width: `${item.meter}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <ul className="sbwb__checks">
                {CHECKS.map((item) => (
                  <li key={item}>
                    <IoCheckmarkCircle size={14} />
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        ) : (
          <div className="sbwb__calendar">
            <div className="sbwb__cal-top">
              <button
                type="button"
                className="sbwb__back"
                onClick={goHome}
                aria-label="Back to home"
              >
                <IoChevronBack size={16} />
              </button>
              <h3>Monday, April 6</h3>
              <span className="sbwb__cal-meta">9 of 13 hours scheduled</span>
            </div>

            <div className="sbwb__cal-scroll">
              <div
                className="sbwb__cal-grid"
                style={{ height: (HOUR_END - HOUR_START) * HOUR_PX }}
              >
                {hours.map((hour) => (
                  <div
                    key={hour}
                    className="sbwb__cal-hour"
                    style={{ top: (hour - HOUR_START) * HOUR_PX }}
                  >
                    <span>{formatHour(hour)}</span>
                    <i />
                  </div>
                ))}

                {CALENDAR_EVENTS.map((event) => (
                  <div
                    key={`${event.start}-${event.title}`}
                    className="sbwb__cal-event"
                    style={{
                      top: (event.start - HOUR_START) * HOUR_PX + 4,
                      height: Math.max((event.end - event.start) * HOUR_PX - 6, 22),
                    }}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .sbwb {
          display: grid;
          grid-template-columns: 2.85rem 1fr;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 0.85rem;
          background: #f7f7f6;
          box-shadow:
            0 26px 60px -24px rgba(20, 20, 30, 0.42),
            0 0 0 1px rgba(0, 0, 0, 0.05);
          font-family: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
          color: #1d1d1d;
          cursor: pointer;
          transition: box-shadow 0.25s ease;
          outline: none;
          text-align: left;
        }

        .sbwb.is-focused {
          box-shadow:
            0 32px 70px -22px rgba(20, 20, 30, 0.5),
            0 0 0 1px rgba(0, 0, 0, 0.08);
        }

        .sbwb__sidebar {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 0.75rem 0.4rem;
          background: #ececeb;
          border-right: 1px solid rgba(0, 0, 0, 0.04);
          color: #6d6d6d;
        }

        .sbwb__sidebar-top,
        .sbwb__sidebar-bottom {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        .sbwb__avatar {
          display: grid;
          place-items: center;
          width: 1.55rem;
          height: 1.55rem;
          border-radius: 999px;
          background: #2b2b2b;
          color: #fff;
          font-size: 0.5rem;
          font-weight: 650;
        }

        .sbwb__nav-icon {
          display: grid;
          place-items: center;
          width: 1.7rem;
          height: 1.7rem;
        }

        .sbwb__nav-btn {
          display: grid;
          place-items: center;
          width: 1.7rem;
          height: 1.7rem;
          border: 0;
          border-radius: 0.35rem;
          background: transparent;
          color: #6d6d6d;
          cursor: pointer;
        }

        .sbwb__nav-btn.is-active {
          background: rgba(0, 0, 0, 0.08);
          color: #222;
        }

        .sbwb__main {
          display: grid;
          grid-template-rows: auto minmax(0, 1fr);
          min-width: 0;
          min-height: 0;
          background: #fafafa;
        }

        .sbwb__header {
          padding: 0.7rem 1rem 0.35rem;
        }

        .sbwb__logo {
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: -0.04em;
        }

        .sbwb__content {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 9.75rem;
          min-height: 0;
          overflow: hidden;
        }

        .sbwb__center {
          min-height: 0;
          overflow-y: auto;
          overscroll-behavior: contain;
          padding: 0.1rem 1rem 1rem;
          scrollbar-width: thin;
        }

        .sbwb__date {
          margin: 0 0 0.2rem;
          font-size: 0.68rem;
          color: #9a9a98;
        }

        .sbwb__headline {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }

        .sbwb__headline h3 {
          margin: 0;
          font-size: 1.05rem;
          font-weight: 700;
          letter-spacing: -0.03em;
        }

        .sbwb__stats {
          display: inline-flex;
          gap: 0.65rem;
          font-size: 0.62rem;
          color: #5f5f5f;
          white-space: nowrap;
        }

        .sbwb__stats span {
          display: inline-flex;
          align-items: center;
          gap: 0.2rem;
        }

        .sbwb__stats svg {
          color: #2f9d5a;
        }

        .sbwb__summary {
          margin: 0 0 1.05rem;
          max-width: 36rem;
          font-size: 0.72rem;
          line-height: 1.45;
          color: #555;
        }

        .sbwb__section {
          margin-bottom: 1rem;
          padding-top: 0.15rem;
          border-top: 1px solid #ececeb;
        }

        .sbwb__section:first-of-type {
          border-top: 0;
          padding-top: 0;
        }

        .sbwb__section h4,
        .sbwb__highlights h4 {
          margin: 0.65rem 0 0.5rem;
          font-size: 0.58rem;
          font-weight: 650;
          letter-spacing: 0.06em;
          color: #8a8a88;
          text-align: left;
        }

        .sbwb__section-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
        }

        .sbwb__section-head h4 {
          margin-bottom: 0.5rem;
        }

        .sbwb__link {
          border: 0;
          background: transparent;
          padding: 0;
          font: inherit;
          font-size: 0.62rem;
          color: #7a62c4;
          font-weight: 500;
          cursor: pointer;
        }

        .sbwb__work {
          display: flex;
          gap: 0.5rem;
          align-items: stretch;
          width: 100%;
          height: 10.25rem;
        }

        .sbwb__work-item {
          flex: 0.62 1 0;
          min-width: 0;
          height: 100%;
          transition:
            flex-grow 0.55s cubic-bezier(0.22, 1, 0.36, 1),
            flex-basis 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .sbwb__work-item.is-active {
          flex: 1.85 1 0;
        }

        .sbwb__work-card {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          border: 0;
          background: transparent;
          text-align: left;
          cursor: pointer;
          color: inherit;
          font: inherit;
        }

        .sbwb__mini {
          display: flex;
          flex-direction: column;
          flex: 1;
          min-height: 0;
          border: 1px solid #e6e6e4;
          border-radius: 0.55rem;
          background: #fff;
          box-shadow: 0 6px 14px -12px rgba(0, 0, 0, 0.28);
          overflow: hidden;
          transition:
            box-shadow 0.35s ease,
            border-color 0.35s ease;
        }

        .sbwb__work-card.is-open .sbwb__mini {
          border-color: #d8d8d6;
          box-shadow: 0 12px 24px -14px rgba(0, 0, 0, 0.32);
        }

        .sbwb__mini-chrome {
          display: flex;
          align-items: center;
          gap: 0.18rem;
          flex-shrink: 0;
          padding: 0.32rem 0.5rem;
          background: #f3f3f1;
          border-bottom: 1px solid #ececeb;
        }

        .sbwb__mini-chrome span {
          width: 0.28rem;
          height: 0.28rem;
          border-radius: 999px;
          background: #d0d0ce;
        }

        .sbwb__mini-body {
          position: relative;
          display: flex;
          flex-direction: column;
          flex: 1;
          min-height: 0;
          padding: 0.45rem 0.55rem 0.5rem;
          overflow: hidden;
        }

        .sbwb__mini-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0.4rem;
          margin-bottom: 0.45rem;
        }

        .sbwb__mini-copy {
          min-width: 0;
        }

        .sbwb__mini-copy strong,
        .sbwb__mini-body > strong {
          display: block;
          font-size: 0.62rem;
          font-weight: 650;
          color: #222;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .sbwb__mini-kicker {
          margin-bottom: 0.35rem;
          font-size: 0.5rem !important;
          font-weight: 600 !important;
          letter-spacing: 0.05em;
          color: #8a8a88 !important;
        }

        .sbwb__mini-copy small {
          display: block;
          margin: 0.12rem 0 0;
          font-size: 0.5rem;
          color: #888;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .sbwb__hint {
          margin: 0.4rem 0 0;
          margin-top: auto;
          font-size: 0.48rem;
          line-height: 1.3;
          color: #8a8a88;
        }

        .sbwb__meter {
          height: 0.38rem;
          border-radius: 999px;
          background: #ebebeb;
          overflow: hidden;
        }

        .sbwb__meter span {
          display: block;
          height: 100%;
          border-radius: inherit;
          background: #3cbc6d;
          transition: width 0.55s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: width;
        }

        .sbwb__meter--sm {
          margin-top: 0.35rem;
          height: 0.22rem;
        }

        .sbwb__run {
          flex-shrink: 0;
          padding: 0.16rem 0.42rem;
          border-radius: 0.28rem;
          background: #8fd9a8;
          color: #fff;
          font-size: 0.48rem;
          font-weight: 700;
          letter-spacing: 0.04em;
        }

        .sbwb__apply {
          align-self: flex-start;
          margin-top: 0.4rem;
          padding: 0.16rem 0.45rem;
          border-radius: 0.28rem;
          background: #d7e8fa;
          color: #2f6fad;
          font-size: 0.5rem;
          font-weight: 700;
        }

        .sbwb__search {
          display: flex;
          align-items: center;
          padding: 0.32rem 0.42rem;
          border: 1px solid #e4e4e2;
          border-radius: 0.32rem;
          font-size: 0.58rem;
          color: #555;
          background: #f7f7f6;
          min-height: 1.4rem;
        }

        .sbwb__text-caret {
          display: inline-block;
          width: 1px;
          height: 0.85em;
          margin-left: 1px;
          vertical-align: text-bottom;
          background: #3b7ddd;
          animation: sbwb-blink 0.85s steps(1) infinite;
        }

        .sbwb__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.28rem;
          margin-top: 0.1rem;
          width: 100%;
          max-width: 7rem;
        }

        .sbwb__grid span {
          aspect-ratio: 1.55;
          border-radius: 0.2rem;
          background: #ececeb;
        }

        .sbwb__cursor {
          position: absolute;
          z-index: 2;
          pointer-events: none;
          filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.25));
          transition:
            left 0.4s cubic-bezier(0.22, 1, 0.36, 1),
            top 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          transform: translate(-12%, -8%);
          will-change: left, top;
        }

        .sbwb__work-meta {
          display: grid;
          gap: 0.2rem;
          min-width: 0;
          padding: 0 0.05rem;
        }

        .sbwb__work-label {
          margin: 0;
          font-size: 0.62rem;
          font-weight: 650;
          color: #222;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .sbwb__work-foot {
          display: flex;
          align-items: center;
          gap: 0.28rem;
          min-width: 0;
          font-size: 0.55rem;
          color: #666;
        }

        .sbwb__dot {
          width: 0.35rem;
          height: 0.35rem;
          border-radius: 999px;
          background: #2f9d5a;
          flex-shrink: 0;
        }

        .sbwb__work-count {
          font-weight: 600;
          color: #444;
        }

        .sbwb__work-status {
          margin-left: auto;
          color: #8a8a88;
          white-space: nowrap;
        }

        .sbwb__coming {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 0.4rem;
        }

        .sbwb__coming li {
          display: grid;
          grid-template-columns: 3.2rem minmax(0, 1fr);
          gap: 0.5rem;
          align-items: start;
          font-size: 0.68rem;
          color: #333;
          text-align: left;
        }

        .sbwb__coming span {
          color: #8a8a88;
          font-weight: 500;
        }

        .sbwb__ideas {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 0.4rem;
        }

        .sbwb__idea {
          display: flex;
          width: 100%;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0.55rem;
          margin: 0;
          padding: 0.6rem 0.65rem;
          border: 0;
          border-radius: 0.45rem;
          background: #f0f0ee;
          color: inherit;
          font: inherit;
          text-align: left;
          cursor: pointer;
        }

        .sbwb__idea-copy {
          min-width: 0;
          flex: 1;
        }

        .sbwb__idea strong {
          display: block;
          font-size: 0.7rem;
          color: #222;
        }

        .sbwb__idea-body {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.28s ease;
        }

        .sbwb__idea-body > div {
          overflow: hidden;
        }

        .sbwb__idea-body.is-open {
          grid-template-rows: 1fr;
        }

        .sbwb__idea-body p {
          margin: 0;
          padding-top: 0.35rem;
          font-size: 0.6rem;
          line-height: 1.4;
          color: #6a6a6a;
        }

        .sbwb__chevron {
          flex-shrink: 0;
          margin-top: 0.1rem;
          color: #8a8a88;
          transition: transform 0.25s ease;
        }

        .sbwb__chevron.is-open {
          transform: rotate(90deg);
        }

        .sbwb__highlights {
          min-height: 0;
          overflow-y: auto;
          padding: 0.35rem 0.75rem 0.85rem 0.55rem;
          border-left: 1px solid #ececeb;
          scrollbar-width: thin;
          text-align: left;
        }

        .sbwb__metric-list {
          display: grid;
          gap: 0.4rem;
          margin-bottom: 0.75rem;
        }

        .sbwb__metric {
          padding: 0.5rem 0.55rem;
          border-radius: 0.4rem;
          background: #f1f1ef;
        }

        .sbwb__metric p {
          margin: 0;
          font-size: 0.62rem;
          color: #444;
        }

        .sbwb__metric strong {
          font-size: 0.78rem;
          color: #171717;
        }

        .sbwb__metric small {
          display: block;
          margin-top: 0.15rem;
          font-size: 0.55rem;
          color: #7a7a78;
        }

        .sbwb__checks {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 0.45rem;
        }

        .sbwb__checks li {
          display: flex;
          align-items: flex-start;
          gap: 0.3rem;
          font-size: 0.58rem;
          line-height: 1.35;
          color: #444;
        }

        .sbwb__checks svg {
          flex-shrink: 0;
          margin-top: 0.05rem;
          color: #2f9d5a;
        }

        .sbwb__calendar {
          display: grid;
          grid-template-rows: auto minmax(0, 1fr);
          min-height: 0;
          overflow: hidden;
          background: #f7f7f6;
        }

        .sbwb__cal-top {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 0.55rem;
          padding: 0.35rem 1rem 0.65rem;
        }

        .sbwb__back {
          display: grid;
          place-items: center;
          width: 1.6rem;
          height: 1.6rem;
          border: 0;
          border-radius: 0.3rem;
          background: transparent;
          color: #444;
          cursor: pointer;
        }

        .sbwb__back:hover {
          background: rgba(0, 0, 0, 0.05);
        }

        .sbwb__cal-top h3 {
          margin: 0;
          font-size: 0.98rem;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .sbwb__cal-meta {
          font-size: 0.68rem;
          color: #8a8a88;
          white-space: nowrap;
        }

        .sbwb__cal-scroll {
          min-height: 0;
          overflow-y: auto;
          overscroll-behavior: contain;
          padding: 0 0.9rem 1rem 0.55rem;
          scrollbar-width: thin;
        }

        .sbwb__cal-grid {
          position: relative;
          margin-left: 0.25rem;
        }

        .sbwb__cal-hour {
          position: absolute;
          left: 0;
          right: 0;
          display: grid;
          grid-template-columns: 3.1rem 1fr;
          align-items: start;
          gap: 0.45rem;
          pointer-events: none;
        }

        .sbwb__cal-hour span {
          transform: translateY(-0.35rem);
          font-size: 0.62rem;
          color: #9a9a98;
          text-align: right;
        }

        .sbwb__cal-hour i {
          display: block;
          height: 1px;
          background: #e6e6e4;
        }

        .sbwb__cal-event {
          position: absolute;
          left: 3.55rem;
          right: 0.25rem;
          padding: 0.3rem 0.55rem;
          border-radius: 0.4rem;
          background: #e4e3ea;
          color: #2f2f2f;
          font-size: 0.68rem;
          font-weight: 500;
          line-height: 1.25;
          overflow: hidden;
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.02);
        }

        @keyframes sbwb-blink {
          50% { opacity: 0; }
        }

        @media (max-width: 720px) {
          .sbwb__content {
            grid-template-columns: 1fr;
          }

          .sbwb__highlights {
            border-left: 0;
            border-top: 1px solid #ececeb;
            padding: 0.75rem 0.85rem;
          }

          .sbwb__work {
            height: 9.5rem;
            gap: 0.4rem;
          }

          .sbwb__work-item {
            flex: 0.7 1 0;
          }

          .sbwb__work-item.is-active {
            flex: 1.65 1 0;
          }
        }
      `}</style>
    </div>
  );
}
