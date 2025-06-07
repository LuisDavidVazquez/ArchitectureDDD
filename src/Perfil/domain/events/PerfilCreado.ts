import { DomainEvent } from './DomainEvent';
import { TipoPerfilEnum } from '../value-objects/TipoPerfil';

export class PerfilCreado implements DomainEvent {
    readonly eventName: string = 'perfil.creado';
    readonly occurredOn: Date;

    constructor(
        readonly perfilId: string,
        readonly nombrePerfil: string,
        readonly tipoPerfil: TipoPerfilEnum,
        readonly suscriptorId: string,
        readonly tienePin: boolean
    ) {
        this.occurredOn = new Date();
    }
} 