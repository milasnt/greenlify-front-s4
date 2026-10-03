import type { ReactNode } from "react";
import { FaChevronDown } from "react-icons/fa";

interface FAQCardProps {
    question: string;
    answer: ReactNode;
}

export default function FAQCard({
    question,
    answer,
}: FAQCardProps) {
  
    return (
        <details
            className="group bg-bg-card border border-border rounded-2xl overflow-hidden transition duration-300 hover:translate-y-[0.3rem] hover:shadow-custom-md"
        >

        <summary
            className="list-none flex items-center justify-between gap-8 px-[2.4rem] py-8 cursor-pointer text-[1.5rem] font-semibold text-text-main [&::-webkit-details-marker]:hidden max-[992px]:px-8 max-[992px]:py-[1.8rem] max-[992px]:gap-6 max-[992px]:text-[1.45rem] max-[768px]:px-[1.8rem] max-[768px]:py-[1.6rem] max-[768px]:text-[1.4rem] max-[480px]:flex-col max-[480px]:items-start max-[480px]:gap-[0.8rem] max-[480px]:px-[1.6rem] max-[480px]:py-[1.4rem] max-[480px]:text-[1.3rem]"
        >

        <span>{question}</span>

        <FaChevronDown
            className="shrink-0 text-green-primary text-[1.2rem] transition duration-300 group-open:rotate-180 max-[480px]:self-end"
        />
      </summary>

      <div
        className="border-t border-border px-[2.4rem] py-[2.4rem] text-[1.4rem] leading-[1.8] text-text-secondary max-[992px]:p-8 max-[768px]:px-[1.8rem] max-[768px]:py-[1.8rem] max-[768px]:text-[1.35rem] max-[480px]:p-[1.6rem] max-[480px]:text-[1.3rem] max-[480px]:leading-[1.7]"
      >
        {answer}
      </div>
    </details>
  );
}