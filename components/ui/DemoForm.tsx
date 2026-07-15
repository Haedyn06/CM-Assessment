"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";
import LogoItemsData from "@/data/LogoItem.json";
import type { LogoItem } from "@/types/LogoItem";

const LogoItems = LogoItemsData as LogoItem[];
const ANIM_MS = 360;

type DemoFormContextValue = {
  open: boolean;
  openDemoForm: () => void;
  closeDemoForm: () => void;
};

const DemoFormContext = createContext<DemoFormContextValue | null>(null);

export function useDemoForm() {
  const ctx = useContext(DemoFormContext);
  if (!ctx) {
    throw new Error("useDemoForm must be used within DemoFormProvider");
  }
  return ctx;
}

function subscribe() {
  return () => {};
}

function DemoFormModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const titleId = useId();
  const onCloseRef = useRef(onClose);
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  const [rendered, setRendered] = useState(false);
  const [closing, setClosing] = useState(false);
  const [prevOpen, setPrevOpen] = useState(open);

  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setRendered(true);
      setClosing(false);
    } else if (rendered) {
      setClosing(true);
    }
  }

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!closing) return;

    const timer = window.setTimeout(() => {
      setRendered(false);
      setClosing(false);
    }, ANIM_MS);

    return () => window.clearTimeout(timer);
  }, [closing]);

  useEffect(() => {
    if (!rendered || closing) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [rendered, closing]);

  if (!mounted || !rendered) return null;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const phase = closing ? "exit" : "enter";

  return createPortal(
    <div className={`demo-form demo-form--${phase}`} role="presentation">
      <button
        type="button"
        className="demo-form__backdrop"
        aria-label="Close demo form"
        onClick={onClose}
      />

      <div
        className="demo-form__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <button
          type="button"
          className="demo-form__close"
          aria-label="Close"
          onClick={onClose}
        >
          <IoClose size={22} />
        </button>

        <div className="demo-form__inner">
          <h2 id={titleId} className="demo-form__title">
            Let&apos;s get you connected with a Convey expert.
          </h2>
          <p className="demo-form__sub">
            See the full power of Convey digital teammates in a 30 minute demo.
          </p>

          <form className="demo-form__form" onSubmit={onSubmit}>
            <label className="demo-form__field">
              <span>Business Email</span>
              <input
                type="email"
                name="email"
                placeholder="example@convey.dev"
                autoComplete="email"
              />
            </label>

            <div className="demo-form__row">
              <label className="demo-form__field">
                <span>First Name</span>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  autoComplete="given-name"
                />
              </label>
              <label className="demo-form__field">
                <span>Last Name</span>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  autoComplete="family-name"
                />
              </label>
            </div>

            <label className="demo-form__field">
              <span>Company Website</span>
              <input
                type="text"
                name="website"
                placeholder="convey.dev"
                autoComplete="url"
              />
            </label>

            <button type="submit" className="demo-form__submit">
              Book a Demo
            </button>
          </form>

          <div className="demo-form__trust">
            <p className="demo-form__trust-label">
              TRUSTED BY LEADING BUSINESSES
            </p>
            <ul className="demo-form__logos">
              {LogoItems.map((logo) => (
                <li key={logo.id}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="demo-form__logo"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        .demo-form {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: grid;
          place-items: center;
          padding: 1.25rem;
        }

        .demo-form--exit {
          pointer-events: none;
        }

        .demo-form__backdrop {
          position: absolute;
          inset: 0;
          border: 0;
          margin: 0;
          padding: 0;
          background: rgba(20, 20, 20, 0.45);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          cursor: pointer;
          opacity: 1;
        }

        .demo-form--enter .demo-form__backdrop {
          animation: demo-form-fade-in ${ANIM_MS}ms ease both;
        }

        .demo-form--exit .demo-form__backdrop {
          animation: demo-form-fade-out ${ANIM_MS}ms ease both;
        }

        .demo-form__panel {
          position: relative;
          z-index: 1;
          width: min(100%, 34rem);
          max-height: min(92vh, 46rem);
          overflow: auto;
          border-radius: 0.85rem;
          background: linear-gradient(180deg, #f7f7f8 0%, #ececf0 100%);
          box-shadow: 0 28px 60px -28px rgba(0, 0, 0, 0.55);
          scrollbar-width: thin;
          opacity: 1;
          transform: none;
        }

        .demo-form--enter .demo-form__panel {
          animation: demo-form-pop-in 420ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .demo-form--exit .demo-form__panel {
          animation: demo-form-pop-out ${ANIM_MS}ms cubic-bezier(0.4, 0, 1, 1) both;
        }

        @keyframes demo-form-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes demo-form-fade-out {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        @keyframes demo-form-pop-in {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.94);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes demo-form-pop-out {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(12px) scale(0.96);
          }
        }

        .demo-form__close {
          position: absolute;
          top: 0.85rem;
          right: 0.85rem;
          z-index: 2;
          display: grid;
          place-items: center;
          width: 2rem;
          height: 2rem;
          border: 0;
          border-radius: 999px;
          background: transparent;
          color: #555;
          cursor: pointer;
        }

        .demo-form__close:hover {
          background: rgba(0, 0, 0, 0.06);
          color: #111;
        }

        .demo-form__inner {
          padding: 2.4rem 1.75rem 2rem;
          text-align: center;
          font-family: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
        }

        @media (min-width: 640px) {
          .demo-form__inner {
            padding: 2.75rem 2.5rem 2.25rem;
          }
        }

        .demo-form__title {
          margin: 0 auto 0.75rem;
          max-width: 18ch;
          font-size: clamp(1.55rem, 3.4vw, 1.95rem);
          font-weight: 700;
          letter-spacing: -0.035em;
          line-height: 1.15;
          color: #141414;
        }

        .demo-form__sub {
          margin: 0 auto 1.85rem;
          max-width: 28ch;
          font-size: 0.98rem;
          line-height: 1.45;
          color: #6a6a6a;
        }

        .demo-form__form {
          display: grid;
          gap: 1rem;
          text-align: left;
          max-width: 24rem;
          margin: 0 auto;
        }

        .demo-form__row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }

        .demo-form__field {
          display: grid;
          gap: 0.4rem;
        }

        .demo-form__field span {
          font-size: 0.88rem;
          font-weight: 650;
          color: #1f1f1f;
        }

        .demo-form__field input {
          width: 100%;
          padding: 0.78rem 0.85rem;
          border: 1px solid #e0e0e2;
          border-radius: 0.55rem;
          background: #f3f3f4;
          color: #222;
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: 0.88rem;
          outline: none;
        }

        .demo-form__field input::placeholder {
          color: #9aa3b2;
        }

        .demo-form__field input:focus {
          border-color: #b8b8be;
          background: #f7f7f8;
        }

        .demo-form__submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          justify-self: center;
          margin-top: 0.65rem;
          min-width: 9.5rem;
          padding: 0.72rem 1.35rem;
          border: 0;
          border-radius: 0.4rem;
          background: #121212;
          color: #fff;
          font-size: 0.95rem;
          font-weight: 650;
          cursor: pointer;
        }

        .demo-form__submit:hover {
          background: #2a2a2a;
        }

        .demo-form__trust {
          margin-top: 2.4rem;
        }

        .demo-form__trust-label {
          margin: 0 0 1.1rem;
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          color: #9a9a9a;
        }

        .demo-form__logos {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 1.1rem 1.35rem;
        }

        .demo-form__logo {
          width: auto;
          height: 1.15rem;
          object-fit: contain;
          filter: grayscale(1) opacity(0.55);
        }

        @media (min-width: 640px) {
          .demo-form__logo {
            height: 1.35rem;
          }
        }
      `}</style>
    </div>,
    document.body,
  );
}

export function DemoFormProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openDemoForm = useCallback(() => {
    setOpen(true);
  }, []);

  const closeDemoForm = useCallback(() => {
    setOpen(false);
  }, []);

  const value = useMemo(
    () => ({ open, openDemoForm, closeDemoForm }),
    [open, openDemoForm, closeDemoForm],
  );

  return (
    <DemoFormContext.Provider value={value}>
      {children}
      <DemoFormModal open={open} onClose={closeDemoForm} />
    </DemoFormContext.Provider>
  );
}
