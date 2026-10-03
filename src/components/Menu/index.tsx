import { Link } from "react-router";

interface MenuProps {
  isOpen?: boolean;
  onNavigate?: () => void;
}

export default function Menu({ isOpen = false, onNavigate }: MenuProps) {
  return (
    <nav
      className={`flex flex-1 justify-center max-[768px]:w-full max-[768px]:basis-full ${
        isOpen ? "max-[768px]:flex" : "max-[768px]:hidden"
      }`}
    >
      <ul className="flex items-center gap-12 list-none max-[992px]:gap-8 max-[768px]:w-full max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-1 max-[768px]:py-4">

        <li className="max-[768px]:w-full">
          <Link
            to="/"
            onClick={onNavigate}
            className="block text-[1.5rem] font-medium text-text-secondary transition duration-300 hover:text-green-primary max-[768px]:w-full max-[768px]:py-3"
          >
            Home
          </Link>
        </li>

        <li className="relative group max-[768px]:w-full">
          <Link
            to="/sobre"
            onClick={onNavigate}
            className="flex items-center gap-2 py-4 text-[1.5rem] font-medium text-text-secondary transition duration-300 hover:text-green-primary max-[768px]:w-full max-[768px]:py-3"
          >
            Sobre
            <span className="text-[1rem] transition-transform duration-300 group-hover:rotate-180 max-[768px]:hidden">
              ⌄
            </span>
          </Link>

          <ul className="absolute left-1/2 top-[calc(100%+0.5rem)] z-50 invisible w-64 -translate-x-1/2 translate-y-2 list-none rounded-xl border border-border bg-bg-card p-2 opacity-0 shadow-lg transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 max-[768px]:static max-[768px]:z-auto max-[768px]:visible max-[768px]:w-full max-[768px]:translate-x-0 max-[768px]:translate-y-0 max-[768px]:opacity-100 max-[768px]:border-0 max-[768px]:bg-transparent max-[768px]:p-0 max-[768px]:pl-6 max-[768px]:shadow-none">
            <li>
              <Link
                to="/sobre"
                onClick={onNavigate}
                className="block w-full whitespace-nowrap rounded-lg px-4 py-3 text-[1.4rem] font-medium text-text-secondary transition duration-300 hover:bg-green-ultra-light hover:text-green-primary"
              >
                Sobre a Greenlify
              </Link>
            </li>

            <li>
              <Link
                to="/nossasolucao"
                onClick={onNavigate}
                className="block w-full whitespace-nowrap rounded-lg px-4 py-3 text-[1.4rem] font-medium text-text-secondary transition duration-300 hover:bg-green-ultra-light hover:text-green-primary"
              >
                Nossa solução
              </Link>
            </li>
          </ul>
        </li>

        <li className="max-[768px]:w-full">
          <Link
            to="/integrantes"
            onClick={onNavigate}
            className="block text-[1.5rem] font-medium text-text-secondary transition duration-300 hover:text-green-primary max-[768px]:w-full max-[768px]:py-3"
          >
            Integrantes
          </Link>
        </li>

        <li className="max-[768px]:w-full">
          <Link
            to="/faq"
            onClick={onNavigate}
            className="block text-[1.5rem] font-medium text-text-secondary transition duration-300 hover:text-green-primary max-[768px]:w-full max-[768px]:py-3"
          >
            FAQ
          </Link>
        </li>

        <li className="max-[768px]:w-full">
          <Link
            to="/contato"
            onClick={onNavigate}
            className="block text-[1.5rem] font-medium text-text-secondary transition duration-300 hover:text-green-primary max-[768px]:w-full max-[768px]:py-3"
          >
            Contato
          </Link>
        </li>

      </ul>
    </nav>
  );
}
