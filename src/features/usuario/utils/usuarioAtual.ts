import { buscarUsuarios } from "../../profile/services/profileService";

const CHAVE_USUARIO = "greenlify-usuario-teste";

export async function obterIdUsuarioAtual(): Promise<number> {
    const idSalvo = localStorage.getItem(CHAVE_USUARIO);

    if (idSalvo) {
        return Number(idSalvo);
    }

    const usuarios = await buscarUsuarios();

    const usuariosComuns = usuarios.filter(
        (usuario) => usuario.nivelAcesso === 0
    );

    if (usuariosComuns.length === 0) {
        throw new Error("Nenhum usuário comum encontrado.");
    }

    const indice = Math.floor(Math.random() * usuariosComuns.length);
    const usuario = usuariosComuns[indice];

    localStorage.setItem(CHAVE_USUARIO, String(usuario.idUsuario));

    return usuario.idUsuario;
}