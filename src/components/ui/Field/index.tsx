import type { ReactNode } from "react";

interface FieldProps {
    label: string;
    htmlFor: string;
    children: ReactNode;
    error?: string;
    hint?: string;
}

export default function Field({ label, htmlFor, children, error, hint }: FieldProps) {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={htmlFor} className="text-sm font-semibold text-text-main">
                {label}
            </label>

            {children}

            {hint && !error && (
                <span className="text-xs text-text-secondary">{hint}</span>
            )}

            {error && (
                <span role="alert" className="text-xs font-medium text-danger">
                    {error}
                </span>
            )}
        </div>
    );
}
