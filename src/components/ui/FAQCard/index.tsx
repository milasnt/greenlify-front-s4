import type { ReactNode } from "react";
import { FaChevronDown } from "react-icons/fa";
import Reveal from "../../layout/Reveal";


interface FAQCardProps {
    question: string;
    answer: ReactNode;
}

export default function FAQCard({
    question,
    answer,
}: FAQCardProps) {

    return (
        <details className="group overflow-hidden rounded-2xl border border-border bg-bg-card transition duration-300 hover:border-green-primary/40 hover:shadow-custom-md open:border-green-primary/40">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 font-heading text-sm sm:gap-6 sm:px-6 sm:py-5 font-bold text-text-main [&::-webkit-details-marker]:hidden">
                <span>{question}</span>
                <FaChevronDown className="shrink-0 text-xs text-green-primary transition duration-300 group-open:rotate-180"/>
            </summary>

            <div className="border-t border-border bg-bg-soft px-4 py-4 text-sm sm:px-6 sm:py-5 leading-relaxed text-text-secondary">
                {answer}
            </div>
        </details>
    );
}

interface FAQListProps {
    items: FAQCardProps[];
}

export function FAQList({ items }: FAQListProps) {
    return (
        <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-3">
            {items.map((item, index) => (
                <Reveal key={item.question} delay={Math.min(index, 4) * 60}>
                    <FAQCard question={item.question} answer={item.answer} />
                </Reveal>
            ))}
        </div>
    );
}

interface ScoreRow {
    label: string;
    values: number[];
}

interface ScoreTableProps {
    intro: string;
    columns: string[];
    rows: ScoreRow[];
}

export function ScoreTable({ intro, columns, rows }: ScoreTableProps) {
    const cellStyles = "border border-border px-3 py-2.5 sm:px-4 sm:py-3";

    return (
        <div className="space-y-4">
            <p>{intro}</p>

            <div className="overflow-x-auto">
                <table className="w-full min-w-120 border-collapse text-center text-sm">
                    <thead>
                        <tr className="bg-green-lighter text-green-dark">
                            <th className={`${cellStyles} text-left font-semibold`}>Impacto/Dificuldade</th>

                            {columns.map((column) => (
                                <th key={column} className={`${cellStyles} font-semibold`}>{column}</th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {rows.map((row) => (
                            <tr key={row.label}>
                                <th className={`${cellStyles} bg-bg-soft text-left font-semibold text-text-main`}>{row.label}</th>

                                {row.values.map((value, index) => (
                                    <td key={columns[index]} className={`${cellStyles} font-heading font-bold text-green-primary`}>{value}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
