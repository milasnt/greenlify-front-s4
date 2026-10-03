import type { ReactNode } from "react";
import Card from "../Card";

interface ProfileStatProps {
    icon: ReactNode;
    label: string;
    value: string | number;
    descricao?: string;
}

export default function ProfileStat({
    icon,
    label,
    value,
    descricao,
}: ProfileStatProps) {
    return (
        <Card center>
            <div className="mb-4 flex justify-center text-[2.8rem] text-green-primary">
                {icon}
            </div>

            <span className="mb-2 block text-[1.4rem] text-text-secondary">
                {label}
            </span>

            <strong className="mb-2 block text-[2.4rem] font-bold text-text-main max-[768px]:text-[2.2rem] max-[480px]:text-[2rem]">
                {value}
            </strong>

            {descricao && (
                <p className="text-[1.4rem] leading-[1.6] text-text-secondary">
                    {descricao}
                </p>
            )}
        </Card>
    );
}