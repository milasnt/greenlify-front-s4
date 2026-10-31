import { useEffect, useRef, useState } from "react";
import type { DependencyList } from "react";

const VALIDADE_MS = 60_000;
const cache = new Map<string, { promessa: Promise<unknown>; criadoEm: number }>();

const ouvintes = new Set<() => void>();

export function limparCache() {
    cache.clear();
    ouvintes.forEach((recarregar) => recarregar());
}

function buscarComCache<T>(chave: string, buscar: () => Promise<T>): Promise<T> {
    const guardado = cache.get(chave);

    if (guardado && Date.now() - guardado.criadoEm < VALIDADE_MS) {
        return guardado.promessa as Promise<T>;
    }

    const promessa = buscar();
    cache.set(chave, { promessa, criadoEm: Date.now() });

    promessa.catch(() => {
        if (cache.get(chave)?.promessa === promessa) cache.delete(chave);
    });

    return promessa;
}

export function useCarregar<T>(
    buscar: () => Promise<T>,
    dependencias: DependencyList,
    mensagemErro = "Não foi possível carregar os dados.",
    chaveCache?: string,
) {
    const [dados, setDados] = useState<T | null>(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState<string | null>(null);
    const [versao, setVersao] = useState(0);
    const temDados = useRef(false);
    const depsAnteriores = useRef<DependencyList>(dependencias);

    useEffect(() => {
        const recarregar = () => setVersao((atual) => atual + 1);
        ouvintes.add(recarregar);
        return () => {
            ouvintes.delete(recarregar);
        };
    }, []);

    useEffect(() => {
        let ativo = true;

        if (depsAnteriores.current.some((dep, i) => !Object.is(dep, dependencias[i]))) {
            temDados.current = false;
            depsAnteriores.current = dependencias;
        }

        async function carregar() {
            try {
                
                if (!temDados.current) setCarregando(true);
                setErro(null);

                const resposta = chaveCache ? await buscarComCache(chaveCache, buscar) : await buscar();
                if (ativo) {
                    setDados(resposta);
                    temDados.current = true;
                }
            } catch (e) {
                console.error(mensagemErro, e);
                if (ativo) setErro(mensagemErro);
            } finally {
                if (ativo) setCarregando(false);
            }
        }

        void carregar();

        return () => {
            ativo = false;
        };
    }, [...dependencias, versao]);

    return { dados, carregando, erro };
}