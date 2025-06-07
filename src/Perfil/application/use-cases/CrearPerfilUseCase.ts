import { IPerfilRepository } from '../../domain/repositories/IPerfilRepository';
import { CrearPerfilDTO } from '../dtos/CrearPerfilDTO';
import { Perfil } from '../../domain/entities/Perfil';
import { NombrePerfil } from '../../domain/value-objects/NombrePerfil';
import { TipoPerfil, TipoPerfilEnum } from '../../domain/value-objects/TipoPerfil';
import { PIN } from '../../domain/value-objects/PIN';
import { IdentifierGeneratorService } from '../services/IdentifierGeneratorService';
import { DomainEventBus } from '../../domain/events/DomainEventBus';
import { PerfilCreado } from '../../domain/events/PerfilCreado';

export class CrearPerfilUseCase {
    constructor(
        private readonly perfilRepository: IPerfilRepository,
        private readonly identifierService: IdentifierGeneratorService,
        private readonly eventBus: DomainEventBus
    ) {}

    async execute(dto: CrearPerfilDTO): Promise<string> {
        console.log('Ejecutando CrearPerfilUseCase con DTO:', dto);

        // Verificar si ya existe un perfil con el mismo nombre para el suscriptor
        const perfilExistente = await this.perfilRepository.findByNombreAndSuscriptorId(
            dto.nombrePerfil,
            dto.suscriptorId
        );

        if (perfilExistente) {
            throw new Error('Ya existe un perfil con ese nombre para este suscriptor');
        }

        console.log('Creando value objects...');
        
        // Crear value objects
        const nombrePerfil = new NombrePerfil(dto.nombrePerfil);
        console.log('NombrePerfil creado:', nombrePerfil);
        
        const tipoPerfil = new TipoPerfil(dto.tipoPerfil as TipoPerfilEnum);
        console.log('TipoPerfil creado:', tipoPerfil);
        
        const pin = dto.pin ? new PIN(dto.pin) : undefined;
        if (pin) console.log('PIN creado:', pin);

        // Crear entidad
        const perfil = new Perfil(
            nombrePerfil,
            tipoPerfil,
            dto.suscriptorId,
            {
                generate: () => this.identifierService.generate()
            },
            pin
        );

        console.log('Perfil creado:', perfil);

        // Guardar en repositorio
        await this.perfilRepository.save(perfil);
        console.log('Perfil guardado exitosamente');

        // Publicar evento de dominio
        const evento = new PerfilCreado(
            perfil.id,
            perfil.nombrePerfil.valor,
            perfil.tipoPerfil.tipo,
            perfil.suscriptorId,
            !!perfil.pin
        );
        await this.eventBus.publish(evento);

        return perfil.id;
    }
}
