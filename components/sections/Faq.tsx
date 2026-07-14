"use client";

import { useId, useState } from "react";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "data",
    question: "How does Convey use my data?",
    answer:
      "You retain all ownership over your data, and it is never used for training. Convey also maintains zero data retention agreements with all our model providers.",
  },
  {
    id: "security",
    question: "What security certifications does Convey have?",
    answer:
      "Convey is SOC 2 Type II certified, with regular penetration testing. Reports are available in our Trust Center.",
  },
  {
    id: "systems",
    question:
      "My company runs on a lot of different, sometimes older systems. Will that be a problem?",
    answer:
      "Certainly not! Convey teammates can connect to any and all systems, whether programmatically, or by clicking around their computers just like you would.",
  },
  {
    id: "use-cases",
    question: "What are the most common use cases for this platform?",
    answer:
      "Common use cases include: customer support automation, data entry and processing, scheduling and coordination, report generation, lead qualification, and workflow orchestration across multiple tools and systems. If you can teach it to a remote employee, you can train AI to own that task.",
  },
  {
    id: "billing",
    question: "How does billing work?",
    answer:
      "Billing is based on your selected plan, which scales with the value you're getting from the platform. Contact sales to decide on the right plan for your team.",
  },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`faq__chevron${open ? " is-open" : ""}`}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FAQSection() {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="faq">
      <div className="faq__inner">
        <div className="faq__aside">
          <h2 className="faq__title">FAQs</h2>
          <a className="faq__link" href="#contact">
            Can&apos;t find your answers?
          </a>
        </div>

        <div className="faq__list" role="list">
          {FAQ_ITEMS.map((item) => {
            const open = openId === item.id;
            const panelId = `${baseId}-${item.id}-panel`;
            const buttonId = `${baseId}-${item.id}-button`;

            return (
              <div key={item.id} className="faq__item" role="listitem">
                <button
                  id={buttonId}
                  type="button"
                  className="faq__question"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() =>
                    setOpenId((current) => (current === item.id ? null : item.id))
                  }
                >
                  <span>{item.question}</span>
                  <Chevron open={open} />
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`faq__answer${open ? " is-open" : ""}`}
                >
                  <div className="faq__answer-inner">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .faq {
          position: relative;
          padding: 5rem 1.25rem 5.5rem;
          background: #f3f3f1;
          color: #1a1a1a;
          font-family: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
        }

        @media (min-width: 640px) {
          .faq {
            padding: 5.5rem 2rem 6rem;
          }
        }

        @media (min-width: 1024px) {
          .faq {
            padding: 6rem 3rem 6.5rem;
          }
        }

        .faq__inner {
          display: grid;
          gap: 2.5rem;
          max-width: 68rem;
          margin: 0 auto;
        }

        @media (min-width: 900px) {
          .faq__inner {
            grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.7fr);
            gap: 4rem;
            align-items: start;
          }
        }

        .faq__aside {
          padding-top: 0.15rem;
        }

        .faq__title {
          margin: 0 0 0.85rem;
          font-size: clamp(2rem, 4vw, 2.75rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: #151515;
        }

        .faq__link {
          display: inline-block;
          font-size: 0.95rem;
          color: #6a6a6a;
          text-decoration: underline;
          text-underline-offset: 0.18em;
          transition: color 0.2s ease;
        }

        .faq__link:hover {
          color: #1f1f1f;
        }

        .faq__list {
          border-top: 1px solid #d7d7d7;
        }

        .faq__item {
          border-bottom: 1px solid #d7d7d7;
        }

        .faq__question {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: space-between;
          gap: 1.25rem;
          min-height: 3.75rem;
          padding: 1.15rem 0;
          border: 0;
          background: transparent;
          text-align: left;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 500;
          color: #2a2a2a;
          line-height: 1.4;
        }

        .faq__chevron {
          flex-shrink: 0;
          color: rgba(30, 30, 50, 0.4);
          transition: transform 0.25s ease, color 0.2s ease;
        }

        .faq__chevron.is-open {
          transform: rotate(180deg);
          color: rgba(30, 30, 50, 0.65);
        }

        .faq__answer {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.28s ease;
        }

        .faq__answer.is-open {
          grid-template-rows: 1fr;
        }

        .faq__answer-inner {
          overflow: hidden;
        }

        .faq__answer-inner p {
          margin: 0;
          padding: 0 1.75rem 1.2rem 0;
          max-width: 42rem;
          font-size: 0.95rem;
          line-height: 1.65;
          color: #6f6f6f;
        }
      `}</style>
    </section>
  );
}
