export class NombrePerfil {
    private readonly _valor: string;

    constructor(valor: string) {
        this.validar(valor);
        this._valor = valor;
    }

    private validar(valor: string): void {
        if (!valor || valor.trim().length === 0) {
            throw new Error('El nombre del perfil no puede estar vacío');
        }
        if (valor.length > 30) {
            throw new Error('El nombre del perfil no puede tener más de 30 caracteres');
        }
        if (!/^[a-zA-Z0-9\s]+$/.test(valor)) {
            throw new Error('El nombre del perfil solo puede contener letras, números y espacios');
        }
    }

    get valor(): string {
        return this._valor;
    }

    equals(other: NombrePerfil): boolean {
        return this._valor === other._valor;
    }
}
  