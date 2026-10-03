import type { ReactNode } from "react";

interface ButtonProps {
    children: ReactNode;
    variant?: "primary" | "secondary";
    size?: "sm" | "md" | "lg";
    full?: boolean;
    href?: string;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
}

export default function Button({
    children,
    variant = "primary",
    size = "md",
    full = false,
    href,
    type = "button",
    onClick,
}: ButtonProps) {

    const baseStyles =
        "block w-fit text-center no-underline font-semibold rounded-3xl transition duration-300 whitespace-nowrap outline-none";

    const variantStyles = {
        primary: "bg-gradient-green text-bg hover:brightness-110",
        secondary: "bg-bg border border border-gradient-green text-green-primary hover:bg-gradient-green hover:text-bg",
    };

    const sizeStyles = {
        sm: "px-[2rem] py-[1rem] text-[1.3rem] max-[992px]:px-[2.4rem] max-[992px]:py-[1.3rem] max-[992px]:text-[1.45rem] max-[768px]:px-[2.2rem] max-[768px]:py-[1.2rem] max-[768px]:text-[1.4rem] max-[480px]:w-full max-[480px]:text-center max-[480px]:px-[1.6rem] max-[480px]:py-[1.2rem] max-[480px]:text-[1.4rem]",
        md: "px-[2.8rem] py-[1.4rem] text-[1.5rem] max-[992px]:px-[2.4rem] max-[992px]:py-[1.3rem] max-[992px]:text-[1.45rem] max-[768px]:px-[2.2rem] max-[768px]:py-[1.2rem] max-[768px]:text-[1.4rem] max-[480px]:w-full max-[480px]:text-center max-[480px]:px-[1.6rem] max-[480px]:py-[1.2rem] max-[480px]:text-[1.4rem]",
        lg: "px-[3rem] py-[1.8rem] text-[1.7rem] max-[992px]:px-[2.8rem] max-[992px]:py-[1.6rem] max-[768px]:px-[2.4rem] max-[768px]:py-[1.5rem] max-[768px]:text-[1.6rem] max-[480px]:w-full max-[480px]:text-center max-[480px]:px-[1.6rem] max-[480px]:py-[1.4rem] max-[480px]:text-[1.5rem]",
    };

    const widthStyles = full ? "w-full" : "";

    const className = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} rounded-custom-lg`;

    if (href) {
        return (
        <a href={href} className={className}>
            {children}
        </a>
        );
    }

    return (
        <button type={type} onClick={onClick} className={className}>
            {children}
        </button>
  );
}