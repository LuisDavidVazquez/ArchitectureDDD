export type TipoPerfil = 'Niño' | 'Adulto';

export class TipoPerfilVO {
  private readonly tipo: TipoPerfil;

  constructor(tipo: TipoPerfil) {
    if (tipo !== 'Niño' && tipo !== 'Adulto') {
      throw new Error("Tipo de perfil inválido. Debe ser 'Niño' o 'Adulto'.");
    }
    this.tipo = tipo;
  }

  public esInfantil(): boolean {
    return this.tipo === 'Niño';
  }

  public obtenerTipo(): TipoPerfil {
    return this.tipo;
  }
}
