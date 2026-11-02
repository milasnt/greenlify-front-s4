import { Link } from "react-router-dom";
import logoGreenlify from "../../../assets/img/logo/logoGreenlify.svg";

interface LogoProps {
    onClick?: () => void;
}

export default function Logo({ onClick }: LogoProps) {
    return (
        <Link to="/" onClick={onClick} className="flex shrink-0 items-center gap-2" aria-label="Greenlify">
            <img src={logoGreenlify} alt="Logo Greenlify" aria-hidden="true" className="h-12 w-12 shrink-0 object-contain"/>
            <span className="whitespace-nowrap font-heading text-xl font-extrabold tracking-tight text-text-main">
                Green<span className="textGradient">lify</span>
            </span>
        </Link>
    );
}