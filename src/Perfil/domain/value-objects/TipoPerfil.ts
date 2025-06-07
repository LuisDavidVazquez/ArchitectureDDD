export enum TipoPerfilEnum {
    ADULTO = 'ADULTO',
    INFANTIL = 'INFANTIL',
    ADOLESCENTE = 'ADOLESCENTE'
}

export class TipoPerfil {
    private readonly _tipo: TipoPerfilEnum;

    constructor(tipo: TipoPerfilEnum) {
        this._tipo = tipo;
    }

    get tipo(): TipoPerfilEnum {
        return this._tipo;
    }

    esInfantil(): boolean {
        return this._tipo === TipoPerfilEnum.INFANTIL;
    }

    esAdolescente(): boolean {
        return this._tipo === TipoPerfilEnum.ADOLESCENTE;
    }

    esAdulto(): boolean {
        return this._tipo === TipoPerfilEnum.ADULTO;
    }

    equals(other: TipoPerfil): boolean {
        return this._tipo === other._tipo;
    }

    static fromString(tipo: string): TipoPerfil {
        const tipoUpperCase = tipo.toUpperCase();
        if (!Object.values(TipoPerfilEnum).includes(tipoUpperCase as TipoPerfilEnum)) {
            throw new Error('Tipo de perfil inválido');
        }
        return new TipoPerfil(tipoUpperCase as TipoPerfilEnum);
    }
}
