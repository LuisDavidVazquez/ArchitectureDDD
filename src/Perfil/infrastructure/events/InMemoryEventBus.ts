import { DomainEvent } from '../../domain/events/DomainEvent';
import { DomainEventBus, DomainEventHandler } from '../../domain/events/DomainEventBus';

export class InMemoryEventBus implements DomainEventBus {
    private handlers: Map<string, DomainEventHandler<any>[]> = new Map();

    async publish(event: DomainEvent): Promise<void> {
        const eventHandlers = this.handlers.get(event.eventName) || [];
        
        console.log(`[EventBus] Publicando evento ${event.eventName}:`, event);
        
        await Promise.all(
            eventHandlers.map(handler => 
                handler.handle(event).catch(error => 
                    console.error(`Error al manejar evento ${event.eventName}:`, error)
                )
            )
        );
    }

    subscribe<T extends DomainEvent>(
        eventName: string,
        handler: DomainEventHandler<T>
    ): void {
        const handlers = this.handlers.get(eventName) || [];
        handlers.push(handler);
        this.handlers.set(eventName, handlers);
        
        console.log(`[EventBus] Suscrito al evento ${eventName}`);
    }
} 