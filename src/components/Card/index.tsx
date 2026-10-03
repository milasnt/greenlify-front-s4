import type { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    center?: boolean;
    full?: boolean;
    member?: boolean;
    className?: string;
}

export default function Card({
    children,
    center = false,
    full = false,
    member = false,
    className = "",
}: CardProps) {

    const baseStyles = "bg-bg-card border border-border rounded-2xl p-[2rem] shadow-custom-sm transition duration-300 overflow-hidden hover:-translate-y-[0.3rem] hover:shadow-custom-md max-[768px]:p-[1.8rem] max-[480px]:p-[1.6rem]";

    const centerStyles = center ? "text-center" : "";
    const widthStyles = full ? "w-full p-[4rem] max-[480px]:p-[1.8rem]" : "";
    const memberStyles = member ? "text-center p-[2.5rem] max-[480px]:p-[2rem]" : "";

  return (
    <div
        className={`${baseStyles} ${centerStyles} ${widthStyles} ${memberStyles} ${className}`}
    >
        {children}
    </div>
  );
}