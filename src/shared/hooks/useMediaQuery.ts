import { useSyncExternalStore } from "react";

export function useMediaQuery(consulta: string): boolean {
    return useSyncExternalStore(
        (aoMudar) => {
            const lista = window.matchMedia(consulta);
            lista.addEventListener("change", aoMudar);
            return () => lista.removeEventListener("change", aoMudar);
        },
        () => window.matchMedia(consulta).matches,
        () => false,
    );
}

export function useIsMobile(): boolean {
    return useMediaQuery("(max-width: 767px)");
}