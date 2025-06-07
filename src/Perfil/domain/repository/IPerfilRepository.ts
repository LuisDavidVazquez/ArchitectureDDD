import { Perfil } from "../entities/Perfil";

export interface IPerfilRepository {
  guardar(perfil: Perfil): Promise<void>;
  obtenerPorUsuarioId(usuarioId: string): Promise<Perfil[]>;
  obtenerPorId(id: string): Promise<Perfil | null>;
}
