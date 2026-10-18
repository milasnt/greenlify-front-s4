import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

interface RevealProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

export default function Reveal({
    children,
    delay = 0,
    className = "",
}: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(
        () => typeof IntersectionObserver === "undefined"
    );

    useEffect(() => {
        const element = ref.current;

        if (!element || typeof IntersectionObserver === "undefined") return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry?.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            style={delay ? { transitionDelay: `${delay}ms` } : undefined}
            className={`reveal ${isVisible ? "isVisible" : ""} ${className}`}
        >
            {children}
        </div>
    );
}