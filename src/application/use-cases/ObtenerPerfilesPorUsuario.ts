import { IPerfilRepository } from "../../domain/repository/IPerfilRepository";
import { Perfil } from "../../domain/entities/Perfil";

export class ObtenerPerfilesPorUsuario {
  constructor(private readonly perfilRepo: IPerfilRepository) {}

  public async ejecutar(usuarioId: string): Promise<Perfil[]> {
    return await this.perfilRepo.obtenerPorUsuarioId(usuarioId);
  }
}
