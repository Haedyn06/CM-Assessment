"use client";

export type LogoQuotesProps = {
  open: boolean;
  logoSrc: string;
  logoAlt: string;
  quote: string;
  name: string;
  title: string;
  avatar: string;
};

export function LogoQuotes({
  open,
  logoSrc,
  logoAlt,
  quote,
  name,
  title,
  avatar,
}: LogoQuotesProps) {
  return (
    <div className={`logoQuotes${open ? " isOpen" : ""}`} role="tooltip">
      <div className="logoQuotesLogo">
        <img src={logoSrc} alt={logoAlt} />
      </div>
      <div className="logoQuotesMark" aria-hidden>
        “
      </div>
      <p className="logoQuotesQuote">{quote}</p>
      <div className="logoQuotesAuthor">
        <img src={avatar} alt="" className="logoQuotesAvatar" />
        <div>
          <div className="logoQuotesName">{name}</div>
          <div className="logoQuotesTitle">{title}</div>
        </div>
      </div>

      <style>{`
        .logoQuotes {
          position: absolute;
          left: 50%;
          bottom: calc(100% + 0.85rem);
          width: min(22rem, 78vw);
          padding: 1.35rem 1.35rem 1.2rem;
          border-radius: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.7);
          background: rgba(255, 255, 255, 0.78);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 22px 60px -24px rgba(0, 0, 0, 0.28);
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transform: translate(-50%, 10px) scale(0.96);
          transition:
            opacity 0.28s ease,
            transform 0.32s cubic-bezier(0.22, 1, 0.36, 1),
            visibility 0.28s ease;
          z-index: 20;
          text-align: left;
        }

        .logoQuotes.isOpen {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transform: translate(-50%, 0) scale(1);
        }

        .logoQuotesLogo {
          display: flex;
          justify-content: center;
          margin-bottom: 0.85rem;
        }

        .logoQuotesLogo img {
          display: block;
          height: 1.35rem;
          width: auto;
          max-width: 7.5rem;
          object-fit: contain;
          filter: none;
          opacity: 0.85;
        }

        .logoQuotesMark {
          margin-bottom: 0.2rem;
          font-size: 1.5rem;
          line-height: 1;
          color: #7fb3e0;
        }

        .logoQuotesQuote {
          margin: 0 0 1.1rem;
          font-family: var(--fontGeistMono), ui-monospace, monospace;
          font-size: 0.8125rem;
          line-height: 1.55;
          color: #333;
        }

        .logoQuotesAuthor {
          display: flex;
          align-items: center;
          gap: 0.7rem;
        }

        .logoQuotesAvatar {
          width: 2.15rem;
          height: 2.15rem;
          border-radius: 999px;
          object-fit: cover;
        }

        .logoQuotesName {
          font-size: 0.8125rem;
          font-weight: 650;
          color: #1a1a1a;
        }

        .logoQuotesTitle {
          font-size: 0.75rem;
          color: #8a8a8a;
        }
      `}</style>
    </div>
  );
}
