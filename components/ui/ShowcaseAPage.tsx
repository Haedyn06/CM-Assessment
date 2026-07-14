"use client";

import { useEffect, useRef, useState } from "react";
import {
  IoChevronBack,
  IoChevronForward,
  IoLockClosedOutline,
  IoRefreshOutline,
} from "react-icons/io5";

const FULL_URL = "crm.acme.com/orders";
const URL_CHAR_MS = 55;
const CURSOR_HOLD_MS = 520;
const LOOP_PAUSE_MS = 900;

const LINE_ITEMS = [
  { id: "OLI-5550868", platform: "Display", product: "Audience", status: "Active" as const },
  { id: "OLI-5550871", platform: "Video", product: "Pre-Roll", status: "Active" as const },
  { id: "OLI-5550890", platform: "CTV", product: "Select", status: "Pending" as const },
  { id: "OLI-5550912", platform: "Display", product: "Retarget", status: "Pending" as const },
];

/** Cursor waypoints across the CRM page (percent of content box) */
const CURSOR_PATH: Array<{ x: number; y: number }> = [
  { x: 22, y: 18 },
  { x: 48, y: 42 },
  { x: 72, y: 38 },
  { x: 58, y: 68 },
  { x: 35, y: 78 },
  { x: 64, y: 55 },
];

type ShowAPageProps = {
  /** When true, runs the type → navigate → cursor loop */
  active?: boolean;
  className?: string;
};

