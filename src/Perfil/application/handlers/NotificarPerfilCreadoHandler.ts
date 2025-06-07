import { DomainEventHandler } from '../../domain/events/DomainEventBus';
import { PerfilCreado } from '../../domain/events/PerfilCreado';

export class NotificarPerfilCreadoHandler implements DomainEventHandler<PerfilCreado> {
    async handle(event: PerfilCreado): Promise<void> {
        // Aquí iría la lógica para notificar a otros sistemas
        // Por ejemplo: enviar un email, una notificación push, etc.
        console.log('[NotificarPerfilCreado] Nuevo perfil creado:', {
            perfilId: event.perfilId,
            nombrePerfil: event.nombrePerfil,
            suscriptorId: event.suscriptorId,
            tipoPerfil: event.tipoPerfil,
            tienePin: event.tienePin,
            fecha: event.occurredOn
        });
    }
} 