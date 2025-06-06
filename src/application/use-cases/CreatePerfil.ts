import { IPerfilRepository } from "../../domain/repository/IPerfilRepository";
import { Perfil } from "../../domain/entities/Perfil";
import { NombrePerfil } from "../../domain/value-objects/NombrePerfil";
import { TipoPerfilVO } from "../../domain/value-objects/TipoPerfil";
import { CreatePerfilDTO } from "../dtos/CreatePerfilDTO";

export class CreatePerfil {
  constructor(private readonly perfilRepo: IPerfilRepository) {}

  public async ejecutar(dto: CreatePerfilDTO): Promise<void> {
    const nombre = new NombrePerfil(dto.nombre);
    const tipo = new TipoPerfilVO(dto.tipo);
    const perfil = new Perfil(nombre, tipo, dto.pin);

    await this.perfilRepo.guardar(perfil);
  }
}
