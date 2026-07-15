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
import { CursorIcon } from "@/components/ui/CursorIcon";

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
    id: "pacingResp",
    title: "Add pacing & recap as responsibilities",
    body: "These skills aren't tracked formally yet — I can report on them more clearly",
  },
  {
    id: "vendor",
    title: "auto-flag vendor discrepancies",
    body: "3 vendors had issues in 30 days — an automated rule could catch these earlier",
  },
  {
    id: "swap",
    title: "Share the creative swap speed win",
    body: "Nike Spring swap went from 45 min to 9 — worth highlighting to the team",
  },
];

const HIGHLIGHTS = [
  { label: "8/10", title: "ON PACE", note: "2 campaigns underpacing" },
  { label: "14", title: "INVOICES", note: "2 flagged for review" },
  { label: "$42k", title: "AT RISK", note: "Nike Spring underpacing" },
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

function formatHour(h: number) {
  const hour = Math.floor(h);
  const suffix = hour >= 12 ? "PM" : "AM";
  const display = hour % 12 === 0 ? 12 : hour % 12;
  return `${display} ${suffix}`;
}

function formatLongDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(date);
}

function formatWeekday(date: Date) {
  return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
}

function msUntilNextLocalMidnight(from = new Date()) {
  const next = new Date(from);
  next.setHours(24, 0, 0, 0);
  return next.getTime() - from.getTime();
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
  const [expandedIdea, setExpandedIdea] = useState<string | null>("pacingResp");
  const [barWidth, setBarWidth] = useState(34);
  const [invoiceText, setInvoiceText] = useState("INV-2…");
  const [cursor, setCursor] = useState({ x: 70, y: 58, visible: false });
  const [wasFocused, setWasFocused] = useState(focused);
  const [today, setToday] = useState<Date | null>(null);
  const cancelledRef = useRef(false);

  useEffect(() => {
    let timeoutId = 0;

    const tick = () => {
      setToday(new Date());
      timeoutId = window.setTimeout(tick, msUntilNextLocalMidnight());
    };

    tick();
    return () => window.clearTimeout(timeoutId);
  }, []);

  const activeDate = today ?? new Date();
  const todayLabel = formatLongDate(activeDate);
  const weekdayLabel = formatWeekday(activeDate);

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
      className={`sbwb${focused ? " isFocused" : ""}${className ? ` ${className}` : ""}`}
      style={style}
      role="button"
      tabIndex={0}
      onClick={focusWindow}
      onKeyDown={onWindowKeyDown}
      aria-label="Bear dashboard window"
    >
      <aside className="sbwbSidebar">
        <div className="sbwbSidebarTop">
          <span className="sbwbAvatar" aria-hidden>
            LA
          </span>
          <span className="sbwbNavIcon" aria-hidden>
            <IoCreateOutline size={16} />
          </span>
          <button
            type="button"
            className={`sbwbNavBtn${view === "home" ? " isActive" : ""}`}
            aria-label="Home"
            onClick={goHome}
          >
            <IoHomeOutline size={16} />
          </button>
          <button
            type="button"
            className={`sbwbNavBtn${view === "calendar" ? " isActive" : ""}`}
            aria-label="Calendar"
            onClick={goCalendar}
          >
            <IoCalendarOutline size={16} />
          </button>
        </div>
        <div className="sbwbSidebarBottom" aria-hidden>
          <IoPersonAddOutline size={16} />
          <IoSettingsOutline size={16} />
        </div>
      </aside>

      <div className="sbwbMain">
        <header className="sbwbHeader">
          <span className="sbwbLogo">bear.</span>
        </header>

        {view === "home" ? (
          <div className="sbwbContent">
            <div className="sbwbCenter hideScrollbar">
              <p className="sbwbDate" suppressHydrationWarning>
                {todayLabel}
              </p>
              <div className="sbwbHeadline">
                <h3 suppressHydrationWarning>
                  {weekdayLabel}&apos;s in the books.
                </h3>
                <div className="sbwbStats">
                  <span>
                    <IoCheckmarkCircle size={14} /> 12 done
                  </span>
                  <span>
                    <IoTimeOutline size={14} /> 5h saved
                  </span>
                </div>
              </div>

              <p className="sbwbSummary">{SUMMARY}</p>

              <section className="sbwbSection">
                <h4>WHAT I&apos;M WORKING ON</h4>
                <div className="sbwbWork" role="list">
                  {WORK.map((item) => {
                    const open = expandedWork === item.id;
                    return (
                      <div
                        key={item.id}
                        className={`sbwbWorkItem${open ? " isActive" : ""}`}
                        role="listitem"
                      >
                        <button
                          type="button"
                          className={`sbwbWorkCard${open ? " isOpen" : ""}`}
                          onClick={(e) => onWorkClick(e, item.id)}
                          aria-pressed={open}
                          aria-label={
                            open
                              ? `${item.label} (focused)`
                              : `Focus ${item.label}`
                          }
                        >
                          <div className="sbwbMini">
                            <div className="sbwbMiniChrome" aria-hidden>
                              <span />
                              <span />
                              <span />
                            </div>

                            <div className="sbwbMiniBody">
                              {item.kind === "meter" ? (
                                <>
                                  <div className="sbwbMiniHead">
                                    <div className="sbwbMiniCopy">
                                      <strong>{item.title}</strong>
                                      <small>{item.detail}</small>
                                    </div>
                                    <span className="sbwbRun">RUN</span>
                                  </div>
                                  <div className="sbwbMeter">
                                    <span
                                      style={{
                                        width: open ? `${barWidth}%` : "28%",
                                      }}
                                    />
                                  </div>
                                  {open ? (
                                    <p className="sbwbHint">{item.hint}</p>
                                  ) : null}
                                </>
                              ) : null}

                              {item.kind === "search" ? (
                                <>
                                  <strong className="sbwbMiniKicker">
                                    {item.title}
                                  </strong>
                                  <div className="sbwbSearch">
                                    <span>
                                      {open ? invoiceText : "INV-2…"}
                                      {open && focused ? (
                                        <i className="sbwbTextCaret" />
                                      ) : null}
                                    </span>
                                  </div>
                                  <span className="sbwbApply">Apply</span>
                                </>
                              ) : null}

                              {item.kind === "grid" ? (
                                <>
                                  <div className="sbwbGrid" aria-hidden>
                                    <span />
                                    <span />
                                    <span />
                                    <span />
                                    <span />
                                    <span />
                                  </div>
                                  {open ? (
                                    <p className="sbwbHint">{item.hint}</p>
                                  ) : null}
                                </>
                              ) : null}

                              {open && focused && cursor.visible ? (
                                <span
                                  className="sbwbCursor"
                                  style={{
                                    left: `${cursor.x}%`,
                                    top: `${cursor.y}%`,
                                  }}
                                >
                                  <CursorIcon size={16} />
                                </span>
                              ) : null}
                            </div>
                          </div>

                          <div className="sbwbWorkMeta">
                            <p className="sbwbWorkLabel">{item.label}</p>
                            <div className="sbwbWorkFoot">
                              <span className="sbwbDot" />
                              <span className="sbwbWorkCount">{item.count}</span>
                              {item.status ? (
                                <span className="sbwbWorkStatus">
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

              <section className="sbwbSection">
                <div className="sbwbSectionHead">
                  <h4>COMING UP</h4>
                  <button
                    type="button"
                    className="sbwbLink"
                    onClick={goCalendar}
                  >
                    View calendar ›
                  </button>
                </div>
                <ul className="sbwbComing">
                  {COMING.map((item) => (
                    <li key={item.text}>
                      <span>{item.when}</span>
                      {item.text}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="sbwbSection">
                <h4>SOMETHING I&apos;VE BEEN THINKING ABOUT</h4>
                <ul className="sbwbIdeas">
                  {IDEAS.map((item) => {
                    const open = expandedIdea === item.id;
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          className={`sbwbIdea${open ? " isOpen" : ""}`}
                          onClick={(e) => onIdeaClick(e, item.id)}
                          aria-expanded={open}
                        >
                          <div className="sbwbIdeaCopy">
                            <strong>{item.title}</strong>
                            <div
                              className={`sbwbIdeaBody${open ? " isOpen" : ""}`}
                            >
                              <div>
                                <p>{item.body}</p>
                              </div>
                            </div>
                          </div>
                          <IoChevronForward
                            className={`sbwbChevron${open ? " isOpen" : ""}`}
                            size={14}
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            </div>

            <aside className="sbwbHighlights hideScrollbar">
              <div className="sbwbHighlightsToolbar">
                <button
                  type="button"
                  className="sbwbHighlightsCollapse"
                  aria-hidden
                  tabIndex={-1}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden
                  >
                    <rect
                      x="0.75"
                      y="0.75"
                      width="12.5"
                      height="12.5"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <line
                      x1="5.25"
                      y1="2.25"
                      x2="5.25"
                      y2="11.75"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <path
                      d="M7.25 7H10.75M9.75 5.5L10.75 7L9.75 8.5"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <h4>TODAY&apos;S HIGHLIGHTS</h4>
              <div className="sbwbMetricList">
                {HIGHLIGHTS.map((item) => (
                  <div key={item.title} className="sbwbMetric">
                    <p className="sbwbMetricStat">
                      <strong>{item.label}</strong>
                      <span>{item.title}</span>
                    </p>
                    <small>{item.note}</small>
                  </div>
                ))}
              </div>

              <ul className="sbwbChecks">
                {CHECKS.map((item) => (
                  <li key={item}>
                    <IoCheckmarkCircle size={13} />
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        ) : (
          <div className="sbwbCalendar">
            <div className="sbwbCalTop">
              <button
                type="button"
                className="sbwbBack"
                onClick={goHome}
                aria-label="Back to home"
              >
                <IoChevronBack size={16} />
              </button>
              <h3 suppressHydrationWarning>{todayLabel}</h3>
              <span className="sbwbCalMeta">9 of 13 hours scheduled</span>
            </div>

            <div className="sbwbCalScroll hideScrollbar">
              <div
                className="sbwbCalGrid"
                style={{ height: (HOUR_END - HOUR_START) * HOUR_PX }}
              >
                {hours.map((hour) => (
                  <div
                    key={hour}
                    className="sbwbCalHour"
                    style={{ top: (hour - HOUR_START) * HOUR_PX }}
                  >
                    <span>{formatHour(hour)}</span>
                    <i />
                  </div>
                ))}

                {CALENDAR_EVENTS.map((event) => (
                  <div
                    key={`${event.start}-${event.title}`}
                    className="sbwbCalEvent"
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
          font-family: var(--fontGeistSans), ui-sans-serif, system-ui, sans-serif;
          color: #1d1d1d;
          cursor: pointer;
          transition: box-shadow 0.25s ease;
          outline: none;
          text-align: left;
        }

        .sbwb.isFocused {
          box-shadow:
            0 32px 70px -22px rgba(20, 20, 30, 0.5),
            0 0 0 1px rgba(0, 0, 0, 0.08);
        }

        .sbwbSidebar {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 0.75rem 0.4rem;
          background: #ececeb;
          border-right: 1px solid rgba(0, 0, 0, 0.04);
          color: #6d6d6d;
        }

        .sbwbSidebarTop,
        .sbwbSidebarBottom {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        .sbwbAvatar {
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

        .sbwbNavIcon {
          display: grid;
          place-items: center;
          width: 1.7rem;
          height: 1.7rem;
        }

        .sbwbNavBtn {
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

        .sbwbNavBtn.isActive {
          background: rgba(0, 0, 0, 0.08);
          color: #222;
        }

        .sbwbMain {
          display: grid;
          grid-template-rows: auto minmax(0, 1fr);
          min-width: 0;
          min-height: 0;
          background: #fafafa;
        }

        .sbwbHeader {
          padding: 0.7rem 1rem 0.35rem;
        }

        .sbwbLogo {
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: -0.04em;
        }

        .sbwbContent {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 10.75rem;
          min-height: 0;
          overflow: hidden;
        }

        .sbwbCenter {
          min-height: 0;
          overflow-y: auto;
          overscroll-behavior: contain;
          padding: 0.1rem 1rem 1rem;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .sbwbDate {
          margin: 0 0 0.2rem;
          font-size: 0.68rem;
          color: #9a9a98;
        }

        .sbwbHeadline {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }

        .sbwbHeadline h3 {
          margin: 0;
          font-size: 1.05rem;
          font-weight: 700;
          letter-spacing: -0.03em;
        }

        .sbwbStats {
          display: inline-flex;
          gap: 0.65rem;
          font-size: 0.62rem;
          color: #5f5f5f;
          white-space: nowrap;
        }

        .sbwbStats span {
          display: inline-flex;
          align-items: center;
          gap: 0.2rem;
        }

        .sbwbStats svg {
          color: #2f9d5a;
        }

        .sbwbSummary {
          margin: 0 0 1.05rem;
          max-width: 36rem;
          font-size: 0.72rem;
          line-height: 1.45;
          color: #555;
        }

        .sbwbSection {
          margin-bottom: 1rem;
          padding-top: 0.15rem;
          border-top: 1px solid #ececeb;
        }

        .sbwbSection:first-of-type {
          border-top: 0;
          padding-top: 0;
        }

        .sbwbSection h4 {
          margin: 0.65rem 0 0.5rem;
          font-size: 0.58rem;
          font-weight: 650;
          letter-spacing: 0.06em;
          color: #8a8a88;
          text-align: left;
        }

        .sbwbHighlights h4 {
          margin: 0 0 0.7rem;
          font-size: 0.56rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: #a3a3a1;
          text-align: left;
        }

        .sbwbSectionHead {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
        }

        .sbwbSectionHead h4 {
          margin-bottom: 0.5rem;
        }

        .sbwbLink {
          border: 0;
          background: transparent;
          padding: 0;
          font: inherit;
          font-size: 0.62rem;
          color: #7a62c4;
          font-weight: 500;
          cursor: pointer;
        }

        .sbwbWork {
          display: flex;
          gap: 0.5rem;
          align-items: stretch;
          width: 100%;
          height: 10.25rem;
        }

        .sbwbWorkItem {
          flex: 0.62 1 0;
          min-width: 0;
          height: 100%;
          transition:
            flex-grow 0.55s cubic-bezier(0.22, 1, 0.36, 1),
            flex-basis 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .sbwbWorkItem.isActive {
          flex: 1.85 1 0;
        }

        .sbwbWorkCard {
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

        .sbwbMini {
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

        .sbwbWorkCard.isOpen .sbwbMini {
          border-color: #d8d8d6;
          box-shadow: 0 12px 24px -14px rgba(0, 0, 0, 0.32);
        }

        .sbwbMiniChrome {
          display: flex;
          align-items: center;
          gap: 0.18rem;
          flex-shrink: 0;
          padding: 0.32rem 0.5rem;
          background: #f3f3f1;
          border-bottom: 1px solid #ececeb;
        }

        .sbwbMiniChrome span {
          width: 0.28rem;
          height: 0.28rem;
          border-radius: 999px;
          background: #d0d0ce;
        }

        .sbwbMiniBody {
          position: relative;
          display: flex;
          flex-direction: column;
          flex: 1;
          min-height: 0;
          padding: 0.45rem 0.55rem 0.5rem;
          overflow: hidden;
        }

        .sbwbMiniHead {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0.4rem;
          margin-bottom: 0.45rem;
        }

        .sbwbMiniCopy {
          min-width: 0;
        }

        .sbwbMiniCopy strong,
        .sbwbMiniBody > strong {
          display: block;
          font-size: 0.62rem;
          font-weight: 650;
          color: #222;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .sbwbMiniKicker {
          margin-bottom: 0.35rem;
          font-size: 0.5rem !important;
          font-weight: 600 !important;
          letter-spacing: 0.05em;
          color: #8a8a88 !important;
        }

        .sbwbMiniCopy small {
          display: block;
          margin: 0.12rem 0 0;
          font-size: 0.5rem;
          color: #888;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .sbwbHint {
          margin: 0.4rem 0 0;
          margin-top: auto;
          font-size: 0.48rem;
          line-height: 1.3;
          color: #8a8a88;
        }

        .sbwbMeter {
          height: 0.38rem;
          border-radius: 999px;
          background: #ebebeb;
          overflow: hidden;
        }

        .sbwbMeter span {
          display: block;
          height: 100%;
          border-radius: inherit;
          background: #3cbc6d;
          transition: width 0.55s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: width;
        }

        .sbwbMeterSm {
          margin-top: 0.35rem;
          height: 0.22rem;
        }

        .sbwbRun {
          flex-shrink: 0;
          padding: 0.16rem 0.42rem;
          border-radius: 0.28rem;
          background: #8fd9a8;
          color: #fff;
          font-size: 0.48rem;
          font-weight: 700;
          letter-spacing: 0.04em;
        }

        .sbwbApply {
          align-self: flex-start;
          margin-top: 0.4rem;
          padding: 0.16rem 0.45rem;
          border-radius: 0.28rem;
          background: #d7e8fa;
          color: #2f6fad;
          font-size: 0.5rem;
          font-weight: 700;
        }

        .sbwbSearch {
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

        .sbwbTextCaret {
          display: inline-block;
          width: 1px;
          height: 0.85em;
          margin-left: 1px;
          vertical-align: text-bottom;
          background: #3b7ddd;
          animation: sbwbBlink 0.85s steps(1) infinite;
        }

        .sbwbGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.28rem;
          margin-top: 0.1rem;
          width: 100%;
          max-width: 7rem;
        }

        .sbwbGrid span {
          aspect-ratio: 1.55;
          border-radius: 0.2rem;
          background: #ececeb;
        }

        .sbwbCursor {
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

        .sbwbWorkMeta {
          display: grid;
          gap: 0.2rem;
          min-width: 0;
          padding: 0 0.05rem;
        }

        .sbwbWorkLabel {
          margin: 0;
          font-size: 0.62rem;
          font-weight: 650;
          color: #222;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .sbwbWorkFoot {
          display: flex;
          align-items: center;
          gap: 0.28rem;
          min-width: 0;
          font-size: 0.55rem;
          color: #666;
        }

        .sbwbDot {
          width: 0.35rem;
          height: 0.35rem;
          border-radius: 999px;
          background: #2f9d5a;
          flex-shrink: 0;
        }

        .sbwbWorkCount {
          font-weight: 600;
          color: #444;
        }

        .sbwbWorkStatus {
          margin-left: auto;
          color: #8a8a88;
          white-space: nowrap;
        }

        .sbwbComing {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 0.4rem;
        }

        .sbwbComing li {
          display: grid;
          grid-template-columns: 3.2rem minmax(0, 1fr);
          gap: 0.5rem;
          align-items: start;
          font-size: 0.68rem;
          color: #333;
          text-align: left;
        }

        .sbwbComing span {
          color: #8a8a88;
          font-weight: 500;
        }

        .sbwbIdeas {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 0.4rem;
        }

        .sbwbIdea {
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

        .sbwbIdeaCopy {
          min-width: 0;
          flex: 1;
        }

        .sbwbIdea strong {
          display: block;
          font-size: 0.7rem;
          color: #222;
        }

        .sbwbIdeaBody {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.28s ease;
        }

        .sbwbIdeaBody > div {
          overflow: hidden;
        }

        .sbwbIdeaBody.isOpen {
          grid-template-rows: 1fr;
        }

        .sbwbIdeaBody p {
          margin: 0;
          padding-top: 0.35rem;
          font-size: 0.6rem;
          line-height: 1.4;
          color: #6a6a6a;
        }

        .sbwbChevron {
          flex-shrink: 0;
          margin-top: 0.1rem;
          color: #8a8a88;
          transition: transform 0.25s ease;
        }

        .sbwbChevron.isOpen {
          transform: rotate(90deg);
        }

        .sbwbHighlights {
          min-height: 0;
          overflow-y: auto;
          padding: 0.55rem 0.85rem 0.9rem;
          background: #f9f9f8;
          border-left: 1px solid #ececeb;
          box-shadow: inset 4px 0 10px rgba(0, 0, 0, 0.03);
          scrollbar-width: none;
          -ms-overflow-style: none;
          text-align: left;
        }

        .sbwbHighlightsToolbar {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 0.35rem;
        }

        .sbwbHighlightsCollapse {
          display: grid;
          place-items: center;
          width: 1.35rem;
          height: 1.35rem;
          padding: 0;
          border: 0;
          border-radius: 0.2rem;
          background: transparent;
          color: #b0b0ae;
          cursor: default;
        }

        .sbwbMetricList {
          display: grid;
          gap: 0.5rem;
          margin-bottom: 0.85rem;
        }

        .sbwbMetric {
          padding: 0.62rem 0.68rem;
          border-radius: 0.5rem;
          background: #f0f0ee;
        }

        .sbwbMetricStat {
          display: flex;
          align-items: baseline;
          gap: 0.35rem;
          margin: 0;
        }

        .sbwbMetricStat strong {
          font-size: 0.82rem;
          font-weight: 700;
          color: #1a1a1a;
          letter-spacing: -0.02em;
        }

        .sbwbMetricStat span {
          font-size: 0.56rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          color: #a3a3a1;
          text-transform: uppercase;
        }

        .sbwbMetric small {
          display: block;
          margin-top: 0.22rem;
          font-size: 0.58rem;
          line-height: 1.35;
          color: #7a7a78;
        }

        .sbwbChecks {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 0.55rem;
        }

        .sbwbChecks li {
          display: flex;
          align-items: flex-start;
          gap: 0.38rem;
          font-size: 0.6rem;
          line-height: 1.4;
          color: #5a5a58;
        }

        .sbwbChecks svg {
          flex-shrink: 0;
          margin-top: 0.08rem;
          color: #22c55e;
        }

        .sbwbCalendar {
          display: grid;
          grid-template-rows: auto minmax(0, 1fr);
          min-height: 0;
          overflow: hidden;
          background: #f7f7f6;
        }

        .sbwbCalTop {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 0.55rem;
          padding: 0.35rem 1rem 0.65rem;
        }

        .sbwbBack {
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

        .sbwbBack:hover {
          background: rgba(0, 0, 0, 0.05);
        }

        .sbwbCalTop h3 {
          margin: 0;
          font-size: 0.98rem;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .sbwbCalMeta {
          font-size: 0.68rem;
          color: #8a8a88;
          white-space: nowrap;
        }

        .sbwbCalScroll {
          min-height: 0;
          overflow-y: auto;
          overscroll-behavior: contain;
          padding: 0 0.9rem 1rem 0.55rem;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .sbwbCalGrid {
          position: relative;
          margin-left: 0.25rem;
        }

        .sbwbCalHour {
          position: absolute;
          left: 0;
          right: 0;
          display: grid;
          grid-template-columns: 3.1rem 1fr;
          align-items: start;
          gap: 0.45rem;
          pointer-events: none;
        }

        .sbwbCalHour span {
          transform: translateY(-0.35rem);
          font-size: 0.62rem;
          color: #9a9a98;
          text-align: right;
        }

        .sbwbCalHour i {
          display: block;
          height: 1px;
          background: #e6e6e4;
        }

        .sbwbCalEvent {
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

        @keyframes sbwbBlink {
          50% { opacity: 0; }
        }

        @media (max-width: 720px) {
          .sbwbContent {
            grid-template-columns: 1fr;
          }

          .sbwbHighlights {
            border-left: 0;
            border-top: 1px solid #ececeb;
            padding: 0.75rem 0.85rem;
          }

          .sbwbWork {
            height: 9.5rem;
            gap: 0.4rem;
          }

          .sbwbWorkItem {
            flex: 0.7 1 0;
          }

          .sbwbWorkItem.isActive {
            flex: 1.65 1 0;
          }
        }
      `}</style>
    </div>
  );
}
