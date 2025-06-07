import { Request, Response } from "express";
import { ObtenerPerfilesUseCase } from "../../../application/use-cases/ObtenerPerfilesUseCase";
import { SQLitePerfilRepository } from "../../repositories/SQLitePerfilRepository";

export class ObtenerPerfilesController {
    private readonly obtenerPerfilesUseCase: ObtenerPerfilesUseCase;

    constructor() {
        const perfilRepo = new SQLitePerfilRepository();
        this.obtenerPerfilesUseCase = new ObtenerPerfilesUseCase(perfilRepo);
    }

    async ejecutar(req: Request, res: Response): Promise<void> {
        try {
            const suscriptorId = req.params.suscriptorId;
            console.log('Buscando perfiles para suscriptor:', suscriptorId);

            if (!suscriptorId) {
                res.status(400).json({
                    status: 'error',
                    message: 'El ID del suscriptor es requerido'
                });
                return;
            }

            const resultado = await this.obtenerPerfilesUseCase.execute(suscriptorId);
            console.log('Perfiles encontrados:', resultado);

            res.status(200).json({
                status: 'success',
                data: resultado
            });
        } catch (error) {
            console.error('Error en ObtenerPerfilesController:', error);
            res.status(500).json({
                status: 'error',
                message: error instanceof Error ? error.message : 'Error desconocido'
            });
        }
    }
} 