export class PIN {
    private readonly _valor: string;

    constructor(valor: string) {
        this.validar(valor);
        this._valor = valor;
    }

    private validar(valor: string): void {
        if (!valor || valor.length !== 4) {
            throw new Error('El PIN debe tener exactamente 4 dígitos');
        }
        if (!/^\d+$/.test(valor)) {
            throw new Error('El PIN solo puede contener números');
        }
    }

    get valor(): string {
        return this._valor;
    }

    equals(other: PIN): boolean {
        return this._valor === other._valor;
    }

    coincide(pin: string): boolean {
        return this._valor === pin;
    }
} 