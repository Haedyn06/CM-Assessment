export type ShowcaseAChatAttachment = {
  label: string;
};

export type ShowcaseAChatItem = {
  id: string;
  role: "ai" | "user";
  /** Message body (optional when only attachment/computer) */
  text?: string;
  /** Inline link after text (e.g. "contact us") */
  link?: {
    label: string;
    href: string;
  };
  /** Numbered plan steps under an AI message */
  steps?: string[];
  /** User attachment chip */
  attachment?: ShowcaseAChatAttachment;
  /** Nested "AI Larry's computer" CRM preview */
  showComputer?: boolean;
  /** Typewriter animate this message (AI responses only) */
  autowrite?: boolean;
};
