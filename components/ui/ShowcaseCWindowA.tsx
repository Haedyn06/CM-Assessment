"use client";

import type { CSSProperties, KeyboardEvent } from "react";
import {
  IoCalendarOutline,
  IoCreateOutline,
  IoHomeOutline,
  IoPersonAddOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import appsData from "@/data/ShowcaseCApps.json";

type ShowcaseCWindowAProps = {
  focused: boolean;
  onFocus: () => void;
  style?: CSSProperties;
  className?: string;
};

type AppRow = {
  id: string;
  name: string;
  letter: string;
  color: string;
  credentials: string;
  note: string;
};

type RecRow = {
  id: string;
  name: string;
  letter: string;
  color: string;
  useCase: string;
};

const CONNECTED = appsData.connected as AppRow[];
const RECOMMENDED = appsData.recommended as RecRow[];

export function ShowcaseCWindowA({
  focused,
  onFocus,
  style,
  className = "",
}: ShowcaseCWindowAProps) {
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onFocus();
    }
  };

  return (
    <div
      className={`scwa${focused ? " isFocused" : ""}${className ? ` ${className}` : ""}`}
      style={style}
      role="button"
      tabIndex={0}
      onClick={onFocus}
      onKeyDown={onKeyDown}
      aria-label="Apps window"
    >
      <aside className="scwaSidebar" aria-hidden>
        <div className="scwaSidebarTop">
          <span className="scwaAvatar">LA</span>
          <span className="scwaNavIcon">
            <IoCreateOutline size={15} />
          </span>
          <span className="scwaNavIcon isActive">
            <IoHomeOutline size={15} />
          </span>
          <span className="scwaNavIcon">
            <IoCalendarOutline size={15} />
          </span>
        </div>
        <div className="scwaSidebarBottom">
          <IoPersonAddOutline size={15} />
          <IoSettingsOutline size={15} />
        </div>
      </aside>

      <div className="scwaMain">
        <header className="scwaHeader">
          <span className="scwaLogo">bear.</span>
        </header>

        <div className="scwaContent hideScrollbar">
          <h3 className="scwaTitle">Apps</h3>
          <p className="scwaDesc">
            Set up your Digital Bears like a new hire. Configure role based
            access to apps and services they&apos;ll need to be productive in
            your org.
          </p>

          <section className="scwaBlock">
            <div className="scwaBlockHead">
              <h4>Connected Apps</h4>
              <span className="scwaBtn">Add New</span>
            </div>

            <div className="scwaTableHead scwaTableHeadConnected">
              <span />
              <span>Credential Type</span>
              <span>Note</span>
            </div>

            <ul className="scwaRows">
              {CONNECTED.map((app) => (
                <li key={app.id} className="scwaRow scwaRowConnected">
                  <div className="scwaApp">
                    <span
                      className="scwaAppIcon"
                      style={{ background: app.color }}
                    >
                      {app.letter}
                    </span>
                    <span className="scwaAppName">{app.name}</span>
                  </div>
                  <span className="scwaCell">{app.credentials}</span>
                  <span className="scwaCell">{app.note}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="scwaBlock scwaBlockRec">
            <div className="scwaBlockHead">
              <h4>Recommended Apps</h4>
              <span className="scwaBtn scwaBtnFilter">
                Filter by Department
                <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
                  <path
                    d="M2.2 3.6 5 6.4 7.8 3.6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>

            <div className="scwaTableHead scwaTableHeadRec">
              <span />
              <span>Use Cases</span>
            </div>

            <ul className="scwaRows">
              {RECOMMENDED.map((app) => (
                <li key={app.id} className="scwaRow scwaRowRec">
                  <div className="scwaApp">
                    <span
                      className="scwaAppIcon"
                      style={{ background: app.color }}
                    >
                      {app.letter}
                    </span>
                    <span className="scwaAppName">{app.name}</span>
                  </div>
                  <span className="scwaCell">{app.useCase}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <style>{`
        .scwa {
          display: grid;
          grid-template-columns: 2.35rem minmax(0, 1fr);
          width: 100%;
          height: 100%;
          border: 1px solid #e4e4e2;
          border-radius: 0.75rem;
          background: #fff;
          overflow: hidden;
          box-shadow: 0 18px 40px -28px rgba(0, 0, 0, 0.45);
          font-family: var(--fontGeistSans), ui-sans-serif, system-ui, sans-serif;
          color: #1a1a1a;
          cursor: pointer;
          transition: box-shadow 0.3s ease;
        }

        .scwa.isFocused {
          box-shadow: 0 26px 50px -24px rgba(0, 0, 0, 0.5);
        }

        .scwaSidebar {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          padding: 0.65rem 0 0.7rem;
          background: #f4f4f2;
          border-right: 1px solid #ebebeb;
          color: #5a5a5a;
        }

        .scwaSidebarTop,
        .scwaSidebarBottom {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.55rem;
        }

        .scwaAvatar {
          display: grid;
          place-items: center;
          width: 1.45rem;
          height: 1.45rem;
          border-radius: 999px;
          background: #2a2a2a;
          color: #fff;
          font-size: 0.45rem;
          font-weight: 700;
          letter-spacing: 0.02em;
        }

        .scwaNavIcon {
          display: grid;
          place-items: center;
          width: 1.55rem;
          height: 1.55rem;
          border-radius: 0.3rem;
          color: #666;
        }

        .scwaNavIcon.isActive {
          background: rgba(0, 0, 0, 0.06);
          color: #222;
        }

        .scwaMain {
          display: grid;
          grid-template-rows: auto minmax(0, 1fr);
          min-width: 0;
          background: #fafaf9;
        }

        .scwaHeader {
          padding: 0.55rem 0.85rem 0.2rem;
        }

        .scwaLogo {
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: #1a1a1a;
        }

        .scwaContent {
          min-height: 0;
          overflow: auto;
          padding: 0.15rem 0.85rem 0.85rem;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .scwaTitle {
          margin: 0 0 0.35rem;
          font-size: 1.15rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: #141414;
        }

        .scwaDesc {
          margin: 0 0 0.85rem;
          max-width: 34rem;
          font-size: 0.62rem;
          line-height: 1.45;
          color: #7a7a78;
        }

        .scwaBlock {
          margin-bottom: 0.85rem;
        }

        .scwaBlockRec {
          margin-bottom: 0;
        }

        .scwaBlockHead {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          margin-bottom: 0.45rem;
        }

        .scwaBlockHead h4 {
          margin: 0;
          font-size: 0.72rem;
          font-weight: 650;
          color: #222;
        }

        .scwaBtn {
          display: inline-flex;
          align-items: center;
          gap: 0.28rem;
          padding: 0.28rem 0.5rem;
          border: 1px solid #dadad8;
          border-radius: 0.35rem;
          background: #fff;
          font-size: 0.55rem;
          font-weight: 600;
          color: #333;
          white-space: nowrap;
        }

        .scwaTableHead {
          display: grid;
          gap: 0.5rem;
          padding: 0 0.15rem 0.28rem;
          font-size: 0.48rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #9a9a98;
          border-bottom: 1px solid #ececeb;
        }

        .scwaTableHeadConnected {
          grid-template-columns: minmax(7rem, 1.1fr) minmax(0, 1.2fr) minmax(0, 1fr);
        }

        .scwaTableHeadRec {
          grid-template-columns: minmax(7rem, 0.9fr) minmax(0, 1.4fr);
        }

        .scwaRows {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .scwaRow {
          display: grid;
          gap: 0.5rem;
          align-items: center;
          padding: 0.38rem 0.15rem;
          border-bottom: 1px solid #f0f0ee;
        }

        .scwaRowConnected {
          grid-template-columns: minmax(7rem, 1.1fr) minmax(0, 1.2fr) minmax(0, 1fr);
        }

        .scwaRowRec {
          grid-template-columns: minmax(7rem, 0.9fr) minmax(0, 1.4fr);
        }

        .scwaApp {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          min-width: 0;
        }

        .scwaAppIcon {
          display: grid;
          place-items: center;
          width: 1.15rem;
          height: 1.15rem;
          border-radius: 0.22rem;
          color: #fff;
          font-size: 0.42rem;
          font-weight: 700;
          flex-shrink: 0;
        }

        .scwaAppName {
          font-size: 0.58rem;
          font-weight: 600;
          color: #222;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .scwaCell {
          font-size: 0.55rem;
          color: #666;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
    </div>
  );
}
