import { IPerfilRepository } from "../../domain/repositories/IPerfilRepository";
import { ObtenerPerfilesResponseDTO, PerfilDTO } from "../dtos/ObtenerPerfilesDTO";

export class ObtenerPerfilesUseCase {
    constructor(private readonly perfilRepository: IPerfilRepository) {}

    async execute(suscriptorId: string): Promise<ObtenerPerfilesResponseDTO> {
        // Obtener perfiles del repositorio
        const perfiles = await this.perfilRepository.findBySuscriptorId(suscriptorId);

        // Mapear a DTO
        const perfilesDTO: PerfilDTO[] = perfiles.map(perfil => ({
            id: perfil.id,
            nombrePerfil: perfil.nombrePerfil.valor,
            tipoPerfil: perfil.tipoPerfil.tipo,
            tienePin: !!perfil.pin,
            activo: perfil.activo,
            fechaCreacion: perfil.fechaCreacion
        }));

        return {
            perfiles: perfilesDTO,
            total: perfilesDTO.length
        };
    }
} 