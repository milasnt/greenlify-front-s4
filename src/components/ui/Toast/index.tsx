import { useEffect } from "react";
import { FaCircleCheck, FaCircleInfo, FaCircleXmark } from "react-icons/fa6";

export type ToastType = "success" | "info" | "error";

interface ToastProps {
    message: string | null;
    type?: ToastType;
    duration?: number;
    onClose: () => void;
}

export default function Toast({
    message,
    type = "success",
    duration = 3800,
    onClose,
}: ToastProps) {

    const typeStyles = {
        success: "border-green-primary/30 text-green-primary",
        info: "border-purple-primary/30 text-purple-primary",
        error: "border-danger/40 text-danger",
    };

    const icons = {
        success: <FaCircleCheck />,
        info: <FaCircleInfo />,
        error: <FaCircleXmark />,
    };

    useEffect(() => {
        if (!message) return;

        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [message, duration, onClose]);

    return (
        <div className="msgFloating" role="status" aria-live="polite">
            {message && (
                <div className={`flex max-w-sm items-start gap-3 rounded-2xl border bg-bg-card px-4 py-3 text-sm shadow-xl ${typeStyles[type]}`}>
                    <span className="mt-0.5 shrink-0" aria-hidden>
                        {icons[type]}
                    </span>

                    <p className="text-text-main">
                        {message}
                    </p>
                </div>
            )}
        </div>
    );
}
