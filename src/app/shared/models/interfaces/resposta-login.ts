import { UsuarioResposta } from "./usuario-resposta";

export interface RespostaLogin {
  token?: string;
  usuarioResposta?: UsuarioResposta;
}