import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";
import Menu from "../Menu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full border-b border-border bg-bg">
      <div className="mx-auto flex max-w-[140rem] flex-wrap items-center justify-between gap-16 px-16 py-5 max-[992px]:gap-8 max-[992px]:px-8 max-[768px]:px-8 max-[768px]:py-[1.8rem] max-[480px]:px-[1.6rem]">
        <Link
          to="/"
          className="flex items-center gap-4"
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="text-[2.2rem] font-bold text-text-main max-[480px]:text-[1.9rem]">
            Green<span className="text-green-primary">lify</span>
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
          className="hidden h-10 w-10 items-center justify-center rounded-lg border border-border text-[1.8rem] text-text-main transition duration-300 hover:border-green-primary hover:text-green-primary max-[768px]:flex"
        >
          {isMenuOpen ? <FaXmark /> : <FaBars />}
        </button>

        <Menu isOpen={isMenuOpen} onNavigate={() => setIsMenuOpen(false)} />
      </div>
    </header>
  );
}
