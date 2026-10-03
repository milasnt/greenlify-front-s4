import { useState } from "react";

export type RankingTab = "mensal" | "allTime" | "grupos";

interface RankingTabsProps {
    defaultTab?: RankingTab;
    onChange?: (tab: RankingTab) => void;
}

export default function RankingTabs({ defaultTab = "mensal", onChange }: RankingTabsProps) {
    const [activeTab, setActiveTab] = useState<RankingTab>(defaultTab);

    function handleSelect(tab: RankingTab) {
        setActiveTab(tab);
        onChange?.(tab);
    }

    return (
        <div className="mb-8 flex gap-2 rounded-2xl border border-border bg-bg-card p-2 max-[768px]:gap-[1.6rem] max-[480px]:gap-[1.2rem] max-[480px]:flex-col">
            <button
                type="button"
                onClick={() => handleSelect("mensal")}
                className={`flex-1 rounded-xl px-6 py-4 text-[1.5rem] font-semibold transition duration-300 ${activeTab === "mensal" ? "bg-green-primary text-bg" : "text-text-secondary hover:bg-green-ultra-light hover:text-green-primary"}`}
            >
                Mensal
            </button>

            <button
                type="button"
                onClick={() => handleSelect("allTime")}
                className={`flex-1 rounded-xl px-6 py-4 text-[1.5rem] font-semibold transition duration-300 ${activeTab === "allTime" ? "bg-green-primary text-bg" : "text-text-secondary hover:bg-green-ultra-light hover:text-green-primary"}`}
            >
                All Time
            </button>

            <button
                type="button"
                onClick={() => handleSelect("grupos")}
                className={`flex-1 rounded-xl px-6 py-4 text-[1.5rem] font-semibold transition duration-300 ${activeTab === "grupos" ? "bg-green-primary text-bg" : "text-text-secondary hover:bg-green-ultra-light hover:text-green-primary"}`}
            >
                Grupos
            </button>
        </div>
    );
}
