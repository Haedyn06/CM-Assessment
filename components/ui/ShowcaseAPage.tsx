"use client";

import { useEffect, useRef, useState } from "react";
import { IoChevronBack, IoChevronForward, IoLockClosedOutline, IoRefreshOutline } from "react-icons/io5";
import { CursorIcon } from "@/components/ui/CursorIcon";

const FULL_URL = "crm.acme.com/orders";
const URL_CHAR_MS = 55;
const CURSOR_HOLD_MS = 520;
const LOOP_PAUSE_MS = 900;

const LINE_ITEMS = [
  { id: "oLI5550868", platform: "Display", product: "Audience", status: "Active" as const },
  { id: "oLI5550871", platform: "Video", product: "preRoll", status: "Active" as const },
  { id: "oLI5550890", platform: "CTV", product: "Select", status: "Pending" as const },
  { id: "oLI5550912", platform: "Display", product: "Retarget", status: "Pending" as const },
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
  active?: boolean;
  className?: string;
};

function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
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
      <div className="sapTitlebar">
        <span className="sapTraffic">
          <span />
          <span />
          <span />
        </span>
        <span className="sapTitle">
          <span className="sapAvatar">LA</span>
          AI Larry&apos;s computer
        </span>
      </div>

      <div className="sapBrowserBar">
        <span className="sapNav">
          <IoChevronBack size={12} />
          <IoChevronForward size={12} />
          <IoRefreshOutline size={12} />
        </span>
        <div className="sapUrl">
          <IoLockClosedOutline size={11} />
          <span className="sapUrlText">
            {urlText}
            {!showContent ? <span className="sapUrlCaret" /> : null}
          </span>
        </div>
      </div>

      <div className={`sapPage${showContent ? " isLoaded" : ""}`}>
        {showContent ? (
          <div className="sapCrm">
            <p className="sapCrumbs">Orders <span>/</span> ORD-2024-4891</p>
            <div className="sapCrmHead">
              <h4>Order: Spring Campaign — Acme Corp</h4>
              <span className="sapBadge sapBadgeActive">Active</span>
            </div>

            <div className="sapMeta">
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

            <div className="sapTableHead">
              <span>Order Line Items (4)</span>
              <span className="sapViewAll">View All</span>
            </div>

            <table className="sapTable">
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
                    <td className="sapLink">{item.id}</td>
                    <td>{item.platform}</td>
                    <td>{item.product}</td>
                    <td>
                      <span
                        className={`sapBadge sapBadge${item.status[0]!.toUpperCase()}${item.status.slice(1).toLowerCase()}`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {showCursor ? (
              <span className="sapCursor" 
                style={{ left: `${cursorPos.x}%`, top: `${cursorPos.y}%` }} >
                <CursorIcon />
              </span>
            ) : null}
          </div>
        ) : (
          <div className="sapBlank" />
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
          animation: sapPop 0.35s ease both;
          font-family: var(--fontGeistSans), ui-sans-serif, system-ui, sans-serif;
          color: #1d1d1d;
        }

        .sapTitlebar {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 2rem;
          padding: 0.35rem 0.65rem;
          background: #e4e4e2;
        }

        .sapTraffic {
          position: absolute;
          left: 0.65rem;
          display: flex;
          gap: 0.28rem;
        }

        .sapTraffic span {
          width: 0.45rem;
          height: 0.45rem;
          border-radius: 999px;
          background: #c7c7c5;
        }

        .sapTitle {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.68rem;
          font-weight: 500;
          color: #444;
        }

        .sapAvatar {
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

        .sapBrowserBar {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.4rem 0.55rem;
          background: #ececeb;
        }

        .sapNav {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: #8a8a88;
        }

        .sapUrl {
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

        .sapUrlText {
          display: inline-flex;
          align-items: center;
          min-width: 0;
          overflow: hidden;
          white-space: nowrap;
        }

        .sapUrlCaret {
          display: inline-block;
          width: 1px;
          height: 0.85em;
          margin-left: 1px;
          background: #444;
          animation: sapBlink 0.85s steps(1) infinite;
        }

        .sapPage {
          min-height: 11.5rem;
          background: #fff;
        }

        .sapBlank {
          min-height: 11.5rem;
          background: #fff;
        }

        .sapCrm {
          position: relative;
          padding: 0.7rem 0.75rem 0.85rem;
          background: #fff;
          animation: sapFade 0.4s ease both;
        }

        .sapCrumbs {
          margin: 0 0 0.45rem;
          font-size: 0.65rem;
          color: #4a7ec7;
        }

        .sapCrumbs span {
          color: #9aa3b0;
        }

        .sapCrmHead {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          margin-bottom: 0.7rem;
        }

        .sapCrmHead h4 {
          margin: 0;
          font-size: 0.78rem;
          font-weight: 650;
          letter-spacing: -0.02em;
          color: #151515;
        }

        .sapBadge {
          display: inline-flex;
          align-items: center;
          padding: 0.12rem 0.45rem;
          border-radius: 999px;
          font-size: 0.58rem;
          font-weight: 600;
          color: #fff;
          line-height: 1.3;
        }

        .sapBadgeActive {
          background: #2f9d5a;
        }

        .sapBadgePending {
          background: #d89a2b;
        }

        .sapMeta {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.55rem 0.75rem;
          margin-bottom: 0.85rem;
        }

        .sapMeta span {
          display: block;
          margin-bottom: 0.12rem;
          font-size: 0.55rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: #8a8a88;
        }

        .sapMeta strong {
          font-size: 0.68rem;
          font-weight: 550;
          color: #222;
        }

        .sapTableHead {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.4rem;
          font-size: 0.68rem;
          font-weight: 600;
          color: #333;
        }

        .sapViewAll {
          color: #3b7ddd;
          font-size: 0.65rem;
          font-weight: 500;
        }

        .sapTable {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.62rem;
        }

        .sapTable th {
          padding: 0.35rem 0.25rem;
          border-bottom: 1px solid #ececeb;
          text-align: left;
          font-weight: 550;
          color: #7a7a78;
        }

        .sapTable td {
          padding: 0.4rem 0.25rem;
          border-bottom: 1px solid #f1f1f0;
          color: #333;
        }

        .sapLink {
          color: #3b7ddd;
          font-weight: 500;
        }

        .sapCursor {
          position: absolute;
          z-index: 2;
          pointer-events: none;
          filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.25));
          transition: left 0.45s ease, top 0.45s ease;
          transform: translate(-10%, -10%);
        }

        @keyframes sapPop {
          from {
            opacity: 0;
            transform: translateY(8px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes sapFade {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes sapBlink {
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
