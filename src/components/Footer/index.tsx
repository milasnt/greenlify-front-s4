import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-bg-soft">
      <div className="mx-auto max-w-[140rem] px-16 pt-20 pb-12">
        
        <div className="grid grid-cols-[2fr_1fr_1fr] gap-24 border-b border-border pb-16 max-[992px]:grid-cols-2 max-[768px]:grid-cols-1 max-[768px]:gap-16">

          <div className="flex flex-col gap-8">
            <Link to="/" className="flex items-center gap-4">
              <span className="text-[2.2rem] font-bold text-text-main">
                Green<span className="text-green-primary">lify</span>
              </span>
            </Link>

            <p className="max-w-152 text-[1.5rem] leading-[1.7] text-text-secondary">
              Gamificação + Sustentabilidade + Inteligência Artificial.
              O próximo nível do impacto ambiental.
            </p>

            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/soulupoficial?igsh=amNtMXlybnkwYWo0"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da SoulUp"
                className="flex h-[3.8rem] w-[3.8rem] items-center justify-center rounded-full border border-border text-text-secondary transition duration-300 hover:-translate-y-1 hover:border-green-primary hover:bg-green-primary hover:text-bg"
              >
                <FaInstagram size={20} />
              </a>

              <a
                href="https://www.linkedin.com/company/soulupoficial/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn da SoulUp"
                className="flex h-[3.8rem] w-[3.8rem] items-center justify-center rounded-full border border-border text-text-secondary transition duration-300 hover:-translate-y-1 hover:border-green-primary hover:bg-green-primary hover:text-bg"
              >
                <FaLinkedin size={20} />
              </a>

              <a
                href="#"
                aria-label="GitHub da Greenlify"
                className="flex h-[3.8rem] w-[3.8rem] items-center justify-center rounded-full border border-border text-text-secondary transition duration-300 hover:-translate-y-1 hover:border-green-primary hover:bg-green-primary hover:text-bg"
              >
                <FaGithub size={20} />
              </a>

              <a
                href="mailto:greenlify@gmail.com"
                aria-label="Enviar e-mail para a Greenlify"
                className="flex h-[3.8rem] w-[3.8rem] items-center justify-center rounded-full border border-border text-text-secondary transition duration-300 hover:-translate-y-1 hover:border-green-primary hover:bg-green-primary hover:text-bg"
              >
                <FiMail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-8 text-[1.7rem] font-semibold text-text-main">
              Navegação
            </h3>

            <ul className="flex list-none flex-col gap-6">
              <li>
                <Link to="/" className="text-[1.5rem] text-text-secondary transition duration-300 hover:text-green-primary">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/sobre" className="text-[1.5rem] text-text-secondary transition duration-300 hover:text-green-primary">
                  Sobre a Greenlify
                </Link>
              </li>

              <li>
                <Link to="/nossasolucao" className="text-[1.5rem] text-text-secondary transition duration-300 hover:text-green-primary">
                  Nossa Solução
                </Link>
              </li>

              <li>
                <Link to="/integrantes" className="text-[1.5rem] text-text-secondary transition duration-300 hover:text-green-primary">
                  Integrantes
                </Link>
              </li>

              <li>
                <Link to="/faq" className="text-[1.5rem] text-text-secondary transition duration-300 hover:text-green-primary">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-8 text-[1.7rem] font-semibold text-text-main">Contato</h3>
            <ul className="flex list-none flex-col gap-6">
              <li>
                <Link to="/contato" className="text-[1.5rem] text-text-secondary transition duration-300 hover:text-green-primary">
                  Fale Conosco
                </Link>
              </li>

              <li>
                <a href="mailto:greenlify@gmail.com" className="text-[1.5rem] text-text-secondary transition duration-300 hover:text-green-primary">
                  greenlify@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-between gap-8 pt-12 max-[768px]:flex-col max-[768px]:text-center">
          <p className="text-[1.4rem] text-text-muted">
            © 2026 Greenlify. Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-8">
            <a href="#" className="text-[1.4rem] text-text-muted transition duration-300 hover:text-green-primary">
              Política de Privacidade
            </a>

            <a href="#" className="text-[1.4rem] text-text-muted transition duration-300 hover:text-green-primary">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}