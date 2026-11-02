import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Footer() {
    const titleStyles = "mb-4 font-heading text-xs font-bold uppercase tracking-[0.2em] text-green-light";
    const linkStyles = "text-sm text-night-muted transition duration-300 hover:text-green-light";
    const socialStyles = "grid h-10 w-10 place-items-center rounded-full border border-night-line text-night-muted transition duration-300 hover:border-green-light hover:text-green-light";

    return (
        <footer className="relative w-full overflow-hidden bg-night text-night-text">
            <div className="absolute -top-24 right-1/4 h-64 w-64 rounded-full bg-purple-primary/20 blur-3xl" aria-hidden />

            <div className="relative mx-auto max-w-6xl px-4 pb-8 pt-16 sm:px-6">
                <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
                    <div>
                        <Link to="/" className="inline-flex items-center" aria-label="Greenlify — página inicial">
                            <span className="font-heading text-2xl font-extrabold tracking-tight text-night-text">
                                Green<span className="textGradient">lify</span>
                            </span>
                        </Link>

                        <p className="mt-4 max-w-xs text-sm leading-relaxed text-night-muted">
                            Gamificação + Sustentabilidade + Inteligência Artificial.
                            O próximo nível do impacto ambiental.
                        </p>

                        <div className="mt-6 flex gap-3">
                            <a href="https://www.instagram.com/soulupoficial?igsh=amNtMXlybnkwYWo0" target="_blank" rel="noopener noreferrer" aria-label="Instagram da SoulUp" className={socialStyles}>
                                <FaInstagram size={18} />
                            </a>

                            <a href="https://www.linkedin.com/company/soulupoficial/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn da SoulUp" className={socialStyles}>
                                <FaLinkedin size={18} />
                            </a>

                            <a href="https://github.com/milasnt/greenlify-front-s4" target="_blank" rel="noopener noreferrer" aria-label="GitHub da Greenlify" className={socialStyles}>
                                <FaGithub size={18} />
                            </a>

                            <a href="mailto:greenlify@gmail.com" aria-label="Enviar e-mail para a Greenlify" className={socialStyles}>
                                <FiMail size={18} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className={titleStyles}>Navegação</h3>

                        <ul className="space-y-3">
                            <li><Link to="/" className={linkStyles}>Home</Link></li>
                            <li><Link to="/sobre" className={linkStyles}>Sobre a Greenlify</Link></li>
                            <li><Link to="/nossasolucao" className={linkStyles}>Nossa Solução</Link></li>
                            <li><Link to="/integrantes" className={linkStyles}>Integrantes</Link></li>
                            <li><Link to="/faq" className={linkStyles}>FAQ</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className={titleStyles}>Contato</h3>

                        <ul className="space-y-3">
                            <li><Link to="/contato" className={linkStyles}>Fale Conosco</Link></li>
                            <li><a href="mailto:greenlify@gmail.com" className={linkStyles}>greenlify@gmail.com</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-night-line pt-6">
                    <p className="text-xs text-night-muted">
                        © 2026 Greenlify. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}