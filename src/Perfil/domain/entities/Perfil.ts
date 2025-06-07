import { NombrePerfil } from '../value-objects/NombrePerfil';
import { TipoPerfil } from '../value-objects/TipoPerfil';
import { PIN } from '../value-objects/PIN';
import { IIdentifierGenerator } from '../services/IIdentifierGenerator';

export class Perfil {
    private readonly _id: string;
    private _nombrePerfil: NombrePerfil;
    private _tipoPerfil: TipoPerfil;
    private _pin?: PIN;
    private _suscriptorId: string;
    private _fechaCreacion: Date;
    private _activo: boolean;

    constructor(
        nombrePerfil: NombrePerfil,
        tipoPerfil: TipoPerfil,
        suscriptorId: string,
        idGenerator: IIdentifierGenerator,
        pin?: PIN,
        id?: string
    ) {
        this._id = id || idGenerator.generate();
        this._nombrePerfil = nombrePerfil;
        this._tipoPerfil = tipoPerfil;
        this._pin = pin;
        this._suscriptorId = suscriptorId;
        this._fechaCreacion = new Date();
        this._activo = true;
    }

    // Getters
    get id(): string {
        return this._id;
    }

    get nombrePerfil(): NombrePerfil {
        return this._nombrePerfil;
    }

    get tipoPerfil(): TipoPerfil {
        return this._tipoPerfil;
    }

    get pin(): PIN | undefined {
        return this._pin;
    }

    get suscriptorId(): string {
        return this._suscriptorId;
    }

    get fechaCreacion(): Date {
        return this._fechaCreacion;
    }

    get activo(): boolean {
        return this._activo;
    }

    // Métodos de dominio
    public actualizarNombre(nuevoNombre: NombrePerfil): void {
        this._nombrePerfil = nuevoNombre;
    }

    public actualizarTipo(nuevoTipo: TipoPerfil): void {
        this._tipoPerfil = nuevoTipo;
    }

    public establecerPIN(pin: PIN): void {
        this._pin = pin;
    }

    public removerPIN(): void {
        this._pin = undefined;
    }

    public desactivar(): void {
        this._activo = false;
    }

    public activar(): void {
        this._activo = true;
    }

    // Método para reconstruir la entidad desde la persistencia
    public static reconstitute(
        id: string,
        nombrePerfil: NombrePerfil,
        tipoPerfil: TipoPerfil,
        suscriptorId: string,
        fechaCreacion: Date,
        activo: boolean,
        pin?: PIN
    ): Perfil {
        const perfil = new Perfil(nombrePerfil, tipoPerfil, suscriptorId, {
            generate: () => id
        }, pin, id);
        perfil._fechaCreacion = fechaCreacion;
        perfil._activo = activo;
        return perfil;
    }
}
