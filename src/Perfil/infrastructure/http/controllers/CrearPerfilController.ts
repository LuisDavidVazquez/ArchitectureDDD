import { Request, Response } from "express";
import { CrearPerfilUseCase } from "../../../application/use-cases/CrearPerfilUseCase";
import { SQLitePerfilRepository } from "../../repositories/SQLitePerfilRepository";
import { CrearPerfilDTO } from "../../../application/dtos/CrearPerfilDTO";
import { UUIDGenerator } from "../../services/UUIDGenerator";
import { IdentifierGeneratorService } from "../../../application/services/IdentifierGeneratorService";
import { InMemoryEventBus } from "../../events/InMemoryEventBus";
import { NotificarPerfilCreadoHandler } from "../../../application/handlers/NotificarPerfilCreadoHandler";

export class CrearPerfilController {
    private readonly crearPerfilUseCase: CrearPerfilUseCase;

    constructor() {
        const perfilRepo = new SQLitePerfilRepository();
        const uuidGenerator = new UUIDGenerator();
        const identifierService = new IdentifierGeneratorService(uuidGenerator);
        
        // Configurar el bus de eventos
        const eventBus = new InMemoryEventBus();
        eventBus.subscribe('perfil.creado', new NotificarPerfilCreadoHandler());
        
        this.crearPerfilUseCase = new CrearPerfilUseCase(
            perfilRepo,
            identifierService,
            eventBus
        );
    }

    async ejecutar(req: Request, res: Response): Promise<void> {
        try {
            console.log('Body recibido:', req.body);
            
            const dto: CrearPerfilDTO = {
                nombrePerfil: req.body.nombrePerfil,
                tipoPerfil: req.body.tipoPerfil,
                suscriptorId: req.body.suscriptorId,
                pin: req.body.pin
            };

            console.log('DTO creado:', dto);

            const perfilId = await this.crearPerfilUseCase.execute(dto);
            
            res.status(201).json({
                status: 'success',
                data: {
                    id: perfilId
                }
            });
        } catch (error) {
            console.error('Error en CrearPerfilController:', error);
            res.status(400).json({
                status: 'error',
                message: error instanceof Error ? error.message : 'Error desconocido'
            });
        }
    }
}
