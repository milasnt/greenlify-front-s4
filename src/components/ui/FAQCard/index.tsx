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
            className="group overflow-hidden rounded-2xl border border-border bg-bg-card transition duration-300 hover:border-green-primary/40 hover:shadow-custom-md open:border-green-primary/40"
        >
            <summary
                className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 font-heading text-sm font-bold text-text-main [&::-webkit-details-marker]:hidden"
            >
                <span>{question}</span>

                <FaChevronDown
                    className="shrink-0 text-xs text-green-primary transition duration-300 group-open:rotate-180"
                />
            </summary>

            <div className="border-t border-border bg-bg-soft px-6 py-5 text-sm leading-relaxed text-text-secondary">
                {answer}
            </div>
        </details>
    );
}