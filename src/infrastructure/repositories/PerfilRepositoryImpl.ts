import { IPerfilRepository } from "../../domain/repository/IPerfilRepository";
import { Perfil } from "../../domain/entities/Perfil";
import { NombrePerfil } from "../../domain/value-objects/NombrePerfil";
import { TipoPerfilVO } from "../../domain/value-objects/TipoPerfil";
import { PerfilDO } from "../models/PerfilDO";

export class PerfilRepositoryImpl implements IPerfilRepository {
  private readonly perfiles: PerfilDO[] = [];

  async guardar(perfil: Perfil): Promise<void> {
    const doc: PerfilDO = {
      id: perfil.obtenerId(),
      usuarioId: "simulado", // normalmente vendría del DTO externo
      nombre: perfil.obtenerNombre(),
      tipo: perfil.obtenerTipo() as 'Niño' | 'Adulto',
      restriccionesActivas: perfil.tieneRestricciones(),
      pin: perfil.obtenerPIN()
    };
    this.perfiles.push(doc);
  }

  async obtenerPorUsuarioId(usuarioId: string): Promise<Perfil[]> {
    return this.perfiles
      .filter(p => p.usuarioId === usuarioId)
      .map(p => new Perfil(
        new NombrePerfil(p.nombre),
        new TipoPerfilVO(p.tipo),
        p.pin,
        p.id
      ));
  }

  async obtenerPorId(id: string): Promise<Perfil | null> {
    const doc = this.perfiles.find(p => p.id === id);
    if (!doc) return null;
    return new Perfil(
      new NombrePerfil(doc.nombre),
      new TipoPerfilVO(doc.tipo),
      doc.pin,
      doc.id
    );
  }
}
