"use client";

import { useId, useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { useDemoForm } from "@/components/ui/DemoForm";

import FaqData from "@/data/FaqItem.json";
import type { FaqItem } from "@/types/FaqItem";
import "@/styles/Faq.css";

const FaqItems = FaqData as FaqItem[];

export function FAQSection() {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(null);
  const { openDemoForm } = useDemoForm();

  return (
    <section className="faq">
      <div className="faqInner">

        {/* Title */}
        <div className="faqAside">
          <h2 className="faqTitle">FAQs</h2>
          <button type="button" className="faqLink" onClick={openDemoForm}>
            Can&apos;t find your answers?
          </button>
        </div>

        {/* Faq List */}
        <div className="faqList" role="list">
          {FaqItems.map((item) => {
            const open = openId === item.id;
            const panelId = `${baseId}-${item.id}-panel`;
            const buttonId = `${baseId}-${item.id}-button`;

            return (
              <div key={item.id} className="faqItem" role="listitem">
                <button id={buttonId} type="button" className="faqQuestion" aria-expanded={open} aria-controls={panelId}
                  onClick={() => setOpenId((current) => (current === item.id ? null : item.id))}>
                  
                  <span>{item.question}</span>
                  <IoChevronDown className={`faqChevron${open ? " is-open" : ""}`} size={20}/>
                
                </button>

                <div id={panelId} role="region" aria-labelledby={buttonId} className={`faqAnswer${open ? " is-open" : ""}`}>
                  <div className="faqAnsInner">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
