interface MissionStatusProps {
    label: string;
    value: string;
}

export default function MissionStatus({ label, value }: MissionStatusProps) {
    return (
        <div className="rounded-xl border border-border bg-bg-card p-5">
            <span className="mb-2 block text-[1.2rem] font-medium text-text-secondary">
                {label}
            </span>

            <strong className="text-[1.6rem] font-semibold text-text-main">
                {value}
            </strong>
        </div>
    );
}