function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function CursorIcon() {
  return (
    <svg
      className="sap__cursor-icon"
      width="18"
      height="22"
      viewBox="0 0 18 22"
      fill="none"
      aria-hidden
    >
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

export function ShowcaseAPage({ active = true, className = "" }: ShowAPageProps) {
  const [urlText, setUrlText] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const [cursorPos, setCursorPos] = useState(CURSOR_PATH[0]!);
  const [wasActive, setWasActive] = useState(active);
  const cancelledRef = useRef(false);

  if (active !== wasActive) {
    setWasActive(active);
    if (!active) {
      setUrlText("");
      setShowContent(false);
      setShowCursor(false);
      setCursorPos(CURSOR_PATH[0]!);
    }
  }

  useEffect(() => {
    if (!active) return;

    cancelledRef.current = false;

    const run = async () => {
      while (!cancelledRef.current) {
        setShowCursor(false);
        setShowContent(false);
        setUrlText("");
        setCursorPos(CURSOR_PATH[0]!);
        await sleep(280);
        if (cancelledRef.current) return;

        for (let i = 1; i <= FULL_URL.length; i += 1) {
          if (cancelledRef.current) return;
          setUrlText(FULL_URL.slice(0, i));
          await sleep(URL_CHAR_MS);
        }

        await sleep(320);
        if (cancelledRef.current) return;

        setShowContent(true);
        await sleep(450);
        if (cancelledRef.current) return;

        setShowCursor(true);
        for (const point of CURSOR_PATH) {
          if (cancelledRef.current) return;
          setCursorPos(point);
          await sleep(CURSOR_HOLD_MS);
        }

        await sleep(LOOP_PAUSE_MS);
      }
    };

    const start = window.setTimeout(() => {
      void run();
    }, 0);

    return () => {
      cancelledRef.current = true;
      window.clearTimeout(start);
    };
  }, [active]);

  return (
    <div className={`sap${className ? ` ${className}` : ""}`} aria-hidden>
      <div className="sap__titlebar">
        <span className="sap__traffic">
          <span />
          <span />
          <span />
        </span>
        <span className="sap__title">
          <span className="sap__avatar">LA</span>
          AI Larry&apos;s computer
        </span>
      </div>

      <div className="sap__browser-bar">
        <span className="sap__nav">
          <IoChevronBack size={12} />
          <IoChevronForward size={12} />
          <IoRefreshOutline size={12} />
        </span>
        <div className="sap__url">
          <IoLockClosedOutline size={11} />
          <span className="sap__url-text">
            {urlText}
            {!showContent ? <span className="sap__url-caret" /> : null}
          </span>
        </div>
      </div>

      <div className={`sap__page${showContent ? " is-loaded" : ""}`}>
        {showContent ? (
          <div className="sap__crm">
            <p className="sap__crumbs">
              Orders <span>/</span> ORD-2024-4891
            </p>
            <div className="sap__crm-head">
              <h4>Order: Spring Campaign — Acme Corp</h4>
              <span className="sap__badge sap__badge--active">Active</span>
            </div>

            <div className="sap__meta">
              <div>
                <span>ORDER NAME</span>
                <strong>Spring Campaign 2024</strong>
              </div>
              <div>
                <span>CAMPAIGN MANAGER</span>
                <strong>Jane Smith</strong>
              </div>
              <div>
                <span>BUSINESS DIVISION</span>
                <strong>Local</strong>
              </div>
              <div>
                <span>ORDER DATE</span>
                <strong>Mar 15, 2024</strong>
              </div>
            </div>

            <div className="sap__table-head">
              <span>Order Line Items (4)</span>
              <span className="sap__view-all">View All</span>
            </div>

            <table className="sap__table">
              <thead>
                <tr>
                  <th>Line Item</th>
                  <th>Platform</th>
                  <th>Product</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {LINE_ITEMS.map((item) => (
                  <tr key={item.id}>
                    <td className="sap__link">{item.id}</td>
                    <td>{item.platform}</td>
                    <td>{item.product}</td>
                    <td>
                      <span
                        className={`sap__badge sap__badge--${item.status.toLowerCase()}`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {showCursor ? (
              <span
                className="sap__cursor"
                style={{
                  left: `${cursorPos.x}%`,
                  top: `${cursorPos.y}%`,
                }}
              >
                <CursorIcon />
              </span>
            ) : null}
          </div>
        ) : (
          <div className="sap__blank" />
        )}
      </div>

      <style>{`
        .sap {
          position: relative;
          overflow: hidden;
          margin-top: 0.35rem;
          border-radius: 0.7rem;
          border: 1px solid #d8d8d6;
          background: #ececeb;
          box-shadow: 0 10px 28px -16px rgba(0, 0, 0, 0.28);
          animation: sap-pop 0.35s ease both;
          font-family: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
          color: #1d1d1d;
        }

        .sap__titlebar {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 2rem;
          padding: 0.35rem 0.65rem;
          background: #e4e4e2;
        }

        .sap__traffic {
          position: absolute;
          left: 0.65rem;
          display: flex;
          gap: 0.28rem;
        }

        .sap__traffic span {
          width: 0.45rem;
          height: 0.45rem;
          border-radius: 999px;
          background: #c7c7c5;
        }

        .sap__title {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.68rem;
          font-weight: 500;
          color: #444;
        }

        .sap__avatar {
          display: grid;
          place-items: center;
          width: 1.1rem;
          height: 1.1rem;
          border-radius: 999px;
          background: #2b2b2b;
          color: #fff;
          font-size: 0.45rem;
          font-weight: 600;
        }

        .sap__browser-bar {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.4rem 0.55rem;
          background: #ececeb;
        }

        .sap__nav {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: #8a8a88;
        }

        .sap__url {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          flex: 1;
          min-width: 0;
          min-height: 1.45rem;
          padding: 0.28rem 0.55rem;
          border-radius: 0.4rem;
          background: #fff;
          color: #555;
          font-size: 0.68rem;
        }

        .sap__url-text {
          display: inline-flex;
          align-items: center;
          min-width: 0;
          overflow: hidden;
          white-space: nowrap;
        }

        .sap__url-caret {
          display: inline-block;
          width: 1px;
          height: 0.85em;
          margin-left: 1px;
          background: #444;
          animation: sap-blink 0.85s steps(1) infinite;
        }

        .sap__page {
          min-height: 11.5rem;
          background: #fff;
        }

        .sap__blank {
          min-height: 11.5rem;
          background: #fff;
        }

        .sap__crm {
          position: relative;
          padding: 0.7rem 0.75rem 0.85rem;
          background: #fff;
          animation: sap-fade 0.4s ease both;
        }

        .sap__crumbs {
          margin: 0 0 0.45rem;
          font-size: 0.65rem;
          color: #4a7ec7;
        }

        .sap__crumbs span {
          color: #9aa3b0;
        }

        .sap__crm-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          margin-bottom: 0.7rem;
        }

        .sap__crm-head h4 {
          margin: 0;
          font-size: 0.78rem;
          font-weight: 650;
          letter-spacing: -0.02em;
          color: #151515;
        }

        .sap__badge {
          display: inline-flex;
          align-items: center;
          padding: 0.12rem 0.45rem;
          border-radius: 999px;
          font-size: 0.58rem;
          font-weight: 600;
          color: #fff;
          line-height: 1.3;
        }

        .sap__badge--active {
          background: #2f9d5a;
        }

        .sap__badge--pending {
          background: #d89a2b;
        }

        .sap__meta {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.55rem 0.75rem;
          margin-bottom: 0.85rem;
        }

        .sap__meta span {
          display: block;
          margin-bottom: 0.12rem;
          font-size: 0.55rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: #8a8a88;
        }

        .sap__meta strong {
          font-size: 0.68rem;
          font-weight: 550;
          color: #222;
        }

        .sap__table-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.4rem;
          font-size: 0.68rem;
          font-weight: 600;
          color: #333;
        }

        .sap__view-all {
          color: #3b7ddd;
          font-size: 0.65rem;
          font-weight: 500;
        }

        .sap__table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.62rem;
        }

        .sap__table th {
          padding: 0.35rem 0.25rem;
          border-bottom: 1px solid #ececeb;
          text-align: left;
          font-weight: 550;
          color: #7a7a78;
        }

        .sap__table td {
          padding: 0.4rem 0.25rem;
          border-bottom: 1px solid #f1f1f0;
          color: #333;
        }

        .sap__link {
          color: #3b7ddd;
          font-weight: 500;
        }

        .sap__cursor {
          position: absolute;
          z-index: 2;
          pointer-events: none;
          filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.25));
          transition: left 0.45s ease, top 0.45s ease;
          transform: translate(-10%, -10%);
        }

        .sap__cursor-icon {
          display: block;
        }

        @keyframes sap-pop {
          from {
            opacity: 0;
            transform: translateY(8px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes sap-fade {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes sap-blink {
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
