import { NombrePerfil } from "../value-objects/NombrePerfil";
import { TipoPerfilVO } from "../value-objects/TipoPerfil";
import { v4 as uuidv4 } from 'uuid';

export class Perfil {
  private readonly id: string;
  private nombre: NombrePerfil;
  private tipo: TipoPerfilVO;
  private restriccionesActivas: boolean;
  private pin?: string;

  constructor(nombre: NombrePerfil, tipo: TipoPerfilVO, pin?: string, id?: string) {
    this.id = id ?? uuidv4();
    this.nombre = nombre;
    this.tipo = tipo;
    this.restriccionesActivas = tipo.esInfantil();
    this.pin = pin;
  }

  public obtenerId(): string {
    return this.id;
  }

  public obtenerNombre(): string {
    return this.nombre.obtenerValor();
  }

  public obtenerTipo(): string {
    return this.tipo.obtenerTipo();
  }

  public tieneRestricciones(): boolean {
    return this.restriccionesActivas;
  }

  public obtenerPIN(): string | undefined {
    return this.pin;
  }

  public bloquearPorPIN(): void {
    if (!this.pin) throw new Error("Este perfil no tiene PIN asignado.");
    this.restriccionesActivas = true;
  }

  public desbloquearPorPIN(pin: string): void {
    if (this.pin !== pin) throw new Error("PIN incorrecto.");
    this.restriccionesActivas = false;
  }
}
