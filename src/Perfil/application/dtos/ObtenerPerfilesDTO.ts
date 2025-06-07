export interface PerfilDTO {
    id: string;
    nombrePerfil: string;
    tipoPerfil: string;
    tienePin: boolean;
    activo: boolean;
    fechaCreacion: Date;
}

export interface ObtenerPerfilesResponseDTO {
    perfiles: PerfilDTO[];
    total: number;
} 