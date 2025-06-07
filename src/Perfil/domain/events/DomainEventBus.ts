import { DomainEvent } from './DomainEvent';

export interface DomainEventHandler<T extends DomainEvent> {
    handle(event: T): Promise<void>;
}

export interface DomainEventBus {
    publish(event: DomainEvent): Promise<void>;
    subscribe<T extends DomainEvent>(
        eventName: string,
        handler: DomainEventHandler<T>
    ): void;
} 