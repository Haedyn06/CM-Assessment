"use client";

import type { CSSProperties, KeyboardEvent } from "react";
import agentsData from "@/data/ShowcaseCAgents.json";

type ShowcaseCWindowBProps = {
  focused: boolean;
  onFocus: () => void;
  style?: CSSProperties;
  className?: string;
};

type Agent = {
  id: string;
  name: string;
  alias: string;
  team: string;
  initials: string;
  tone: string;
};

const AGENTS = agentsData as Agent[];

export function ShowcaseCWindowB({
  focused,
  onFocus,
  style,
  className = "",
}: ShowcaseCWindowBProps) {
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onFocus();
    }
  };

  return (
    <div
      className={`scwb${focused ? " isFocused" : ""}${className ? ` ${className}` : ""}`}
      style={style}
      role="button"
      tabIndex={0}
      onClick={onFocus}
      onKeyDown={onKeyDown}
      aria-label="Manage Agent Identities window"
    >
      <header className="scwbHeader">
        <span className="scwbLogo">bear.</span>
        <span className="scwbBtn">Add bear +</span>
      </header>

      <div className="scwbBody hideScrollbar">
        <h3 className="scwbTitle">Manage bear Identities</h3>
        <p className="scwbDesc">
          Create and manage each Digital bear&apos;s identities.
        </p>

        <div className="scwbTableHead">
          <span>Agents</span>
          <span>Alias</span>
          <span>Team</span>
        </div>

        <ul className="scwbRows">
          {AGENTS.map((agent) => (
            <li key={agent.id} className="scwbRow">
              <div className="scwbAgent">
                <span
                  className="scwbAvatar"
                  style={{ background: agent.tone }}
                >
                  {agent.initials}
                </span>
                <span className="scwbName">{agent.name}</span>
              </div>
              <span className="scwbCell">{agent.alias}</span>
              <span className="scwbCell">{agent.team}</span>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        .scwb {
          display: flex;
          flex-direction: column;
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

        .scwb.isFocused {
          box-shadow: 0 26px 50px -24px rgba(0, 0, 0, 0.5);
        }

        .scwbHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          padding: 0.7rem 0.9rem 0.35rem;
        }

        .scwbLogo {
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: -0.03em;
        }

        .scwbBtn {
          padding: 0.3rem 0.55rem;
          border: 1px solid #dadad8;
          border-radius: 0.35rem;
          background: #fff;
          font-size: 0.55rem;
          font-weight: 600;
          color: #333;
          white-space: nowrap;
        }

        .scwbBody {
          min-height: 0;
          flex: 1;
          overflow: auto;
          padding: 0.2rem 0.9rem 0.9rem;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .scwbTitle {
          margin: 0 0 0.3rem;
          font-size: 1.05rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: #141414;
        }

        .scwbDesc {
          margin: 0 0 0.85rem;
          font-size: 0.62rem;
          line-height: 1.45;
          color: #7a7a78;
        }

        .scwbTableHead {
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr) minmax(0, 1fr);
          gap: 0.5rem;
          padding: 0 0.1rem 0.35rem;
          font-size: 0.5rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #9a9a98;
          border-bottom: 1px solid #ececeb;
        }

        .scwbRows {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .scwbRow {
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr) minmax(0, 1fr);
          gap: 0.5rem;
          align-items: center;
          padding: 0.55rem 0.1rem;
          border-bottom: 1px solid #f0f0ee;
        }

        .scwbAgent {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          min-width: 0;
        }

        .scwbAvatar {
          display: grid;
          place-items: center;
          width: 1.35rem;
          height: 1.35rem;
          border-radius: 999px;
          color: #fff;
          font-size: 0.42rem;
          font-weight: 700;
          flex-shrink: 0;
        }

        .scwbName {
          font-size: 0.62rem;
          font-weight: 650;
          color: #222;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .scwbCell {
          font-size: 0.58rem;
          color: #666;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
    </div>
  );
}
