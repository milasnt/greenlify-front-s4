import { FaBolt, FaTrophy, FaEarthAmericas, FaDroplet, FaLightbulb, FaRoute} from "react-icons/fa6";
import Card from "../Card";

export default function Dashboard() {
  return (
    <div className="w-full cursor-pointer">
      <div className="grid grid-cols-2 gap-8 max-[768px]:gap-[1.6rem] max-[480px]:grid-cols-1">
        <Card className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-[3.4rem] w-[3.4rem] items-center justify-center rounded-full bg-gradient-green text-bg">
              <FaBolt size={18} />
            </div>

            <span className="text-[1.3rem] text-text-secondary">
              XP
            </span>
          </div>

          <h2 className="text-[3.2rem] font-bold text-text-main">
            460
          </h2>

          <span className="text-[1.3rem] text-text-muted">
            +60 hoje
          </span>
        </Card>

        <Card className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-[3.4rem] w-[3.4rem] items-center justify-center rounded-full bg-gradient-purple text-bg">
              <FaTrophy size={18} />
            </div>

            <span className="text-[1.3rem] text-text-secondary">
              Ranking
            </span>
          </div>

          <h2 className="text-[3.2rem] font-bold text-text-main">
            #42
          </h2>

          <span className="text-[1.3rem] text-text-muted">
            ↑ 8 posições
          </span>
        </Card>

        <Card className="col-span-2 flex flex-col gap-8 max-[768px]:col-span-2 max-[480px]:col-span-1">
          <div className="flex items-center gap-4">
            <div className="flex h-[3.4rem] w-[3.4rem] items-center justify-center rounded-full bg-gradient-green text-bg">
              <FaEarthAmericas size={18} />
            </div>

            <span className="text-[1.3rem] text-text-secondary">
              Missões Ativas
            </span>
          </div>

          <p className="text-[1.4rem] leading-[1.6] text-text-secondary">
            Complete 5 missões contínuas de reciclagem este mês
          </p>

          <div className="h-[0.8rem] w-full overflow-hidden rounded-full bg-black/5">
            <div className="h-full w-[80%] rounded-full bg-gradient-green" />
          </div>
        </Card>

        <div className="col-span-2">
          <p className="mb-4 text-[1.7rem] font-bold text-text-main">
            Impacto do Mês
          </p>

          <div className="grid grid-cols-3 gap-[1.6rem] max-[768px]:grid-cols-1">
            <Card className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-[3.4rem] w-[3.4rem] items-center justify-center rounded-full bg-linear-to-br from-sky-400 to-blue-500 text-bg">
                  <FaDroplet size={18} />
                </div>

                <span className="text-[1.3rem] text-text-secondary">
                  Água
                </span>
              </div>

              <h2 className="text-[3.2rem] font-bold text-text-main">
                320L
              </h2>

              <span className="text-[1.3rem] text-text-muted">
                Água economizada
              </span>
            </Card>

            <Card className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-[3.4rem] w-[3.4rem] items-center justify-center rounded-full bg-linear-to-br from-yellow-300 to-amber-500 text-bg">
                  <FaLightbulb size={18} />
                </div>

                <span className="text-[1.3rem] text-text-secondary">
                  Energia
                </span>
              </div>

              <h2 className="text-[3.2rem] font-bold text-text-main">
                45kWh
              </h2>

              <span className="text-[1.3rem] text-text-muted">
                Luz economizada
              </span>
            </Card>

            <Card className="flex flex-col gap-4">
              <div className="flex items-center gap-4"> 
                <div className="flex h-[3.4rem] w-[3.4rem] items-center justify-center rounded-full bg-gradient-green text-bg">
                  <FaRoute size={18} />
                </div>
                
                <span className="text-[1.3rem] text-text-secondary">
                  CO₂
                </span>
              </div>
              
              <h2 className="text-[3.2rem] font-bold text-text-main">
                28kg
              </h2>

              <span className="text-[1.3rem] text-text-muted">
                CO₂ evitado
              </span>
            </Card>

          </div>
        </div>

      </div>
    </div>
  );
}