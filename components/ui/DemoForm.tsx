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
import { useUser } from "@clerk/nextjs";
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
  const { user, isLoaded } = useUser();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  const [rendered, setRendered] = useState(false);
  const [closing, setClosing] = useState(false);
  const [prevOpen, setPrevOpen] = useState(open);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "ok" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  const [seeded, setSeeded] = useState(false);

  const sessionEmail =
    user?.primaryEmailAddress?.emailAddress ??
    user?.emailAddresses[0]?.emailAddress ??
    "";

  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setRendered(true);
      setClosing(false);
      setStatus("idle");
      setError("");
      setSeeded(false);
    } else if (rendered) {
      setClosing(true);
    }
  }

  if (open && isLoaded && user && !seeded) {
    setSeeded(true);
    setFirstName(user.firstName ?? "");
    setLastName(user.lastName ?? "");
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

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "saving") return;

    setStatus("saving");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "contentType": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          company,
          website,
          message,
        }),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        setStatus("error");
        setError(data.error ?? "Unable to submit form");
        return;
      }

      setStatus("ok");
      setCompany("");
      setWebsite("");
      setMessage("");
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  };

  const phase = closing ? "exit" : "enter";

  return createPortal(
    <div className={`demoForm demoForm${phase[0]!.toUpperCase()}${phase.slice(1)}`} role="presentation">
      <button
        type="button"
        className="demoFormBackdrop"
        aria-label="Close demo form"
        onClick={onClose}
      />

      <div
        className="demoFormPanel hideScrollbar"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <button
          type="button"
          className="demoFormClose"
          aria-label="Close"
          onClick={onClose}
        >
          <IoClose size={22} />
        </button>

        <div className="demoFormInner">
          <h2 id={titleId} className="demoFormTitle">
            Let&apos;s get you connected with a Bear expert.
          </h2>
          <p className="demoFormSub">
            See the full power of Bear digital teammates in a 30 minute demo.
          </p>

          <form className="demoFormForm" onSubmit={onSubmit}>
            <label className="demoFormField">
              <span>Business Email</span>
              <input
                type="email"
                name="email"
                value={sessionEmail}
                readOnly
                tabIndex={-1}
                aria-readonly="true"
                className="demoFormInputLocked"
                title="Email comes from your signed-in Clerk account"
              />
              <small className="demoFormNote">
                Pulled from your Clerk session (used as userID)
              </small>
            </label>

            <div className="demoFormRow">
              <label className="demoFormField">
                <span>First Name</span>
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  autoComplete="givenName"
                  required
                />
              </label>
              <label className="demoFormField">
                <span>Last Name</span>
                <input
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                  autoComplete="familyName"
                  required
                />
              </label>
            </div>

            <label className="demoFormField">
              <span>Company</span>
              <input
                type="text"
                name="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Acme Inc."
                autoComplete="organization"
              />
            </label>

            <label className="demoFormField">
              <span>Company Website</span>
              <input
                type="text"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="bear.dev"
                autoComplete="url"
              />
            </label>

            <label className="demoFormField">
              <span>How can we help?</span>
              <textarea
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your team and use case"
                rows={3}
              />
            </label>

            {status === "error" ? (
              <p className="demoFormFeedback demoFormFeedbackError">
                {error}
              </p>
            ) : null}
            {status === "ok" ? (
              <p className="demoFormFeedback demoFormFeedbackOk">
                Thanks — your request was saved. We&apos;ll be in touch.
              </p>
            ) : null}

            <button
              type="submit"
              className="demoFormSubmit"
              disabled={status === "saving" || !sessionEmail}
            >
              {status === "saving" ? "Submitting…" : "Book a Demo"}
            </button>
          </form>

          <div className="demoFormTrust">
            <p className="demoFormTrustLabel">
              TRUSTED BY LEADING BUSINESSES
            </p>
            <ul className="demoFormLogos">
              {LogoItems.map((logo) => (
                <li key={logo.id}>
                  <img src={logo.src} alt={logo.alt} className="demoFormLogo" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        .demoForm {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: grid;
          place-items: center;
          padding: 1.25rem;
        }

        .demoFormExit {
          pointer-events: none;
        }

        .demoFormBackdrop {
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

        .demoFormEnter .demoFormBackdrop {
          animation: demoFormFadeIn ${ANIM_MS}ms ease both;
        }

        .demoFormExit .demoFormBackdrop {
          animation: demoFormFadeOut ${ANIM_MS}ms ease both;
        }

        .demoFormPanel {
          position: relative;
          z-index: 1;
          width: min(100%, 34rem);
          max-height: min(92vh, 46rem);
          overflow: auto;
          border-radius: 0.85rem;
          background: linear-gradient(180deg, #f7f7f8 0%, #ececf0 100%);
          box-shadow: 0 28px 60px -28px rgba(0, 0, 0, 0.55);
          scrollbar-width: none;
          -ms-overflow-style: none;
          opacity: 1;
          transform: none;
        }

        .demoFormEnter .demoFormPanel {
          animation: demoFormPopIn 420ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .demoFormExit .demoFormPanel {
          animation: demoFormPopOut ${ANIM_MS}ms cubic-bezier(0.4, 0, 1, 1) both;
        }

        @keyframes demoFormFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes demoFormFadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        @keyframes demoFormPopIn {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.94);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes demoFormPopOut {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(12px) scale(0.96);
          }
        }

        .demoFormClose {
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

        .demoFormClose:hover {
          background: rgba(0, 0, 0, 0.06);
          color: #111;
        }

        .demoFormInner {
          padding: 2.4rem 1.75rem 2rem;
          text-align: center;
          font-family: var(--fontGeistSans), ui-sans-serif, system-ui, sans-serif;
        }

        @media (min-width: 640px) {
          .demoFormInner {
            padding: 2.75rem 2.5rem 2.25rem;
          }
        }

        .demoFormTitle {
          margin: 0 auto 0.75rem;
          max-width: 18ch;
          font-size: clamp(1.55rem, 3.4vw, 1.95rem);
          font-weight: 700;
          letter-spacing: -0.035em;
          line-height: 1.15;
          color: #141414;
        }

        .demoFormSub {
          margin: 0 auto 1.85rem;
          max-width: 28ch;
          font-size: 0.98rem;
          line-height: 1.45;
          color: #6a6a6a;
        }

        .demoFormForm {
          display: grid;
          gap: 1rem;
          text-align: left;
          max-width: 24rem;
          margin: 0 auto;
        }

        .demoFormRow {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }

        .demoFormField {
          display: grid;
          gap: 0.4rem;
        }

        .demoFormField span {
          font-size: 0.88rem;
          font-weight: 650;
          color: #1f1f1f;
        }

        .demoFormField input,
        .demoFormField textarea {
          width: 100%;
          padding: 0.78rem 0.85rem;
          border: 1px solid #e0e0e2;
          border-radius: 0.55rem;
          background: #f3f3f4;
          color: #222;
          font-family: var(--fontGeistMono), ui-monospace, monospace;
          font-size: 0.88rem;
          outline: none;
          resize: vertical;
        }

        .demoFormField input::placeholder,
        .demoFormField textarea::placeholder {
          color: #9aa3b2;
        }

        .demoFormField input:focus,
        .demoFormField textarea:focus {
          border-color: #b8b8be;
          background: #f7f7f8;
        }

        .demoFormInputLocked {
          background: #e8e8ea !important;
          color: #555 !important;
          cursor: not-allowed;
        }

        .demoFormNote {
          font-size: 0.7rem;
          color: #8a8a8a;
        }

        .demoFormFeedback {
          margin: 0;
          font-size: 0.85rem;
          text-align: center;
        }

        .demoFormFeedbackError {
          color: #b42318;
        }

        .demoFormFeedbackOk {
          color: #027a48;
        }

        .demoFormSubmit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          justify-self: center;
          margin-top: 0.35rem;
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

        .demoFormSubmit:hover:not(:disabled) {
          background: #2a2a2a;
        }

        .demoFormSubmit:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .demoFormTrust {
          margin-top: 2.4rem;
        }

        .demoFormTrustLabel {
          margin: 0 0 1.1rem;
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          color: #9a9a9a;
        }

        .demoFormLogos {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 1.1rem 1.35rem;
        }

        .demoFormLogo {
          width: auto;
          height: 1.15rem;
          object-fit: contain;
          filter: grayscale(1) opacity(0.55);
        }

        @media (min-width: 640px) {
          .demoFormLogo {
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
