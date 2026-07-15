"use client";

import type { CSSProperties, KeyboardEvent } from "react";
import usersData from "@/data/ShowcaseCUsers.json";

type ShowcaseCWindowCProps = {
  focused: boolean;
  onFocus: () => void;
  style?: CSSProperties;
  className?: string;
};

type User = {
  id: string;
  email: string;
  role: string;
  agents: string[];
};

const USERS = usersData as User[];

export function ShowcaseCWindowC({
  focused,
  onFocus,
  style,
  className = "",
}: ShowcaseCWindowCProps) {
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onFocus();
    }
  };

  return (
    <div
      className={`scwc${focused ? " is-focused" : ""}${className ? ` ${className}` : ""}`}
      style={style}
      role="button"
      tabIndex={0}
      onClick={onFocus}
      onKeyDown={onKeyDown}
      aria-label="User Access Management window"
    >
      <header className="scwc__header">
        <span className="scwc__logo">convey.</span>
        <span className="scwc__btn">Add Users +</span>
      </header>

      <div className="scwc__body">
        <h3 className="scwc__title">User Access Management</h3>
        <p className="scwc__desc">
          Assign users to Digital Teammates and control access through
          role-based permissions.
        </p>

        <div className="scwc__table-head">
          <span>Email</span>
          <span>Role</span>
          <span>Agents</span>
        </div>

        <ul className="scwc__rows">
          {USERS.map((user) => (
            <li key={user.id} className="scwc__row">
              <span className="scwc__email">{user.email}</span>
              <span className="scwc__role">
                {user.role}
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
              <div className="scwc__tags">
                {user.agents.map((agent) => (
                  <span key={agent} className="scwc__tag">
                    {agent}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        .scwc {
          display: flex;
          flex-direction: column;
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

        .scwc.is-focused {
          box-shadow: 0 26px 50px -24px rgba(0, 0, 0, 0.5);
        }

        .scwc__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          padding: 0.7rem 0.9rem 0.35rem;
        }

        .scwc__logo {
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: -0.03em;
        }

        .scwc__btn {
          padding: 0.3rem 0.55rem;
          border: 1px solid #dadad8;
          border-radius: 0.35rem;
          background: #fff;
          font-size: 0.55rem;
          font-weight: 600;
          color: #333;
          white-space: nowrap;
        }

        .scwc__body {
          min-height: 0;
          flex: 1;
          overflow: auto;
          padding: 0.2rem 0.9rem 0.9rem;
          scrollbar-width: thin;
        }

        .scwc__title {
          margin: 0 0 0.3rem;
          font-size: 1.05rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: #141414;
        }

        .scwc__desc {
          margin: 0 0 0.85rem;
          max-width: 28rem;
          font-size: 0.62rem;
          line-height: 1.45;
          color: #7a7a78;
        }

        .scwc__table-head {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) 5.2rem minmax(0, 1.25fr);
          gap: 0.5rem;
          padding: 0 0.1rem 0.35rem;
          font-size: 0.5rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #9a9a98;
          border-bottom: 1px solid #ececeb;
        }

        .scwc__rows {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .scwc__row {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) 5.2rem minmax(0, 1.25fr);
          gap: 0.5rem;
          align-items: center;
          padding: 0.6rem 0.1rem;
          border-bottom: 1px solid #f0f0ee;
        }

        .scwc__email {
          font-size: 0.62rem;
          font-weight: 600;
          color: #222;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .scwc__role {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.3rem;
          width: 100%;
          padding: 0.28rem 0.4rem;
          border: 1px solid #e0e0de;
          border-radius: 0.3rem;
          background: #f7f7f6;
          font-size: 0.55rem;
          font-weight: 600;
          color: #333;
        }

        .scwc__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.28rem;
          min-width: 0;
        }

        .scwc__tag {
          padding: 0.18rem 0.4rem;
          border-radius: 0.28rem;
          background: #efefed;
          font-size: 0.5rem;
          font-weight: 600;
          color: #444;
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
}
