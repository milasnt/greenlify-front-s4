import { Link } from "react-router-dom";

interface LogoProps {
    onClick?: () => void;
}

export default function Logo({ onClick }: LogoProps) {
    return (
        <Link to="/" onClick={onClick} className="flex items-center gap-2.5" aria-label="Greenlify">
            <span className="font-heading text-2xl font-extrabold tracking-tight text-text-main">
                Green<span className="textGradient">lify</span>
            </span>
        </Link>
    );
}