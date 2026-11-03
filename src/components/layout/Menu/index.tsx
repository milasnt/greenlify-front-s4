import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa6";

interface MenuProps {
  isOpen?: boolean;
  onNavigate?: () => void;
}

export default function Menu({ isOpen = false, onNavigate }: MenuProps) {
  return (
    <nav
      id="menu-principal"
      aria-label="Navegação principal" className={`flex flex-1 justify-center max-lg:w-full max-lg:basis-full ${
        isOpen ? "max-lg:flex" : "max-lg:hidden"
      }`}
    >
      <ul className="flex items-center gap-1 max-lg:w-full max-lg:flex-col max-lg:items-stretch max-lg:py-4">
        <li>
          <Link
            to="/"
            onClick={onNavigate}
            className="block rounded-full px-3 py-2.5 text-sm font-semibold xl:px-4 lg:py-2 text-text-secondary transition duration-300 hover:bg-green-lighter hover:text-text-main max-lg:w-full"
          >
            Home
          </Link>
        </li>

        <li className="group relative">
          <Link
            to="/sobre"
            onClick={onNavigate}
            className="flex items-center gap-1.5 rounded-full px-3 py-2.5 text-sm font-semibold xl:px-4 lg:py-2 text-text-secondary transition duration-300 hover:bg-green-lighter hover:text-text-main max-lg:w-full"
          >
            Sobre
            <FaChevronDown
              className="text-[0.6rem] transition-transform duration-300 group-hover:rotate-180"
              aria-hidden="true"
            />
          </Link>

          <ul className="absolute left-0 top-full z-50 hidden min-w-56 flex-col gap-1 rounded-2xl border border-border bg-bg-card p-2 shadow-custom-md group-hover:flex group-focus-within:flex max-lg:static max-lg:flex max-lg:mt-1 max-lg:w-full max-lg:border-0 max-lg:bg-transparent max-lg:p-0 max-lg:pl-4 max-lg:shadow-none">
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
          <Link to="/integrantes" onClick={onNavigate} className="block rounded-full px-3 py-2.5 text-sm font-semibold xl:px-4 lg:py-2 text-text-secondary transition duration-300 hover:bg-green-lighter hover:text-text-main max-lg:w-full">
            Integrantes
          </Link>
        </li>

        <li>
          <Link to="/faq" onClick={onNavigate} className="block rounded-full px-3 py-2.5 text-sm font-semibold xl:px-4 lg:py-2 text-text-secondary transition duration-300 hover:bg-green-lighter hover:text-text-main max-lg:w-full">
            FAQ
          </Link>
        </li>

        <li>
          <Link to="/contato" onClick={onNavigate} className="block rounded-full px-3 py-2.5 text-sm font-semibold xl:px-4 lg:py-2 text-text-secondary transition duration-300 hover:bg-green-lighter hover:text-text-main max-lg:w-full">
            Contato
          </Link>
        </li>
      </ul>
    </nav>
  );
}