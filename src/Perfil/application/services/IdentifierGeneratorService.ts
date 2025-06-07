import { IIdentifierGenerator } from "../../domain/services/IIdentifierGenerator";

export class IdentifierGeneratorService {
    constructor(private readonly identifierGenerator: IIdentifierGenerator) {}

    generate(): string {
        return this.identifierGenerator.generate();
    }
} 