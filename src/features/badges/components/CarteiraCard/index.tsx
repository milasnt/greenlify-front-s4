import { FaWallet } from "react-icons/fa6";
import ColetarSelos from "../ColetarSelos";
import Card from "../../../../components/ui/Card";


export default function CarteiraCard({ saldo }: { saldo: number }) {
    return (
        <Card hover={false} className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-green-lighter text-2xl text-green-primary" aria-hidden>
                    <FaWallet />
                </span>

                <div>
                    <p className="text-sm font-semibold text-text-secondary">Saldo da carteira</p>
                    <p className="font-heading text-2xl font-extrabold tracking-tight sm:text-3xl text-text-main">
                        {saldo.toLocaleString("pt-BR")} <span className="text-base font-bold text-text-secondary">pts</span>
                    </p>
                    <p className="mt-1 max-w-md text-sm leading-relaxed text-text-secondary">
                        É o que você pode gastar. O ranking mensal conta missões concluídas e o All Time soma os pontos ganhos,
                        então os dois podem ser diferentes do seu saldo.
                    </p>
                </div>
            </div>

            <ColetarSelos className="sm:shrink-0" />
        </Card>
    );
}