import { useState } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";
import Menu from "../Menu";
import Logo from "../Logo";
import Button from "../../ui/Button";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-40 w-full border-b border-border bg-bg/85 backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-3 sm:px-6">
                <Logo onClick={() => setIsMenuOpen(false)} />

                <button
                    type="button"
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
                    aria-expanded={isMenuOpen}
                    className="grid h-10 w-10 place-items-center rounded-full border border-border bg-bg-card text-text-main md:hidden"
                >
                    {isMenuOpen ? <FaXmark /> : <FaBars />}
                </button>

                <Menu isOpen={isMenuOpen} onNavigate={() => setIsMenuOpen(false)} />

                <Button href="https://soulup.io/" size="sm" arrow>
                  Visite a SoulUP
                </Button>
            </div>
        </header>
    );
}
