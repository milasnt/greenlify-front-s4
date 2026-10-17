import { Link } from "react-router";
import { FaChevronDown } from "react-icons/fa6";

interface MenuProps {
  isOpen?: boolean;
  onNavigate?: () => void;
}

export default function Menu({ isOpen = false, onNavigate }: MenuProps) {
  return (
    <nav
      aria-label="Navegação principal" className={`flex flex-1 justify-center max-md:w-full max-md:basis-full ${
        isOpen ? "max-md:flex" : "max-md:hidden"
      }`}
    >
      <ul className="flex items-center gap-1 max-md:w-full max-md:flex-col max-md:items-stretch max-md:py-4">
        <li>
          <Link
            to="/"
            onClick={onNavigate}
            className="block rounded-full px-4 py-2 text-sm font-semibold text-text-secondary transition duration-300 hover:bg-green-lighter hover:text-text-main max-md:w-full"
          >
            Home
          </Link>
        </li>

        <li className="relative group">
          <Link
            to="/sobre"
            onClick={onNavigate}
            className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-text-secondary transition duration-300 hover:bg-green-lighter hover:text-text-main max-md:w-full"
          >
            Sobre
            <FaChevronDown
              className="text-[0.6rem] transition-transform duration-300 group-hover:rotate-180"
              aria-hidden="true"
            />
          </Link>

          <ul className="absolute left-0 top-full z-50 hidden min-w-56 flex-col gap-1 rounded-2xl border border-border bg-bg-card p-2 shadow-custom-md group-hover:flex group-focus-within:flex max-md:static max-md:mt-1 max-md:w-full max-md:border-0 max-md:bg-transparent max-md:p-0 max-md:pl-4 max-md:shadow-none">
            <li>
              <Link to="/sobre" onClick={onNavigate} className="block rounded-xl px-4 py-2 text-sm font-medium text-text-secondary transition duration-300 hover:bg-green-lighter hover:text-green-primary">
                Sobre a Greenlify
              </Link>
            </li>
            <li>
              <Link to="/nossasolucao" onClick={onNavigate} className="block rounded-xl px-4 py-2 text-sm font-medium text-text-secondary transition duration-300 hover:bg-green-lighter hover:text-green-primary">
                Nossa solução
              </Link>
            </li>
          </ul>
        </li>

        <li>
          <Link to="/integrantes" onClick={onNavigate} className="block rounded-full px-4 py-2 text-sm font-semibold text-text-secondary transition duration-300 hover:bg-green-lighter hover:text-text-main max-md:w-full">
            Integrantes
          </Link>
        </li>

        <li>
          <Link to="/faq" onClick={onNavigate} className="block rounded-full px-4 py-2 text-sm font-semibold text-text-secondary transition duration-300 hover:bg-green-lighter hover:text-text-main max-md:w-full">
            FAQ
          </Link>
        </li>

        <li>
          <Link to="/contato" onClick={onNavigate} className="block rounded-full px-4 py-2 text-sm font-semibold text-text-secondary transition duration-300 hover:bg-green-lighter hover:text-text-main max-md:w-full">
            Contato
          </Link>
        </li>
      </ul>
    </nav>
  );
}