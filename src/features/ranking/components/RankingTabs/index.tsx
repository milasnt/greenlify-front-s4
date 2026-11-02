import { useState } from "react";
import Tabs from "../../../../components/ui/Tabs";

export type RankingTab = "mensal" | "allTime" | "grupos";

interface RankingTabsProps {
    defaultTab?: RankingTab;
    onChange?: (tab: RankingTab) => void;
}

const abas = [
    { id: "mensal", label: "Mensal" },
    { id: "allTime", label: "All Time" },
    { id: "grupos", label: "Grupos" },
];

export default function RankingTabs({ defaultTab = "mensal", onChange }: RankingTabsProps) {
    const [activeTab, setActiveTab] = useState<RankingTab>(defaultTab);

    function handleSelect(id: string) {
        const tab = id as RankingTab;
        setActiveTab(tab);
        onChange?.(tab);
    }

    return (
        <div className="mb-8">
            <Tabs
                items={abas}
                active={activeTab}
                onChange={handleSelect}
                ariaLabel="Tipo de ranking"
                panelId="painel-ranking"
                variant="segmented"
            />
        </div>
    );
}