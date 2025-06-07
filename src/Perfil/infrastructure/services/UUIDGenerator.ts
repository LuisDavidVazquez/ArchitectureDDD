import { v4 as uuidv4 } from 'uuid';
import { IIdentifierGenerator } from '../../domain/services/IIdentifierGenerator';

export class UUIDGenerator implements IIdentifierGenerator {
    generate(): string {
        return uuidv4();
    }
} 