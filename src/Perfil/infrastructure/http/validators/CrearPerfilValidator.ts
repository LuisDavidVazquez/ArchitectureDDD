import { Request, Response, NextFunction } from 'express';
import { TipoPerfilEnum } from '../../../domain/value-objects/TipoPerfil';

export class CrearPerfilValidator {
    static async validate(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { nombrePerfil, tipoPerfil, suscriptorId, pin } = req.body;
        const errors: string[] = [];

        // Validar nombrePerfil
        if (!nombrePerfil || typeof nombrePerfil !== 'string' || nombrePerfil.trim().length === 0) {
            errors.push('El nombre del perfil es requerido y debe ser una cadena de texto no vacía');
        }

        // Validar tipoPerfil
        if (!tipoPerfil || !Object.values(TipoPerfilEnum).includes(tipoPerfil)) {
            errors.push(`El tipo de perfil debe ser uno de: ${Object.values(TipoPerfilEnum).join(', ')}`);
        }

        // Validar suscriptorId
        if (!suscriptorId || typeof suscriptorId !== 'string' || suscriptorId.trim().length === 0) {
            errors.push('El ID del suscriptor es requerido');
        }

        // Validar PIN (opcional)
        if (pin !== undefined && (typeof pin !== 'string' || !/^\d{4}$/.test(pin))) {
            errors.push('El PIN debe ser una cadena de 4 dígitos');
        }

        if (errors.length > 0) {
            res.status(400).json({
                status: 'error',
                message: 'Error de validación',
                errors: errors
            });
            return;
        }

        next();
    }
} 