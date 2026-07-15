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
      className={`scwa${focused ? " is-focused" : ""}${className ? ` ${className}` : ""}`}
      style={style}
      role="button"
      tabIndex={0}
      onClick={onFocus}
      onKeyDown={onKeyDown}
      aria-label="Apps window"
    >
      <aside className="scwa__sidebar" aria-hidden>
        <div className="scwa__sidebar-top">
          <span className="scwa__avatar">LA</span>
          <span className="scwa__nav-icon">
            <IoCreateOutline size={15} />
          </span>
          <span className="scwa__nav-icon is-active">
            <IoHomeOutline size={15} />
          </span>
          <span className="scwa__nav-icon">
            <IoCalendarOutline size={15} />
          </span>
        </div>
        <div className="scwa__sidebar-bottom">
          <IoPersonAddOutline size={15} />
          <IoSettingsOutline size={15} />
        </div>
      </aside>

      <div className="scwa__main">
        <header className="scwa__header">
          <span className="scwa__logo">convey.</span>
        </header>

        <div className="scwa__content">
          <h3 className="scwa__title">Apps</h3>
          <p className="scwa__desc">
            Set up your Digital Teammates like a new hire. Configure role based
            access to apps and services they&apos;ll need to be productive in
            your org.
          </p>

          <section className="scwa__block">
            <div className="scwa__block-head">
              <h4>Connected Apps</h4>
              <span className="scwa__btn">Add New</span>
            </div>

            <div className="scwa__table-head scwa__table-head--connected">
              <span />
              <span>Credential Type</span>
              <span>Note</span>
            </div>

            <ul className="scwa__rows">
              {CONNECTED.map((app) => (
                <li key={app.id} className="scwa__row scwa__row--connected">
                  <div className="scwa__app">
                    <span
                      className="scwa__app-icon"
                      style={{ background: app.color }}
                    >
                      {app.letter}
                    </span>
                    <span className="scwa__app-name">{app.name}</span>
                  </div>
                  <span className="scwa__cell">{app.credentials}</span>
                  <span className="scwa__cell">{app.note}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="scwa__block scwa__block--rec">
            <div className="scwa__block-head">
              <h4>Recommended Apps</h4>
              <span className="scwa__btn scwa__btn--filter">
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

            <div className="scwa__table-head scwa__table-head--rec">
              <span />
              <span>Use Cases</span>
            </div>

            <ul className="scwa__rows">
              {RECOMMENDED.map((app) => (
                <li key={app.id} className="scwa__row scwa__row--rec">
                  <div className="scwa__app">
                    <span
                      className="scwa__app-icon"
                      style={{ background: app.color }}
                    >
                      {app.letter}
                    </span>
                    <span className="scwa__app-name">{app.name}</span>
                  </div>
                  <span className="scwa__cell">{app.useCase}</span>
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
          font-family: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
          color: #1a1a1a;
          cursor: pointer;
          transition: box-shadow 0.3s ease;
        }

        .scwa.is-focused {
          box-shadow: 0 26px 50px -24px rgba(0, 0, 0, 0.5);
        }

        .scwa__sidebar {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          padding: 0.65rem 0 0.7rem;
          background: #f4f4f2;
          border-right: 1px solid #ebebeb;
          color: #5a5a5a;
        }

        .scwa__sidebar-top,
        .scwa__sidebar-bottom {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.55rem;
        }

        .scwa__avatar {
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

        .scwa__nav-icon {
          display: grid;
          place-items: center;
          width: 1.55rem;
          height: 1.55rem;
          border-radius: 0.3rem;
          color: #666;
        }

        .scwa__nav-icon.is-active {
          background: rgba(0, 0, 0, 0.06);
          color: #222;
        }

        .scwa__main {
          display: grid;
          grid-template-rows: auto minmax(0, 1fr);
          min-width: 0;
          background: #fafaf9;
        }

        .scwa__header {
          padding: 0.55rem 0.85rem 0.2rem;
        }

        .scwa__logo {
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: #1a1a1a;
        }

        .scwa__content {
          min-height: 0;
          overflow: auto;
          padding: 0.15rem 0.85rem 0.85rem;
          scrollbar-width: thin;
        }

        .scwa__title {
          margin: 0 0 0.35rem;
          font-size: 1.15rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: #141414;
        }

        .scwa__desc {
          margin: 0 0 0.85rem;
          max-width: 34rem;
          font-size: 0.62rem;
          line-height: 1.45;
          color: #7a7a78;
        }

        .scwa__block {
          margin-bottom: 0.85rem;
        }

        .scwa__block--rec {
          margin-bottom: 0;
        }

        .scwa__block-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          margin-bottom: 0.45rem;
        }

        .scwa__block-head h4 {
          margin: 0;
          font-size: 0.72rem;
          font-weight: 650;
          color: #222;
        }

        .scwa__btn {
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

        .scwa__table-head {
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

        .scwa__table-head--connected {
          grid-template-columns: minmax(7rem, 1.1fr) minmax(0, 1.2fr) minmax(0, 1fr);
        }

        .scwa__table-head--rec {
          grid-template-columns: minmax(7rem, 0.9fr) minmax(0, 1.4fr);
        }

        .scwa__rows {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .scwa__row {
          display: grid;
          gap: 0.5rem;
          align-items: center;
          padding: 0.38rem 0.15rem;
          border-bottom: 1px solid #f0f0ee;
        }

        .scwa__row--connected {
          grid-template-columns: minmax(7rem, 1.1fr) minmax(0, 1.2fr) minmax(0, 1fr);
        }

        .scwa__row--rec {
          grid-template-columns: minmax(7rem, 0.9fr) minmax(0, 1.4fr);
        }

        .scwa__app {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          min-width: 0;
        }

        .scwa__app-icon {
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

        .scwa__app-name {
          font-size: 0.58rem;
          font-weight: 600;
          color: #222;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .scwa__cell {
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
