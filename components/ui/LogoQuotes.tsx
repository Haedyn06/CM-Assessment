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
    <div className={`logo-quotes${open ? " is-open" : ""}`} role="tooltip">
      <div className="logo-quotes__logo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt={logoAlt} />
      </div>
      <div className="logo-quotes__mark" aria-hidden>
        “
      </div>
      <p className="logo-quotes__quote">{quote}</p>
      <div className="logo-quotes__author">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={avatar} alt="" className="logo-quotes__avatar" />
        <div>
          <div className="logo-quotes__name">{name}</div>
          <div className="logo-quotes__title">{title}</div>
        </div>
      </div>

      <style>{`
        .logo-quotes {
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

        .logo-quotes.is-open {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transform: translate(-50%, 0) scale(1);
        }

        .logo-quotes__logo {
          display: flex;
          justify-content: center;
          margin-bottom: 0.85rem;
        }

        .logo-quotes__logo img {
          display: block;
          height: 1.35rem;
          width: auto;
          max-width: 7.5rem;
          object-fit: contain;
          filter: none;
          opacity: 0.85;
        }

        .logo-quotes__mark {
          margin-bottom: 0.2rem;
          font-size: 1.5rem;
          line-height: 1;
          color: #7fb3e0;
        }

        .logo-quotes__quote {
          margin: 0 0 1.1rem;
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: 0.8125rem;
          line-height: 1.55;
          color: #333;
        }

        .logo-quotes__author {
          display: flex;
          align-items: center;
          gap: 0.7rem;
        }

        .logo-quotes__avatar {
          width: 2.15rem;
          height: 2.15rem;
          border-radius: 999px;
          object-fit: cover;
        }

        .logo-quotes__name {
          font-size: 0.8125rem;
          font-weight: 650;
          color: #1a1a1a;
        }

        .logo-quotes__title {
          font-size: 0.75rem;
          color: #8a8a8a;
        }
      `}</style>
    </div>
  );
}
