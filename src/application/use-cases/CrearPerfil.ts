import { IPerfilRepository } from "../../domain/repository/IPerfilRepository";
import { Perfil } from "../../domain/entities/Perfil";
import { NombrePerfil } from "../../domain/value-objects/NombrePerfil";
import { TipoPerfilVO } from "../../domain/value-objects/TipoPerfil";
import { CreatePerfilDTO } from "../dtos/CreatePerfilDTO";

export class CrearPerfil {
  constructor(private readonly perfilRepo: IPerfilRepository) {}

  public async ejecutar(dto: CreatePerfilDTO): Promise<Perfil> {
    const nombre = new NombrePerfil(dto.nombre);
    const tipo = new TipoPerfilVO(dto.tipo);
    const perfil = new Perfil(nombre, tipo, dto.pin);

    await this.perfilRepo.guardar(perfil);
    return perfil;
  }
}
